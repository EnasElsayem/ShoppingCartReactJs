import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ResetPassword() {
    let navigate = useNavigate()
    let baseUrl = "https://route-ecommerce.onrender.com"
    let validationSchema = Yup.object({
        email: Yup.string().email("enter Valid Email").required(),
        newPassword: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{3,16}$/, "enter valid Password"),
    })
    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        onSubmit: (values) => {
            resetPasswordApi(values)
        },
        validationSchema,
    })

    async function resetPasswordApi(objData) {
        let { data } = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, objData)
        console.log(data);
        if (data.token) {
            navigate("/login")
        }
    }
    return (
        <form onSubmit={formik.handleSubmit}>

            <div className='my-3'>
                <label htmlFor='email'>email</label>
                <input onChange={formik.handleChange} type="email" name="email" id="email" className='form-control' />
                <p className='text-danger'>{formik.errors.email}</p>
            </div>
            <div className='my-3'>
                <label htmlFor='newPassword'>newPassword</label>
                <input onChange={formik.handleChange} type="password" name="newPassword" id="newPassword" className='form-control' />
                <p className='text-danger'>{formik.errors.newPassword}</p>
            </div>

            <button className='btn btn-success'>Update Password</button>
        </form>
    )
}
