import React, { useState } from 'react'
import { Formik , Form , Field , ErrorMessage , validateYupSchema} from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux';
import { loginAction } from "../../redux/actions/loginAction"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const initialValues = {email:"" , password:""};
const validationSchema = {email:Yup.string().email("Invalid email").required("Email is required"),
                          password:Yup.string()
                          .min(6 , "Password must be at least 6 characters")
                          .required("Password is Required")
};
export default function Login() {
    const dispatch = useDispatch();
    const [showPassword , setShowPassword ] = useState(false);
    
    const handleSubmit = (values) =>{
        console.log("Submitting" , values);
        dispatch(loginAction(values));
    }

    const IconClick = () => {
      showPassword ? setShowPassword(false) : setShowPassword(true);
    }

  return (
    <>
            <h2 className="font-poppins font-bold text-2xl text-[#4527a5] text-center">Login</h2>
            <p className="font-poppins text-sm mt-7 text-[#6c57b1] text-opacity-70 text-center">If you already a member, easily log in</p>

            <Formik initialValues={initialValues} /*validationSchema={validationSchema}*/ onSubmit={handleSubmit}>
                <Form className="flex flex-col gap-4">
                    <Field className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Your email"/>
                    <ErrorMessage name='email' component={"div"} className='text-red-500'/>

                    <div className="relative">
                      <Field className="p-2 mt-8 mb-4 rounded-xl border w-full" type={showPassword ? "text" : "password"} name="password" placeholder="Your password"/>
                      <ErrorMessage name='password' component={"div"} className='text-red-500'/>
                      
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye } className='absolute top-10 right-4 translate-y-1/2 text-gray-500 text-sm cursor-pointer' onClick={() => IconClick()} />
                    </div>

                <button type='submit' className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-400 hover:to-blue-300 font-semibold  px-4 rounded-xl text-white py-2">Login</button>
                </Form>
            </Formik>
    </>
  )
}
