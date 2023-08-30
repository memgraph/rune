import styled, { css } from "styled-components";
import { Loader2 as IconLoading, RotateCw as IconRetry, Share2 as IconChat, MoveRight as IconArrow, User2 as IconUser } from "lucide-react";

interface PromptDropDownProps {
    $isVisible: boolean;
}

interface PromptAreaProps {
    disabled: boolean;
}

interface PromptIconProps {
    disabled: boolean;
}

interface PromptSendBlockProps {
    disabled: boolean;
}

interface PromptDropDownPromptProps {
    disabled: boolean;
}

export const PromptContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: ${props => props.theme.spacing.medium};
    border: 1px solid ${props => props.theme.colors["primary-light"]};
    background-color: ${props => props.theme.colors["primary-neutral"]};
`;

export const PromptLabel = styled.label`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const PromptArea = styled.textarea<PromptAreaProps>`
    width: 85%;
    height: 100%;
    z-index: 5;
    display: table-cell;
    vertical-align: middle;
    padding: ${props => props.theme.spacing.medium};
    padding-top: 0;
    border: none;
    outline: none;
    border-radius: ${props => props.theme.spacing.medium} 0 0 ${props => props.theme.spacing.medium};
    font-size: ${props => props.theme.fontSizes.small};
    resize: none;
    background-color: ${props => props.theme.colors["primary-neutral"]};
    color: ${props => props.theme.colors.secondary};
    cursor: ${props => props.disabled ? "not-allowed" : "initial"};

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        padding: ${props => props.theme.spacing.small};
    }
`;

export const PromptButtonContainer = styled.div`
    width: 15%;
    height: 100%;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors["primary-neutral"]};
    border-radius: 0 ${props => props.theme.spacing.medium} ${props => props.theme.spacing.medium} 0;
`;

const AnimatedIcon = css`
    cursor: pointer;
    transition: 0.2s transform;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const PromptSendBlock = styled.div<PromptSendBlockProps>`
    ${props => props.disabled ? null : AnimatedIcon}
    width: ${props => props.theme.spacing.large};
    height: ${props => props.theme.spacing.large};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.accent};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
`;

export const PromptSendIcon = styled(IconArrow)`
    transform: scale(1.5);
    color: ${props => props.theme.colors.secondary};
`;

export const PromptIcon = styled(IconArrow) <PromptIconProps>`
    ${props => props.disabled ? null : AnimatedIcon}
    width: ${props => props.theme.spacing.large};
    height: ${props => props.theme.spacing.large};
    color: ${props => props.theme.colors.accent};
    cursor: ${props => props.disabled ? "not-allowed" : "initial"};
`;

export const PromptDropDown = styled.div<PromptDropDownProps>`
    width: calc(100% + 2px);
    height: ${props => (props.$isVisible ? "fit-content" : props.theme.spacing.medium)};
    max-height: 87vh;
    padding: ${props => props.theme.spacing.medium};
    position: absolute;
    bottom: calc(100% - ${props => props.theme.spacing.medium});
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    left: -1px;
    overflow-y: auto;
    border-radius: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.medium} 0 0;
    border: 1px solid ${props => props.theme.colors["primary-light"]};
    border-bottom: none;
    background-color: ${props => props.theme.colors["primary-neutral"]};
    transition: 0.5s all;

    & > * {
        display: ${props => (props.$isVisible ? "flex" : "none")};
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        height: ${props => (props.$isVisible ? "auto" : props.theme.spacing.medium)};
        max-height: 62vh;
        padding: ${props => props.theme.spacing.small};
        padding-bottom: ${props => props.theme.spacing.large};
    }
`;

export const PromptDropDownMessages = styled.div`
    width: 100%;
    flex-direction: column;
`;

export const LoadingIcon = styled(IconLoading)`
    width: ${props => props.theme.spacing.xlarge};
    height: ${props => props.theme.spacing.xlarge};
    color: ${props => props.theme.colors["accent-dark"]};
`;

export const PromptDropDownInfo = styled.div`
    width: 100%;
    flex-direction: column;
    gap: ${props => props.theme.spacing.medium};
    justify-content: center;
    align-items: center;
`;

export const PromptDropDownError = styled.div`
    width: auto;
    padding: ${props => props.theme.spacing.medium};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spacing.medium};
    border-radius: ${props => props.theme.spacing.medium};
    border: 1px solid ${props => props.theme.colors["error-accent"]};
    color: ${props => props.theme.colors.secondary};
`;

export const PromptDropDownRegenerateBlock = styled.div`
    ${AnimatedIcon}
    padding: ${props => props.theme.spacing.small};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spacing.medium};
    background-color: ${props => props.theme.colors["accent"]};
    border-radius: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.secondary};
    transition: 0.2s transform;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }

    &:hover > * {
        transform: rotate(45deg);
    }

    &:active > * {
        transform: rotate(90deg);
    }
`;

export const PromptDropDownRegenerateIcon = styled(IconRetry)`
    width: ${props => props.theme.spacing.medium};
    height: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.secondary};
    transition: 0.2s all;
`;

export const PromptDropDownPrompts = styled.div`
    width: 100%;
    height: auto;
    padding: ${props => props.theme.spacing.medium} 0;
    margin-bottom: ${props => props.theme.spacing.tiny};
    overflow: initial;
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing.medium};
`;

export const PromptDropDownPrompt = styled.div<PromptDropDownPromptProps>`
    padding: ${props => props.theme.spacing.small};
    border: 1px solid ${props => props.theme.colors["primary-light"]};
    border-radius: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.secondary};
    transition: 0.2s all;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};

    &:hover {
        background-color: ${props => props.disabled ? "inherit" : props.theme.colors["primary-light"]};
    }

    &:active {
        transform: ${props => props.disabled ? null : "scale(0.98)"};
    }
`;

const Icon = css`
    width: ${props => props.theme.spacing.medium};
    height: ${props => props.theme.spacing.medium};
`;

export const IconChatStyled = styled(IconChat)`
    ${Icon};
`;

export const IconUserStyled = styled(IconUser)`
    ${Icon};
`;

export const PromptDropDownMessage = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.large} 0;
    color: ${props => props.theme.colors.secondary};
`;

export const PromptIconBlock = styled.div`
    width: ${props => props.theme.spacing.large};
    height: ${props => props.theme.spacing.large};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.accent}
`;

export const PromptTextBlock = styled.div`
    width: 80%;
    word-wrap: break-word;

    & p, code {
        width: 100%;
        margin: 0;
        word-wrap: break-word;
        white-space: pre-wrap;
    }

    & ol {
        margin: 0;
    }

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