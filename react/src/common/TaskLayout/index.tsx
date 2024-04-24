import { FC, ReactNode, useState } from 'react';
import { nanoid } from "nanoid";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';

import {
  Box,
  useTheme,
  Typography,
  Grid,
  Divider,
  Button,
  Modal,
  TextField,
} from '@mui/material';

import TaskList from './TaskList';
import TaskItem from './TaskList/TaskItem';

interface TaskLayoutProps {
  children?: ReactNode;
}

export interface TaskListProps {
  id: string;
  tasks: TaskProps[];
}

export interface TaskProps {
  id : string;
  title : string;
  description : string;
}

const TaskLayout: FC<TaskLayoutProps> = () => {
  const theme = useTheme();
  const [allTaskList, setAllTaskList] = useState<TaskListProps[]>([{id:"Created",tasks:[]},{id:"InProgress",tasks:[]},{id:"Completed",tasks:[]}]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [title,setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeDrag,setActiveDrag] = useState<TaskProps>();

  function handleAddTask(){
    setTitle("");
    setDescription("");
    setAddModalOpen(true);
  }

  function handleAddModalClose(){
    setAddModalOpen(false);
  }

  function handleAddSave(){
    setAllTaskList(
      allTaskList.map((list) => (
        list.id === "Created" ? {
          id:list.id,
          tasks:[
            ...list.tasks,
            {id:nanoid(),title:title,description:description}
          ]
        } : list 
      ))
    );
    setAddModalOpen(false);
  }

  function handleDelete(id: String){
    setAllTaskList(
      allTaskList.map((list) => ({
        id:list.id,
        tasks:list.tasks.filter((task) => task.id !== id)
      }))
    );
  }

  function handleEdit(EditedTask:TaskProps){
    setAllTaskList(
      allTaskList.map((list) => ({
        id:list.id,
        tasks:list.tasks.map((task) => (
          task.id === EditedTask.id ? EditedTask : task
        ))
      }))
    );
  }

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    // overの対象がcolumnの場合があるためそのままidを返す
    if (allTaskList.some((c) => c.id === unique)) {
      return allTaskList.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = allTaskList.flatMap((list) => {
      const columnId = list.id;
      return list.tasks.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return allTaskList.find((c) => c.id === columnId) ?? null;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeId = String(active.id);
    const activeColumn = findColumn(activeId);
    const activeTasks = activeColumn.tasks;
    const activeIndex = activeTasks.findIndex((i) => i.id === activeId);
    setActiveDrag(activeTasks[activeIndex]);
  }

  const handleDragEnd = ({ active, over}: DragEndEvent) => {
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    const activeTasks = activeColumn.tasks;
    const activeIndex = activeTasks.findIndex((i) => i.id === activeId);


    //以下条件の時、スキップ
    if(!activeColumn || !overColumn || activeColumn === overColumn){
      return;
    }

    //DNDしたタスク新ステータスに追加 & 元ステータスから、DNDしたタスクを削除
    setAllTaskList(
      allTaskList.map((list) => (
        list.id === activeColumn.id ? {
          id:list.id,
          tasks:list.tasks.filter((task) => task.id !== activeId)
        } :
        list.id === overColumn.id ? {
          id:list.id,
          tasks:[
            ...list.tasks,
            activeTasks[activeIndex]
          ]
        } : list 
      ))
    );
  }

  return (
    <Box sx={{ height:"100%", width:"100%", p:2 }}>
      <Grid container sx={{p:2}}>
        <Grid item> 
          <Typography variant='h3'>タスク管理</Typography>
        </Grid>
        <Grid item sx={{flexGrow:1, textAlign:'right'}}>
          <Button variant='contained' onClick={handleAddTask}>追加</Button>
        </Grid>
      </Grid>
      
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box sx={{ height:"100%", width:"100%", p:2 }}>
          {allTaskList.map((list) => {
            return(
              <TaskList key={list.id} tasks={list.tasks} state={list.id} deleteTask={handleDelete} editTask={handleEdit}/>
            );
          })}
        </Box>
        <DragOverlay>
          <TaskItem task={activeDrag} deleteTask={handleDelete} editTask={handleEdit}/>
        </DragOverlay>
      </DndContext>

      <Modal
        open={addModalOpen}
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
          <Typography variant='h1'>Add Task</Typography>
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Box sx={{mt:2}}>
            <Button 
              variant="contained" 
              onClick={handleAddSave}
            >
              保存
            </Button>
            <Button 
              onClick={handleAddModalClose}
              sx={{ml:1}}
            >
              閉じる
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
export default TaskLayout;