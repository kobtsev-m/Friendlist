import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { RouterProvider } from './router/RouterProvider';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { RootStore, StoreContext } from './store/root.store';
import { useStores } from './hooks/useStores';
import { observer } from 'mobx-react-lite';
import { apolloClient } from './config/apollo.config';
import { globalStyles } from './config/theme.config';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Index: React.FC = observer(() => {
  const { themeStore } = useStores();
  return (
    <ThemeProvider theme={themeStore.getThemeStyles()}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ToastContainer theme={themeStore.theme} hideProgressBar={true} />
      <RouterProvider />
    </ThemeProvider>
  );
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={apolloClient}>
    <StoreContext.Provider value={new RootStore()}>
      <Index />
    </StoreContext.Provider>
  </ApolloProvider>
);

reportWebVitals();
