import React, { useEffect,useState } from 'react'
import { createDepatment,getDepartment,updateDepartment } from '../services/DepartmentService';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');

  const [errors, setErrors] = useState({
    departmentName: '',
    departmentDescription: ''
  });
  

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if(id) {
        // Fetch department data by id and populate the form for editing
        getDepartment(id).then((response) => {
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription);
        })
    }
  }, [id]);


  
   
  const saveOrUpdateDepartment = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const department = { departmentName,departmentDescription}
        if (id) {
            updateDepartment(id, department).then((response) => {
                console.log('Department updated successfully', response.data);
            toast.success('Department updated successfully')
            navigate('/departments');
            }).catch((error) => {
            console.error('Something went wrong', error);
            toast.error('Failed to update department: ' + (error?.message || 'Unknown error'))
            });
        } else {
            createDepatment(department).then((response) => {
                console.log('Department added successfully', response.data);
            toast.success('Department added successfully')
            navigate('/departments');
            }).catch((error) => {
          console.error('Something went wrong', error);
          toast.error('Failed to add department: ' + (error?.message || 'Unknown error'))
        });
    }   
  }
}
  const validateForm = () => {
    let valid = true;
    const errorCopy  = { ...errors };
    if (!departmentName) {
      errorCopy.departmentName = 'Department Name is required';
      valid = false;
    } else {
      errorCopy.departmentName = '';
    }
    if (!departmentDescription) {
      errorCopy.departmentDescription = 'Department Description is required';
      valid = false;
    } else {
      errorCopy.departmentDescription = '';
    }
    setErrors(errorCopy);
    return valid;
  }
  return (
    <div>
        <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-header">Add Department</div>
                <div className="card-body">
                    <form onSubmit={saveOrUpdateDepartment}>
                        <div className="form-group mb-2">
                            <label className="form-label">Department Name :</label>
                            <input
                                type="text"
                                placeholder="Enter Department Name"
                                name="departmentName"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                            />
                            {errors.departmentName && <div className="invalid-feedback">{errors.departmentName}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Department Description :</label>
                            <input
                                type="text"
                                placeholder="Enter Department Description"
                                name="departmentDescription"
                                value={departmentDescription}
                                onChange={(e) => setDepartmentDescription(e.target.value)}
                                className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                            />
                            {errors.departmentDescription && <div className="invalid-feedback">{errors.departmentDescription}</div>}
                        </div>
                        <button type="submit" className="btn btn-success float-end">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger float-end" style={{ marginRight: "10px" }} onClick={() => navigate('/departments')}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default DepartmentComponent