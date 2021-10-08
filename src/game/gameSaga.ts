import { v4 as uuid } from 'uuid';
import { Storage } from '@ionic/storage';
import { take, race, takeEvery, takeLatest, call, put, putResolve, select, delay, apply, fork } from 'redux-saga/effects';
import { getStorage } from '../storage';
import { Activity } from './Activity';
import { ActivityFactory } from './ActivityFactory';
import { Quest } from './Chapter';
import { actionStarted, activeQuestChanged, activityFinished, gameLoaded, newGameStarted, PlayerState, questStarted, selectActiveQuest, selectCurrentActivity, selectGame, selectNextQuestActivity, startGame } from './playerSlice';
import { StoryGenerator } from './StoryGenerator';
import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@redux-saga/types';

export function* startGameSaga(action: PayloadAction<string>) {
    const gameId = action.payload;

    const storage: Storage = yield call(getStorage);
    const keys: string[] = yield apply(storage, storage.keys, []);

    if (keys.includes(`game_${gameId}`)) {
        yield call(loadGameSaga, gameId);
        // yield take(gameLoaded.type)
    } else {
        yield call(startNewGameSaga, gameId);
    }

    yield call(gameLoopSaga);
}

function* startNewGameSaga(gameId: string) {
    const quest: Quest = yield call(StoryGenerator.generatePrologue);
    yield put(questStarted(quest))
    yield call(startNewAction)
    yield put(newGameStarted({id: gameId, playerName: 'foo'}))
}

export function* gameSaga() {
    yield takeLatest(startGame.type, startGameSaga);
}

export function* saveGameSaga() {
    const gameState: PlayerState = yield select(selectGame);
    const storage: Storage = yield call(getStorage);

    const json: string = yield call(JSON.stringify, gameState);

    yield apply(storage, storage.set, [`game_${gameState.id}`, json]);
}

function* loadGameSaga(gameId: string) {
    const storage: Storage = yield call(getStorage);
    const gameStateJson: string = yield apply(storage, storage.get, [`game_${gameId}`]);
    const gameState: PlayerState = yield call(JSON.parse, gameStateJson);

    // Apply migrations
    if (gameState.version === undefined) {
        gameState.version = 1;
        gameState.id = uuid();
    }

    yield put(gameLoaded(gameState));
}

export function* startNewAction() {
    const random: number = yield call(Math.random);
    const randomEncounter = random > 0.1;
    let newActivity: Activity|undefined = yield select(selectNextQuestActivity);

    if (!newActivity || randomEncounter) {
        newActivity = yield call(ActivityFactory.newActivity);
    }

    yield put(actionStarted(newActivity!));
}

export function* gameLoopSaga() {
    const advanceQuestTask: Task = yield fork(advanceQuest);

    const taskId = uuid();

    while (true) {
        const currentActivity: ReturnType<typeof selectCurrentActivity> = yield select(selectCurrentActivity);

        if (!currentActivity) {
            console.error('Game loop called without a currentActivity1')
        }

        yield delay(currentActivity!.duration * 1000)
        yield put(activityFinished(currentActivity!))
        yield call(startNewAction)

        yield call(saveGameSaga);
    }

    advanceQuestTask.cancel();
}

export function* advanceQuest() {
    yield takeEvery(activityFinished.type, impl);

    function* impl(action: ReturnType<typeof activityFinished>) {
        const activeQuest: Quest|undefined = yield select(selectActiveQuest);

        if (!activeQuest || activeQuest!.openActivities.length <= 0) {
            const newActiveQuest: Quest = yield call(StoryGenerator.generateRandomQuest);
            yield put(questStarted(newActiveQuest));
            return;
        }

        const finishedActivity = action.payload;

        if (finishedActivity.id === activeQuest.openActivities[0].id) {
            const newOpenActivities = [...activeQuest.openActivities];
            newOpenActivities.shift()

            if (newOpenActivities.length > 0) {
                const updatedQuest = {
                    ...activeQuest,
                    openActivities: newOpenActivities
                };
                yield put(activeQuestChanged(updatedQuest));
            } else {             
                const newActiveQuest: Quest = yield call(StoryGenerator.generateRandomQuest);
                yield put(questStarted(newActiveQuest));
            }
        }
    }
}
