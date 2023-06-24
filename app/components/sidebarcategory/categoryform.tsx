import {Formik, Form, Field, yupToFormErrors, validateYupSchema} from 'formik';
import { object, array, string, number, StringSchema } from "yup";
import SelectFieldFormik from "@/app/components/form/SelectFieldFormik";
import {useState, useEffect} from 'react';
import axios from 'axios';
const url = process.env.url;
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';


const SidebarCategoryForm = (props:any)=>{

  const [categories, setCategories]= useState([]);

  const authCtx = useAuth();

  const fetchCategory = async () => {
		
    const response = await axios.get(`${url}list-category`);

		setCategories(response.data.category);
		
	};

  useEffect(() => {
		fetchCategory(); // fetch page 1 of users
		
	}, []);


    const message={
        category:{value:'',label:''},
    }

    const categorySchema=object().shape({
      message:object().shape({
        category:object().shape({
          value: string().required("Required Category"),
          label: string().required("please select a category")
        })
        .nullable(),
                               
      })
    });

  const router = useRouter();

  const handleFormSubmit=async(values:any, actions:any)=>{
      //console.log(values);
      authCtx.selectedCat(values.message.category);
      props.CloseOpenChat();
      actions.resetForm();
      const response = await axios.get(`${url}get-message/${authCtx.userId}/${values.message.category.value}`);
      
      authCtx.selectedMsg(response.data.msgid);
      router.push('/user');
  }

    return(

        <Formik
        initialValues={{ message }}
        validationSchema={categorySchema}
        

        onSubmit={handleFormSubmit}

        render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(

      <Form >
<div className="w-full">
<label className="mb-3 block text-black dark:text-white">
                  Select A Category
                </label>
<SelectFieldFormik defaultValueArray={{  }}
                                 placeholder="Select Category"
                                 isSearchable
                                 isClearable
                                  name="message.category" options={categories} 
                                  
                      />

{errors.message &&
                                        errors.message.category &&
                                        touched.message &&
                                   touched.message.category && ( 
                                          <span className="mb-3 font-semibold text-[#B45454]">
                                          {errors.message.category.label}
                                          </span>   
                                        )}
      
</div>

<div className="w-full mt-5">
<button 
disabled={!isValid || isSubmitting} type="submit"
 className="flex w-full justify-center rounded bg-[#f1e56c] p-3 font-medium text-black">
  Start Chat
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

    )


}

export default SidebarCategoryForm;