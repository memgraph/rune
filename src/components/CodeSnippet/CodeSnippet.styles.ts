import { Prism } from "react-syntax-highlighter";
import styled from "styled-components";
import theme from "../../shared/theme";

/* !important for overriding library styles */
export const CodeBlock = styled(Prism)`
    width: 100%;
    height: 100%;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    overflow-anchor: initial!important;

    & > * {
        word-wrap: break-word!important;
    }
`;

export const RawCodeBlock = styled.div`
    color: ${props => props.theme.colors.secondary};

    & a {
        transition: all 0.2s;
    }

    & a:link {
        color: ${props => props.theme.colors["accent-light"]};
        text-decoration: none;
    }

    & a:visited {
        color: ${props => props.theme.colors["accent-dark"]};
        text-decoration: none;
    }

    & a:hover {
        transform: scale(1.01);
        color: ${props => props.theme.colors.accent};
        text-decoration: underline;
    }

    & a:active {
        transform: scale(0.99);
        color: ${props => props.theme.colors.accent};
        text-decoration: underline;
    }
`;

export const CodeStyle = {
    position: "relative",
    overflowX: "hidden",
    backgroundColor: theme.colors["primary-neutral"],
    padding: 0,
    overflowAnchor: "none",
}