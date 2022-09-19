import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from './router/RouterProvider';
import { useThemeStore } from './store/theme.store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './config/apollo.config';
import { AppTheme, darkTheme, lightTheme } from './config/theme.config';
import { ToastContainer } from 'react-toastify';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

const Index: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme === AppTheme.Dark ? darkTheme : lightTheme}>
        <CssBaseline />
        <RouterProvider />
        <ToastContainer theme={theme} hideProgressBar={true} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

reportWebVitals();
