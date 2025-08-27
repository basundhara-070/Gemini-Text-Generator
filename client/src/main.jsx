import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Auth0Provider
    domain="dev-wx0wzhodkgnv7da8.us.auth0.com"
    clientId="MbQoxia6hdg4peQ5kL887wnj7CmTRYcn"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
    </QueryClientProvider>
  </React.StrictMode>,
)
