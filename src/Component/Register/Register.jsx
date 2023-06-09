import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
  let [errMsg, setErrMsg] = useState("")
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  // let baseUrl = "https://route-ecommerce.onrender.com"
  let baseUrl = "https://route-ecommerce-app.vercel.app/api/v1/signup"

  let validationSchema = Yup.object({
    name: Yup.string().required().min(2, "min char 2").max(10, "max char 10"),
    email: Yup.string().email("enter Valid Email").required(),
    phone: Yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/, "enter Valid Phone"),
    password: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{3,16}$/, "enter valid Password"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "Re password not Match")
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
    onSubmit: (values) => {
      sendDataRegister(values)
    },
    validationSchema,
  })
  async function sendDataRegister(objData) {
    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, objData).catch((error) => {
      setErrMsg(error.response.data.errors.msg)
      setLoading(false)
    })
    console.log(data);
    setLoading(false)
    if (data.message == 'success') {
      // login
      navigate('/login')
    }
  }
  return (
    <div>
      <h2>Register Now:</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='my-3'>
          <label htmlFor='name'>name</label>
          <input onChange={formik.handleChange} type="text" name="name" id="name" className='form-control' />

          <p className='text-danger'>{formik.errors.name}</p>
        </div>
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
        <div className='my-3'>
          <label htmlFor='rePassword'>rePassword</label>
          <input onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className='form-control' />
          <p className='text-danger'>{formik.errors.rePassword}</p>
        </div>
        <div className='my-3'>
          <label htmlFor='phone'>phone</label>
          <input onChange={formik.handleChange} type="text" name="phone" id="phone" className='form-control' />
          <p className='text-danger'>{formik.errors.phone}</p>
        </div>
        {errMsg != "" ? <div className='alert alert-danger'>
          {errMsg}
        </div> : ""}
        {loading ? 
        <button type='button' className='btn btn-success'>
          <i className='fa-solid fa-spinner fa-spin text-white'></i>
        </button>
         :
          <button disabled={!formik.isValid} type='submit' className='btn btn-success'>Register</button>
          }


      </form>
    </div>
  )
}
