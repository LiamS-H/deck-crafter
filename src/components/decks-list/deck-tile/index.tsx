import styled from "styled-components"
import { IDeckList } from "../../../types/decklist"
import { Link } from "react-router-dom"

const DeckTileWrapper = styled.div`
    background-color : ${(props)=>props.theme.accent};
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
`

const Title = styled.span`
    color: ${(props)=>props.theme.text};
    font-size: 50px;
    letter-spacing: -2px;
`


export function DeckTile(props : {deck_id : string, deck : IDeckList}) {
    
    return (
    <Link to={`/deck/${props.deck_id}`}>
        <DeckTileWrapper>
            <Title>{props.deck.title}</Title>
        </DeckTileWrapper>
    </Link>
    )
}