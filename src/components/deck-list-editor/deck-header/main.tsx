import styled from "styled-components"

import DeckTitle from "./deck-title"
import ModeSelector from "./mode-selector"
import CardSearch from "./card-search"

const EditorHeaderWrapper = styled.div`
    background-color: ${props=>props.theme.accent};
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px;
`

export default function DeckHeader() {
    
return (
    <EditorHeaderWrapper>
        <DeckTitle />
        <ModeSelector />
        <CardSearch />
    </EditorHeaderWrapper>
)

}
