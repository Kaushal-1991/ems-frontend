import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import ListDepartmentComponent from './components/ListDepartmentComponent';
import DepartmentComponent from './components/DepartmentComponent';

function App() {
 

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
           <Routes>
              <Route path='/' element={<ListEmployeeComponent/>}></Route>
              <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
              <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
              <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
              <Route path='/departments' element={<ListDepartmentComponent/>}></Route>
              <Route path='/add-department' element={<DepartmentComponent/>}></Route>
              <Route path='/edit-department/:id' element={<DepartmentComponent/>}></Route>
           </Routes>
        <FooterComponent />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  )
}

export default App
