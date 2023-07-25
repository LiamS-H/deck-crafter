import {createGlobalStyle} from "styled-components"

export const GlobalTheme = {
    text : "#fefbfd",
    background : "#080207",
    container : "#155123",
    group : "#061418",
    accent : "#31b951",
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