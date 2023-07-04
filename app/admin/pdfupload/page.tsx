"use client";
import DefaultLayout from "@/app/layout/DefaultLayout"
//import Chat from "./components/Chat";
import CategoryFileUploader from "@/app/components/CategoryFileUploader";
import SelectField from "@/app/components/form/SelectField";
import { useState,useEffect } from "react";
import axios from "axios";

const url = process.env.url;

  

    

const PdfUpload=()=> {
  /*
  const options=[
    {'label':'PHP','value':'php'},
    {'label':'React','value':'react'},
    {'label':'JavaScript','value':'javascript'}
  ];
*/
  

  const [category, setCategory]= useState({"label":null,"value":null});
  const [categories, setCategories]= useState([]);

  const fetchCategory = async () => {
		
    const response = await axios.get(`${url}list-category`);

		setCategories(response.data.category);
		
	};

   

  useEffect(() => {
		fetchCategory(); // fetch page 1 of users
		
	}, []);

  return (
    <DefaultLayout>
    <div className="flex">
    <div className="md:w-2/12"></div>
    <div className="md:w-8/12 sm:w-full">

    <SelectField
    defaultValueArray={[]}
    placeholder='Choose a Category'
    
    isClearable
    isSearchable
  options={categories}   
  onChange={(options,action)=>{
    //console.log(action);
    if(action =='clear'){
      setCategory({"label":null,"value":null});
    }
    setCategory(options);
  }}
    />
        {category !== null && typeof category.value!='undefined' && category?.value !=null &&
        <CategoryFileUploader
          url={url+""}
          acceptedFileTypes={[
            "application/pdf",            
          ]}
          maxFileSize={5*100}
          label="Max File Size: 5MB"
          labelAlt="Accepted File Types: pdf"
          allowMultiple={true}
          cateGory={category}
          

        />
}
</div>
</div>
    </DefaultLayout>
  )
}

export default PdfUpload;