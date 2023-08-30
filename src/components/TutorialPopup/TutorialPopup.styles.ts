import { styled } from "styled-components";

interface PopupProps {
    x: number;
    y: number;
    disabled: boolean;
    direction?: string;
}

interface PopupButtonProps {
    disabled?: boolean;
}

export const Popup = styled.div<PopupProps>`
    width: 280px;
    height: auto;
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    padding: ${props => props.theme.spacing.medium};
    z-index: 7;
    display: ${props => props.disabled ? "none" : "flex"};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: ${props => props.theme.spacing.medium};
    text-align: center;
    background-color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors["primary-light"]};
    border-radius: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.secondary};
    transform: ${props => props.direction === "bottom" ? "translateY(-100%)" : ""};
    transition: all 0.5s;
`;

export const PopupData = styled.div`

`;

export const PopupControls = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PopupButton = styled.div<PopupButtonProps>`
    width: 33%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.accent};
    visibility: ${props => props.disabled ? "hidden" : "visible"};
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }
`;