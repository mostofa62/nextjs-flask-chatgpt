"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Formik, Form, Field, yupToFormErrors, validateYupSchema} from 'formik';
import userSchema from "./userSchema";
import { useRouter } from "next/navigation";


  const url = process.env.url;

  interface ContainerProps {
    children: React.ReactNode
  }
  
  const Container = ({ children }: ContainerProps) => (
    <div className="flex flex-col items-center justify-between bg-zinc-800 w-full py-10 px-4 rounded-xl h-fit">
      {children}
    </div>
  )
const PdfProcessList=()=> {
  const router = useRouter()
  const user={
    name:'',
    email:'',
    password:'',
  }

  const handleFormSubmit = async(values:any)=>{

    //console.log(values);

    await axios.post(`${url}user-create`, 
    values.user, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
) .then(function (response) {
  //console.log(response);
  if(response.data.userid){
    router.push('/admin/users');
  }
})
.catch(function (error) {
  //console.log(error);
});

}
 
  return (
    <DefaultLayout>
        <Container>
        <Formik
        initialValues={{ user }}
        /*validationSchema={userSchema}*/
        validateOnChange={false}
        validateOnBlur={false}
        validate={async (value) => {
          try {
            await validateYupSchema(value, userSchema, false, {'newentry':'1'});
          } catch (err) {
            return yupToFormErrors(err); //for rendering validation errors
          }
        
          return {};
        }}

        onSubmit={handleFormSubmit}

        render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(

      <Form >
        <div className="my-3">
                <label className="mb-1 block text-black dark:text-white">
                  Name
                </label>
      <Field 
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

      name="user.name" placeholder="name of person" />
      {errors.user &&
                                        
                                        errors.user.name &&
                                        touched.user &&
                                        
                                        touched.user.name && ( 
                                            <span className="mb-3 font-semibold text-[#B45454]">
                                                {errors.user.name}
                                            </span>   
                                        )}
</div>
<div className="my-3">
                <label className="mb-1 block text-black dark:text-white">
                  Email
                </label>
<Field 
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

type="email" name="user.email" placeholder="email of person" />
      {errors.user &&
                                        
                                        errors.user.email &&
                                        touched.user &&
                                        
                                        touched.user.email && ( 
                                            <span className="mb-3 font-semibold text-[#B45454]">
                                                {errors.user.email}
                                            </span>   
                                        )}
</div>
<div className="my-3">
                <label className="mb-1 block text-black dark:text-white">
                  Password
                </label>
<Field 
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

type="password" name="user.password" placeholder="password" />
      {errors.user &&
                                        
                                        errors.user.password &&
                                        touched.user &&
                                        
                                        touched.user.password && ( 
                                            <span className="mb-3 font-semibold text-[#B45454]">
                                                {errors.user.password}
                                            </span>   
                                        )}                                        
</div>
<div className="w-full my-5">
<button 
disabled={isSubmitting} type="submit"
 className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
  Save
</button>
                    </div>
                    {/*
                    <code>
                        <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                    </code>
                    <code>
                        <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                    </code>
                                        */}
      </Form>
        )}
      />
        </Container>    
    </DefaultLayout>
  )
}

export default PdfProcessList;