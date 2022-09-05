import React from 'react';

import KeyBoardListener from '../../utils/KeyBoardListener';
import CategoryBlock from '../CategoryBlock';
import Header from '../Header';
import { data } from '../../data/data';

const App = () => {
  return (
    <React.Fragment>
      <KeyBoardListener />
      <Header />
      <div>
        {
          data.map((item: any, index: number) => <CategoryBlock key={index} dataItem={item} /> )
        }
      </div>
    </React.Fragment>
  );
}

export default App;