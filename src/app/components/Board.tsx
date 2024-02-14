/* eslint-disable no-console */
'use client';
import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Piece, Square } from 'react-chessboard/dist/chessboard/types';

const gameInstance = new Chess();

interface Move {
  from: Square;
  to: Square;
  promotion?: string | undefined;
}
export default function Board() {
  const [gameFen, setGameFen] = useState(gameInstance.fen());
  /* const [promotion, setPromotion] = useState(null);
  function onPromotion() {} */

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    console.log(piece);
    const move: Move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? 'q',
    };
    /* gameInstance.moves(move.from); */
    try {
      const moveresult = gameInstance.move(move);
      setGameFen(gameInstance.fen());
      console.log(moveresult);
      return true;
    } catch {
      return false;
    }
  }
  return (
    <>
      <div className="w-[70vw] max-w-[70vh]">
        <Chessboard
          id="PlayVsRandom"
          showPromotionDialog={true}
          position={gameFen}
          onPieceDrop={onDrop}
          /* onPromotionPieceSelect={onPromotion} */
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        />
        <button onClick={() => {}}>reset</button>
        <button onClick={() => {}}>undo</button>
      </div>
    </>
  );
}
