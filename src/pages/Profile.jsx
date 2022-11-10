
import '../App.css'
import logo from '../assets/image/logo.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"

function Profile() {
    const navigate = useNavigate()
    const [userName, setUsername] = useState("");
    const [image, setImage] = useState();
    const [imgpath, setImgPath ] = useState("")
    const [email, setEmail] = useState("");
    var user = JSON.parse(localStorage.getItem('details'));

    const notify = () => {
        toast("Successfully updated please Login Again! ")
        window.localStorage.removeItem("details");
        window.localStorage.removeItem("auth_token");
        setTimeout(() => {
            navigate('/')
            window.location.reload()
        }, 3000)
    };

   const error =(err)=>{
           toast(err)
   }

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
        setImgPath(URL.createObjectURL(event.target.files[0]))
    };

    useEffect(() => {
        setUsername(user.username);
        setEmail(user.email)
    }, [])

    const handleSavechanges = (e) => {
        const formData = new FormData()
        e.preventDefault()
        console.log("working" ,image , user.id ,userName,email)
          if(!userName || !email){ 
            error("UserName && Email cannot be Empty")
          }else if(!/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(userName)) {
              error("invalid user Name ")
          }
          else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            error("Invalid Email address")
          }else if(!userName){
            error("Username cannot be empty")
          }
          else if (userName !== user.username || email !== user.email || image){
            formData.append('image', image);
            formData.append('username',userName);
            formData.append('email',email);
            formData.append('id', user.id);
                axios.post("http://localhost:8000/post",formData).then((success) => {
                    notify()
                    console.log(success)
                },
                    (err) => {
                        console.log(err)
                    }
                )
          }
     
    }

    // const imagehandler = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData()
    //     if (image && user.id)
    //     formData.append('image', image);
    //     formData.append('u_id', user.id);
    //         console.log("image handler ",formData)
    //     axios.post("http://localhost:8000/post",formData ).then(
    //         (success) => {
    //             toast("Successfully profile updated ! ")
    //             console.log(success);

    //         },
    //         (err) => {
    //             console.log(err)
    //         }
    //     )
    // }


    console.log(image,imgpath, "value of the image ")

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='container profile'>
                <div className="row  ">
                    <div className="col- 6 border border-secondary text-center teal-bg text-light ">
                        <div className='blogIcon'>
                            <img src={logo} width='100' />
                        </div>
                        <form>
                            <img src={(image)?imgpath :user.profile} className='round' />
                            <div className='mt-2'> {(image) ? <p>selected Succesfully</p> : <> <label htmlFor="upd"><i className="bi bi-upload mx-2"></i> Change Image</label>
                                <input type='file' id='upd' value={imgpath} onChange={changeHandler} style={{ display: "none" }} /> <br /></>}
                            </div>
                            <div className="details">
                            <div className='border border-1 p-3 '>
                                <h4> <div>UserName :</div>  <span className='mx-2'><input name='userName' value={userName} onChange={(e) => { setUsername(e.target.value) }} /></span></h4>
                                <h4><div> Email :</div>  <span className='mx-2'><input name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} /></span> </h4>
                                <button className='btn btn-primary' onClick={handleSavechanges}>Save Changes </button>
                            </div>
                        </div>
                        </form>
                        
                    </div>
                </div>
            </div>

        </>

    )
}

export default Profile


