import { MenuItem, Link } from '@mui/material';
import { useLocation } from 'react-router';
import { darkBlue, darkPurple } from '../../modules/theme';
import styled from 'styled-components';

export const Menu = styled.div`
    font-weight: bold;
    color: ${darkBlue};
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
`;

export const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    align-items: center;
`;

export const StyledItem = styled(MenuItem)`
    width: 100%;
`;

export const RouteMenuItem = (props: any) => {
    const display = props.display
    const path = props.path
    const findPath = () => {
        const location = useLocation();
        return location.pathname;
    }
    const isColored = (path == findPath()) ? darkPurple : darkBlue
    return (
        <StyledItem>
            <Link href={path} underline="none" sx={{width: '100%', color: isColored, 'font-size': '2vw'}}>
                {display} 
            </Link>
        </StyledItem>
    )
}
