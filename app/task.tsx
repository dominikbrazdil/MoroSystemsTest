'use client';

import { Task } from './models/task';
import { BsFillTrashFill } from 'react-icons/bs';
import React, { useState } from 'react';
import { Checkbox, IconButton, TextField } from '@mui/material';

export default function Task({inputTask, updateTask, deleteTask}:
                               {
                                 inputTask: Task,
                                 updateTask: (task: Task) => void,
                                 deleteTask: () => void
                               }) {

  const [task, setTask] = useState(inputTask);
  const [isEdit, setIsEdit] = useState(false);

  function onTaskStateChange(state: boolean) {
    setTask({...task, isDone: state});
    updateTask({...task, isDone: state});
  }

  function saveTaskDescription() {
    task.description ?
      updateTask(task) :
      deleteTask();
    setIsEdit(false);
  }

  function onTaskRemove() {
    deleteTask();
  }

  return (
    <div className={'flex flex-row gap-2 justify-center'}>
      <Checkbox checked={task.isDone} onChange={(e) => onTaskStateChange(e.target.checked)}></Checkbox>

      {isEdit ?
        <TextField
          autoFocus
          placeholder="What to do?"
          value={task.description}
          onChange={(e) => setTask({...task, description: e.target.value})}
          onBlur={e => saveTaskDescription()}
        /> :
        <li onClick={() => setIsEdit(true)} className={'flex flex-row items-center'}>
          {task.description}
        </li>
      }

      <IconButton onClick={onTaskRemove} color="error" className={'flex'}>
        <BsFillTrashFill/>
      </IconButton>
    </div>

  );
}