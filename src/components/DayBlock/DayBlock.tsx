import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import selectedDayStore from '../../stores/selectedDayStore';
// @ts-ignore
import classes from './DayBlock.module.scss';

const DayBlock = (props: {
  dayIndex: number
  categoryId: number
  taskId: number
  id: number
}) => {

  const { setSelectedDay, selectedDay } = selectedDayStore;

  const inputRef = useRef<HTMLInputElement>(null);

  const isCurrentDaySelected = selectedDay
    && props.dayIndex === selectedDay.col
    && props.taskId === selectedDay.row
    && selectedDay.categoryIndex === props.categoryId;

  return (
    <div
      onClick={() => setSelectedDay(props.taskId, props.dayIndex, props.categoryId)}
      className={
        [
          classes.day_block,
          isCurrentDaySelected ? classes.day_block__selected : '',
        ].join(' ')
      }
    >
      <input
        ref={inputRef}
        data-category={props.categoryId}
        data-task={props.taskId}
        data-day={props.dayIndex}
        className={classes.day_block_input}
        value={props.id}
      />
    </div>
  );
};

export default observer(DayBlock);