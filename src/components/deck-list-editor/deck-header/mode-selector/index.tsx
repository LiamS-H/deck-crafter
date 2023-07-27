import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';
import { useContext } from "react";
import { DeckListContext } from "../../";
import { IDeckDispMode, IDeckList } from "../../../../types/decklist";
import styled from "styled-components";

const SettingsWrapper = styled.div`
    justify-self:left;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`

const DropDownLable = styled.span`
    
`

export default function ModeSelector() {
    const {decklist, updateDeckList} = useContext(DeckListContext)
    const groupings : IDeckDispMode["grouping"][] = ["tags" , "type" , "color" , "cmc"]
    const orders : IDeckDispMode["order"][] = ["cmc" , "price"]
    decklist.display.grouping
    decklist.display.order
    return (
        <SettingsWrapper>
            <DropDownLable>Grouping:</DropDownLable>
        <Dropdown
            options={groupings}
            onChange={(option )=> {
                const newValue = groupings.filter(grouping=>grouping===option.value)[0]
                const newDeckList : IDeckList = {
                    ...decklist,
                    display : {
                        grouping : newValue,
                        order : decklist.display.order
                    }
                }
                updateDeckList(newDeckList)
            }}
            value={decklist.display.grouping}
         />
            <DropDownLable>Order:</DropDownLable>
         <Dropdown
            options={orders}
            onChange={(option)=> {
                const newValue = orders.filter(grouping=>grouping===option.value)[0]
                const newDeckList : IDeckList = {
                    ...decklist,
                    display : {
                        grouping : decklist.display.grouping,
                        order : newValue,
                    }
                }
                updateDeckList(newDeckList)
            }}
            value={decklist.display.order}
         />
         </SettingsWrapper>
    )
}