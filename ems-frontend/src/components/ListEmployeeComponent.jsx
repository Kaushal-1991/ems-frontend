import React, { useState, useEffect } from 'react';
import {
  deleteEmployee,
  listEmployess,
  listEmployeesPagination,
} from '../services/EmployeeServices';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListEmployeeComponent = () => {
  const [employees, setEmployee] = useState([]);
  const [page, setPage] = useState(0); // zero-based page index
  const [size] = useState(5); // items per page
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigater = useNavigate();

  const getEmployees = (p = page) => {
    setLoading(true);
    listEmployeesPagination({ page: p, size })
      .then((response) => {
        // backend may return different shapes:
        // - Spring Page: { content: [...], number, totalElements, totalPages }
        // - Custom: { data: [...], page, totalItems, totalPages }
        // - Simple array: [...]
        const payload = response.data;
        const items = Array.isArray(payload?.content)
          ? payload.content
          : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : [];

        setEmployee(items);

        // page number: try several common fields
        const serverPage = payload?.page ?? payload?.number ?? p;
        setPage(Number.isFinite(serverPage) ? serverPage : p);

        // total pages/items
        const serverTotalPages = payload?.totalPages;
        const serverTotalItems = payload?.totalItems ?? payload?.totalElements ?? null;

        setTotalPages(
          serverTotalPages !== undefined
            ? serverTotalPages
            : serverTotalItems !== null
            ? Math.max(1, Math.ceil(serverTotalItems / size))
            : items.length > 0
            ? Math.max(1, Math.ceil(items.length / size))
            : 1,
        );

        setTotalItems(serverTotalItems !== null ? serverTotalItems : items.length);
      })
      .catch((err) => {
        console.warn('Paginated endpoint failed; falling back to non-paginated', err?.message || err);
        listEmployess()
          .then((resp) => {
            setEmployee(Array.isArray(resp.data) ? resp.data : []);
            setTotalPages(1);
            setTotalItems(Array.isArray(resp.data) ? resp.data.length : 0);
            setPage(0);
          })
          .catch((e) => console.error(e));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getEmployees(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function removeEmployee(id) {
    deleteEmployee(id)
      .then((response) => {
        getEmployees(page);
        toast.success('Employee deleted successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete employee: ' + (error?.message || 'Unknown error'));
      });
  }

  function addEmployee() {
    navigater('/add-employee');
  }

  function updateEmployee(id) {
    navigater(`/edit-employee/${id}`);
  }

  return (
    <div className="container">
      <h3 className="text-center">List Of Employee</h3>
      <button className="btn btn-primary mb-2" onClick={addEmployee}>
        Add Employee
      </button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                Loading…
              </td>
            </tr>
          ) : Array.isArray(employees) && employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                No Record Found !!!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {Array.isArray(employees) ? employees.length : 0} of {totalItems || 'unknown'}
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className={'page-item ' + (page <= 0 ? 'disabled' : '')}>
              <button className="page-link" onClick={() => getEmployees(0)} disabled={page <= 0}>
                First
              </button>
            </li>
            <li className={'page-item ' + (page <= 0 ? 'disabled' : '')}>
              <button
                className="page-link"
                onClick={() => getEmployees(page - 1)}
                disabled={page <= 0}
              >
                Prev
              </button>
            </li>

            {Array.from({ length: Math.max(1, totalPages) })
              .slice(0, 20)
              .map((_, idx) => (
                <li key={idx} className={'page-item ' + (idx === page ? 'active' : '')}>
                  <button className="page-link" onClick={() => getEmployees(idx)}>
                    {idx + 1}
                  </button>
                </li>
              ))}

            <li className={'page-item ' + (page + 1 >= totalPages ? 'disabled' : '')}>
              <button
                className="page-link"
                onClick={() => getEmployees(page + 1)}
                disabled={page + 1 >= totalPages}
              >
                Next
              </button>
            </li>
            <li className={'page-item ' + (page + 1 >= totalPages ? 'disabled' : '')}>
              <button
                className="page-link"
                onClick={() => getEmployees(totalPages - 1)}
                disabled={page + 1 >= totalPages}
              >
                Last
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;