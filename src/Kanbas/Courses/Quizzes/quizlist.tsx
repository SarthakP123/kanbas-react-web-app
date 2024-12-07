import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import { FaEllipsisV, FaCheckCircle, FaBan, FaExclamationTriangle } from "react-icons/fa";
import { Dropdown, Alert } from "react-bootstrap";

interface Quiz {
  _id?: string;
  courseId: string;
  title: string;
  description?: string;
  published: boolean;
  points: number;
  dueDate?: Date;
  availableFrom?: Date;
  availableUntil?: Date;
  questions: any[];
  multipleAttempts?: boolean;
  maxAttempts?: number;
  attempts?: any[];
}

interface QuizListProps {
  currentCourse: any;
}

const QuizList = ({ currentCourse }: QuizListProps) => {
  const { cid } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

//  const fetchQuizzes = async () => {
//    try {
 //     setLoading(true);
 //     setError(null);
 //     if (cid) {
  //      const fetchedQuizzes = await client.findQuizzesForCourse(cid);
  //      setQuizzes(fetchedQuizzes);
 //     }
  //  } catch (error) {
  //    console.error("Error fetching quizzes:", error);
   //   setError("Failed to load quizzes. Please try again.");
  //  } finally {
   //   setLoading(false);
  //  }
  //};
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      if (cid) {
        const fetchedQuizzes = await client.findQuizzesForCourse(
          cid,
          currentUser?.role || 'STUDENT'
        );
        setQuizzes(fetchedQuizzes);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setError("Failed to load quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, [cid, currentUser?.role]); // Added currentUser.role to dependencies

  const handleDeleteQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await client.deleteQuiz(quizId);
        setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
      } catch (error) {
        console.error("Error deleting quiz:", error);
        setError("Failed to delete quiz. Please try again.");
      }
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    if (!quiz.availableFrom || !quiz.availableUntil) return "Not Available";
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.availableUntil);
    
    if (now < availableFrom) {
      return `Not available until ${availableFrom.toLocaleDateString()}`;
    } else if (now > availableUntil) {
      return "Closed";
    }
    return "Available";
  };

  const getStudentAttemptInfo = (quiz: Quiz) => {
    if (!currentUser || currentUser.role === 'FACULTY') return null;
    
    const userAttempts = quiz.attempts?.filter(a => a.userId === currentUser._id) || [];
    const attemptsLeft = quiz.multipleAttempts 
      ? Math.max(0, (quiz.maxAttempts || 0) - userAttempts.length)
      : Math.max(0, 1 - userAttempts.length);
    
    return {
      attempts: userAttempts,
      attemptsLeft,
      lastScore: userAttempts.length > 0 
        ? userAttempts[userAttempts.length - 1].score
        : null
    };
  };

  if (loading) {
    return <div className="p-4">Loading quizzes...</div>;
  }

  return (
    <div className="p-4">
      {error && (
        <Alert variant="danger" className="mb-3" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {currentUser?.role === "FACULTY" && (
        <Link 
          to={`/Kanbas/Courses/${currentCourse._id}/Quizzes/new`}
          className="btn btn-danger float-end"
        >
          + Quiz
        </Link>
      )}
      
      <h2>Quizzes</h2>
      
      {quizzes.length === 0 ? (
        <Alert variant="info">
          {currentUser?.role === "FACULTY" 
            ? "No quizzes available. Click the + Quiz button to create one."
            : "No quizzes available for this course yet."}
        </Alert>
      ) : (
        <ul className="list-group mt-4">
          {quizzes.map((quiz) => {
            const studentInfo = getStudentAttemptInfo(quiz);
            return (
              <li key={quiz._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {currentUser?.role === "FACULTY" ? (
                      <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/preview`}>
                        <h4>{quiz.title}</h4>
                      </Link>
                    ) : (
                      quiz.published ? (
                        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/take`}>
                          <h4>{quiz.title}</h4>
                        </Link>
                      ) : (
                        <h4 className="text-muted">{quiz.title} (Not Available)</h4>
                      )
                    )}
                    <div className="text-muted">
                      <div>Status: {getAvailabilityStatus(quiz)}</div>
                      <div>Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : 'No due date'}</div>
                      <div>Points: {quiz.points}</div>
                      <div>Questions: {quiz.questions?.length || 0}</div>
                      {studentInfo && (
                        <>
                          <div>Attempts Left: {studentInfo.attemptsLeft}</div>
                          {studentInfo.lastScore !== null && (
                            <div>Last Score: {studentInfo.lastScore} / {quiz.points}</div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    {!quiz.questions?.length && currentUser?.role === "FACULTY" && (
                      <FaExclamationTriangle className="text-warning me-2" title="No questions added" />
                    )}
                    {quiz.published ? (
                      <FaCheckCircle className="text-success me-2" title="Published" />
                    ) : (
                      <FaBan className="text-danger me-2" title="Not Published" />
                    )}
                    
                    {currentUser?.role === "FACULTY" && (
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="light" id={`quiz-dropdown-${quiz._id}`}>
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item 
                            as={Link}
                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/preview`}
                          >
                            Preview
                          </Dropdown.Item>
                          <Dropdown.Item 
                            as={Link}
                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item 
                            className="text-danger"
                            onClick={() => quiz._id && handleDeleteQuiz(quiz._id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default QuizList;