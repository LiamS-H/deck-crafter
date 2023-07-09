import MTGCard from "../mtg-card";

import { IMTGCard } from "../../../../types/card";

import './cardArray.css'

export default function CardArray( props : {cards : IMTGCard[]}) {
    
    const cardDispArray = props.cards.map(card => <MTGCard key={card.id} CardObj={card}/>);
    
    return (
        <div className='card-array-wrapper'>
                {cardDispArray}

        </div>
    )
}