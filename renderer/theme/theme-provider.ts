import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import type { PropsWithChildren } from 'react';
import type React from 'react';
import { getThemeVariables, darkTheme } from 'theme/theme-provider';
import 'theme/global.css';

export type Theme = 'light' | 'dark';
export type ThemeProviderProps = {
    defaultTheme?: Theme;
  };

const themes = ['dark', 'light'];

export const ThemeProvider = ({
    children,
    ...props
  }: PropsWithChildren<ThemeProviderProps>) => {
    return (
      <NextThemeProvider themes={themes} enableSystem={true} {...props}>
        {children}
      </NextThemeProvider>
    );
  };
  


