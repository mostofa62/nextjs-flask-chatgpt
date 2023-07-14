import { ReactNode, useEffect, useState } from 'react';
import HeaderMessage from '@/app/components/HeaderMessage';
import SidebarLeft from '@/app/components/SidebarLeft';
import SidebarRight from '@/app/components/SidebarRight';
//import useAuthRoute from '@/app/hooks/useAuthRoute';
import { useRouter, usePathname } from "next/navigation";
import useAuth from '@/app/hooks/useAuth';
import UseAuthRoute from '@/app/hooks/useAuthRoute';
interface DefaultLayoutProps {
  children: ReactNode;
}

const MessageLayout = ({ children }: DefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightsidebarOpen, setRightSidebarOpen] = useState(false);

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
    if(!authCtx.isLoggedIn){
      router.push('/login');
    }
  },[authCtx.isLoggedIn,router])
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden bg-black">
        {/* <!-- ===== Left Sidebar Start ===== --> */}
        <SidebarLeft sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Left Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <HeaderMessage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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

        {/* <!-- ===== Right Sidebar Start ===== --> */}
        <SidebarRight sidebarOpen={rightsidebarOpen} setSidebarOpen={setRightSidebarOpen} />
        {/* <!-- ===== Right Sidebar End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default MessageLayout;
