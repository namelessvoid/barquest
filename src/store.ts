import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { playerReducer } from './game/playerSlice';
import { gameSaga } from './game/gameSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        player: playerReducer
    },
    middleware: [
      sagaMiddleware
    ]
});

sagaMiddleware.run(gameSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>