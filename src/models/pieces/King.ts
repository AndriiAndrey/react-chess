import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, FigureNames } from './Piece';

import whiteLogo from '@/assets/white-king.png';
import blackLogo from '@/assets/black-king.png';

export class King extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    return dx <= 1 && dy <= 1;
  }

  canBeAttacked(target: Cell): boolean {
    return !!target.piece?.canMove(this.cell);
  }

  isUnderAttack(cells: Cell[][]): boolean {
    for (let i = 0; i < 8; i++) {
      const row = cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        if (this.canBeAttacked(target)) {
          return true;
        }
      }
    }

    return false;
  }
}
