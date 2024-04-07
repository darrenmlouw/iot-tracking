import SidePanel from '@/components/SidePanel';
import TopBar from '@/components/TopBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<div className="flex flex-row h-full w-full">
			<SidePanel />
			<div className="flex flex-col w-full overflow-x-hidden overflow-y-auto">
				<TopBar />
				<div className="overflow-y-auto overflow-x-hidden m-2">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
