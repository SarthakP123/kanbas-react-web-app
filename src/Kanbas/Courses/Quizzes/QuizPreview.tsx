// QuizPreview.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import QuizTaker from './QuizTaker';

const QuizPreview = ({ currentCourse }: { currentCourse: any }) => {
  const navigate = useNavigate();
  const { cid, quizId } = useParams();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quiz Preview</h2>
        <Button 
          variant="primary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/edit`)}
        >
          Edit Quiz
        </Button>
      </div>
      <QuizTaker currentCourse={currentCourse} isPreview={true} />
    </div>
  );
};

export default QuizPreview;