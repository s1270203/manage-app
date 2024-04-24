import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import HomeLayout from 'src/layouts/HomeLayout';
import ScheduleLayout from './common/ScheduleLayout';
import TaskLayout from './common/TaskLayout';
import { Task } from '@mui/icons-material';

const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout/>,
    children: [
      {
        path: '',
        element:  <HomeLayout/>
      },
      {
        path: '/Schedule',
        element:  <ScheduleLayout/>
      },
      {
        path: '/Task',
        element:  <TaskLayout/>
      }
    ]
  }
];

export default routes;
