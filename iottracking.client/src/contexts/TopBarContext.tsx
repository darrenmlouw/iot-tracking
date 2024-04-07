import { createContext, useContext, ReactNode } from 'react';
import useDarkMode from '@/hooks/useDarkMode'; // Ensure this path matches your file structure

type TopBarContextType = {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
};

const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

interface TopBarProviderProps {
	children: ReactNode;
}

export const TopBarProvider = ({ children }: TopBarProviderProps) => {
	const [theme, toggleTheme] = useDarkMode();

	return (
		<TopBarContext.Provider value={{ theme, toggleTheme }}>
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
