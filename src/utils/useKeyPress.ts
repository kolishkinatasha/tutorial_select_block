import React, { useState } from 'react';

const useKeyPress = (targetKey: any) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: any) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }: any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  const leftHandler = ({ key }: any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  const rightHandler = ({ key }: any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    window.addEventListener('keyleft', leftHandler);
    window.addEventListener('keyright', rightHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      window.addEventListener('keyleft', leftHandler);
      window.addEventListener('keyright', rightHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;