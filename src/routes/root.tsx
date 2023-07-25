import { Outlet } from "react-router-dom"
import Header from "../components/header"
import styled from "styled-components"

const Window = styled.div`
    background-color: ${props=>props.theme.background};
    color: ${props=>props.theme.text};
    height: 100%;
`

export default function Root() {
    return (
    <Window>
        <Header />
        <Outlet />
    </Window>
    )
}