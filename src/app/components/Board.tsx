/* eslint-disable no-console */
'use client';
import { Chess } from 'chess.js';
import isEqual from 'lodash/isEqual';
import { Reducer, useReducer } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';

interface MovePayload {
  from: Square;
  to: Square;
  promotion?: string | undefined;
}
interface GameState {
  game: Chess;
  temp: Chess;
  prevpayload: MovePayload | undefined;
}
// An interface for our actions
interface Action {
  type: 'MOVE';
  payload?: MovePayload | undefined;
}

const gameUpdater: Reducer<GameState, Action> = (state: GameState, action: Action) => {
  const { type, payload } = action;
  if (!!isEqual(payload, state.prevpayload)) {
    return state;
  } else {
    switch (type) {
      case 'MOVE': {
        try {
          const move = state.game.move(payload as MovePayload);
          state.temp = state.game;
          console.log(move);
        } catch {
          state.game = state.temp;
          state.prevpayload = payload;
          console.log('errr');
        }

        return { ...state };
      }
      default: {
        throw Error('Unknown action: ' + type);
      }
    }
  }
};

export default function Board() {
  //TODO: find a way to work with mutetable object
  const [gameState, dispatch] = useReducer(gameUpdater, { game: new Chess(), temp: new Chess(), prevpayload: undefined });
  function makeRandomMove() {}

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const payload: MovePayload = {
      from: sourceSquare,
      to: targetSquare,
    };
    dispatch({ payload: payload, type: 'MOVE' });
    return true;
  }
  return (
    <>
      <div className="w-[70vw] max-w-[70vh]">
        <Chessboard
          id="PlayVsRandom"
          showPromotionDialog={true}
          position={gameState.game.fen()}
          onPieceDrop={onDrop}
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
