import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { TopBarProvider } from '@/contexts/TopBarContext';
import Devices from '@/pages/home/Devices';
import Firmwares from '@/pages/firmware/Firmwares';
import Groups from '@/pages/group/Groups';

function App() {
	const location = useLocation();

	return (
		<TopBarProvider>
			<div className="App">
				<Routes location={location}>
					<Route path="/" element={<Layout />}>
						<Route path="/Devices" element={<Devices />} />
						<Route path="/Firmware" element={<Firmwares />} />
						<Route path="/Groups" element={<Groups />} />
					</Route>
				</Routes>
			</div>
		</TopBarProvider>
	);
}

export default App;
