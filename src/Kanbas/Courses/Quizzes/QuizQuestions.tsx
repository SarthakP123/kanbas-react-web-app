import React from 'react';
import { Quiz, Question } from './types';
import { Form, Button } from 'react-bootstrap';

interface QuizQuestionsProps {
  quiz: Quiz;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}

export function QuizQuestions({ quiz, setQuiz }: QuizQuestionsProps) {
  const addQuestion = () => {
    const newQuestion: Question = {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: ["Choice 1", "Choice 2"],
      correctAnswer: "",
      possibleAnswers: []
    };
    
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    });
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = updatedQuestion;
    setQuiz({
      ...quiz,
      questions: newQuestions
    });
  };

  const removeQuestion = (index: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>Questions</h4>
        <Button variant="primary" onClick={addQuestion}>
          Add Question
        </Button>
      </div>

      {quiz.questions.map((question, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <Form.Group className="mb-3">
              <Form.Label>Question Title</Form.Label>
              <Form.Control
                type="text"
                value={question.title}
                onChange={(e) => updateQuestion(index, { ...question, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={question.type}
                onChange={(e) => updateQuestion(index, { 
                  ...question, 
                  type: e.target.value as Question['type']
                })}
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True/False</option>
                <option value="FILL_BLANK">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>

            <Button 
              variant="danger" 
              size="sm"
              onClick={() => removeQuestion(index)}
              className="mt-2"
            >
              Remove Question
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}