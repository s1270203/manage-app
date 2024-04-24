import { FC, ReactNode, useState } from 'react';
import {
  Box,
  useTheme,
  Typography,
  AppBar,
  Card,
  Divider,
  
} from '@mui/material'
import { TaskProps } from '..';
import TaskItem from './TaskItem';

import {useDroppable} from '@dnd-kit/core';

interface TaskListLayoutProps {
  children?: ReactNode;
  tasks : TaskProps[];
  state: string;
  deleteTask: (id) => void;
  editTask: (task) => void;
}

const TaskListLayout: FC<TaskListLayoutProps> = ({tasks, state, deleteTask, editTask}) => {
  const theme = useTheme();
  const { setNodeRef } = useDroppable({
    id:state,
  });
  
  return (
    <Box ref={setNodeRef} key={state}>
      <Card 
        sx={{ 
          p:2,
          mt: state === "Created" ? 0 : 3,
          background: 
            state === "Created" ? theme.colors.alpha.black[10] : 
            state === "InProgress" ? theme.colors.info.lighter :
            theme.colors.success.lighter,
        }}
      >
        <Typography>{state}</Typography>
        <Divider
          sx={{
            mt: theme.spacing(3),
            background: theme.colors.alpha.black[100],
          }}
        />
        <Box sx={{ minHeight: "30px" }}>
          {tasks.map((task) => {
            return(
              <TaskItem key={task.id} task={task} deleteTask={deleteTask} editTask={editTask}/>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
}
export default TaskListLayout;