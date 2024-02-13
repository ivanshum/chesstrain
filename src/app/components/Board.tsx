/* eslint-disable no-console */
'use client';
import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';

export default function Board() {
  const realobj = new Chess();
  //TODO: find a way to work with mutetable object
  const [game, setGame] = useState({ ...realobj, fen: realobj.fen() });
  function makeRandomMove() {}

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = realobj.move({
      from: sourceSquare,
      to: targetSquare,
    });
    if (!move) {
      return false;
    } else {
      setGame({ ...realobj, fen: realobj.fen() });
      return true;
    }
  }
  return (
    <div className="w-[70vw] max-w-[70vh]">
      <Chessboard
        id="PlayVsRandom"
        position={game.fen}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        }}
      />
      <button onClick={() => {}}>reset</button>
      <button onClick={() => {}}>undo</button>
    </div>
  );
}
