import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listEmployess = () => axios.get(REST_API_BASE_URL);

// Paginated listing. Backend expected to expose `/api/employees/pagination`
// Accepts { page, size, q } where `page` is zero-based.
export const listEmployeesPagination = ({ page = 0, size = 10, q } = {}) => {
  const params = { page, size };
  if (q) params.q = q;
  return axios.get(`${REST_API_BASE_URL}/pagination`, { params });
};

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateEmployee = (empId, employee) =>
  axios.put(`${REST_API_BASE_URL}/${empId}`, employee);

export const deleteEmployee = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);