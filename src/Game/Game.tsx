import { useEffect, useMemo, useState } from 'react';

import BoardComponent from '@/Game/BoardComponent';
import Status from '@/Game/Status';
import LostPieces from '@/Game/LostPieces';
import Timer from '@/Game/Timer';

import { Board } from '@/models/Board';
import { Player } from '@/models/Player';
import { Colors } from '@/models/Colors';
import { Cell } from '@/models/Cell';

const Game = () => {
  const [board, setBoard] = useState(() => {
    const board = new Board();
    board.initCell();
    board.addFigures();
    return board;
  });

  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentStep, setCurrentStep] = useState(1);
  const [check, setCheck] = useState(false);
  const [checkMate, setCheckMate] = useState(false);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const currentPlayer = useMemo(() => {
    return currentStep % 2 === 0 ? blackPlayer : whitePlayer;
  }, [blackPlayer, currentStep, whitePlayer]);

  useEffect(() => {
    const color = currentPlayer.color;
    setCheck(board.isKingUnderAttack(color));

    return () => {
      if (board.isKingUnderAttack(color)) {
        setCheckMate(true);
      } else {
        setCheck(false);
      }
    };
  }, [currentPlayer]);

  function restart() {
    const board = new Board();
    board.initCell();
    board.addFigures();
    setBoard(board);
    setCurrentStep(1);
    setCheck(false);
    setCheckMate(false);
    setSelectedCell(null);
  }

  function setNextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function onCellClick(cell: Cell) {
    if (checkMate) return;

    if (selectedCell && selectedCell !== cell && selectedCell.piece?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      highlightMoves(null);
      setNextStep();
    } else if (cell.piece?.color === currentPlayer.color) {
      setSelectedCell(cell);
      highlightMoves(cell);
    }
  }

  function highlightMoves(cell: Cell | null) {
    board.highlightCells(cell);
    updateBoard();
  }

  function updateBoard() {
    const boardClone = board.clone();
    setBoard(boardClone);
  }

  return (
    <>
      <LostPieces title="White" figures={board.lostWhitePieces} />
      <div>
        <Status check={check} checkMate={checkMate} currentPlayer={currentPlayer} />
        <Timer
          currentPlayer={currentPlayer}
          restart={restart}
          currentStep={currentStep}
          checkMate={checkMate}
        />
        <h3>Current player: {currentPlayer.color}</h3>
        <BoardComponent cells={board.cells} onCellClick={onCellClick} selectedCell={selectedCell} />
      </div>
      <LostPieces title="Black" figures={board.lostBlackPieces} />
    </>
  );
};

export default Game;
