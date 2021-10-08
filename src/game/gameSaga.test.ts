import { apply, call } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { expectSaga } from 'redux-saga-test-plan';
import { getStorage } from '../storage';

import { gameLoopSaga, startGameSaga } from './gameSaga';
import { gameLoaded, PlayerState, startGame } from './playerSlice';

describe('startGameSaga', () => {
    describe('when loading state', () => {
        it('calls gameLoop only after state was populated', () => {
            const storage = {keys: jest.fn(), get: jest.fn()}
            return expectSaga(startGameSaga, startGame('test-game-id'))
                .withReducer((state, action: PayloadAction<PlayerState>) => {
                    switch(action.type) {
                        case gameLoaded.type: {
                            return action.payload;
                        }
                    }
                })
                .provide([
                    [call(getStorage), storage],
                    [apply(storage, storage.keys, []), ['game_test-game-id']],
                    [apply(storage, storage.get, ['game_test-game-id']), '{"version": 1, "id": "test-game-id"}'],
                    [call(gameLoopSaga), []]
                ])
                .hasFinalState({
                    version: 1,
                    id: 'test-game-id'
                })
                .run()
        })
    })
})