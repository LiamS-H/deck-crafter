import { SignedIn, SignedOut } from "@clerk/clerk-react"

export default function Decks() {
    return (
        <>
            <SignedIn><h1>Here is a list of your decks!</h1></SignedIn>
            <SignedOut><h1>Please Sign In</h1></SignedOut>
        </>
    )
}