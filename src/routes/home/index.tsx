import styled from "styled-components"

const HomeWrapper = styled.div`
    height: 90%;
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

const HeroWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Hero = styled.span`
    font-size: 200px;
    letter-spacing: -8px;
    
`

export default function Home() {
    return (
        <HomeWrapper>
            <HeroWrapper>
                <Hero>deck.crafter</Hero>
            </HeroWrapper>
        </HomeWrapper>
    )
}