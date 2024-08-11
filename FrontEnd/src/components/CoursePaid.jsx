import React, { useEffect, useState } from 'react'
import Card from './Card';
// import list from "../../public/list.json";
import axios from "axios";

const CoursePaid = () => {
  const [book, setBook] = useState([]);
  useEffect(()=>{
    const getBook = async ()=>{
      try {
        const res =  await axios.get("http://localhost:5001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  },[]);
  return (
    <>
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28'>
            <div className=' items-center justify-center text-center'>
                <h1 className='text-2xl font-semibold md:text-4xl py-10'>Some Paid Courses</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quae minus praesentium at, repellat libero. Modi, qui, temporibus odio molestias quisquam ea quia quasi dolorem, incidunt perferendis laboriosam deserunt voluptate!</p>
            </div>

            <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
                {
                   book.map((item)=>(
                        <Card key={item.id} item={item}></Card>
                   ))
                }
            </div>

        </div>
    </>
  )
}

export default CoursePaid;
