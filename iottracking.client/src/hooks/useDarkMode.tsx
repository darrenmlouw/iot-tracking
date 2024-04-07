import { useEffect, useState } from 'react';

const useDarkMode = (): ['light' | 'dark', () => void] => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const setMode = (mode: "light" | "dark") => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'dark') {
      setMode('light');
      document.documentElement.classList.remove('dark');
    } else {
      setMode('dark');
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'dark' || localTheme === 'light') {
      setTheme(localTheme);
      if (localTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      setMode('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  return [theme, toggleTheme];
};

export default useDarkMode;
