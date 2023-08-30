import { createGlobalStyle } from 'styled-components';
import '@fontsource/roboto';

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    html, body, #root {
        margin: 0;
        padding: 0;
        min-width: 320px;
        width: 100%;
        min-height: 100vh;
        height: 100%;
    }

    ::selection {
        background-color: ${props => props.theme.colors['accent-dark']};
    }

    ::-webkit-scrollbar {
        width: ${props => props.theme.spacing.small};
    }

    ::-webkit-scrollbar-track {
        background: none;
    }

    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors['secondary-dark']};
        border-radius: ${props => props.theme.spacing.tiny};
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.colors['secondary-neutral']};
        cursor: pointer;
    }

    #root {
        font-family: 'Roboto', sans-serif;
    }
`;

export default GlobalStyles;