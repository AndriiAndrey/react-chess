import { Piece } from '@/models/pieces';
import { Board } from '@/models/Board';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: string;
  piece: Piece | null;
  board: Board;
  available: boolean;
  id: string;

  constructor(board: Board, x: number, y: number, color: string, piece: Piece | null) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.available = false;
    this.id = crypto.randomUUID();
  }

  isEmpty(): boolean {
    return !this.piece;
  }

  isEnemy(target: Cell): boolean {
    if (target.isEmpty()) return false;

    return this.piece?.color !== target.piece?.color;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) return false;

    const dy = target.y > this.y ? 1 : -1;
    const dx = target.x > this.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  setFigure(piece: Piece) {
    this.piece = piece;
    this.piece.cell = this;
  }

  moveFigure(target: Cell) {
    if (this.piece && this.piece?.canMove(target)) {
      this.piece.move(target);

      if (target.piece) {
        this.board.addLostFigure(target.piece);
      }

      target.setFigure(this.piece);
      this.piece = null;
    }
  }
}
