import styled from 'styled-components'

import {BsGridFill} from 'react-icons/bs'


export const TileWrapper = styled.div`
    margin-top: 8px;
    
    border: 1px solid ${props=>props.theme.tile.border};
    border-radius: 2px;

    display: flex;
`;

export const TileDisplay = styled.div`
    flex-grow: 1;
    
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    white-space: nowrap;
    overflow: hidden;
`

export const CardWrapper = styled.div<{open : true | false}>`
    flex-direction: column wrap;
    background-color: ${props=> props.open ? props.theme.accent : ""};
    border-radius: ${props=> props.open ? "5px" : ""};
    margin-bottom: ${props=> props.open ? "1px" : ""};
`

export const CardAtribute = styled.div<{align : "right" | "left" }>`
    ${props=>props.align == "right" ? "margin-left:auto" : "margin-right:auto"}
    align-self: flex-end;
`

export const Handle = styled.div`
    margin-left: 5px;
`;

export const GridIcon = styled(BsGridFill)`
    color: rgba(0,0,0,0.2);
    width: 12px;
    height: 12px;

    align-self: flex-start;
`