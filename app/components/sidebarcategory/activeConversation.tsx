"use client";
import { useState,useEffect, SyntheticEvent,useCallback } from "react";
import axios from "axios";
import useAuth from "@/app/hooks/useAuth";
const url = process.env.url;
const newPerPage = process.env.per_page;


const ActiveConversation=(props:any)=> {

  const convArray:any[]=[]
  const [activeConversation, setActiveConversation] = useState(convArray);
  const [countActConv, setcountActConv]= useState(0);
  const authCtx = useAuth();
  const [searchConversation,setSearchConversation] = useState("");

  const fetchActiveConversation = useCallback(async(page:number)=>{
    //const newPerPage=5
    const {data} = await axios.get(`${url}message-list/${authCtx.userId}?page=${page}&per_page=${newPerPage}`);
    if(data.data){
      setActiveConversation(data.data)
      setcountActConv(data.total);
    }
    //console.log(response.data.conversations);
  },[authCtx.userId,setActiveConversation])

  useEffect(()=>{
    if(authCtx.userId && authCtx.activeMessageId == null){
      fetchActiveConversation(1);
    }
  },[authCtx.userId,authCtx.activeMessageId,fetchActiveConversation])


  const convToActiveMsg=(activeMsgid:string, chatCategory:string)=>{
    chatCategory = chatCategory == null? "":chatCategory;
    authCtx.activeMessageId = activeMsgid;
    authCtx.chatCategory = chatCategory;
    authCtx.selectedMsg(activeMsgid);    
    authCtx.selectedCat(chatCategory);
    
  }

  const searchConversationHandler = (e:SyntheticEvent)=>{
    e.preventDefault();
    //alert(searchConversation);
    if(searchConversation.length > 2){
      let filtered_conversation = activeConversation.filter((converse)=>{
      //console.log(converse.last_message);
      //console.log(searchConversation);
      //console.log(converse.last_message.search(searchConversation))
      var matcher = new RegExp(searchConversation, "i");
      //let pattern = /searchConversation/;
      return matcher.test(converse.last_message)
    })
    //console.log(filtered_conversation)
    setActiveConversation(filtered_conversation);
  }
  else{
    fetchActiveConversation(1);
  }

}


return(
    <div className='hidden lg:h-80 md:h-96 flex-col xl:flex'>
            {/* <!-- ====== Chat List Start --> */}
            {/*
            <div className='sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
              
              <h3 className='text-lg font-medium text-black dark:text-white 2xl:text-xl'>
                Chat History
                <span className='rounded-md border-[.5px] border-stroke bg-gray-2 py-0.5 px-2 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4'>
                  {countActConv}
                </span>
              </h3>
            </div>
*/}
            
            <div className='flex max-h-full flex-col overflow-auto'>
              <form className='sticky mb-7' onSubmit={searchConversationHandler}>
                <input
                  value={searchConversation}
                  onChange={(e)=>{
                    setSearchConversation(e.target.value)
                  }}
                  type='text'
                  className='w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2'
                  placeholder='Search...'
                />
                <button className='absolute top-1/2 right-4 -translate-y-1/2'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z'
                      fill='#637381'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z'
                      fill='#637381'
                    />
                  </svg>
                </button>
              </form>
              <div className='no-scrollbar max-h-full space-y-2.5 overflow-auto'>
                {/* <!-- Chat List Item --> */}
                {activeConversation.map((object,item)=>{
                  return(

                    <div
                      key={item}
                      className='flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark'
                    >
                      
                      <div className='w-full'>
                        <h5 onClick={convToActiveMsg.bind(null,object._id,object.category)} className='text-sm font-medium text-black dark:text-white'>
                          {object.last_message}
                        </h5>
                        <p className='text-sm'>{object.updated_at}</p>
                      </div>
                    </div>

                  )
                })}
               
                {/* <!-- Chat List Item --> */}
              </div>
            </div>
            
            {/* <!-- ====== Chat List End --> */}
          </div>
)

}

export default ActiveConversation;

