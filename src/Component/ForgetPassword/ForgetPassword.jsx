import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
    let baseUrl = "https://route-ecommerce.onrender.com"
    let [CodeFlag, setCode] = useState(true)
    let [errorMsg, seterrorMsg] = useState("")
    let navg = useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().required().email("enter valid Email")
    })
    let Form1 = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: (vals) => {
            console.log(vals);
            forgotPasswordsApi(vals)
        },
        validationSchema
    })
    let Form2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: (vals) => {
            console.log(vals);
            resetCodeApi(vals)
        }
    })

    async function forgotPasswordsApi(valobj) {
        let { data } = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, valobj)
        console.log(data);
        if (data.statusMsg == "success") {
            setCode(false)
        }
    }
    async function resetCodeApi(valobj) {
        let { data } = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, valobj).catch((erro) => {
            seterrorMsg(erro.response.data.message)
        })
        if (data.status == "Success") {
            // Reset
            navg('/resetPassword')

        }
    }
    return (
        <div>

            {CodeFlag ? <form onSubmit={Form1.handleSubmit}>

                <div>
                    <label htmlFor="email">email</label>
                    <input onChange={Form1.handleChange} type="email" name='email' id="email" className='form-control' />

                    <p className='text-danger'>{Form1.errors.email}</p>
                </div>
                <button className='btn btn-success'>send Message</button>
            </form> :
                <form onSubmit={Form2.handleSubmit} >

                    <div>
                        <label htmlFor="resetCode">reset Code</label>
                        <input onChange={Form2.handleChange} type="text" name='resetCode' id="resetCode" className='form-control' />
                    </div>
                    {errorMsg != "" ? <div className='alert alert-danger'>{errorMsg}</div> : ""}
                    <button className='btn btn-success'>verify Code</button>
                </form>
            }


        </div>
    )
}
