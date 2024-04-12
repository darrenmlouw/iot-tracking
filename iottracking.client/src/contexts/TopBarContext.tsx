import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from 'react';
import useDarkMode from '@/hooks/useDarkMode'; // Ensure this path matches your file structure
import SidePanelState from '@/enums/SidePanelState';

type TopBarContextType = {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
	sidePanelState: SidePanelState;
	toggleSidePanel: () => void;
};

const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

interface TopBarProviderProps {
	children: ReactNode;
}

export const TopBarProvider = ({ children }: TopBarProviderProps) => {
	const [theme, toggleTheme] = useDarkMode();
	const [sidePanelState, setSidePanelState] = useState<SidePanelState>(
		SidePanelState.Condensed
	);
	const mqSmall = window.matchMedia('(max-width: 767px)');

	useEffect(() => {
		
    const handleResize = () => {
      // Automatically set to closed on small screens, and condensed on larger screens.
      setSidePanelState(mqSmall.matches ? SidePanelState.Closed : SidePanelState.Condensed);
    };

    handleResize(); // Initial check
    mqSmall.addEventListener('change', handleResize);
    return () => mqSmall.removeEventListener('change', handleResize);
  }, []);

  const toggleSidePanel = () => {
    setSidePanelState(prevState => {
      // If it's small screen, keep it closed or allow opening if not already expanded.
      if (mqSmall.matches) {
        return prevState === SidePanelState.Expanded ? SidePanelState.Closed : SidePanelState.Expanded;
      } else {
        // Toggle between condensed and expanded on larger screens.
        return prevState === SidePanelState.Expanded ? SidePanelState.Condensed : SidePanelState.Expanded;
      }
    });
  };

	return (
		<TopBarContext.Provider
			value={{ theme, toggleTheme, sidePanelState, toggleSidePanel }}
		>
			{children}
		</TopBarContext.Provider>
	);
};

// Custom hook for consuming the context
// eslint-disable-next-line react-refresh/only-export-components
export const useTopBar = () => {
	const context = useContext(TopBarContext);
	if (!context) {
		throw new Error('useTopBar must be used within a TopBarProvider');
	}
	return context;
};

export default TopBarContext;
