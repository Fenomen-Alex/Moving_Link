import { useEffect, useState } from 'react';

const useMovement = () => {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('down');

  const move = (dir) => {
    setDirection(dir)
    switch (dir) {
      case 'up':
        setY(y => y - 20);
        break;
      case 'left':
        setX(x => x - 20);
        break;
      case 'right':
        setX(x => x + 20);
        break;
      case 'down':
        setY(y => y + 20);
        break;
      default:
        return null;
    }
  }


  // add event listener to listen keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 37:
          return move('left');
        case 38:
          return move('up');
        case 39:
          return move('right');
        case 40:
          return move('down');
        default:
          return null;
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  });

  return { x, y, direction, move };

};

export default useMovement;
