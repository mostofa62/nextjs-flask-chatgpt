"use client";
import DefaultLayout from "@/app/layout/DefaultLayout"
import { useState,useEffect } from "react";
import axios from "axios";
import CardFour from "@/app/components/CardFour";
import CardThree from "../components/CardThree";
import CardTwo from "../components/CardTwo";
const url = process.env.url;
      

const PdfUpload=()=> {

  const [dashdata,setDashdata] = useState({
    user_count:0,
    pdf_count:0,
    conversation_count:0,
  });

  const fetchDash=async()=>{
    //console.log(id);
    const response = await axios.get(`${url}dashboard`);
    //return response.data.user;
    setDashdata(response.data.dashdata);
  };
  useEffect(()=>{
    fetchDash();
  
  },[]);
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        
        <CardFour usercount={dashdata.user_count}/>
        <CardThree pdfcount={dashdata.pdf_count}/>
        <CardTwo msg_count={dashdata.conversation_count} />
      </div>    
    </DefaultLayout>
  )
}

export default PdfUpload;