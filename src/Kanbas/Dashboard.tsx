import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const courses = [
    {
      id: 1234,
      title: "CS 1",
      description: "Class 1",
      image: "/images/reactjs.jpg",
    },
    {
      id: 5678,
      title: "CS 2",
      description: "Class 2",
      image: "/images/k.jpg",
    },
    {
      id: 4221,
      title: "CS 3",
      description: "Class 3",
      image: "/images/python.jpg",
    },
    {
      id: 1121,
      title: "CS 4",
      description: "Class 4",
      image: "/images/webdev.jpg",
    },
    {
      id: 1314,
      title: "CS 5",
      description: "Class 5",
      image: "/images/x.jpg",
    },
    {
      id: 1516,
      title: "CS 6",
      description: "Class 6",
      image: "/images/x.jpg",
    },
    {
      id: 1718,
      title: "CS 7",
      description: "Class 7",
      image: "/images/x.jpg",
    }
  ];

  return (
    <div id="wd-dashboard" className="container">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {courses.map((course) => (
          <div className="wd-dashboard-course col" style={{ width: "260px" }} key={course.id}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={`/Kanbas/Courses/${course.id}/Home`}>
                <img src={course.image} width="100%" height={160} alt={course.title} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {course.title}
                  </h5>
                  <p className="card-text">{course.description}</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
