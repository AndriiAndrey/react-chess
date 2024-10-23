import { FC, useEffect, useRef, useState } from 'react';

import { Player } from '@/models/Player';
import { Colors } from '@/models/Colors';

interface IProps {
  currentPlayer: Player;
  restart: () => void;
  currentStep: number;
  checkMate: boolean;
}

const Timer: FC<IProps> = ({ currentPlayer, restart, currentStep, checkMate }) => {
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(startTimer, [currentPlayer]);

  useEffect(() => {
    if (checkMate && timer.current) {
      clearInterval(timer.current);
    }
  }, [checkMate]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      incrementTimer(currentPlayer.color);
    }, 1000);
  }

  function incrementTimer(color: Colors) {
    if (color === Colors.WHITE) {
      setWhiteTime((prev) => prev + 1);
    } else {
      setBlackTime((prev) => prev + 1);
    }
  }

  function handleRestart() {
    restart();
    setWhiteTime(0);
    setBlackTime(0);
    startTimer();
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h2>White - {whiteTime}</h2>
        <h2>Black - {blackTime}</h2>
      </div>
      <div>
        <h2>Steps - {currentStep - 1}</h2>
        <button onClick={handleRestart}>Restart game</button>
      </div>
    </div>
  );
};

export default Timer;
