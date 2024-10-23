import { FC } from 'react';

import { Player } from '@/models/Player';
import { Colors } from '@/models/Colors';

interface IProps {
  check: boolean;
  checkMate: boolean;
  currentPlayer: Player;
}

const Status: FC<IProps> = ({ check, checkMate, currentPlayer }) => {
  if (checkMate) {
    return (
      <div className="check-status">
        <h2 className="check-status-msg">
          Checkmate to {currentPlayer.color === Colors.WHITE ? 'Black' : 'White'}!
        </h2>
      </div>
    );
  }

  if (check) {
    return (
      <div className="check-status">
        <h2 className="check-status-msg">Check to {currentPlayer.color}!</h2>
      </div>
    );
  }

  return null;
};

export default Status;
