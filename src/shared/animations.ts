import { styled, keyframes } from "styled-components";
import theme from "./theme";

interface rotateHueProps {
    from: string,
    to: string,
};

const rotateHue = (props: rotateHueProps) => keyframes`
    0% {
        color: ${props.from};
    }

    50% {
        color: ${props.to};
    }

    100% {
        color: ${props.from};
    }
`;

const rotate = keyframes`
    from {
        transform: rotate(360deg);
    }
`;

export const fadeFromBottom = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, ${theme.spacing.large}, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;

export const AnimatedTextHue = styled.span`
    animation: ${(props) => rotateHue({ from: props.theme.colors["accent-light"], to: props.theme.colors["accent"] })} 16s linear infinite;
`;

export const AnimatedRotate = styled.div`
    animation: ${rotate} 2s linear infinite;
`;