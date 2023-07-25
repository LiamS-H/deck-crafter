import styled from "styled-components"
import { IDeckList } from "../../../types/decklist"
import { Link } from "react-router-dom"

const DeckTileWrapper = styled.div`
    background-color : ${(props)=>props.theme.group};
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
`


export function DeckTile(props : {deck_id : string, deck : IDeckList}) {
    
    return (
    <Link to={`/deck/${props.deck_id}`}>
        <DeckTileWrapper>
            <span>{props.deck.title}</span>
        </DeckTileWrapper>
    </Link>
    )
}