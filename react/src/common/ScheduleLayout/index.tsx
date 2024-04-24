import { 
  Box,
  Typography,
  Button,
  useTheme,
  TextField,
  Divider,
 } from '@mui/material';
import Modal from '@mui/material/Modal';

import { FC, ReactNode, useState, useEffect } from 'react';

import dayjs from 'dayjs';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { nanoid } from "nanoid";
let todayStr = new Date().toISOString().replace(/T.*$/, "");


interface ScheduleLayoutProps {
  children?: ReactNode;
}

interface ScheduleProps {
  id : string;
  title : string;
  start : string;
  end : string;
}

const ScheduleLayout: FC<ScheduleLayoutProps> = () => {
  const theme = useTheme();
  const [scheduleData,setScheduleData] = useState<ScheduleProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title,setTitle] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function handleDateSelect(selectInfo){
    // console.log(selectInfo);

    setStartDate(dayjs(selectInfo.start));
    setEndDate(dayjs(selectInfo.end));
    setModalOpen(true);
  }

  function handleSave (){
    console.log("startDate:",startDate.format("YYYY-MM-DDTHH:mm:ss"));
    console.log("endDate:",endDate.format("YYYY-MM-DDTHH:mm:ss"));
    console.log("title:",title);
    
    setScheduleData([
      ...scheduleData,
      {
        id : nanoid(),
        title : title,
        start : startDate.format("YYYY-MM-DDTHH:mm:ss"),
        end : endDate.format("YYYY-MM-DDTHH:mm:ss"),
      }
    ]);
    console.log(scheduleData);
    setModalOpen(false);
  }

  function handleModalClose(){
    setModalOpen(false);
  }


  return (
    <Box sx={{ height:"100%", width:"100%", p:2 }}>

      <FullCalendar
        locale="ja" // 日本語
        initialView="timeGridWeek" // 基本UI
        slotDuration="00:30:00" // 表示する時間軸の最小値
        selectable={true} // 日付選択可能
        allDaySlot={false} // alldayの表示設定
        titleFormat={{
          year: "numeric",
          month: "short",
          day: "numeric",
        }} // タイトルに年月日を表示
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "0:00",
          endTime: "24:00",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        select={handleDateSelect}
        // initialEvents={scheduleData}
        // ref={this.ref}
        // weekends={true} // 週末表示
        events={scheduleData} // 起動時に登録するイベント
        // select={this.handleSelect} // カレンダー範囲選択時
        // eventClick={eventHandler} // イベントクリック時
      />

      {/* TODO: 新規・変更時のモーダル表示 */}
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

          <Typography variant='h1'>Add Event</Typography>

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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <Typography variant='h3' sx={{ mt:2 }}>From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
            />
            <TimePicker
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              sx={{ ml:2 }}
            />
          </LocalizationProvider>

          <Typography variant='h3' sx={{ mt:2 }}>End</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
            />
            <TimePicker
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              sx={{ ml:2 }}
            />
          </LocalizationProvider>

          <Box sx={{mt:2}}>
            <Button 
              variant="contained" 
              onClick={handleSave}
            >
              保存
            </Button>
            <Button 
              onClick={handleModalClose}
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

export default ScheduleLayout;