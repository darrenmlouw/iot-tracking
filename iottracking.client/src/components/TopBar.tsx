import { Button } from '@/components/ui/button';
import { useTopBar } from '@/contexts/TopBarContext';
import { HamburgerMenuIcon, SunIcon } from '@radix-ui/react-icons';
import { MoonIcon } from 'lucide-react';
import { useEffect } from 'react';

const TopBar = () => {
  const { theme, toggleTheme } = useTopBar();
	const { sidePanelState, toggleSidePanel } = useTopBar();

	useEffect(() => {
		console.log(sidePanelState)
	}, [sidePanelState])

  return (
    // Positioned absolutely at the top of its closest positioned ancestor
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 h-[var(--topbar-height)]">
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleSidePanel}
        className="rounded-full"
      >
        <HamburgerMenuIcon className="h-5 w-5" />
      </Button>
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
