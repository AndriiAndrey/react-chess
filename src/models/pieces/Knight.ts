import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Piece, FigureNames } from './Piece';

import whiteLogo from '@/assets/white-knight.png';
import blackLogo from '@/assets/black-knight.png';

export class Knight extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const dy = Math.abs(this.cell.y - target.y);
    const dx = Math.abs(this.cell.x - target.x);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}
