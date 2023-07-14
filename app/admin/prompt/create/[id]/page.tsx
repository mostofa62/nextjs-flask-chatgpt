"use client";
import DefaultLayout from "@/app/layout/DefaultLayout";
//import Chat from "./components/Chat";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {Formik, Form, Field} from 'formik';
import { useRouter } from "next/navigation";
import promptSchema from "../promptSchema";
import SelectFieldFormik from "@/app/components/form/SelectFieldFormik";
import TextArea from "@/app/components/form/TextArea";


const url = process.env.url;

  
const PdfProcessList=({
  params,
  searchParams
}:{
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }

})=> {

  const [categories, setCategories]= useState([]);

  const fetchCategories = async () => {
		
    const response = await axios.get(`${url}list-category`);

		setCategories(response.data.category);
		
	};

  useEffect(() => {
		fetchCategories(); // fetch page 1 of users
		
	}, []);
  
  const router = useRouter()
  
  

  const [promptdata,setPromptdata] = useState({
    title:'',
    category:{value:'',label:''},
    text:'',
  });

  
  const id = params.id;
  const fetchPrompt=useCallback(async()=>{
    //console.log(id);
    const response = await axios.get(`${url}prompt/${id}`);
    //return response.data.user;
    setPromptdata(response.data.prompt);
  },[id]);
  useEffect(()=>{
    fetchPrompt();
  
  },[fetchPrompt]);
  const prompt =promptdata;
  
  const handleFormSubmit = async(values:any)=>{

    //console.log(values);

    await axios.post(`${url}prompt-create/${id}`, 
    values.prompt, {
    headers: {
      'Content-Type': 'application/json'
    }
  }
) .then(function (response) {
  //console.log(response);
  if(response.data.prompt){
    router.push('/admin/prompt');
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
        initialValues={{ prompt }}
        enableReinitialize
        validationSchema={promptSchema}

        onSubmit={handleFormSubmit}

        render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(

      <Form >
        
        <div className="my-3">
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
      <Field 
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

      name="prompt.title" placeholder="Title of prompt" />
      {errors.prompt &&
                                        
                                        errors.prompt.title &&
                                        touched.prompt &&
                                        
                                        touched.prompt.title && ( 
                                            <span className="mb-3 font-semibold text-[#B45454]">
                                                {errors.prompt.title}
                                            </span>   
                                        )}
</div>

<div className="my-3">
                <label className="mb-3 block text-black dark:text-white">
                  Category
                </label>

                <SelectFieldFormik defaultValueArray={{  }}
                                 placeholder="Select Category"
                                 isSearchable
                                 isClearable
                                  name="prompt.category" options={categories} 
                                  
                      />

{errors.prompt &&
                                        errors.prompt.category &&
                                        touched.prompt &&
                                   touched.prompt.category && ( 
                                          <span className="mb-3 font-semibold text-[#B45454]">
                                          {errors.prompt.category.label}
                                          </span>   
                                        )}
      
</div>
<div className="my-3">
                <label className="mb-3 block text-black dark:text-white">
                  Text
                </label>

                <TextArea 
                name="prompt.text"
                placeholder="text of prompt"
                rows="5"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />


      {errors.prompt &&
                                        
                                        errors.prompt.text &&
                                        touched.prompt &&
                                        
                                        touched.prompt.text && ( 
                                            <span className="mb-3 font-semibold text-[#B45454]">
                                                {errors.prompt.text}
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