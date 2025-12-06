import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeServices';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            // Fetch employee data by id and populate the form for editing
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            })
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email };
            console.log('Employee Data =>', employee);
            if (id) {
                // Update existing employee
                updateEmployee(id,employee).then((response) => {
                     console.log('Employee updated successfully', response.data);
                     navigate('/employees');
                }).catch((error) => {
                    console.error('Something went wrong', error);
                });
                
            }else{
                createEmployee(employee)
                .then((response) => {
                    console.log('Employee added successfully', response.data);
                    navigate('/employees');
                })
                .catch((error) => {
                    console.error('Something went wrong', error);
                });
            }
            
        }
       
    };

    const validateForm = () => {
        let isValid = true;
        const errorCopy  = { ...errors };
        if (firstName.trim()) {
            errorCopy.firstName = ''
        }else {
            errorCopy.firstName = 'First Name is required';
            isValid = false;
        }if (lastName.trim()) {
            errorCopy.lastName = ''
        }else {
            errorCopy.lastName = 'Last Name is required';
            isValid = false;
        }  if (!email.trim()) {
        errorCopy.email = 'Email is required';
        isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorCopy.email = 'Please enter a valid email address';
                isValid = false;
            } else {
                errorCopy.email = '';
            }
        }
        setErrors(errorCopy);
        return isValid;
    }

    const pageTitle = () => { {
        if (id) {
            return <h3 className="text-center">Update Employee</h3>
        } else {
            return <h3 className="text-center">Add Employee</h3>
        }
    }}

    return (
        <div>
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card-header">{pageTitle()}</div>
                <div className="card-body">
                    <form onSubmit={saveOrUpdateEmployee}>
                        <div className="form-group mb-2">
                            <label className="form-label">First Name :</label>
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Last Name :</label>
                            <input
                                type="text"
                                placeholder="Enter Last Name"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Email :</label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <button type="submit" className="btn btn-success float-end">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger float-end" style={{ marginRight: "10px" }} onClick={() => navigate('/employees')}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;