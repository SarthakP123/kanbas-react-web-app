import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// Added client function to delete a course
export const deleteCourse = async (id: string) => {
  await axios.delete(`${COURSES_API}/${id}`);
};

// Added client function to update a course
export const updateCourse = async (course: any) => {
  await axios.put(`${COURSES_API}/${course._id}`, course);
};
