import { useEffect } from 'react';
import selectedDayStore from '../stores/selectedDayStore';

import useKeyPress from './useKeyPress';

const KeyBoardListener = () => {

  // вводим переменную задающую количество отображаемых дней
  const daysNumber = 7;

  // получаем из стора текущее значение выбранного дня и функцию сеттер
  const { selectedDay, setSelectedDay } = selectedDayStore;

  // переменные для событий нажатий на клавиши
  const downPress = useKeyPress('ArrowDown');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');
  const upPress = useKeyPress('ArrowUp');

  // функция получения индекса строки (индекса задачи)
  const getRowIndex = (dayIndex: number, currentTaskId: number, currentCategoryId: number, step: number) => {
    // получаем список инпутов которые имеют дата атрибут равный текущему выбранному dayIndex
    const inputList = document.querySelectorAll('[data-day="' + dayIndex + '"]');
    let rowIndex = currentTaskId;
    let categoryIndex = currentCategoryId;
    // пробегаемся в цикле по массиву инпутов 
    inputList.forEach((input, index) => {
      // получаем значения data-task и data-category атрибута 
      const taskId = input.getAttribute('data-task');
      const categoryId = input.getAttribute('data-category');
      // если .... 
      // то изменить значение на заданный шаг (+-1), то есть перейти к следующему или в предыдущему индексу задачи
      if (taskId && currentTaskId === +taskId && categoryId && currentCategoryId === +categoryId) {
        const newIndex = index + step;
        const row = inputList[newIndex];
        // задаём новые значения 
        if (row) {
          rowIndex = +(row.getAttribute('data-task') || currentTaskId);
          categoryIndex = +(row.getAttribute('data-category') || -1);
        }
      }
    });

    // возвращаем вычесленные данные
    return { rowIndex, categoryIndex };
  };

  useEffect(() => {
    // получаем текущий выбранный элемент (input)
    const isInputFocused = document.activeElement && document.activeElement.tagName === 'INPUT';
    if (selectedDay && !isInputFocused) {
      let rowIndex = selectedDay.row;
      let colIndex = selectedDay.col;
      let categoryIndex = selectedDay.categoryIndex;

      // при нажатии на клавиши стрелок вызываем функцию определения rowIndex и categoryIndex
      if (downPress) {
        // если нажата клавиша вниз шаг у нас + 1 т.к. ___TODO___
        const row = getRowIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, + 1);
        categoryIndex = row.categoryIndex;
        rowIndex = row.rowIndex;
      } else if (upPress) {
        // если нажата клавиша вверх шаг у нас - 1 т.к. ___TODO___
        const row = getRowIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, -1);
        rowIndex = row.rowIndex;
        categoryIndex = row.categoryIndex;
      } else if (leftPress) {
        // если нажата клавиша влево шаг у нас - 1 т.к. ___TODO___
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
        // если нажата клавиша вправо шаг у нас + 1 т.к. ___TODO___
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

      // задаём новый выбранный жлемент через сеттер
      setSelectedDay(rowIndex, colIndex, categoryIndex);
    }
  }, [leftPress, rightPress, upPress, downPress, selectedDay, setSelectedDay]);

  return null;
};

export default KeyBoardListener;