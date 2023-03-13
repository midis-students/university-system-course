import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primereact/resources/themes/viva-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './global.css';
import './lib/api';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as API from './lib/api';

///@ts-ignore
window.api = API;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      //refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
