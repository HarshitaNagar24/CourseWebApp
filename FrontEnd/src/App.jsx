import react from 'react'
import Home from './home/Home'
import { Routes,Route, Navigate } from 'react-router-dom';
import Courses from './course/Courses';
import SignUp from './components/SignUp';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../src/Context/AuthProvider";

function App() {
  const [authUser,setAuthUser] = useAuth();
  console.log(authUser);
  return (
      <>
        <div className='dark:bg-slate-900 dark:text-white'>
          <Routes>
            <Route path="/" element={<Home></Home>}  />
            <Route path="/course" element={authUser?<Courses></Courses>: <Navigate to={"/signup"}/>}/>
            <Route path="/signup" element={<SignUp></SignUp>}  />
          </Routes>
          <Toaster/>
        </div>
      </>
  )
}

export default App
