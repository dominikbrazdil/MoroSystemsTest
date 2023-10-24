'use client';

import { Task as TaskModel } from './models/task';
import Task from './task';
import React, { useState } from 'react';
import TaskInput from './task-input';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FilterOption } from './models/FilterOption';

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

  const [filter, setFilter] = useState(FilterOption.ALL);

  const [filteredTasks, setFilteredTasks] = useState(FilterOption.filterTasks(tasks, filter));

  function onTasksChange(newTasks: TaskModel[]) {
    setTasks(newTasks);
    setFilteredTasks(FilterOption.filterTasks(newTasks, filter));
  }

  function onFilterChange(newFilter: FilterOption) {
    setFilter(newFilter);
    setFilteredTasks(FilterOption.filterTasks(tasks, newFilter));
  }

  function updateTask(task: TaskModel, i: number) {
    onTasksChange([
      ...tasks.slice(0, i),
      task,
      ...tasks.slice(i+1)
    ]);
  }

  function deleteTask(i: number) {
    onTasksChange([
      ...tasks.slice(0, i),
      ...tasks.slice(i+1)
    ]);
  }

  function addTask(task: TaskModel) {
    onTasksChange([
      ...tasks,
      task
    ]);
  }

  return (
    <div className={'flex flex-col gap-4 items-center m-10'}>
      <TaskInput createTask={addTask}/>

      <ul>
        {filteredTasks.map((task, i) =>
          <div key={task.creationDate.getTime()} className={'flex flex-row gap-2'}>
            <Task inputTask={task}
                  updateTask={(task: TaskModel) => updateTask(task, i)}
                  deleteTask={() => deleteTask(i)}
            />
          </div>,
        )}
      </ul>

      <div className={'flex flex-row gap-4 items-center'}>
        <span>{tasks.filter(t => !t.isDone).length} tasks to go!</span>

        <ToggleButtonGroup
          color="primary"
          value={filter}
          exclusive
          onChange={(e, filter) => onFilterChange(filter)}
          aria-label="Filter"
        >
          <ToggleButton value={FilterOption.ALL}>All</ToggleButton>
          <ToggleButton value={FilterOption.TODO}>TODO</ToggleButton>
          <ToggleButton value={FilterOption.DONE}>Done</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}


