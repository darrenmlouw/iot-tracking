import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { TopBarProvider } from '@/contexts/TopBarContext';
import Devices from '@/pages/devices/Devices';
import Firmwares from '@/pages/firmware/Firmwares';
import Groups from '@/pages/groups/Groups';
import Home from '@/pages/home/Home';

function App() {
	const location = useLocation();

	return (
		<TopBarProvider>
			<div className="App">
				<Routes location={location}>
					<Route path="/" element={<Layout />}>
						<Route path="/Home" element={<Home />} />
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
