import { useState } from 'react'
import './App.css'

import Header from './components/header'
import DeckEditor from './components/deck-editor'

import {
        ClerkProvider,
        SignedIn,
        SignedOut,
        UserButton,
        useUser,
        RedirectToSignIn,
    } from "@clerk/clerk-react";

if (!import.meta.env.VITE_API_KEY) {
    throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_API_KEY;






// function App() {
//     return (
//         <ClerkProvider  publishableKey={clerkPubKey}>
//             <Header />
            
//             <SignedIn>
//                 <SearchTab />
//             </SignedIn>
//             <SignedOut>
//                 <RedirectToSignIn />
//             </SignedOut>
//         </ClerkProvider>
//     )
// }

function App() {
    return (
    <>
        <Header />
        <DeckEditor />
    </>
    )
}


export default App