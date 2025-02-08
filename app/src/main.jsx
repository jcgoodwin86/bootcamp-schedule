import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { schema } from "./schema";

const userID = "anon";

const z = new Zero({
  userID,
  server: import.meta.env.VITE_PUBLIC_SERVER,
  schema,
  // This is often easier to develop with if you're frequently changing
  // the schema. Switch to 'idb' for local-persistence.
  kvStore: "mem",
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ZeroProvider zero={z}>
      <App />
    </ZeroProvider>
  </React.StrictMode>,
)
