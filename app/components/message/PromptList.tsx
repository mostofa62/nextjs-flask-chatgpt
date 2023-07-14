"use client";
import { useState,useEffect, SyntheticEvent,useCallback } from "react";
import axios from "axios";
import useAuth from "@/app/hooks/useAuth";
const url = process.env.url;
const per_page:any = process.env.per_page;
const per_page_list:any = process.env.per_page_list;

import Prompt from "./Prompt";


const PromptList=(props:any)=> {
    const convArray:any[]=[]

    const [data, setData] = useState(convArray);
    const [perPage, setPerPage] = useState(per_page);


    const fetchPrompts = useCallback(async (page:number) => {
    const response = await axios.get(`${url}prompts?page=${page}&per_page=${perPage}`);

		setData(response.data.data);
	},[perPage]);

    useEffect(() => {
		fetchPrompts(1); // fetch page 1 of users
		
	}, [fetchPrompts]);

    return(
        <div className='grid grid-cols-3 gap-2'>
            {data.map((item,index)=>{
                return <Prompt key={index} text={item.text}/>
            })}
        </div>    
        
    )
}

export default PromptList;