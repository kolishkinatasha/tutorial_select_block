import { makeAutoObservable } from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  selectedDay: { row: number, col: number, categoryIndex: number } | null = null;

  setSelectedDay = (rowIndex: number, colIndex: number, categoryIndex: number) => {
    this.selectedDay = {
      row: rowIndex,
      col: colIndex,
      categoryIndex: categoryIndex,
    };
  };
}

const selectedDayStore = new Store();

export default selectedDayStore;