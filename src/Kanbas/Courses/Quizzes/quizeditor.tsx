import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createQuiz, updateQuiz, findQuizById } from "./client";
import { addQuiz, updateQuizInList } from "./reducer";
import { Quiz } from "./types";
import { Form, Button, Tab, Tabs, Alert } from "react-bootstrap";
import { QuizQuestions } from "./QuizQuestions";

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('details');
  const [error, setError] = useState<string | null>(null);
  
  const [quiz, setQuiz] = useState<Quiz>({
    courseId: cid!,
    title: "New Quiz",
    published: false,
    quizType: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: true,
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    questions: [],
    attempts: []
  });

  useEffect(() => {
    const loadQuiz = async () => {
      if (qid && qid !== "new") {
        try {
          const data = await findQuizById(qid);
          setQuiz(data);
        } catch (error) {
          setError("Failed to load quiz");
          console.error("Error loading quiz:", error);
        }
      }
    };
    loadQuiz();
  }, [qid]);

  const handleSubmit = async (publishAfterSave: boolean = false) => {
    try {
      if (!quiz.title.trim()) {
        setError("Quiz title is required");
        return;
      }

      let savedQuiz;
      if (qid === "new") {
        savedQuiz = await createQuiz(cid!, { ...quiz, published: publishAfterSave });
        dispatch(addQuiz(savedQuiz));
      } else if (qid) {
        savedQuiz = await updateQuiz(qid, { ...quiz, published: publishAfterSave });
        dispatch(updateQuizInList(savedQuiz));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      setError("Failed to save quiz");
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <div className="p-4">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k: string | null) => setActiveTab(k || 'details')}
        className="mb-4"
      >
        <Tab eventKey="details" title="Details">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={quiz.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setQuiz({ ...quiz, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={quiz.description || ""}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                  setQuiz({ ...quiz, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quiz Type</Form.Label>
              <Form.Select
                value={quiz.quizType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                  setQuiz({ ...quiz, quizType: e.target.value as Quiz['quizType'] })}
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
                onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                  setQuiz({ ...quiz, assignmentGroup: e.target.value as Quiz['assignmentGroup'] })}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time Limit (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={quiz.timeLimit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Multiple Attempts"
                checked={quiz.multipleAttempts}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
              />
            </Form.Group>

            {quiz.multipleAttempts && (
              <Form.Group className="mb-3">
                <Form.Label>Maximum Attempts</Form.Label>
                <Form.Control
                  type="number"
                  value={quiz.maxAttempts}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    setQuiz({ ...quiz, maxAttempts: parseInt(e.target.value) })}
                  min={1}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setQuiz({ ...quiz, dueDate: new Date(e.target.value) })}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button 
                variant="secondary" 
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleSubmit(false)}>
                Save
              </Button>
              <Button variant="success" onClick={() => handleSubmit(true)}>
                Save & Publish
              </Button>
            </div>
          </Form>
        </Tab>
        
        <Tab eventKey="questions" title="Questions">
          <QuizQuestions quiz={quiz} setQuiz={setQuiz} />
        </Tab>
      </Tabs>
    </div>
  );
}