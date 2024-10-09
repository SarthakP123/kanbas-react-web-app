import { Link, useParams } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookOpen, faComments, faVideo, faTasks, faClipboardList, faChartBar, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function CoursesNavigation() {
  const { cid } = useParams();  

  return (
    <div id="wd-courses-navigation">
      <Link id="wd-course-home-link" to={`/Kanbas/Courses/${cid}/Home`}>
        <FontAwesomeIcon icon={faHome} className="wd-nav-icon" /> Home
      </Link><br/>

      <Link id="wd-course-modules-link" to={`/Kanbas/Courses/${cid}/Modules`}>
        <FontAwesomeIcon icon={faBookOpen} className="wd-nav-icon" /> Modules
      </Link><br/>

      <Link id="wd-course-piazza-link" to={`/Kanbas/Courses/${cid}/Piazza`}>
        <FontAwesomeIcon icon={faComments} className="wd-nav-icon" /> Piazza
      </Link><br/>

      <Link id="wd-course-zoom-link" to={`/Kanbas/Courses/${cid}/Zoom`}>
        <FontAwesomeIcon icon={faVideo} className="wd-nav-icon" /> Zoom
      </Link><br/>

      <Link id="wd-course-assignments-link" to={`/Kanbas/Courses/${cid}/Assignments`}>
        <FontAwesomeIcon icon={faTasks} className="wd-nav-icon" /> Assignments
      </Link><br/>

      <Link id="wd-course-quizzes-link" to={`/Kanbas/Courses/${cid}/Quizzes`}>
        <FontAwesomeIcon icon={faClipboardList} className="wd-nav-icon" /> Quizzes
      </Link><br/>

      <Link id="wd-course-grades-link" to={`/Kanbas/Courses/${cid}/Grades`}>
        <FontAwesomeIcon icon={faChartBar} className="wd-nav-icon" /> Grades
      </Link><br/>

      <Link id="wd-course-people-link" to={`/Kanbas/Courses/${cid}/People`}>
        <FontAwesomeIcon icon={faUsers} className="wd-nav-icon" /> People
      </Link><br/>
    </div>
  );
}
