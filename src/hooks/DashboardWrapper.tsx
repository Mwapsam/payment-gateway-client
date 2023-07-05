import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardNav, SideBar } from '../components';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/users.service';

const DashboardWrapper = (Component: any) => ({ ...props }) => {
  const [openNav, setOpenNav] = useState(false);
  const { user, loading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .catch(() => {
        window.location.href = '/auth';
      });
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onOpen = () => {
    setOpenNav((prev) => !prev);
  };

  if (loading === 'pending') {
    return (
      <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user && loading === 'failed') {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <DashboardNav openNav={openNav} onOpen={onOpen} />
      <div className="flex overflow-hidden bg-white pt-16">
        <SideBar openNav={openNav} />
        {openNav && (
          <div className="bg-gray-900 opacity-50 fixed inset-0 z-10" id="sidebarBackdrop" />
        )}
        <div
          id="main-content"
          className="h-full w-full relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 pb-32 px-4">
              <Component {...props} user={user} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardWrapper;
