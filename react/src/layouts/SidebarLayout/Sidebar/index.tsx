import { useContext } from 'react';
// import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import SidebarMenu from './SidebarMenu';
// import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <Tooltip arrow title="Toggle Menu" placement="bottom-start">
        <IconButton
          color="primary"
          onClick={toggleSidebar}
          sx={{
            display: {
              xs: 'inline-block',
              lg: 'none'
            },
            position: 'fixed',
            right: theme.spacing(3),
            top: theme.spacing(3),
            zIndex: '9999'
          }}
          size='large'
        >
          {!sidebarToggle ? (
            <MenuTwoToneIcon fontSize="large" />
          ) : (
            <CloseTwoToneIcon fontSize="large" />
          )}
        </IconButton>
      </Tooltip>
      
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Box mt={3}>
          <Box
            mx={2}
            sx={{
              width: 52
            }}
          >
            <Typography variant="h1" sx={{color: theme.colors.alpha.trueWhite[100]}}>
              MyTMS
            </Typography>
          </Box>
        </Box>
        <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
        <SidebarMenu/>
      </SidebarWrapper>

      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? alpha(lighten(theme.header.background, 0.1), 0.5)
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
              <Typography variant="h1" sx={{color: theme.colors.alpha.trueWhite[100]}}>
                MyTMS
              </Typography>
            </Box>
          </Box>
          <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
          <SidebarMenu/>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
