import styled from "styled-components";

interface RadioLabelProps {
    selected: boolean;
}

export const RadioContainer = styled.div`
    display: flex;
    border: 1px solid ${props => props.theme.colors["primary-light"]};
    border-radius: ${props => props.theme.spacing.small};
`;

export const RadioLabel = styled.label<RadioLabelProps>`
    display: flex;
    align-items: center;
    gap: var(--size-2-2);
    padding: 8px;
    background-color: ${props => props.selected ? props => props.theme.colors["primary-light"] : props => props.theme.colors.primary};
    border-right: 1px solid ${props => props.theme.colors["primary-light"]};
    transition: all 0.3s;
    color: ${props => props.theme.colors["secondary-neutral"]};
    cursor: pointer;

    &:hover {
    color: ${props => props.theme.colors["primary-light"]};
    background-color: ${props => props.theme.colors["secondary-dark"]};
}

    &:first-child {
    border-radius: ${props => props.theme.spacing.small} 0 0 ${props => props.theme.spacing.small};
}

    &:last-child {
    border-right: none;
    border-radius: 0 ${props => props.theme.spacing.small} ${props => props.theme.spacing.small} 0;
}
`;

export const RadioInput = styled.input`
    display: none;
    color: ${props => props.theme.colors["secondary-neutral"]};
`;