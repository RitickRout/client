import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { useState } from 'react'
import ReactQuill from "react-quill";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const [page, setPage] = useState(0)
  const [data, setData] = useState("")
  let temp;
  const { cat } = useParams()
  const error =(err)=>{
    toast(err)
  }

  useEffect(
    () => {
      axios.get('http://localhost:8000/api/posts').then(
        (success) => {
          console.log(success)
          if (cat) {
            setPage(0)
            temp = success.data.filter((item) => {
              return item.Category === cat
            })
            setData(temp)
          } else {
            setData(success.data)

          }
        },
        (err) => {
          console.log(err)
        }
      )
    }
    , [cat]
  )

  const clickHandler = (condition) => {
    switch (condition) {
      case '+':
        if (page < data.length - 10) {
          setPage((prev) => (prev + 10))
        }else{
          error("Last Page cannot go Further Forward")
        }
        break;
      case '-':
        if (page >= 10) {
          setPage((prev) => (prev - 10))
        }else{
   
          error("First Page cannot go Further Backward")
        }
        break;
      default:
        break;
    }
  }
  if (data) {
    return (
     <>
          <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
      <div className='home'>
        <div className='posts mb-5'>
          {data.slice(0).reverse().slice(page, page + 10).map((item) => {
            return <div key={item.id} className='post'>
              <div className='img'>
                <img src={item.img} alt={item.id} />
                <div className='bg'></div>
              </div>
              <div className='content mt-4 justify-content-between mx-2'>
                <p className='fs-3 teal-text'>{item.title}</p>
                <p className='fs-4 blu text-lowercase'>  <ReactQuill 
                  value={item.description.trim()}
                  readOnly={true}
                  theme={"bubble"}
                /></p>
                <p>Category : <span className='text-danger mx-2'><Link to={"/"+item.Category}> {item.Category}</Link>  </span> </p>
                <Link to={`post/${item.id}`}><button>Read more...</button>    </Link>
                <hr />
              </div>
            </div>
          })}
          <div className="buttons container mb-4 ">
            <button className='w-25 btn' onClick={() => (clickHandler("-"))}>Prev..</button>
            <span>PageNo : {(page / 10) + 1} </span>
            <button className='w-25 btn' onClick={() => (clickHandler("+"))}>Next..</button>
          </div>
          <div>

          </div>

        </div>
      </div>
     </>
    )
  } else {
    return <div className='position-absolute top-50 end-50'>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  }


}

export default Home