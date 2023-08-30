import styled, { css, keyframes } from "styled-components";
import { Copy as IconCopy, Share2 as IconGraph, Sparkles as IconImprove } from "lucide-react";

interface PopupProps {
    x: number;
    y: number;
    clientWidth: number;
    $isVisible: boolean;
    direction?: string;
}

interface CopiedBlockProps {
    x: number;
    y: number;
}

const fadeUpAndOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-40px);
    }
`;

export const Popup = styled.div<PopupProps>`
    z-index: 5;
    width: 339px;
    display: ${props => props.$isVisible ? "flex" : "none"};
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: ${props => props.y + 60}px;
    left: ${props => props.x - props.clientWidth / 3 < 0 ? 0 : props.x - props.clientWidth / 3}px;
    background-color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors["primary-light"]};
    border-radius: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.secondary};

    & :last-child {
        border-right: none;
        border-radius: 0 ${props => props.theme.spacing.small} ${props => props.theme.spacing.small} 0;
    }

    & :first-child {
        border-radius: ${props => props.theme.spacing.small} 0 0 ${props => props.theme.spacing.small};
    }

    &:after {
        content: "";
        z-index: 4;
        position: absolute;
        right: calc(50% - ${props => props.theme.spacing.medium} / 2 - ${props => props.x - props.clientWidth / 3 < 0 ? props.x - props.clientWidth / 3 : 0}px);
        top: ${props => props.direction === "bottom" ? `calc(100% - ${props.theme.spacing.medium} / 2)` : `calc(-${props.theme.spacing.medium} / 2)`};
        width: ${props => props.theme.spacing.medium};
        height: ${props => props.theme.spacing.medium};
        background-color: white;
        display: block;
        transform: ${props => props.direction === "bottom" ? "rotate(45deg)" : "rotate(225deg)"};
        background-color: ${props => props.theme.colors.primary};
        border-right: 1px solid ${props => props.theme.colors["primary-light"]};
        border-bottom: 1px solid ${props => props.theme.colors["primary-light"]};
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        width: 260px;
        top: ${props => props.y + 24}px;
    }
`;

export const PopupButton = styled.div`
    z-index: 5;
    min-width: ${props => props.theme.spacing.medium};
    width: auto;
    height: 100%;
    padding: ${props => props.theme.spacing.medium};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.small};
    border-right: 1px solid ${props => props.theme.colors["primary-light"]};
    transition: 0.2s all;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.colors["primary-light"]};
    }

    & > * {
        transition: 0.2s all;
    }

    &:hover > * {
        transform: scale(1.1);
    }

    &:active > * {
        transform: scale(0.98);
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        padding: ${props => props.theme.spacing.small};
    }
`;

const Icon = css`
    width: ${props => props.theme.spacing.large};
    height: ${props => props.theme.spacing.large};
    color: ${props => props.theme.colors.secondary};
`;

export const GraphIcon = styled(IconGraph)`
    ${Icon};
`;

export const CopyIcon = styled(IconCopy)`
    ${Icon};
`;

export const ImproveIcon = styled(IconImprove)`
    ${Icon};
`;

export const CopiedBlock = styled.div<CopiedBlockProps>`
    position: absolute;
    top: ${props => props.y - 16}px;
    left: ${props => props.x - 16}px;
    z-index: 7;
    animation: ${fadeUpAndOut} 1s ease forwards;
    color: white;
`;