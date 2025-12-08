import axios  from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/departments";

export const listDepartments = () => axios.get(REST_API_BASE_URL);

export const createDepatment = (department) => axios.post(REST_API_BASE_URL, department);

export const getDepartment  = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateDepartment = (deptId,department) => axios.put(REST_API_BASE_URL + '/' + deptId,department)

export const deleteDepartment = (id) => axios.delete(REST_API_BASE_URL + '/' + id);