"use client";
import MessageLayout from "@/app/layout/MessageLayout"
import { useState,useEffect } from "react";
import axios from "axios";
import Chat from "@/app/components/Chat";
import useAuth from "@/app/hooks/useAuth";
const url = process.env.url;

  interface ContainerProps {
    children: React.ReactNode
  }
  
  const Container = ({ children }: ContainerProps) => (
    <div className="flex flex-col items-center justify-between gap-4 min-h-60 bg-zinc-800 w-full max-w-2xl py-10 px-4 rounded-xl h-fit">
      {children}
    </div>
  )

    

const PdfUpload=()=> {

  const authCtx = useAuth();
  const [prevMessages, setPrevMessages] = useState([]);

  useEffect(()=>{
    
  },[])
  
  return (
    <MessageLayout>
      
      <Chat url={url+"message/"+authCtx.activeMessageId} prevMessage={prevMessages}/>

        
            
    </MessageLayout>
  )
}

export default PdfUpload;