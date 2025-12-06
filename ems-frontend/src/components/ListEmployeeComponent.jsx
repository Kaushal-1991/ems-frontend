import React, { useState,useEffect } from 'react'
import { deleteEmployee, listEmployess } from '../services/EmployeeServices';
import { useNavigate, useParams, useResolvedPath } from 'react-router-dom';

const ListEmployeeComponent = () => {
    
    /*const dummyData = [
        
        {
            "id":1,
            "firstName" : "Kaushal Raj",
            "lastName" : "Singh",
            "email" : "rajkaushal02@gmail.com"
        },{
            "id":2,
            "firstName" : "Tushar Raj",
            "lastName" : "Singh",
            "email" : "tushar@gmail.com"
        },{
            "id":3,
            "firstName" : "Yuvraj",
            "lastName" : "Singh",
            "email" : "yuvraj@gmail.com"
        }

    ]; */


    const [employees,setEmployee] = useState([]);

    const navigater = useNavigate();

   const getEmployees = () => {
        listEmployess()
            .then(response => {
                console.log("API Response >>>", response.data);
                setEmployee(response.data);
            })
            .catch(error => console.error(error));
    };
    

    useEffect(() => {
      getEmployees();
    },[]);
        

   const {id} = useParams();

    function removeEmployee(id){
        deleteEmployee(id).then(response => {
            getEmployees();
            console.log(response.data);
        });
    }

    function addEmployee(){
        navigater('/add-employee')
    }

    function updateEmployee(id){
        navigater(`/edit-employee/${id}`);
    }
    
    return (
        <div className='container'> 
           <h3 className='text-center'>List Of Employee</h3>
           <button className='btn btn-primary mb-2' onClick={addEmployee}>Add Employee</button>
           <table className='table table-striped table-bordered'>
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
                {employees.length === 0 ? (
                    <tr><td colSpan="5" className="text-center text-danger">No Record Found !!!</td></tr>
                ) : (employees.map(employee => (
                    <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                        <button className='btn btn-danger' style={{marginLeft:"5px"}} onClick={() => removeEmployee(employee.id)}>Delete</button>
                    </td>
                    </tr>
                )))}
                </tbody>
           </table>
        </div>
    )
}

export default ListEmployeeComponent