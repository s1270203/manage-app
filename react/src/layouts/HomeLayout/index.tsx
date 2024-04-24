import { FC, ReactNode, useContext } from 'react';
import {
  Box,
  Grid,
  useTheme,
} from '@mui/material'

import TaskLayout  from '../../common/TaskLayout';
import ScheduleLayout from '../../common/ScheduleLayout';

interface HomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = () => {
  const theme = useTheme();
    return (
      <Box 
        sx={{
          height: "100vh",
          flexGrow:1,
          left: theme.sidebar.width,
          top: 0
        }}
      >

        <Grid container sx={{ height: "100%", flexGrow:1 }}>
          <Grid 
            item xs={8}
            sx={{
              background: theme.colors.alpha.trueWhite[100],
            }}
          >
            <ScheduleLayout/>
          </Grid>
          <Grid 
            item sx={{ flexGrow:1 }}
          >
            <TaskLayout/>
          </Grid>
        </Grid>
      </Box>
    );
}
export default HomeLayout;