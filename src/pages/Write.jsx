import React, { useState } from 'react';

import '../App.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Write = () => {

  const notify = (msg) => { toast(msg) }
  const [value, setValue] = useState("");
  const [cat, setCat] = useState("");
  const [title, setTitle] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [error, setError] = useState({ value: 0, cat: 0, title: 0, imagelink: 0 })
  let { id } = useParams();
  let user = JSON.parse(localStorage.getItem('details'));
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      axios.post("http://localhost:8000/api/posts/fetchsinglepost", { id }).then(
        (success) => {
          console.log("the post to be edited ", success.data[0]);
          setValue(success.data[0].description);
          setCat(success.data[0].Category);
          setTitle(success.data[0].title);
          setimagelink(success.data[0].img);
        }, (err) => {
          console.log(err)
        }
      )
    } else {
      setValue("");
      setCat("");
      setTitle("");
      setimagelink("");
    }
  }, [id])

  const handleUpdate = () => {
    if (id) {
      if ((value.trim().length <150 || cat.trim() === "" || title.trim().length <12 || imagelink.trim() === "")) {
        if (!value.trim()) {
          notify("Description cannot be empty ")
        }
        else if (value.trim().length < 150) {
          notify("Description cannot be less than 150 words ")
        }
        if (!cat.trim()) {
          notify("Please select the Category")
        } if (title.trim().length < 12) {
          notify("title cannot be less than 12 words ")
        } if (!imagelink.trim()) {
          notify("image link is required")
        }
      } else  axios.post("http://localhost:8000/api/posts/edit", {
        "id": id,
        "img": imagelink,
        "title": title,
        "description": value,
        "Category": cat
      }).then(success => navigate(`/post/${id}`), err => console.log(err))
    }
  }
  const handlePost = () => {
    console.log(value, cat, title, imagelink, user.id)

    if (value.trim() === "" || cat.trim() === "" || title.trim() === "" || imagelink.trim() === "" ||value.trim().length <150 ||title.trim().length <12) {

      if (!value) {
        notify("Description cannot be Empty")
      } else if (value.trim().length < 150) {
        notify("Description should be 150 or more ")
      }
      if (!cat.trim()) {
        notify("Please select the Category")
      } if (!title.trim()) {
        notify("title cannot be empty")
      } else if (title.trim().length < 12) {
        notify("title length should be 12 or more")
      }

      if (!imagelink.trim()) {
        notify("image link is required")
      }
    } else {
      axios.post("http://localhost:8000/api/posts/postBlog", {
        "uid": user.id,
        "img": imagelink.trim(),
        "title": title.trim(),
        "description": value.trim(),
        "category": cat
      }).then((success) => {
        console.log(success);
        navigate('/');

      },
        (err) => {
          console.log(err)
        }
      )
    }

  }

  console.log("the input values ", value, title)


  return (
    <div className="add">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="content">
        <label className='h3'>Title<span className='text-danger'>*</span>:</label>
        <input type='text' placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <label className='h3'>ImageLink<span className='text-danger'>*</span>:</label>
        <input placeholder='imageLink' value={imagelink} onChange={(e) => { setimagelink(e.target.value) }} />
        <label className='h3'>Description<span className='text-danger'>*</span>:</label>

        <ReactQuill theme="snow" value={value} onChange={setValue} className="des" />;


        {/* {(id)?<textarea type='text' placeholder='Description' className='desc' value={value}  onChange={(e)=>{setValue(e.target.value)}} />:
      <Editor editorState={value} onChange={setValue} />
     }  */}
      </div>
      <div className="menu">
        <div className="item justify-content-around">
          {/* <h3>Publish</h3>
      <span>
        <b>status:</b>
      </span> 
      <span>
        <b>visiblity:</b>public
      </span> */}
          {/* <input type='file' id='file' style={{display:"none"}} />
<label htmlFor="file" className='upload'><i class="bi bi-upload"></i> <span >Upload</span></label> */}
          {(id) ? <div className="buttons mt-4">
            <button className='w-100 ' onClick={handleUpdate} >Update</button>
          </div> : <div className="buttons mb-4">
            <button className='w-100' onClick={handlePost}>Post</button>
          </div>}

        </div>
        <div className="item">
          <h4 className='mx-2'>Category<span className='text-danger'>*</span></h4>
          <div className="cat">
            <input type="radio" name='cat' value='Art' id='Art' checked={cat === "Art"} onChange={(e) => setCat(e.target.value)} />
            <label className='mx-2' htmlFor='Art'>Art</label></div>
          <div className="cat">
            <input type="radio" name='cat' value='Science' id='Science' checked={cat === "Science"} onChange={(e) => setCat(e.target.value)} />
            <label className='mx-2' htmlFor='Science'>Science</label></div>
          <div className="cat">
            <input type="radio" name='cat' value='Technology' id='Technology' checked={cat === "Technology"} onChange={(e) => setCat(e.target.value)} />
            <label className='mx-2' htmlFor='Technology'>Technology</label></div>
          <div className="cat">
            <input type="radio" name='cat' value='Design' id='Design' checked={cat === "Design"} onChange={(e) => setCat(e.target.value)} />
            <label className='mx-2' htmlFor='Design'>Design</label></div>
          <div className="cat">
            <input type="radio" name='cat' value='Food' id='Food' checked={cat === "Food"} onChange={(e) => setCat(e.target.value)} />
            <label className='mx-2' htmlFor='Food'>Food</label></div>
        </div>
      </div>
    </div>
  )
}

export default Write