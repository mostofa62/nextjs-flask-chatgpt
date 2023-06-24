"use client";
import axios from 'axios';
import { useState } from 'react';

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";
//declare const method: Methods;


interface useRequestProps{
  url:string
  method:Methods,
  body:Object,
  onSuccess?:(data:any)=>{}
}
const useRequest = (params:useRequestProps) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[params.method](params.url, { ...params.body, ...props });

      if (params.onSuccess) {
        params.onSuccess(response.data);
      }

      return response.data;
    } catch (err:any) {
      
     setErrors(err);
     
    }
  };

  return { doRequest, errors };
};

export default useRequest;