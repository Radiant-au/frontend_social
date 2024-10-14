import React , {useState} from 'react'
import { Formik , Form , Field , ErrorMessage , validateYupSchema} from 'formik'
import * as Yup from "yup"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye , faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from 'react-redux'
import {registerAction} from "../../redux/actions/registerAction"
  
const initialValues = {username: "" , email:"" , password:"" , confirmPassword:"" , gender:"" };
const validationSchema = {email:Yup.string().email("Invalid email").required("Email is required"),
                          password:Yup.string()
                          .min(6 , "Password must be at least 6 characters")
                          .required("Password is Required")
};

export default function Signup() {

  const [showPassword, setShowPassword] = useState({
    password1: false,
    password2: false,
  });
  const dispatch = useDispatch();

  // Toggling function to handle both fields
  const IconClick = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field], // toggle the specific field
    }));
  };
 
    const handleSubmit = (values) =>{
        console.log("Submitting" , values);
        dispatch(registerAction(values));
    }

  return (
    <>
            <h2 className="font-poppins font-bold text-2xl text-[#4527a5] text-center">Register</h2>
            

            <Formik initialValues={initialValues} /*validationSchema={validationSchema}*/ onSubmit={handleSubmit}>
                <Form className="flex flex-col gap-3">
                  <Field className="p-2 mt-3 rounded-xl border" type="text" name="username" placeholder="Your name"/>
                  <ErrorMessage name='name' component="div" className='text-red-500'/>

                    <Field className="p-2 mt-3 rounded-xl border" type="email" name="email" placeholder="Your email"/>
                    <ErrorMessage name='email' component="div" className='text-red-500'/>

                    <div className="relative">
                      <Field className="p-2 mt-3 rounded-xl border w-full" type={showPassword.password1 ? "text" : "password"} name="password" placeholder="Your password"/>
                      <ErrorMessage name='password' component="div" className='text-red-500'/>
                      
                      <FontAwesomeIcon icon={showPassword.password1 ? faEyeSlash : faEye } className='absolute top-5 right-4 translate-y-1/2 text-gray-500 text-sm cursor-pointer' onClick={() => IconClick("password1")} />
                    </div>

                    <div className="relative">
                      <Field className="p-2 mt-3 rounded-xl border w-full" type={showPassword.password2 ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password"/>
                      <ErrorMessage name='confirmPassword' component="div" className='text-red-500'/>
                      
                      <FontAwesomeIcon icon={showPassword.password2 ? faEyeSlash : faEye} className='absolute top-5 right-4 translate-y-1/2 text-gray-500 text-sm cursor-pointer' onClick={() => IconClick("password2")} />
                    </div>
                  <div className="flex items-center gap-4 my-3">
                    <div className="flex items-center ps-2 border w-1/2 border-gray-300 rounded">
                        <Field id="male" type="radio" value="Male" name="gender" className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300"/>
                        <label htmlFor="male" className="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900">Male</label>
                    </div>
                    <div className="flex items-center ps-2 w-1/2 border border-gray-300 rounded">
                        <Field id="female" type="radio" value="Female" name="gender" className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300"/>
                        <label htmlFor="female" className="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900">Female</label>
                    </div>
                  </div>

                <button type='submit' className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-400 hover:to-blue-300 font-semibold  px-4 rounded-xl text-white py-2">Register</button>
                </Form>
            </Formik>
    </>
  )
}
