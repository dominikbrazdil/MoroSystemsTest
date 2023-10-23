'use client';

import { Task } from './models/task';
import React, { useState } from 'react';
import { TextField } from '@mui/material';

export default function TaskInput({createTask}: {createTask: (task: Task) => void,}) {

  const [description, setDescription] = useState('');

  function onTaskCreate() {
    if (description) {
      createTask({
        creationDate: new Date(),
        description: description,
        isDone: false,
      });

      setDescription('');
    }
  }

  return (
    <TextField
      placeholder="What to do?"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      onBlur={(_) => onTaskCreate()}
    />

  );
}