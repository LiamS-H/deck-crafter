import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';
import { useContext } from "react";
import { DeckListContext } from "..";
import { IDeckDispMode, IDeckList } from "../../../types/decklist";
import styled from "styled-components";

const SettingsWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
`

export default function ModeSelector() {
    const {decklist, updateDeckList} = useContext(DeckListContext)
    const groupings = ["tags" , "type" , "color" , "cmc"]
    const orders = ["cmc" , "price"]
    decklist.display.grouping
    decklist.display.order
    return (
        <SettingsWrapper>
        <Dropdown
            options={groupings}
            onChange={(option)=> {
                const newDeckList : IDeckList = {
                    ...decklist,
                    display : {
                        grouping : option.value,
                        order : decklist.display.order
                    }
                }
                updateDeckList(newDeckList)
            }}
            value={decklist.display.grouping}
         />
         <Dropdown
            options={orders}
            onChange={(option)=> {
                const newDeckList : IDeckList = {
                    ...decklist,
                    display : {
                        grouping : decklist.display.grouping,
                        order : option.value,
                    }
                }
                updateDeckList(newDeckList)
            }}
            value={decklist.display.order}
         />
         </SettingsWrapper>
    )
}