import { useContext } from "react"
import styled from "styled-components"

import { DeckListContext } from ".."

import { EditText, onSaveProps } from "react-edit-text"

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const Title = styled.h1`
    font-variant: small-caps;

`

export default function DeckTitle() {

    const {decklist, updateDeckList} = useContext(DeckListContext)

    return (
    <TitleWrapper>
        <Title>
        <EditText
            name="Deck Title"
            placeholder={decklist.title}
            onSave={(change : onSaveProps)=>{
                const newDeckList = {
                    ...decklist,
                    title : change.value
                }
                updateDeckList(newDeckList)
            }}
        />
        </Title>
    </TitleWrapper>
    )
}