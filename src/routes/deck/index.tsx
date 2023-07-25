import { useState, useEffect } from "react"
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DeckListEditor from "../../components/deck-list-editor"

import { IDeckList, EMPTY_DECKLIST } from "../../types/decklist"

import axios from "axios"


export default function Deck() {
    const navigate = useNavigate()

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