"use client"; // This is a client component 👈🏽
import { ReactNode, useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
//import useAuthRoute from '@/app/hooks/useAuthRoute';
import { useRouter, usePathname } from "next/navigation";
import UseAuthRoute from '@/app/hooks/useAuthRoute';
import useAuth from '@/app/hooks/useAuth';


interface DefaultLayoutProps {
  children: ReactNode;
}

const FullPageLayout = ({ children }: DefaultLayoutProps) => {
  
  const router = useRouter();
  const pathname = usePathname();
  const authCtx = useAuth();

  //const redirect = useAuthRoute(pathname);
  /*
  useEffect(()=>{
    if(typeof redirect !='undefined'){
      router.push(redirect);
    }
    
  },[])
  */
  useEffect(()=>{
    /*
    if(typeof redirect !='undefined'){
      router.push(redirect);
    }*/
    if(!authCtx.isLoggedIn && pathname!='/'){
      router.push('/login');
    }
  },[authCtx.isLoggedIn,router,pathname])
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden bg-black">
        {/* <!-- ===== Sidebar Start ===== --> */}
        
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <UseAuthRoute>
              {children}
              </UseAuthRoute>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default FullPageLayout;
