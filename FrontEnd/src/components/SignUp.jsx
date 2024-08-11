import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

const SignUp = () => {

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
        };
        await axios.post("http://localhost:5001/user/signup",userInfo).then((res)=>{
            console.log(res.data);
            if(res.data){
                toast.success("User created successfully");
                navigate(from, {replace: true});
            }
            localStorage.setItem("User",JSON.stringify(res.data.user));
        }).catch((error)=>{
            console.log(error);
            toast.error("Error in signup" + error);
        })
      };
  return (
    <>
      <div className='flex h-screen justify-center items-center'>
            <div id="" className="w-[600px]">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}  method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Link to={"/"} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                    
                    <h3 className="font-bold text-lg">Create an Account</h3>

                    {/* UserName */}
                    <div className='mt-4'>
                        <span>
                            UserName: 
                        </span>
                        <br></br>
                        <input {...register("fullname", { required: true })} type="fullname" placeholder="Enter Full Name" className="input  mt-4 input-bordered w-80 max-w px-3 py-1 rounded-md"></input>  
                        <br></br> 
                        {errors.fullname && <span className='text-sm text-red-500'>*This field is required*</span>}    
                    </div>
                        
                    {/* email */}
                    <div className='mt-4'>
                        <span>
                            Email: 
                        </span>
                        <br></br>
                        <input {...register("email", { required: true })} type="email" placeholder="Enter your Email" className="input  mt-4 input-bordered w-80 max-w px-3 py-1 rounded-md"></input>    
                        <br></br> 
                        {errors.email && <span className='text-sm text-red-500'>*This field is required*</span>}  
                    </div>
                        
                    {/* Password*/}
                    <div className='mt-4'>
                        <span>
                            Password: 
                        </span>
                        <br></br>
                        <input {...register("password", { required: true })} type="password" placeholder="Enter your Password" className="input  mt-4 input-bordered w-80 max-w px-3 py-1 rounded-md"></input>    
                        <br></br> 
                        {errors.email && <span className='text-sm text-red-500'>*This field is required*</span>}  
                    </div>
                        

                    {/* button */}
                    <div className='flex justify-right mt-4 '>
                        <button className='bg-pink-500 text-white rounded-md px-3 py-2 mr-10 hover:bg-pink-800 duration-200'>SignUp</button>
                        <p className='text-md'>Already have an account? 
                            <button className='underline text-blue-400 cursor-pointer hover:text-blue-800 duration-200'
                            onClick={()=> document.getElementById("my_modal_3").showModal()}
                            >Login</button>
                            <Login></Login>
                        </p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp
