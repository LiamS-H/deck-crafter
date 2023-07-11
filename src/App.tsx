import './App.css'

import Header from './components/header'
import DeckEditor from './components/deck-editor'


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