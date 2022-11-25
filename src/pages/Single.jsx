import {React,useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import Menu from '../components/Menu'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import ReactQuill from 'react-quill';

const Single = () => {
  var user = JSON.parse(localStorage.getItem('details')) || "";
  var token = window.localStorage.getItem("auth_token");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const [data,setData]=useState("");
  const [comments ,setComments] = useState("");
  const [inp,setInp]=useState("");
   var navigate = useNavigate()
  var time ,splitarr,date;

  let {id } = useParams();
  const [refresh, setRefresh] = useState(false)
  function fetch(){
    axios.post('http://localhost:8000/api/users',{id},{headers:headers}).then(
      (success)=>{
      //  console.log(success.data , "inside single ")
        setData(success.data)
        axios.post('http://localhost:8000/api/posts/comments',{id}).then(
          (data)=>{
              // console.log(data ,"users comments ")
               setComments(data.data)
          },
          (err)=>{
            console.log(err)
          }
        )
      },
        (err)=>{
          console.log(err)   }
    )
   }

  useEffect(()=>{
    fetch();
  },[refresh])
 

 const handleComment =()=>{
  if(inp.trim())
  axios.post("http://localhost:8000/api/posts/postcomment" ,{pid:id , uid:user.id,comment:inp},{headers:headers}).then(
    (sucecss)=>{
      console.log("success",sucecss)
      setInp("")
      setRefresh((prev)=>!prev)
    },
    (err)=>{
      console.log(err)
    }
  )
 }

const deleteHandler =()=>{
  console.log("clicked delete" );
  axios.post("http://localhost:8000/api/posts/delete",{id},{headers:headers}).then(
    (success)=>{
      console.log("success ", success)
      navigate('/allblogs')
    },
    (err)=>{
      console.log(err , "error")
    }
  )
}

//console.log(comments , "coments ")

if(data.length){
  return (
    <div className='single'>
      <>
  {/* Modal */}
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
           Are you sure you want to delete this Post
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">Title : {data[0].title}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</>

      <div className="content w-75">
       <img src={data[0].img} alt='img-missing' />
        <div className="user">
        <img src={data[0].profile} alt='user-img-missing' />
          <div className="info">
            <span> UserName :<span className='text-info'> {data[0].username}</span> </span>
             <p>
             Category : <span className='text-danger'>{data[0].Category}</span>
             </p>
             
          </div>
          <div className="edit">
            {(data[0].username === user.username)?
            <>
             <Link to={`/write/${id}`}>
            <i className="bi bi-pencil-square"></i>
            </Link>
            
<i className="bi bi-trash3 btn-danger"  data-bs-toggle="modal"
  data-bs-target="#exampleModal" ></i>

      
            </>:
            <>
            </>}
          </div>
        </div>
         <h2 className='green'>{data[0].title}</h2>
         <p className='h4 descrip text-lowercase'>
         <ReactQuill 
                  value={data[0].description}
                  readOnly={true}
                  theme={"bubble"}
                />
         </p>
          <div  className=''> 
          {(user)?<>
            <input  placeholder='comments' type="text" value={inp}   onChange={(e)=>{setInp(e.target.value)}}   className='w-100 p-2 mt-4'/>
               <div className='btn btn-primary mt-2'  onClick={handleComment} > Leave a Comment</div></>:<></>}
               <h3>Leave a Reply {(user)?<></>:<span><Link to='/login'>login here</Link></span>} </h3>
      { 
        (comments)?<div>{comments.slice(0).reverse().map((item)=>{

          
       time = item.createdAt;
      splitarr = time.split('T');
      time  = splitarr[1].split('.')[0]
       date = splitarr[0]
     
     return <div className="cmt my-3">
     <div className="comment-box">
       <div className="user-box">
         <img src={item.profile} />
         <p className='h5 '> {item.username}</p>
       </div>
       <div className="comment">
         <p>{item.comment}</p>
         <small>  Date :{date}  </small>
         </div>
     </div>
   </div>
        })} </div>:<p></p>
      }
 
          </div>

      </div>
      <div className="menu w-25">
        <Menu category={data[0].Category} refresh={setRefresh} />
        </div>
    </div>
  )
}else{
  return <>
  <div className='position-absolute top-50 end-50'>
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
  </>
}

}

export default Single