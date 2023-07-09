import { useState } from 'react'

import { IMTGCard } from '../../../types/card';
import { IscryfallResult } from '../../../types/card';
import { scryfallQuery } from '../../../services/scryfallService';

import CardArray from './card-array';

import './searchTab.css'

export default function SearchTab() {
    const [cards, getCards] = useState<IMTGCard[]>([]);

    function SearchBar() {
        const [message, setMessage] = useState('')
        const [input, setInput] = useState('')

        function handleCards(queryObj : IscryfallResult) {
            if (queryObj.details != undefined) {
                setMessage(queryObj.details)
            }

            if (queryObj.object == "error") {
                return;
            }
            const SearchTab = queryObj.data
            getCards((cards)=>cards = SearchTab)
        }

        function handleError() {
            setMessage((message)=>message="error")
        }

        function afterSubmit(event : React.FormEvent) {
            event.preventDefault()
            scryfallQuery(input).then(handleCards, handleError)
            return setMessage((message)=>message="searching")
        }
        
        const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
            const value = event.currentTarget.value
            setInput(value);
        }
    
        return (
        <div className='search-bar'>
            <form onSubmit={afterSubmit}>
                <input name="bootleg-scryfall-search" type="text" onChange={handleInputChange}></input>
                <button type="submit" >Search</button>
            </form>
            <span>{message}</span>
        </div>
        )
    }

    

    return (
    <div className='search-tab'>
        <SearchBar />
        
        <CardArray cards={cards}/>
        
    </div>
    )
}