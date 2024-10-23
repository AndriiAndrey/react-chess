import { Cell } from '@/models/Cell';
import { FC } from 'react';

interface IProps {
  cell: Cell;
  selected: boolean;
  onClick: (cell: Cell) => void;
}

const CellComponent: FC<IProps> = ({ cell, selected, onClick }) => {
  return (
    <div
      className={`cell ${cell.color} ${selected ? 'selected' : ''}`}
      onClick={() => onClick(cell)}
      style={{ backgroundColor: cell.available && cell.piece ? 'green' : '' }}
    >
      {cell.available && !cell.piece && <div className="available" />}
      {cell.piece?.logo && <img src={cell.piece.logo} alt="piece" />}
    </div>
  );
};

export default CellComponent;
