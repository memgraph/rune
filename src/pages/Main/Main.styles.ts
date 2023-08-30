import styled, { css } from "styled-components";
import { Copy } from "lucide-react";

interface DataBlockProps {
    state: number;
}

const Block = css`
    border-radius: ${props => props.theme.spacing.medium};
    border: 1px solid ${props => props.theme.colors["primary-light"]};
    background-color: ${props => props.theme.colors["primary-neutral"]};
`;

export const Container = styled.main`
    width: 100%;
    min-height: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 5%;
    background-color: ${props => props.theme.colors.primary};

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        flex-direction: column-reverse;
        justify-content: flex-start;
        align-items: center;
    }
`;

export const DataContainer = styled.section`
    width: 45%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: ${props => props.theme.spacing.medium};
    align-items: center;

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        width: 100%;
        min-height: 60vh;

        &:first-child {
        margin-bottom: ${props => props.theme.spacing.medium};
    }
    }
`;

export const DataBlock = styled.div<DataBlockProps>`
    ${Block};
    width: 100%;
    height: ${props => props.state ? props.state * 35 + 10 + "vh" : "62px"};
    overflow-y: ${props => props.state ? "auto" : "hidden"};
    padding: ${props => props.theme.spacing.large};
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.medium};
    position: relative;
    transition: 0.3s all;

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        width: 85%;
        height: ${props => props.state ? props.state * 40 + 5 + "vh" : "48px"};
        padding: ${props => props.theme.spacing.medium};
    }
`;

export const ControlBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const CodeTitleBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CodeTitle = styled.div`
    display: flex;
    flex-wrap: wrap;
    word-wrap: break-word;
    max-width: fit-content;
    font-size: ${props => props.theme.fontSizes.large};
    color: ${props => props.theme.colors.secondary};
    transition: transform 0.3s;

    & a {
        cursor: pointer;
        transition: transform 0.2s;
    }

    & a:hover {
        transform: scale(1.02);
    }

    & a:active {
        transform: scale(0.98);
    }
`;

export const CodeTitleAnimated = styled(CodeTitle)`
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const RepoTitleBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: ${props => props.theme.spacing.small};
`;

export const RepoImage = styled.img`
    width: ${props => props.theme.spacing.medium};
    height: ${props => props.theme.spacing.medium};
    border-radius: ${props => props.theme.spacing.tiny};
`;

export const RepoLink = styled.a`
    text-decoration: none;
    color: ${props => props.theme.colors.secondary};
`;

export const RepoSubtitle = styled.h3`
    margin: 0;
    font-size: ${props => props.theme.fontSizes.small};
    font-weight: ${props => props.theme.fontWeights.thin};
    color: ${props => props.theme.colors.secondary};
`;

export const RepoCopyBlock = styled.div`
    ${Block};
    width: 80%;
    min-height: ${props => props.theme.spacing.large};
    height: auto;
    margin-top: ${props => props.theme.spacing.large};
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    color: ${props => props.theme.colors.secondary};

    @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
        width: 100%;
    }
`;

export const RepoCopyLink = styled.span`
    max-width: 85%;
    margin: ${props => props.theme.spacing.small};
`;

export const RepoCopyIcon = styled(Copy)`
    width: ${props => props.theme.spacing.medium};
    height: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.accent};
`;

export const RepoCopyIconBlock = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${props => props.theme.colors["primary-light"]};
    background-color: ${props => props.theme.colors["primary-light"]};
    cursor: pointer;
`;

export const GraphContainer = styled.section`
    width: 45%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        width: 100%;
        min-height: 70vh;
    }
`;

export const GraphBlock = styled.div`
    ${Block};
    width: 85%;
    height: 80%;
`;

export const PromptBlock = styled.div`
    width: 85%;
    height: 10%;
`;