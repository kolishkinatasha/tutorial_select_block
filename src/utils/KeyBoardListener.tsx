import { useEffect } from 'react';
import selectedDayStore from '../stores/selectedDayStore';

import useKeyPress from './keyboardControl';

const KeyBoardListener = () => {

  const daysNumber = 7;
  const { selectedDay, setSelectedDay } = selectedDayStore;
  const downPress = useKeyPress('ArrowDown');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');
  const upPress = useKeyPress('ArrowUp');

  const getRowIndex = (dayIndex: number, currentTaskId: number, currentCategoryId: number, step: number) => {
    const inputList = document.querySelectorAll('[data-day="' + dayIndex + '"]');
    let rowIndex = currentTaskId;
    let categoryIndex = currentCategoryId;
    inputList.forEach((input, index) => {
      const taskId = input.getAttribute('data-task');
      const categoryId = input.getAttribute('data-category');
      if (taskId && currentTaskId === +taskId && categoryId && currentCategoryId === +categoryId) {
        const newIndex = index + step;
        const row = inputList[newIndex];
        if (row) {
          rowIndex = +(row.getAttribute('data-task') || currentTaskId);
          categoryIndex = +(row.getAttribute('data-category') || -1);
        }
      }
    });

    return { rowIndex, categoryIndex };
  };

  useEffect(() => {
    const isInputFocused = document.activeElement && document.activeElement.tagName === 'INPUT';
    if (selectedDay && !isInputFocused) {
      let rowIndex = selectedDay.row;
      let colIndex = selectedDay.col;
      let categoryIndex = selectedDay.categoryIndex;

      if (downPress) {
        const row = getRowIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, + 1);
        categoryIndex = row.categoryIndex;
        rowIndex = row.rowIndex;
      } else if (upPress) {
        const row = getRowIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, -1);
        rowIndex = row.rowIndex;
        categoryIndex = row.categoryIndex;
      } else if (leftPress) {
        if (selectedDay.col === 0) {
          const prevRow = getRowIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, -1);
          categoryIndex = prevRow.categoryIndex;
          if (prevRow.rowIndex !== rowIndex) {
            colIndex = daysNumber - 1;
            rowIndex = prevRow.rowIndex;
          }
        } else {
          colIndex = selectedDay.col - 1;
        }
      } else if (rightPress) {
        if (selectedDay.col === daysNumber - 1) {
          const nextRow = getRowIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, +1);
          categoryIndex = nextRow.categoryIndex;
          if (nextRow.rowIndex !== rowIndex) {
            colIndex = 0;
            rowIndex = nextRow.rowIndex;
          }
        } else {
          colIndex = selectedDay.col + 1;
        }
      }

      setSelectedDay(rowIndex, colIndex, categoryIndex);
    }
  }, [leftPress, rightPress, upPress, downPress, selectedDay, setSelectedDay]);

  return null;
};

export default KeyBoardListener;