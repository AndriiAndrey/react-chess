import { Cell } from './Cell';
import { Colors } from './Colors';
import { Bishop, Piece, King, Knight, Pawn, Queen, Rook } from './pieces';

export class Board {
  cells: Cell[][] = [];

  whiteKing: King | null = null;
  blackKing: King | null = null;

  lostBlackPieces: Piece[] = [];
  lostWhitePieces: Piece[] = [];

  public initCell() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        } else {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKings() {
    this.blackKing = new King(Colors.BLACK, this.getCell(4, 0));
    this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  public addFigures() {
    this.addPawns();
    this.addBishops();
    this.addKings();
    this.addKnights();
    this.addQueens();
    this.addRooks();
  }

  public highlightCells(selected: Cell | null) {
    for (let i = 0; i < 8; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selected?.piece?.canMove(target);
      }
    }
  }

  public isKingUnderAttack(color: Colors): boolean {
    return color === Colors.BLACK
      ? !!this.blackKing?.isUnderAttack(this.cells)
      : !!this.whiteKing?.isUnderAttack(this.cells);
  }

  public clone(): Board {
    const clone = new Board();
    clone.cells = this.cells;
    clone.lostBlackPieces = this.lostBlackPieces;
    clone.lostWhitePieces = this.lostWhitePieces;
    clone.blackKing = this.blackKing;
    clone.whiteKing = this.whiteKing;
    return clone;
  }

  addLostFigure(piece: Piece) {
    if (piece.color === Colors.BLACK) {
      this.lostBlackPieces.push(piece);
    } else {
      this.lostWhitePieces.push(piece);
    }
  }
}
