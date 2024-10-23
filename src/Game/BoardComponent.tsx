import { FC, Fragment } from 'react';

import CellComponent from '@/Game/CellComponent';

import { Cell } from '@/models/Cell';

interface IProps {
  cells: Cell[][];
  selectedCell: Cell | null;
  onCellClick: (cell: Cell) => void;
}

const BoardComponent: FC<IProps> = ({ cells, selectedCell, onCellClick }) => {
  return (
    <div>
      <div className="board">
        {cells.map((row, idx) => (
          <Fragment key={idx}>
            {row.map((cell) => (
              <CellComponent
                key={cell.id}
                cell={cell}
                selected={selectedCell?.id === cell.id}
                onClick={onCellClick}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
