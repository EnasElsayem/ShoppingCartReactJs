import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as Yup from 'yup'
export default function Login({ saveUserData }) {

  let [errMsg, setErrMsg] = useState("")
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  let baseUrl = "https://route-ecommerce.onrender.com"
  let validationSchema = Yup.object({
    email: Yup.string().email("enter Valid Email").required(),
    password: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{3,16}$/, "enter valid Password"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      sendDataLogin(values)
    },
    validationSchema,
  })


  async function sendDataLogin(objData) {
    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, objData).catch((error) => {
      setErrMsg(error.response.data.message)
      console.log(error.response.data.message);
      setLoading(false)
    })
    console.log(data);
    setLoading(false)
    if (data.message == 'success') {
      // login
      // data.user
      localStorage.setItem("token", data.token)
      saveUserData(data.user)
      navigate('/home')
    }
  }


  return (
    <div>
      <h2>Login Now:</h2>
      <form onSubmit={formik.handleSubmit}>

        <div className='my-3'>
          <label htmlFor='email'>email</label>
          <input onChange={formik.handleChange} type="email" name="email" id="email" className='form-control' />
          <p className='text-danger'>{formik.errors.email}</p>
        </div>
        <div className='my-3'>
          <label htmlFor='password'>password</label>
          <input onChange={formik.handleChange} type="password" name="password" id="password" className='form-control' />
          <p className='text-danger'>{formik.errors.password}</p>
        </div>

        {errMsg != "" ? <div className='alert alert-danger'>
          {errMsg}
        </div> : ""}

        <Link to="/ForgetPassword">Forget Password ?</Link>
        <br />
        {loading ? <button type='button' className='btn btn-success'>
          <i className='fa-solid fa-spinner fa-spin text-white'></i>
        </button> : <button disabled={!formik.isValid} type='submit' className='btn btn-success'>Login</button>}


      </form>
    </div>
  )
}
