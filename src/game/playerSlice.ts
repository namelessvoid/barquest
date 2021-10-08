import { v4 as uuid } from 'uuid';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Activity } from './Activity';
import { Quest } from './Chapter';

export interface PlayerState {
    version: number
    id: string
    name: string
    xp: number
    currentActivity?: Activity,
    activityLog: Activity[],
    quests: {
        open: Quest[],
        active?: Quest,
        completed: Quest[]
    }
}

const initialState: PlayerState = {
    version: 1,
    id: '',
    name: 'Player',
    xp: 0,
    currentActivity: undefined,
    activityLog: [],
    quests: {
        open: [],
        active: undefined,
        completed: []
    }
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        newGameStarted: (state, action: PayloadAction<{id: string, playerName: string}>) => {
            state.id = action.payload.id;
            state.name = action.payload.playerName;
        },
        gameLoaded: (state, action: PayloadAction<PlayerState>) => {
            return action.payload;
        },
        questStarted: (state, action: PayloadAction<Quest>) => {
            if (state.quests.active) {
                state.quests.completed = [state.quests.active, ...state.quests.completed];
            }

            state.quests.active = action.payload;
        },
        activeQuestChanged: (state, action: PayloadAction<Quest>) => {
            state.quests.active = action.payload;
        },
        actionStarted: (state, action: PayloadAction<Activity>) => {
            state.currentActivity = action.payload;
        },
        activityFinished: (state, action: PayloadAction<Activity>) => {
            const activity = action.payload;
            state.xp += activity.xpReward;
            
            const newActivityLog = [activity, ...state.activityLog]
            state.activityLog = newActivityLog.slice(0, Math.min(newActivityLog.length, 100))
        }
    }
});

export const { newGameStarted, gameLoaded, actionStarted, questStarted, activeQuestChanged, activityFinished } = playerSlice.actions;
export const startGame = createAction<string>('game/startGame')

export const selectXP = (state: RootState) => state.player.xp;
export const selectName = (state: RootState) => state.player.name;
export const selectCurrentActivity = (state: RootState) => state.player.currentActivity;
export const selectActivityLog = (state: RootState) => state.player.activityLog;

export const selectActiveQuest = (state: RootState) => state.player.quests.active;
export const selectCompletedQuests = (state: RootState) => state.player.quests.completed;
export const selectNextQuestActivity = (state: RootState): Activity|undefined => {
    if (state.player.quests.active) {
        if (state.player.quests.active.openActivities.length > 0) {
            return state.player.quests.active.openActivities[0]
        }
    }
    return undefined;
}

export const selectGame = (state: RootState) => state.player;

export const playerReducer = playerSlice.reducer;