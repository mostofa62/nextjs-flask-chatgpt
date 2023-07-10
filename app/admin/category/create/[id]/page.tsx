"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Formik, Form, Field} from 'formik';
import { useRouter } from "next/navigation";
import categorySchema from "../categorySchema";


const url = process.env.url;

  
const PdfProcessList=({
  params,
  searchParams
}:{
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }

})=> {
  const router = useRouter()
  
 
  

  const [categorydata,setCategorydata] = useState({
    label:'',
    value:'',
  });

  
  const id = params.id;
  const fetchCategory=async()=>{
    //console.log(id);
    const response = await axios.get(`${url}categories/${id}`);
    //return response.data.user;
    setCategorydata(response.data.category);
  };
  useEffect(()=>{
    fetchCategory();
  
  },[]);
  const category =categorydata;
  
  const handleFormSubmit = async(values:any)=>{

    //console.log(values);

    await axios.post(`${url}category-create/${id}`, 
    values.category, {
    headers: {
      'Content-Type': 'application/json'
    }
  }
) .then(function (response) {
  //console.log(response);
  if(response.data.category){
    router.push('/admin/category');
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
        initialValues={{ category }}
        enableReinitialize
        validationSchema={categorySchema}

        onSubmit={handleFormSubmit}

        render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(

      <Form >
        <div>
                <label className="mb-3 block text-black dark:text-white">
                  Label
                </label>
      <Field 
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

      name="category.label" placeholder="Label of category" />
      {errors.category &&
                                        
                                        errors.category.label &&
                                        touched.category &&
                                        
                                        touched.category.label && ( 
                                            <span className="mb-3 font-semibold text-[#B45454]">
                                                {errors.category.label}
                                            </span>   
                                        )}
</div>
<div className="my-3">
                <label className="mb-3 block text-black dark:text-white">
                  Value
                </label>
<Field 
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

 name="category.value" placeholder="value of category" />
      {errors.category &&
                                        
                                        errors.category.value &&
                                        touched.category &&
                                        
                                        touched.category.value && ( 
                                            <span className="mb-3 font-semibold text-[#B45454]">
                                                {errors.category.value}
                                            </span>   
                                        )}
</div>


<div className="w-full my-5">
<button 
disabled={!isValid || isSubmitting} type="submit"
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