'use client';

import { Task as TaskModel } from './models/task';
import Task from './task';
import React, { useState } from 'react';
import TaskInput from './task-input';

export default function TaskList() {

  const [tasks, setTasks] = useState([
    {
      creationDate: new Date(0),
      description: 'Task1',
      isDone: false,
    },
    {
      creationDate: new Date(1),
      description: 'Task2',
      isDone: true,
    }] as TaskModel[]);

  function updateTask(task: TaskModel, i: number) {
    setTasks([
      ...tasks.slice(0, i),
      task,
      ...tasks.slice(i+1)
    ]);
  }

  function deleteTask(i: number) {
    setTasks([
      ...tasks.slice(0, i),
      ...tasks.slice(i+1)
    ]);
  }

  function addTask(task: TaskModel) {
    setTasks([
      ...tasks,
      task
    ]);
  }

  return (
    <>
      <TaskInput createTask={addTask}/>

      <ul>
        {tasks.map((task, i) =>
          <div key={task.creationDate.getTime()} className={'flex flex-row gap-2'}>
            <Task inputTask={task}
                  updateTask={(task: TaskModel) => updateTask(task, i)}
                  deleteTask={() => deleteTask(i)}
            />
          </div>,
        )}
      </ul>

      <span>Remaining tasks: { tasks.filter(t => !t.isDone).length }</span>
    </>
  );
}
