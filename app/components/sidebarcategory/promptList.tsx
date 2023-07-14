"use client";
import { useState,useEffect, SyntheticEvent,useCallback } from "react";
import axios from "axios";
import useAuth from "@/app/hooks/useAuth";
const url = process.env.url;
const newPerPage = process.env.per_page;

const PromptList=(props:any)=> {

  const convArray:any[]=[]
  const [prompts, setPrompts] = useState(convArray);
  const [countPrompts, setCountPrompts]= useState(0);
  const authCtx = useAuth();

  const fetchPrompts = useCallback(async(page:number)=>{
    //const newPerPage=5
    const {data} = await axios.get(`${url}prompts?page=${page}&per_page=${newPerPage}`);
    if(data.data){
      setPrompts(data.data)
      setCountPrompts(data.total);
    }
    //console.log(response.data.conversations);
  },[setPrompts])



}