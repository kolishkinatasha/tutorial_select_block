import React from 'react';

import TaskBlock from '../TaskBlock/TaskBlock';

// @ts-ignore
import classes from './CategoryBlock.module.scss';

const CategoryBlock = (props: {dataItem: any}) => {
  return (
    <div className={classes.planer_block}>
      <div className={classes.category_title}>Категория {props.dataItem.categoryId}</div>
        {
          props.dataItem.tasks.map((task: any) => (
            <TaskBlock key={task.taskId} categoryId={props.dataItem.categoryId} task={task} />
          ))
        }
    </div>
  );
};

export default CategoryBlock;