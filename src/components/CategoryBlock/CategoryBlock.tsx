import React from 'react';

import TaskBlock from '../TaskBlock/TaskBlock';

// @ts-ignore
import classes from './CategoryBlock.module.scss';

const CategoryBlock = (props: {dataItem: any}) => {
  return (
    <div className={classes.planer_block}>
      <div className={classes.category_title}>Категория {props.dataItem.id}</div>
        {
          props.dataItem.tasks.map((task: any) => (
            <TaskBlock categoryId={props.dataItem.id} task={task} />
          ))
        }
    </div>
  );
};

export default CategoryBlock;