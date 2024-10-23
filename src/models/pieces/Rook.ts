import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, FigureNames } from './Piece';

import whiteLogo from '@/assets/white-rook.png';
import blackLogo from '@/assets/black-rook.png';

export class Rook extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyVertical(target)) return true;

    return false;
  }
}
