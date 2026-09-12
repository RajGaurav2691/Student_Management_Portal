import api from "../api/axiosConfig";

export const getStudents = async (params = {}) => {
  const response = await api.get("/students", { params });
  return response.data.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data.data;
};

export const addStudent = async (student) => {
  const response = await api.post("/students", student);
  return response.data.data;
};

export const updateStudent = async (student) => {
  const response = await api.put(`/students/${student.id}`, student);
  return response.data.data;
};

export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
};