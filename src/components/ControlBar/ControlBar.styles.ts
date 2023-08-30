import styled, { css } from "styled-components";

export const ControlContainer = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.medium};
`;

const Round = css`
    width: ${props => props.theme.spacing.medium};
    height: ${props => props.theme.spacing.medium};
    border-radius: calc(${props => props.theme.spacing.medium} / 2);
    cursor: pointer;
    transition: 0.2s transform;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const Expand = styled.div`
    ${Round};
    background-color: ${props => props.theme.colors.success};
`;

export const Shrink = styled.div`
    ${Round};
    background-color: ${props => props.theme.colors.warning};
`;

export const Close = styled.div`
    ${Round};
    background-color: ${props => props.theme.colors.error};
`;