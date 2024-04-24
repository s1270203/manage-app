import { FC, ReactNode, useState } from 'react';
import {
  useTheme,
  Card,
  Grid,
  Typography,
  Modal,
  Box,
  Divider,
  TextField,
  Button,
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { TaskProps } from '../..';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemLayoutProps {
  children?: ReactNode;
  task : TaskProps;
  deleteTask:(id) => void;
  editTask:(task) => void;
}

const TaskItemLayout: FC<TaskItemLayoutProps> = ({task,deleteTask,editTask}) => {
  const theme = useTheme();
  const [modalOpen,setModalOpen] = useState(false);
  const [title,setTitle] = useState(task.title);
  const [description,setDescription] = useState(task.description);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id:task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  function handleOpenEdit(){
    setModalOpen(true);
  }

  function handleCloseEdit(){
    setModalOpen(false);
  }

  function handleEditSave(){
    editTask({...task,title:title,description:description});
    setModalOpen(false);
  }

  return (
    <>
      <Card 
        key={task.id}
        ref={setNodeRef}
        style={style}
        sx={{ mt:2, p:1, background:"inherit" }}
        onDoubleClick={handleOpenEdit}
      >
        <Grid container>
          <Grid item >
            <DragIndicatorIcon {...attributes} {...listeners} sx={{  height: '100%', justifyContent: 'center' }}/>
          </Grid>
          <Grid item sx={{flexGrow:1}}>
            <Typography variant='h4' sx={{height:"100%",lineHeight:'30px'}}>{task.title}</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" size="small">
              <DeleteIcon fontSize="small" onClick={() => deleteTask(task.id)}/>
            </IconButton>
          </Grid>
        </Grid>
      </Card>

      <Modal
        open={modalOpen}
        onClose={close}
      >
        <Box
          sx={{
            top: '50%',
            left: '50%',
            position: 'fixed',
            width: '600px',
            height: '550px',
            transform: 'translate(-50%, -50%)',
            background:theme.colors.alpha.trueWhite[100],
            borderRadius:"10px",
            p: 4,
          }}
        >
          <Typography variant='h1'>Edit</Typography>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mb: theme.spacing(3),
              background: theme.colors.alpha.black[100],
            }}
          />
          <Typography variant='h3'>Title</Typography>
          <TextField 
            variant="outlined"
            placeholder='タイトル'
            required
            defaultValue={task.title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Typography variant='h3' sx={{ mt:2 }}>Description</Typography>
          <TextField 
            variant="outlined"
            placeholder='詳細'
            multiline
            minRows="7"
            fullWidth 
            defaultValue={task.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Box sx={{mt:2}}>
            <Button 
              variant="contained" 
              onClick={handleEditSave}
            >
              保存
            </Button>
            <Button 
              onClick={handleCloseEdit}
              sx={{ml:1}}
            >
              閉じる
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default TaskItemLayout;