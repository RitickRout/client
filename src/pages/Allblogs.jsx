import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import "../App.css"
import {useNavigate,Link} from 'react-router-dom'
function Allblogs() {
    var user = JSON.parse(localStorage.getItem('details'));
    var id = user.id;
    let navigate =useNavigate();
    const [posts, setposts] = useState("")

useEffect(() => {
    axios.post("http://localhost:8000/api/posts/allblogs",{id}).then(
        (success)=>{
           setposts(success.data)
           console.log(success , "success data ")
        },
        (err)=>{
          console.log(err)
        }
    )
}, [])

const handleClick = (ind) => {
  navigate(`/post/${ind}`)
  // refresh((prev)=>!prev)
}


  return (
    <>
       <h1>My Blogs</h1>
       {(!posts.length)? <>
        <h3>No Posts Yet ! Add a post Now <Link to='/write'>Click here </Link></h3>
       
       </> : 
       <>
         {(posts) && (posts).map((item) => (
            <div className="Post" style={{"height":"350px"}} key={item.id}>
              <img src={item.img} alt="" />
              <h4>{item.title}</h4>
              <button onClick={() => { handleClick(item.id) }}>Click to see the post</button>
            </div>
          ))}
       </>
       }
    
    </>
    

    
  )
}

export default Allblogs