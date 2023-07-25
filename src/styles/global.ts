import {createGlobalStyle} from "styled-components"

export const GlobalTheme = {
    background : "rgb(103, 96, 109)",
    container : "#dfdfff",
    group : "#f4cccc",
    tile : {
        border: "#fdfdfd10",
        background: "",
    }
    
}

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }
    body {
        height: 100%;
    }
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }
    #root{
        margin:0 auto;
        height: 100%;
    }
 `