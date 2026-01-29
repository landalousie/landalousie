import { persistentAtom } from '@nanostores/persistent';
import { Theme } from './theme.vm';

export const themeStore = persistentAtom<Theme>('theme', 'light');
