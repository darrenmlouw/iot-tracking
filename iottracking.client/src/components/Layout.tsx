import SidePanel from '@/components/SidePanel';
import TopBar from '@/components/TopBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-row h-full w-full">
      <SidePanel />
      <div className="relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
        <TopBar />
        <div className="flex flex-1 overflow-y-auto overflow-x-hidden p-2 w-full h-full pt-[var(--topbar-height)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
