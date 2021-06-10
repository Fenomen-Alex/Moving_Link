import React, {useEffect, useRef, useState} from 'react';
import './App.css';

export default function App() {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('down')
  const canvasRef = useRef(null);
  const linkDownRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkRightRef = useRef(null);
  const linkLeftRef = useRef(null);

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

  // set the height and width of canvas
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;

  }, []);

  // move the box if x or y changes
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // context.fillRect(x, y, 100, 100);

    let linkRef;
    if (direction === 'up') linkRef = linkUpRef;
    if (direction === 'down') linkRef = linkDownRef;
    if (direction === 'left') linkRef = linkLeftRef;
    if (direction === 'right') linkRef = linkRightRef;
    context.drawImage(linkRef.current, x, y)

  }, [x, y, direction]);

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

  return (
    <div className="app">
      <canvas ref={canvasRef}/>

      <div className="arrows">
        <button onClick={() => move('up')}>Up</button>
        <button onClick={() => move('left')}>Left</button>
        <button onClick={() => move('down')}>Down</button>
        <button onClick={() => move('right')}>Right</button>
      </div>

      <div className="images">
        <img ref={linkDownRef} src="https://i.imgur.com/JYUB0m3.png" alt="Down"/>
        <img ref={linkRightRef} src="https://i.imgur.com/GEXD7bk.gif" alt="Right"/>
        <img ref={linkUpRef} src="https://i.imgur.com/XSA2Oom.gif" alt="Up"/>
        <img ref={linkLeftRef} src="https://i.imgur.com/4LGAZ8t.gif" alt="Left"/>
      </div>
    </div>
  );
}
