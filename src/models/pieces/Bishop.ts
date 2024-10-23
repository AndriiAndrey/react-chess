import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, FigureNames } from './Piece';

import blackLogo from '@/assets/black-bishop.png';
import whiteLogo from '@/assets/white-bishop.png';

export class Bishop extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    if (this.cell.isEmptyDiagonal(target)) return true;

    return false;
  }
}
