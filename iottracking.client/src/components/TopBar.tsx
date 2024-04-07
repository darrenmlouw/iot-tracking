import { Button } from '@/components/ui/button';
import { useTopBar } from '@/contexts/TopBarContext';
import { SunIcon } from '@radix-ui/react-icons';
import { MoonIcon } from 'lucide-react';


const TopBar = () => {
	const { theme, toggleTheme } = useTopBar();

	return (
		// create a top bar with a light an ddark mode toggle on the top-right side of the screen
		<div className="flex flex-row space-x-2 w-ful pt-2 pr-2 pl-2 justify-end">
			<Button
				size="icon"
				variant="ghost"
				onClick={toggleTheme}
				className="rounded-full"
			>
				{theme === 'dark' ? (
					<SunIcon className="h-5 w-5" />
				) : (
					<MoonIcon className="h-5 w-5" />
				)}
			</Button>
		</div>
	);
};

export default TopBar;
