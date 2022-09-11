import React from 'react';

// @ts-ignore
import classes from './TaskBlock.module.scss';
import DayBlock from '../DayBlock';

const TaskBlock = (props: {
  task: {taskId: number, days: {dayId: number}[]},
  categoryId: number
}) => {

  return (
    <div className={classes.task_block}>
      <div className={classes.task_name}>Задача {props.task.taskId}</div>
        {
          props.task.days.map((item: any, i: number) => (
            <DayBlock
              key={i}
              dayIndex={i}
              categoryId={props.categoryId}
              taskId={props.task.taskId}
              id={item.dayId}
            />
          ))
        }
    </div>
  );
};

export default TaskBlock;