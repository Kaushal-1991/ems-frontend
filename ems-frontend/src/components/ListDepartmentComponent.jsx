import React, { useEffect, useState } from 'react'
import { listDepartments,deleteDepartment } from '../services/DepartmentService';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';

const ListDepartmentComponent = () => {

  /*let dummyData = [
    {
      "id" : 1,
      "departmentName" : "Human Resource",
      "departmentDescription" : "Handles recruitment and employee relations"
    },{
      "id" : 2,
      "departmentName" : "Finance",
      "departmentDescription" : "Manages company finances and budgeting"
    },{
      "id" : 3,
      "departmentName" : "IT",
      "departmentDescription" : "Handles technology and infrastructure"
    }
  ];*/

  const[departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  const {id} = useParams();

  function updateDepartment(id){
    navigate(`/edit-department/${id}`);
  }

  function addDepartment(){
    navigate('/add-department');
  }

  useEffect((()=> {
    getDepartments();
  }), [])


  function removeDepartment(id){
    //implement delete functionality
    deleteDepartment(id).then((response) => {
      getDepartments();
      toast.success('Department deleted successfully')
      console.log(response.data);
    }).catch(error => {
      console.error(error)
      toast.error('Failed to delete department: ' + (error?.message || 'Unknown error'))
    });
  } 

  function getDepartments(){
    listDepartments().then((response) => {
      setDepartments(response.data);
      console.log("Departments API Response >>>", response.data);
    }).catch(error => console.error(error));
  }
  return (
    <div className='container'>
      <h3 className='text-center'>List Of Departments</h3>
      <button className='btn btn-primary mb-2' onClick={addDepartment}>Add Department</button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Department Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {
            departments.length === 0 ? (
              <tr>
                <td colSpan={3} className='text-center text-danger'>No Records Found !!!</td>
              </tr>
            ) : (departments.map(department => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.departmentName}</td>
                <td>{department.departmentDescription}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                  <button style={{marginLeft: "10px"}} className='btn btn-danger' onClick={() => removeDepartment(department.id)}>Delete</button>
                </td>
              </tr>
             )))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListDepartmentComponent