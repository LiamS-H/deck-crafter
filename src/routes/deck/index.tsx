import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { useParams } from "react-router-dom"
import DeckListEditor from "../../components/deck-list-editor"


export default function Deck() {

    const { deck_id } = useParams()
    
    if (!deck_id) {return}

    return (
        <>
            <SignedIn>
                <DeckListEditor deck_id={deck_id} />
            </SignedIn>
            <SignedOut><h1>Please Sign In</h1></SignedOut>
        </>
        
    )
}