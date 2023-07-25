import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.tsx';
import { GlobalStyle, GlobalTheme } from './styles/global.ts';
import { ThemeProvider } from 'styled-components';


import './index.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import ErrorPage from './routes/error-page';
import Deck from './routes/deck';
import Decks from './routes/decks';
import Home from './routes/home';

import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn,
} from "@clerk/clerk-react";


// Clerk
window.global ||= window;

if (!import.meta.env.VITE_API_KEY) {
    throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_API_KEY;

// Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "deck/:deck_id",
                element: <Deck />,
            },
            {
                path: "decks",
                element: <Decks />,
            },
            {
                path: "home",
                element: <Home />,
            }
        ]
    }
    
  ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <GlobalStyle />
        <ThemeProvider theme={GlobalTheme}>
        <ClerkProvider  publishableKey={clerkPubKey}>
            <RouterProvider router={router} />
        </ClerkProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
