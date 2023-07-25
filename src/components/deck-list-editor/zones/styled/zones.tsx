import styled from "styled-components";

export const ZoneWrapper = styled.div`
    background-color: ${props=>props.theme.container};
    border-radius: 5px;
    margin-left: 1px;

    display: flex;
    flex-flow: column nowrap;
    width: 325px;
    overflow-y: auto;
`;

export const MainZoneWrapper = styled.div`
    background-color: transparent;
    border-radius: 5px;
    margin: 1px;

    display: flex;
    flex-flow: column wrap;
    flex-grow: 1;
`;

export const ZoneTitle = styled.h3`
    padding: 8px;
`;

export const DropZone = styled.div`
    flex-grow: 1;
`