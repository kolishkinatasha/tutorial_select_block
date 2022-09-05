import React from 'react';

// @ts-ignore
import classes from './TaskBlock.module.scss';
import DayBlock from '../DayBlock';

const TaskBlock = (props: {
  task: {id: number, worklogList: {id: number}[]},
  categoryId: number
}) => {

  return (
    <div className={classes.task_block}>
      <div className={classes.task_name}>Задача {props.task.id}</div>
        {
          props.task.worklogList.map((item: any, i: number) => (
            <DayBlock
              key={i}
              dayIndex={i}
              categoryId={props.categoryId}
              taskId={props.task.id}
              id={item.id}
            />
          ))
        }
    </div>
  );
};

export default TaskBlock;