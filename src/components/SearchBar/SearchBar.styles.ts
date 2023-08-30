import styled, { css } from "styled-components";
import { CornerDownLeft as IconReturn, Search as IconSearch, Loader2 as IconLoading, XCircle as IconError } from "lucide-react";
import { Link } from "react-router-dom";

interface DropDownProps {
    $isVisible: boolean;
}

interface DropDownElementProps {
    selected: boolean;
}

export const SearchContainer = styled.div`
    min-width: 280px;
    width: 45%;
    height: 3.5rem;
    z-index: 5;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.secondary};
`;

export const SearchIcon = styled(IconSearch)`
    width: 50%;
    height: 50%;
    color: ${props => props.theme.colors["accent-dark"]};
`;

export const SearchLabel = styled.label`
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const SearchInput = styled.input`
    width: 85%;
    height: 100%;
    outline: none;
    border: none;
    border-radius: ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fontSizes.small};
`;

export const DropDown = styled.div<DropDownProps>`
    width: 100%;
    max-height: 30vh;
    height: auto;
    min-height: 84px;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    display: ${props => props.$isVisible ? "flex" : "none"};
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    top: calc(100% - ${props => props.theme.spacing.small});
    padding-top: ${props => props.theme.spacing.small};
    border-radius: 0 0 ${props => props.theme.spacing.small} ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
`;

export const DropDownElement = styled.div<DropDownElementProps>`
    width: 100%;
    height: 32px;
    padding: ${props => props.theme.spacing.small};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: ${props => props.theme.spacing.medium};
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.selected ? props.theme.colors["secondary-dark"] : "inherit"};
    transition: 0.2s all;
`;

export const DropDownHintBlock = styled.div`
    width: 100%;
    height: ${props => props.theme.spacing.xlarge};
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${props => props.theme.spacing.small};
    padding: ${props => props.theme.spacing.small};
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors["primary-light"]};
    font-weight: ${props => props.theme.fontWeights.bold};
`;

export const DropDownHint = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: ${props => props.theme.spacing.small};
`;

export const DropDownHintIconBlock = styled.div`
    width: ${props => props.theme.spacing.large};
    height: ${props => props.theme.spacing.large};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.theme.spacing.smallish};
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.secondary};
`;

export const ElementLink = styled(Link)`
    width: 100%;
    text-decoration: none;
`;

export const ElementImage = styled.img`
    width: ${props => props.theme.fontSizes.medium};
    height: ${props => props.theme.fontSizes.medium};
    border-radius: ${props => props.theme.spacing.small};
`;

const Icon = css`
    width: ${props => props.theme.spacing.xlarge};
    height: ${props => props.theme.spacing.xlarge};
    color: ${props => props.theme.colors["accent-dark"]};
`;

export const LoadingIcon = styled(IconLoading)`
    ${Icon};
`;

export const ErrorIcon = styled(IconError)`
    ${Icon};
`;

export const ReturnIcon = styled(IconReturn)`
    width: ${props => props.theme.spacing.medium};
    height: ${props => props.theme.spacing.medium};
    margin-left: auto;
`;