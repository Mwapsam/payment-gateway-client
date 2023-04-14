import React, { useState, useEffect } from 'react';
import { DashboardNav, SideBar } from '../components';

type Props = {}

const DashboardWrapper = (Component: any) => ({...props}) => {
    const [openNav, setOpenNav] = useState(false);
    
    useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false)
        );
      }, []);

      const onOpen = () => {
        setOpenNav((prev) => !prev)
      }

  return (
    <>
        <DashboardNav openNav={openNav} onOpen={onOpen} />
        <div className="flex overflow-hidden bg-white pt-16">
            <SideBar openNav={openNav} />
            <div className={openNav ? "bg-gray-900 opacity-50 fixed inset-0 z-10" : "bg-gray-900 opacity-50 hidden fixed inset-0 z-10"} id="sidebarBackdrop" />
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <main>
                        <div className="pt-6 pb-32 px-4">
                            <Component {...props}/>
                        </div>
                    </main>
            </div>
        </div>
    </>
  )
}

export default DashboardWrapper;