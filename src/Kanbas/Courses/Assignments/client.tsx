import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// Corrected API endpoint
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const getAssignments = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};
export const updateAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};
export const createAssignment = async (courseID: any, assignment:any) => {
    const response = await axiosWithCredentials.post(`${ASSIGNMENTS_API}?courseID=${courseID}`, assignment);
    return response.data;
};
