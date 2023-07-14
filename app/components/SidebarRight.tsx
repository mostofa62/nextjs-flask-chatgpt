'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import Logo from '../images/logo/logo.svg';
import SidebarLinkGroup from './SidebarLinkGroup';
import axios from 'axios';
import useAuth from '@/app/hooks/useAuth';
import ActiveConversation from './sidebarcategory/activeConversation';

const url = process.env.url;

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SidebarRight = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useRouter();
  const pathname  = usePathname();
  const authCtx = useAuth();
  
  const [openChatForm, setOpenChatForm] = useState(false);

  const openChatFormHandler=(e:any)=>{
      e.preventDefault();
      setOpenChatForm(true);
  }

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded:any= null;
  let Loguser:any = null;
  const convArray:any[]=[]

  const [categories, setCategories]= useState(convArray);

  const fetchCategory = async () => {
		
    const response = await axios.get(`${url}list-category`);

		setCategories(response.data.category);
		
	};

  

  const logoutHandler = async()=>{
    
    await axios.post(`${url}logout`, 
    {token:authCtx.token }, {
    
    headers: {
      'Content-Type': 'application/json'
    }
  }
) .then(function (response) {
      authCtx.logout();
      location.push('/login');
    
})
.catch(function (error) {
  //console.log(error);
});

  };  
  

  if (typeof window !== 'undefined') {

    storedSidebarExpanded = localStorage.getItem('sidebar-expanded-right');
    Loguser = localStorage.getItem('Loguser');
  }



  useEffect(()=>{
    if(Loguser && Loguser == '2')
      fetchCategory()
  },[Loguser])
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded-right', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  

  return (
    <aside
      ref={sidebar}
      className={`absolute right-0 top-0 z-9999 flex h-screen w-1/5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h2 className="mb-4 ml-4 xl:text-lg xl:font-medium text-sm font-semibold text-bodydark2">
              DISCUSSION
            </h2>
            <ul className="mb-6 flex flex-col gap-1.5">

              
              
              
             






              
              
             
            </ul>
          </div>

          
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default SidebarRight;
