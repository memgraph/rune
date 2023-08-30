import { css, styled } from "styled-components";
import theme from "../../shared/theme";
import { fadeFromBottom } from "../../shared/animations";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Share2 as IconLogo } from "lucide-react";

interface AnimationProps {
    $animationDuration: string;
}

const animateFadeFromBottom = css<AnimationProps>`
    transform: translate3d(0, ${theme.spacing.large}, 0);
    opacity: 0;
    animation: ${fadeFromBottom} ${props => props.$animationDuration} ease-in-out forwards;
    animation-delay: 0.5s;
`;

export const Container = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 5%;
    background-color: ${(props) => props.theme.colors.primary};

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`;

const ContainerStyle = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const StartContainer = styled.section`
    ${ContainerStyle}
    align-items: flex-end;
    padding-top: ${props => props.theme.spacing.large};
    gap: ${props => props.theme.spacing.large};

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        justify-content: center;
        align-items: center;
    }
`;

export const DemoContainer = styled.section`
    ${ContainerStyle}
    align-items: center;
`;

export const GraphBlock = styled.div`
    width: 85%;
    height: 85%;
`;

export const TitleContainer = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: ${props => props.theme.spacing.medium};

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        align-items: center;
    }
`;

const TitleStyle = css`
    margin: 0;
    font-size: ${props => props.theme.fontSizes.xlarge};

    @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
        font-size: ${props => props.theme.fontSizes.large};
    }
`;

export const Title = styled.h1`
    ${TitleStyle};
    letter-spacing: ${props => props.theme.spacing.tiny};
    color: ${props => props.theme.colors.secondary};
`;

export const Subtitle = styled.h2`
    ${TitleStyle};
    display: flex;
    gap: ${props => props.theme.spacing.medium};
    align-items: center;
    margin: 0;
    color: ${props => props.theme.colors["accent-light"]};
`;

export const Logo = styled(IconLogo)`
    width: ${props => props.theme.spacing.xlarge};
    height: ${props => props.theme.spacing.xlarge};
`;

export const SearchBarAnimated = styled(SearchBar) <AnimationProps>`
    ${animateFadeFromBottom};
`;

export const DescriptionAnimated = styled.h3<AnimationProps>`
    ${animateFadeFromBottom};
    min-width: 280px;
    width: 35%;
    margin: 0;
    text-align: end;
    font-weight: ${props => props.theme.fontWeights.thin};
    font-size: ${props => props.theme.fontSizes.tiny};
    color: ${props => props.theme.colors.secondary};

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        text-align: center;
        width: 40%;
    }
`;

export const DescriptionLink = styled.a`
    text-decoration: none;
`;