import { Cell } from '../Cell';
import { Colors } from '../Colors';

export enum FigureNames {
  FIGURE = 'piece',
  KING = 'king',
  KNIGHT = 'knight',
  PAWN = 'pawn',
  QUEEN = 'queen',
  ROOK = 'rook',
  BISHOP = 'bishop',
}

export class Piece {
  color: Colors;
  logo: string | null;
  cell: Cell;
  name: FigureNames;
  id: string;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.name = FigureNames.FIGURE;
    this.id = crypto.randomUUID();
    this.logo = null;

    this.cell.piece = this;
  }

  canMove(target: Cell): boolean {
    if (target.piece?.color === this.color) return false;
    return true;
  }

  move(target: Cell) {}
}
