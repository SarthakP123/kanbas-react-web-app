import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { findQuizzesForCourse, deleteQuiz, togglePublishQuiz } from "./client";
import { setQuizzes, removeQuiz, updateQuizInList } from "./reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import AllowCertainRoles from "../../Account/AllowCertainRoles";
import { Quiz } from "./types";

interface AppState {
  quizReducer: {
    quizzes: Quiz[];
  };
  accountReducer: {
    currentUser: any;
  };
}

export default function QuizList() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: AppState) => state.quizReducer);
  const { currentUser } = useSelector((state: AppState) => state.accountReducer);

  useEffect(() => {
    const loadQuizzes = async () => {
      if (cid) {
        try {
          const data = await findQuizzesForCourse(cid);
          dispatch(setQuizzes(data));
        } catch (error) {
          console.error("Error loading quizzes:", error);
        }
      }
    };
    loadQuizzes();
  }, [cid, dispatch]);

  const handleDelete = async (quizId: string) => {
    try {
      await deleteQuiz(quizId);
      dispatch(removeQuiz(quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handlePublish = async (quizId: string) => {
    try {
      const updated = await togglePublishQuiz(quizId);
      dispatch(updateQuizInList(updated));
    } catch (error) {
      console.error("Error toggling quiz publish status:", error);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "No date set";
    return new Date(date).toLocaleDateString();
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (!availableFrom) return "Not Available";
    if (now < availableFrom) return `Available from ${formatDate(quiz.availableFrom)}`;
    if (availableUntil && now > availableUntil) return "Closed";
    return "Available";
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quizzes</h3>
        <AllowCertainRoles role="FACULTY">
          <Link 
            to={`/Kanbas/Courses/${cid}/Quizzes/new`} 
            className="btn btn-danger"
          >
            <FontAwesomeIcon icon={faPlus} /> Quiz
          </Link>
        </AllowCertainRoles>
      </div>

      {quizzes.length === 0 ? (
        <div className="alert alert-info">
          No quizzes available. Click the + Quiz button to create one.
        </div>
      ) : (
        <div className="list-group">
          {quizzes.map((quiz: Quiz) => (
            <div key={quiz._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={quiz.published ? faCheck : faBan}
                      className={`me-2 ${quiz.published ? 'text-success' : 'text-danger'}`}
                      onClick={() => currentUser?.role === 'FACULTY' && quiz._id && handlePublish(quiz._id)}
                      style={{ cursor: currentUser?.role === 'FACULTY' ? 'pointer' : 'default' }}
                    />
                    <Link 
                      to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="text-danger text-decoration-none"
                    >
                      {quiz.title}
                    </Link>
                  </div>
                  <div className="text-muted small mt-1">
                    <div>{getAvailabilityStatus(quiz)}</div>
                    <div>
                      Due: {formatDate(quiz.dueDate?.toString())} | 
                      Points: {quiz.points} | 
                      Questions: {quiz.questions.length}
                    </div>
                  </div>
                </div>

                <AllowCertainRoles role="FACULTY">
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="text-dark">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item 
                        as={Link} 
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => quiz._id && handleDelete(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => quiz._id && handlePublish(quiz._id)}>
                        {quiz.published ? 'Unpublish' : 'Publish'}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </AllowCertainRoles>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}