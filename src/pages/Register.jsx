import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  })
  const [err, setError] = useState(null)
  const navigate = useNavigate()
  const notify = () => {
    toast("Successfully Registered please Login! ");
  }

  const regExvalidation = (event) => {
    if (event.target.name === 'username') {

      if (!/^[A-Za-z]/.test(event.target.value))
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: `${event.target.name}  should start with an alphabet, ` }))
      else if (!/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(event.target.value)) {
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: `${event.target.name} can have alphabets, numbers or an underscore length should be 8-29` }))
      } else {
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: `` }))
      }

    }
    if (event.target.name === 'email') {
      console.log(values.email)
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: `Invalid ${event.target.name} please enter valid Email ` }))
      } else {
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: '' }))
      }
      if (event.target.value.length >= 50) {
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: `Length should not be greater than 50` }))
      }
    }

    if (event.target.name === 'password') {
      if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/.test(event.target.value)) {
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: ` ${event.target.name} should contain 1 special character 1 alphabet and 1 number with atleast 6 characters  ` }))
      } else {
        setValues((prev) => ({ ...prev, [event.target.name + 'Error']: `` }))
      }
    }
  }
  let validate = (selecteditem) => {
    if (!(selecteditem.target.value)) {
      
      setValues((prev) => ({ ...prev, [selecteditem.target.name + 'Error']: `Please Enter ${selecteditem.target.name} it Cannot be empty` }))

    }
  }

  const handleChange = async e => {
    setError("")
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }))
    regExvalidation(e)
  }

  const removeError = (event) => {
    if (event.target.value === '')
      setValues((prev) => ({ ...prev, [event.target.name + 'Error']: "" }));
  }



  const handleSubmit = async e => {
    if (values.username === '')setValues((prev) => ({ ...prev, [ 'usernameError']: "Please Enter username it Cannot be empty" }))

    if (values.email === '')setValues((prev) => ({ ...prev, [ 'emailError']: "Please Enter username it Cannot be empty" }))

    if (values.password === '')setValues((prev) => ({ ...prev, [ 'passwordError']: "Please Enter username it Cannot be empty" }))

    e.preventDefault();
    if (values.username && values.email && values.password) {
      if (values.usernameError === '' && values.emailError === '' && values.passwordError === '')
        try {
          await axios.post("http://localhost:8000/api/auth/register", values)
          notify()
          setTimeout(()=>{
            navigate('/login')
          },1000)
        } catch (err) {
          console.log(err)
          setError(err.response.data)
        }
    }

  }

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
      <div className='container '>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-5 border border-primary teal-bg p-5 rounded-3">
            <h1 className='text-center'>Register</h1>
            <form >
              <div className="form-group">
                <label className="form-label mt-4">Username <span className='text-light dark h5 '>*</span></label>
                <input type="text" className="form-control" placeholder="Username" name='username' onChange={handleChange} onBlur={(e) => { validate(e) }} onFocus={removeError} />
                {(values.usernameError) ? <div className='text-light dark  '> {values.usernameError}</div> : <br />}
              </div>

              <div className="form-group">
                <label className="form-label mt-4">Email address <span className='text-light dark h5'>*</span></label>
                <input type="email" className="form-control" placeholder="Enter email" name='email' onChange={handleChange} onBlur={(e) => { validate(e) }} onFocus={removeError} />
                <small className="form-text text-light ">We'll never share your email with anyone else.</small><br />
                {(values.emailError) ? <div className='text-light dark '>{values.emailError}</div> : <br />}
              </div>

              <div className="form-group">
                <label className="form-label mt-4">Password <span className='text-light dark h5'>*</span></label>
                <input type="password" className="form-control" name='password' placeholder="Password" autoComplete='on' onChange={handleChange} onBlur={(e) => { validate(e) }} onFocus={removeError} />
                {(values.passwordError) ? <div className='text-light dark '>{values.passwordError}</div> : <br />}
              </div>

              <div className='form-group mt-2'>
                <button className='btn btn-primary' onClick={handleSubmit}>Register</button>
              </div>
              <div>
                {err && <span className='text-light dark'>{err}</span>}

              </div>
              <p> Already Registered <Link to='/login' className='mx-2 text-light'> Login here </Link>  </p>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  )
}

export default Register 