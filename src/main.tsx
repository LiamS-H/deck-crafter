import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.tsx';
import App from './App.tsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import ErrorPage from './routes/error-page.tsx';
import Deck from './routes/deck.tsx';
import Decks from './routes/decks.tsx';


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
                path: "deck/:deckId",
                element: <Deck />,
            },
            {
                path: "decks",
                element: <Decks />,
            }
        ]
    }
    
  ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ClerkProvider  publishableKey={clerkPubKey}>
            <RouterProvider router={router} />
        </ClerkProvider>
    </React.StrictMode>,
)
