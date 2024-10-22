import { Link, useParams, useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookOpen, faComments, faVideo, faTasks, faClipboardList, faChartBar, faUsers } from "@fortawesome/free-solid-svg-icons";

const links = [
  { label: "Home", path: "Home", icon: faHome },
  { label: "Modules", path: "Modules", icon: faBookOpen },
  { label: "Piazza", path: "Piazza", icon: faComments },
  { label: "Zoom", path: "Zoom", icon: faVideo },
  { label: "Assignments", path: "Assignments", icon: faTasks },
  { label: "Quizzes", path: "Quizzes", icon: faClipboardList },
  { label: "Grades", path: "Grades", icon: faChartBar },
  { label: "People", path: "People", icon: faUsers }
];

export default function CoursesNavigation() {
  const { cid } = useParams();  
  const location = useLocation(); 

  return (
    <div id="wd-courses-navigation">
      {links.map(({ label, path, icon }) => {
        const fullPath = `/Kanbas/Courses/${cid}/${path}`;  
        const isActive = location.pathname === fullPath; 

        return (
          <Link
            key={path}
            to={fullPath}
            className={`d-block mb-2 ${isActive ? 'text-black fw-bold' : 'text-danger'}`}  
            id={`wd-course-${path.toLowerCase()}-link`}
            style={{ textDecoration: 'none' }} 
          >
            <FontAwesomeIcon icon={icon} className="wd-nav-icon me-2" /> {label}
          </Link>
        );
      })}
    </div>
  );
}
