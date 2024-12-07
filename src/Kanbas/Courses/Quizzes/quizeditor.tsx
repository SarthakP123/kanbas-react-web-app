
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import { Nav, Form, Button, Alert } from "react-bootstrap";
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

interface Question {
  _id?: string;
  title: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
  points: number;
  question: string;
  choices?: string[];
  correctAnswer: string;
  possibleAnswers?: string[];
}

interface Quiz {
  _id?: string;
  title: string;
  description: string;
  quizType: 'GRADED_QUIZ' | 'PRACTICE_QUIZ' | 'GRADED_SURVEY' | 'UNGRADED_SURVEY';
  points: number;
  assignmentGroup: 'QUIZZES' | 'EXAMS' | 'ASSIGNMENTS' | 'PROJECT';
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts?: number;
  showCorrectAnswers: boolean;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  published: boolean;
  questions: Question[];
}

interface Errors {
  [key: string]: string;
}

const QuizEditor = ({ currentCourse }: { currentCourse: any }) => {
    const { qid } = useParams<{ qid: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('details');
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(true);
    
    const [quiz, setQuiz] = useState<Quiz>({
      title: "",
      description: "",
      quizType: "GRADED_QUIZ",
      points: 0,
      assignmentGroup: "QUIZZES",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      showCorrectAnswers: true,
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      published: false,
      questions: []
    });

    // Move both useEffect hooks to the top, before any conditional returns
    useEffect(() => {
      const loadQuiz = async () => {
        try {
          setLoading(true);
          if (qid && qid !== 'new') {
            console.log("Loading quiz with ID:", qid);
            const loadedQuiz = await client.findQuizById(qid);
            console.log("Loaded quiz:", loadedQuiz);
            if (loadedQuiz) {
              setQuiz(loadedQuiz);
            }
          }
        } catch (error) {
          console.error("Error loading quiz:", error);
          setErrors({ load: "Failed to load quiz" });
        } finally {
          setLoading(false);
        }
      };
      loadQuiz();
    }, [qid]);

    // Second useEffect for calculating total points
    useEffect(() => {
      const total = quiz.questions.reduce((sum, q) => sum + q.points, 0);
      setQuiz(prev => ({ ...prev, points: total }));
    }, [quiz.questions]);

    // Now we can have the loading check
    if (loading) {
      return <div>Loading quiz...</div>;
    }
  

  const validateQuiz = () => {
    const newErrors: Errors = {};
    
    if (!quiz.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (quiz.questions.length === 0) {
      newErrors.questions = "At least one question is required";
    }
    
    quiz.questions.forEach((question, index) => {
      if (!question.title.trim()) {
        newErrors[`question_${index}_title`] = "Question title is required";
      }
      if (!question.question.trim()) {
        newErrors[`question_${index}_text`] = "Question text is required";
      }
      if (question.type === 'MULTIPLE_CHOICE' && (!question.choices || question.choices.length < 2)) {
        newErrors[`question_${index}_choices`] = "At least two choices are required";
      }
      if (!question.correctAnswer) {
        newErrors[`question_${index}_answer`] = "Correct answer is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: ["", ""],
      correctAnswer: ""
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const updatedQuestions = quiz.questions.map((q, i) => 
      i === index ? { ...q, ...updates } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const removeQuestion = (index: number) => {
    setQuiz({ ...quiz, questions: quiz.questions.filter((_, i) => i !== index) });
  };

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= quiz.questions.length) return;
    const updatedQuestions = [...quiz.questions];
    const [removed] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, removed);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addChoice = (questionIndex: number) => {
    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === questionIndex) {
        return {
          ...q,
          choices: [...(q.choices || []), ""]
        };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const updateChoice = (questionIndex: number, choiceIndex: number, value: string) => {
    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === questionIndex && q.choices) {
        const newChoices = [...q.choices];
        newChoices[choiceIndex] = value;
        return { ...q, choices: newChoices };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const removeChoice = (questionIndex: number, choiceIndex: number) => {
    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === questionIndex && q.choices) {
        const newChoices = q.choices.filter((_, i) => i !== choiceIndex);
        return { ...q, choices: newChoices };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSave = async (andPublish: boolean = false) => {
    try {
      if (!validateQuiz()) {
        const firstError = document.querySelector('.is-invalid');
        firstError?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      const updatedQuiz = { 
        ...quiz,
        published: andPublish,
        courseId: currentCourse._id
      };

      let savedQuiz;
      if (!qid || qid === 'new') {
        savedQuiz = await client.createQuiz(currentCourse._id, updatedQuiz);
      } else {
        savedQuiz = await client.updateQuiz(qid, updatedQuiz);
      }

      if (savedQuiz) {
        navigate(`/Kanbas/Courses/${currentCourse._id}/Quizzes`);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      setErrors({ save: "Failed to save quiz. Please try again." });
    }
  };

  // Calculate total points whenever questions change

  return (
    <div className="p-4">
      {errors.save && (
        <Alert variant="danger" dismissible onClose={() => setErrors({ ...errors, save: '' })}>
          {errors.save}
        </Alert>
      )}
      
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'details'}
            onClick={() => setActiveTab('details')}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'questions'}
            onClick={() => setActiveTab('questions')}
          >
            Questions {quiz.questions.length > 0 && `(${quiz.questions.length})`}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'details' && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={quiz.title}
              isInvalid={!!errors.title}
              onChange={(e) => {
                setQuiz({ ...quiz, title: e.target.value });
                if (e.target.value.trim()) {
                  setErrors({ ...errors, title: '' });
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value as Quiz['quizType'] })}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value as Quiz['assignmentGroup'] })}
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time Limit (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={quiz.timeLimit}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
            />
          </Form.Group>

          {quiz.multipleAttempts && (
            <Form.Group className="mb-3">
              <Form.Label>Maximum Attempts</Form.Label>
              <Form.Control
                type="number"
                value={quiz.maxAttempts}
                onChange={(e) => setQuiz({ ...quiz, maxAttempts: parseInt(e.target.value) })}
                min={1}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={quiz.dueDate || ''}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="datetime-local"
              value={quiz.availableFrom || ''}
              onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available Until</Form.Label>
            <Form.Control
              type="datetime-local"
              value={quiz.availableUntil || ''}
              onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
            />
          </Form.Group>
        </Form>
      )}

      {activeTab === 'questions' && (
        <div>
          {errors.questions && (
            <Alert variant="warning">{errors.questions}</Alert>
          )}
          
          {quiz.questions.map((question, index) => (
            <div key={index} className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>Question {index + 1}</div>
                <div>
                  <Button 
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={() => moveQuestion(index, index - 1)}
                    disabled={index === 0}
                  >
                    <FaArrowUp />
                  </Button>
                  <Button 
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={() => moveQuestion(index, index + 1)}
                    disabled={index === quiz.questions.length - 1}
                  >
                    <FaArrowDown />
                  </Button>
                  <Button 
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeQuestion(index)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
              <div className="card-body">
                <Form.Group className="mb-3">
                  <Form.Label>Question Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={question.title}
                    isInvalid={!!errors[`question_${index}_title`]}
                    onChange={(e) => {
                      updateQuestion(index, { title: e.target.value });
                      if (e.target.value.trim()) {
                        const newErrors = { ...errors };
                        delete newErrors[`question_${index}_title`];
                        setErrors(newErrors);
                      }
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[`question_${index}_title`]}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Question Type</Form.Label>
                  <Form.Select
                    value={question.type}
                    onChange={(e) => updateQuestion(index, { 
                      type: e.target.value as Question['type'],
                      choices: e.target.value === 'MULTIPLE_CHOICE' ? ["", ""] : undefined,
                      correctAnswer: ""
                    })}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_BLANK">Fill in the Blank</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    type="number"
                    value={question.points}
                    onChange={(e) => updateQuestion(index, { points: Number(e.target.value) })}
                    min={0}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Question Text <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={question.question}
                    isInvalid={!!errors[`question_${index}_text`]}
                    onChange={(e) => {
                      updateQuestion(index, { question: e.target.value });
                      if (e.target.value.trim()) {
                        const newErrors = { ...errors };
                        delete newErrors[`question_${index}_text`];
                        setErrors(newErrors);
                      }
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[`question_${index}_text`]}
                  </Form.Control.Feedback>
                </Form.Group>

                {question.type === 'MULTIPLE_CHOICE' && (
                  <Form.Group className="mb-3">
                    <Form.Label>Choices <span className="text-danger">*</span></Form.Label>
                    {question.choices?.map((choice, choiceIndex) => (
                      <div key={choiceIndex} className="input-group mb-2">
                        <Form.Control
                          type="text"
                          value={choice}
                          onChange={(e) => updateChoice(index, choiceIndex, e.target.value)}
                        />
                        <div className="input-group-text">
                          <Form.Check
                            type="radio"
                            name={`correct-${index}`}
                            checked={question.correctAnswer === choice}
                            onChange={() => updateQuestion(index, { correctAnswer: choice })}
                          />
                        </div>
                        <Button
  variant="outline-danger"
  onClick={() => removeChoice(index, choiceIndex)}
  disabled={!question.choices || question.choices.length <= 2}
>
  <FaTrash />
</Button>
                      </div>
                    ))}
                    {errors[`question_${index}_choices`] && (
                      <div className="text-danger small mb-2">
                        {errors[`question_${index}_choices`]}
                      </div>
                    )}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => addChoice(index)}
                    >
                      Add Choice
                    </Button>
                  </Form.Group>
                )}

                {question.type === 'TRUE_FALSE' && (
                  <Form.Group className="mb-3">
                    <Form.Label>Correct Answer <span className="text-danger">*</span></Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        name={`tf-${index}`}
                        label="True"
                        checked={question.correctAnswer === 'true'}
                        onChange={() => updateQuestion(index, { correctAnswer: 'true' })}
                        isInvalid={!!errors[`question_${index}_answer`]}
                      />
                      <Form.Check
                        type="radio"
                        name={`tf-${index}`}
                        label="False"
                        checked={question.correctAnswer === 'false'}
                        onChange={() => updateQuestion(index, { correctAnswer: 'false' })}
                        isInvalid={!!errors[`question_${index}_answer`]}
                      />
                    </div>
                    {errors[`question_${index}_answer`] && (
                      <div className="text-danger small">
                        {errors[`question_${index}_answer`]}
                      </div>
                    )}
                  </Form.Group>
                )}

                {question.type === 'FILL_BLANK' && (
                  <Form.Group className="mb-3">
                    <Form.Label>Correct Answer <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={question.correctAnswer}
                      isInvalid={!!errors[`question_${index}_answer`]}
                      onChange={(e) => updateQuestion(index, { correctAnswer: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`question_${index}_answer`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </div>
            </div>
          ))}

          <Button variant="primary" onClick={addQuestion}>
            Add Question
          </Button>
        </div>
      )}

      <div className="mt-4 d-flex gap-2">
        <Button 
          variant="success" 
          onClick={() => handleSave(true)}
        >
          Save & Publish
        </Button>
        <Button 
          variant="primary" 
          onClick={() => handleSave(false)}
        >
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(`/Kanbas/Courses/${currentCourse._id}/Quizzes`)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuizEditor;