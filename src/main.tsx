import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.tsx';

import './index.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import ErrorPage from './routes/error-page/index.tsx';
import Deck from './routes/deck/index.tsx';
import Decks from './routes/decks/index.tsx';


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
