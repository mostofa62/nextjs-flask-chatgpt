"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Formik, Form, Field} from 'formik';
import userSchema from "../userSchema";
import { useRouter } from "next/navigation";


const url = process.env.url;

  interface ContainerProps {
    children: React.ReactNode
  }
  
  const Container = ({ children }: ContainerProps) => (
    <div className="flex flex-col items-center justify-between gap-4 min-h-60 bg-zinc-800 w-full max-w-2xl py-10 px-4 rounded-xl h-fit">
      {children}
    </div>
  )
const PdfProcessList=({
  params,
  searchParams
}:{
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }

})=> {
  const router = useRouter()
  
 
  

  const [userdata,setUserdata] = useState({
    name:'',
    email:'',
    password:'',
  });

  
  const id = params.id;
  const fetchUser=async()=>{
    //console.log(id);
    const response = await axios.get(`${url}users/${id}`);
    //return response.data.user;
    setUserdata(response.data.user);
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
        enableReinitialize
        validationSchema={userSchema}

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
<div>
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
<div>
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
<div className="w-full">
<button 
disabled={!isValid || isSubmitting} type="submit"
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