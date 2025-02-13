import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { schema } from "./schema";
import { Auth0Provider } from '@auth0/auth0-react';

const userID = "anon";

const z = new Zero({
  userID,
  server: import.meta.env.VITE_PUBLIC_SERVER,
  schema,
  // This is often easier to develop with if you're frequently changing
  // the schema. Switch to 'idb' for local-persistence.
  kvStore: "idb",
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-x4ppik6hz0odlezu.us.auth0.com"
    clientId="lNBfdEfUYOSDXntXjE62J5fgoS4hcYDF"
    authorizationParams={{
      redirect_uri: window.location.origin
    }} >
      <ZeroProvider zero={z}>
        <App />
      </ZeroProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
