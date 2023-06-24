"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Formik, Form, Field, yupToFormErrors, validateYupSchema} from 'formik';
import categorySchema from "./categorySchema";
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
const PdfProcessList=()=> {
  const router = useRouter()
  const category={
    label:'',
    value:'',
  }

  const handleFormSubmit = async(values:any)=>{

    //console.log(values);

    await axios.post(`${url}category-create`, 
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
        <Container>
        <Formik
        initialValues={{ category }}
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
<div>
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