import React from 'react';

// @ts-ignore
import classes from './Header.module.scss';

const Header = () => {

  const daysNameOfTheWeek = ['1 ВС', '2 ПН', '3 ВТ', '4 СР', '5 ЧТ', '6 ПТ', '7 СБ'];

  return (
    <div className={classes.header}>
      {
        daysNameOfTheWeek.map(item => (
          <div key={item} className={classes.day}>
            {item}
          </div>
        ))
      }
    </div>
  );
};

export default Header;