import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import defaultTheme from '../styles/themes/defaultTheme';
import { AuthProvider } from './auth';

const RootProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
