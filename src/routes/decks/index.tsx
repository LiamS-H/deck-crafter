import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { DecksList } from "../../components/decks-list"

export default function Decks() {
    
    
    return (
        <>
            <SignedIn>
                <DecksList />
            </SignedIn>
            <SignedOut><h1>Please Sign In</h1></SignedOut>
        </>
    )
}