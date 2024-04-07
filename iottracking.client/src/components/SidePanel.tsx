import { Button } from '@/components/ui/button';
import {
	MobileIcon,
	LayersIcon,
	CounterClockwiseClockIcon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import logo from '../../src/assets/Digital_Matter_Logo.png';

function SidePanel() {
	return (
		<div className="flex flex-col bg-card p-2 space-y-2 rounded-tr-[4] rounded-br-[4] rounded-r-2xl items-center">
			<div className='m-2'>
				<img src={logo} alt="Logo" className="mb-4 max-w-[36px]" />
			</div>
			<Link to="/Devices">
				<Button variant="ghost" size="icon" className="rounded">
					<MobileIcon className="h-6 w-6" />
				</Button>
			</Link>

			<Link to="/Firmware">
				<Button variant="ghost" size="icon" className="rounded">
					<LayersIcon className="h-6 w-6" />
				</Button>
			</Link>

			<Link to="/Groups">
				<Button variant="ghost" size="icon" className="rounded">
					<CounterClockwiseClockIcon className="h-6 w-6" />
				</Button>
			</Link>
		</div>
	);
}

export default SidePanel;
