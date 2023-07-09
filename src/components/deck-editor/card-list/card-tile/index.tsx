import { IMTGCard } from "../../../../types/card"

import leftArrow from '../../../../assets/Left-Arrow.png'
import rightArrow from '../../../../assets/right-Arrow.png'
import './card-tile.css'

export function MTGTile (props : {cardObj : IMTGCard}) {
    return (
        <div className="card-tile">
            <button type="button"><img src={leftArrow}></img></button>
            <span>{props.cardObj.name}</span>
            <button type="button"><img src={rightArrow}></img></button>
        </div>
    )
}