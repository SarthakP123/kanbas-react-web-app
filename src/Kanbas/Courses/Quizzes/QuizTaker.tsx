// QuizTaker.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Button, Form, Card } from 'react-bootstrap';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import * as client from './client';

interface QuizAttempt {
  userId: string;
  score: number;
  answers: {
    questionId: string;
    answer: string;
    correct: boolean;
  }[];
  startTime: Date;
  endTime: Date;
}

interface QuizTakerProps {
  currentCourse: any;
  isPreview?: boolean;
}

const QuizTaker = ({ currentCourse, isPreview = false }: QuizTakerProps) => {
  const { quizId, cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [submitted, setSubmitted] = useState(false);
  const [previousAttempts, setPreviousAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const loadedQuiz = await client.findQuizById(quizId!);
        setQuiz(loadedQuiz);
        
        // Load previous attempts only if not in preview mode
        if (currentUser?._id && !isPreview) {
          const attempts = await client.findAttemptsByUser(quizId!, currentUser._id);
          setPreviousAttempts(attempts);
        }
      } catch (error) {
        console.error("Error loading quiz:", error);
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [quizId, currentUser, isPreview]);

  const canTakeQuiz = () => {
    if (!quiz) return false;
    if (isPreview) return true; // Always allow taking quiz in preview mode
    if (!quiz.multipleAttempts && previousAttempts.length > 0) return false;
    if (quiz.multipleAttempts && previousAttempts.length >= quiz.maxAttempts) return false;
    return true;
  };

  const startQuiz = () => {
    setCurrentAttempt({
      userId: currentUser._id,
      startTime: new Date(),
      answers: [],
    });
    setUserAnswers({});
    setSubmitted(false);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    const answers = quiz.questions.map((question: any) => {
      const userAnswer = userAnswers[question._id];
      const correct = userAnswer === question.correctAnswer;
      if (correct) correctCount++;
      return {
        questionId: question._id,
        answer: userAnswer,
        correct
      };
    });
    
    return {
      score: (correctCount / quiz.questions.length) * quiz.points,
      answers
    };
  };

  const handleSubmit = async () => {
    try {
      const { score, answers } = calculateScore();
      const attempt = {
        userId: currentUser._id,
        score,
        answers,
        startTime: currentAttempt.startTime,
        endTime: new Date()
      };
  
      if (!isPreview) {
        await client.submitQuiz(quiz._id, attempt);
      }
      setPreviousAttempts(prev => [...prev, attempt]);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz");
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!quiz) return <Alert variant="warning">Quiz not found</Alert>;

  if (submitted || (!canTakeQuiz() && previousAttempts.length > 0)) {
    const lastAttempt = previousAttempts[previousAttempts.length - 1];
    
    if (!lastAttempt) {
      return (
        <div className="p-4">
          <h2>{quiz.title} - Results</h2>
          <Alert variant="warning">No attempts found.</Alert>
          {canTakeQuiz() && (
            <Button variant="primary" onClick={startQuiz}>
              Take Quiz
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="p-4">
        {isPreview && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Alert variant="info" className="mb-0">Preview Mode</Alert>
            <Button
              variant="primary"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/edit`)}
            >
              <FaEdit className="me-2" />
              Edit Quiz
            </Button>
          </div>
        )}

        <h2>{quiz.title} - Results</h2>
        <Alert variant="info">
          Score: {lastAttempt.score} out of {quiz.points} points
          ({((lastAttempt.score / quiz.points) * 100).toFixed(1)}%)
        </Alert>
        
        {quiz.questions.map((question: any, index: number) => {
          const answer = lastAttempt.answers.find(a => a.questionId === question._id);
          return (
            <Card key={question._id} className={`mb-3 ${answer?.correct ? 'border-success' : 'border-danger'}`}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Question {index + 1}</span>
                {answer?.correct ? (
                  <FaCheck className="text-success" />
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </Card.Header>
              <Card.Body>
                <p>{question.question}</p>
                <p className={answer?.correct ? 'text-success' : 'text-danger'}>
                  Your answer: {answer?.answer || 'No answer provided'}
                </p>
                {(quiz.showCorrectAnswers || isPreview) && (
                  <p className="text-success">Correct answer: {question.correctAnswer}</p>
                )}
              </Card.Body>
            </Card>
          );
        })}
        
        {canTakeQuiz() && (
          <Button variant="primary" onClick={startQuiz}>
            {isPreview ? "Preview Again" : "Take Quiz Again"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      {isPreview && (
        <Alert variant="info" className="mb-3">
          Preview Mode - This is how students will see the quiz
        </Alert>
      )}

      {!currentAttempt ? (
        <div>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <Alert variant="info">
            <p>Points: {quiz.points}</p>
            <p>Time Limit: {quiz.timeLimit} minutes</p>
            <p>Questions: {quiz.questions.length}</p>
            {quiz.multipleAttempts && (
              <p>Attempts allowed: {quiz.maxAttempts}</p>
            )}
            <p>Previous attempts: {previousAttempts.length}</p>
          </Alert>
          <Button variant="primary" onClick={startQuiz}>
            {isPreview ? "Start Preview" : "Start Quiz"}
          </Button>
        </div>
      ) : (
        <div>
          <h2>{quiz.title}</h2>
          {quiz.questions.map((question: any, index: number) => (
            <Card key={question._id} className="mb-3">
              <Card.Header>Question {index + 1}</Card.Header>
              <Card.Body>
                <p>{question.question}</p>
                {question.type === 'MULTIPLE_CHOICE' && (
                  <Form.Group>
                    {question.choices.map((choice: string, i: number) => (
                      <Form.Check
                        key={i}
                        type="radio"
                        name={question._id}
                        label={choice}
                        checked={userAnswers[question._id] === choice}
                        onChange={() => handleAnswerChange(question._id, choice)}
                      />
                    ))}
                  </Form.Group>
                )}

                {question.type === 'TRUE_FALSE' && (
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      name={question._id}
                      label="True"
                      checked={userAnswers[question._id] === 'true'}
                      onChange={() => handleAnswerChange(question._id, 'true')}
                    />
                    <Form.Check
                      type="radio"
                      name={question._id}
                      label="False"
                      checked={userAnswers[question._id] === 'false'}
                      onChange={() => handleAnswerChange(question._id, 'false')}
                    />
                  </Form.Group>
                )}

                {question.type === 'FILL_BLANK' && (
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={userAnswers[question._id] || ''}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      placeholder="Enter your answer"
                    />
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
          ))}
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length !== quiz.questions.length}
          >
            {isPreview ? "Submit Preview" : "Submit Quiz"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizTaker;