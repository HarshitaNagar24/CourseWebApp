import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };
        await axios.post("http://localhost:5001/user/login",userInfo).then((res)=>{
            console.log(res.data);
            if(res.data){
                toast.success("Login successfully");
                document.getElementById("my_modal_3").close();
                window.location.reload();
            }
            localStorage.setItem("User",JSON.stringify(res.data.user));
        }).catch((error)=>{
            console.log(error);
            toast.error("Error in Login" + error);
        })
      };
  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                
                <h3 className="font-bold text-lg">Login</h3>
                {/* email */}
                <div className='mt-4'>
                    <span>
                        Email: 
                    </span>
                    <br></br>
                    <input {...register("email", { required: true })} type="email" placeholder="Enter your Email" className="input  mt-4 input-bordered w-80 max-w px-3 py-1 rounded-md" ></input> 
                    <br></br> 
                    {errors.email && <span className='text-sm text-red-500'>*This field is required*</span>}  
                </div>
                
                {/* Password*/}
                <div className='mt-4'>
                    <span>
                        Password: 
                    </span>
                    <br></br>
                    <input {...register("password", { required: true })} type="password" placeholder="Enter your Password" className="input  mt-4 input-bordered w-80 max-w px-3 py-1 rounded-md" ></input> 
                    <br></br>  
                    {errors.password && <span className='text-sm text-red-500'>*This field is required*</span>} 
                </div>
                

                {/* button */}
                <div className='flex justify-right mt-4 '>
                    <button type='submit' className='bg-pink-500 text-white rounded-md px-3 py-2 mr-10 hover:bg-pink-800 duration-200'>Login</button>
                    <p>Not register ? <Link to={"/signup"} className='underline text-blue-400 cursor-pointer hover:text-blue-800 duration-200'>SignUp</Link></p>
                </div>
            </form>
            </div>
        </dialog>
      </div>
    </>
  )
}

export default Login
