import { useStore } from '@nanostores/react';
import { themeStore } from './theme.store';

export const useTheme = () => {
  const theme = useStore(themeStore);

  const toggle = () => {
    themeStore.set(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle(
      'dark',
      themeStore.get() === 'dark'
    );
  };

  return { theme, toggle };
};
