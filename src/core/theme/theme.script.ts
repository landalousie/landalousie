export const getThemeScript = () => {
  function hydrateTheme() {
    try {
      const storedTheme = localStorage.getItem('theme');
      const theme =
        storedTheme === 'dark' || storedTheme === 'light'
          ? storedTheme
          : 'light';

      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (e) {
      console.error('Error hydrating theme:', e);
      const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }
  return `(${hydrateTheme.toString()})()`;
};
