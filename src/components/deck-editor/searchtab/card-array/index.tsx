import { useState, useContext } from 'react'
import { deckContext } from '../..';

import MTGCard from "../mtg-card";

import { ICard } from "../../../../types/card";
import { Deck } from '../../../../types/deck';


import eyeIconOpen from '../../../../assets/Left-Arrow.png'
import eyeIconClosed from '../../../../assets/Right-Arrow.png'

import './cardArray.css'

function deckIncludes(deck : Deck, cardObj: ICard) {
    for (let card of deck.maybeBoard) {
        if (card.name == cardObj.name) return true;
    }

    for (let card of deck.mainBoard) {
        if (card.name == cardObj.name) return true;
    }

    return false;
}

export default function CardArray( props : {cards : ICard[]}) {
    const [hideIncluded, setHideIncluded] = useState(false)
    const {deck} = useContext(deckContext)

    const cardDispArray = props.cards.map(card => <MTGCard key={card.id} CardObj={card}/>);

    switch (hideIncluded) {
        default: return (
            <>
                <button type='button' className='toggle-included' onClick={()=>setHideIncluded(true)}>
                    <img src={eyeIconOpen}></img>
                </button>
                <div className='card-array-wrapper'>
                        {cardDispArray}
        
                </div>
            </>
            )
        case true:
            const filteredCards = props.cards.filter(card => !deckIncludes(deck, card))
            const filteredArray = filteredCards.map(card => <MTGCard key={card.id} CardObj={card}/>)
            return (
                <>
                    <button type='button' className='toggle-included' onClick={()=>setHideIncluded(false)}>
                        <img src={eyeIconClosed}></img>
                    </button>
                    <div className='card-array-wrapper'>
                            {filteredArray}
            
                    </div>
                </>
                )
    }

    
}