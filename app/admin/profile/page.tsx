"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Formik, Form, Field} from 'formik';
import userSchema from "@/app/admin/users/create/userSchema";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";


const url = process.env.url;

  
const PdfProcessList=()=> {
  
  const authCtx = useAuth();
  const router = useRouter();

  const [userdata,setUserdata] = useState({
    name:'',
    email:'',
    password:'',
  });

  
  const id = authCtx.userId;
  const fetchUser=async()=>{
    //console.log(id);
    const response = await axios.get(`${url}users/${id}`);
    //return response.data.user;
    setUserdata({id,...response.data.user});
  };
  useEffect(()=>{
    fetchUser();
  
  },[]);
  const user =userdata;
  user.password = '';
  //console.log(user)

  const handleFormSubmit = async(values:any)=>{

    //console.log(values);

    await axios.post(`${url}user-create/${id}`, 
    values.user, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
) .then(function (response) {
  //console.log(response);
  if(response.data.user){
    authCtx.selectedName(response.data.user.name);
    router.push('/admin/profile');
  }
})
.catch(function (error) {
  //console.log(error);
});

}
 
  return (
    <DefaultLayout>
        <div className="flex md:mt-5">
    <div className="md:w-2/12"></div>
    <div className="md:w-8/12 sm:w-full">

        <Formik
        initialValues={{ user }}
        enableReinitialize
        validationSchema={userSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleFormSubmit}

        render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(

      <Form >
        <div>
                <label className="mb-3 block text-black dark:text-white">
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
                <label className="mb-3 block text-black dark:text-white">
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
                <label className="mb-3 block text-black dark:text-white">
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
 className="flex w-full justify-center rounded bg-[#f1e56c] p-3 font-medium text-black">
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
        </div>
        </div>
        
    </DefaultLayout>
  )
}

export default PdfProcessList;