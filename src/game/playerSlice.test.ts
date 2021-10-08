import { idCard } from "ionicons/icons";
import { Activity } from "./Activity";
import { Quest } from "./Chapter";
import { activityFinished, gameLoaded, playerReducer, PlayerState, questStarted } from "./playerSlice";

const activityBuilder = (id: number): Activity => ({
    id: id.toString(),
    duration: id,
    name: id.toString(),
    xpReward: id
})

const questBuilder = (id: number): Quest => ({
    id: id.toString(),
    title: id.toString(),
    openActivities: [
        activityBuilder(id)
    ]
})

const gameStateBuilder = (id: number): PlayerState => ({
    id: id.toString(),
    version: id,
    xp: id,
    name: id.toString(),
    activityLog: [
        activityBuilder(id)
    ],
    quests: {
        active: questBuilder(id),
        open: [questBuilder(id)],
        completed: [questBuilder(id)]
    },
    currentActivity: activityBuilder(id)
})

describe('gameReducer', () => {
    test('should return initial state', () => {
        expect(playerReducer(undefined, {type: undefined})).toEqual({
            id: '',
            version: 1,
            xp: 0,
            name: 'Player',
            activityLog: [],
            quests: {
                active: undefined,
                completed: [],
                open: []
            }
        })
    })

    describe('when handling gameLoaded', () => {
        it('replaces existing state with loaded state', () => {
            const previousState: PlayerState = gameStateBuilder(1);
            const loadedState: PlayerState = gameStateBuilder(2);

            expect(playerReducer(previousState, gameLoaded(loadedState))).toStrictEqual(loadedState)
        })
    })

    describe('when handling activityFinished', () => {
        const previousState: PlayerState = {
            ...gameStateBuilder(0),
            xp: 13,
            activityLog: [activityBuilder(0)]
        }

        const activity: Activity = {
            ...activityBuilder(1),
            xpReward: 17
        }

        it('adds rewarded XP to total XP', () => {
            const newState = playerReducer(previousState, activityFinished(activity));
            expect(newState.xp).toBe(30)
        })

        it('prepends finished activity to activityLog', () => {
            const newState = playerReducer(previousState, activityFinished(activity));
            expect(newState.activityLog).toStrictEqual([
                activity,
                previousState.activityLog[0]
            ])
        })
    })

    describe('when handling questStarted', () => {
        it('sets activeQuest to newQuest', () => {
            const previousState: PlayerState = {
                ...gameStateBuilder(0),
                quests: {
                    active: questBuilder(1),
                    open: [],
                    completed: []
                }
            }

            const newQuest = questBuilder(3);

            const newState = playerReducer(previousState, questStarted(newQuest))

            expect(newState.quests.active).toStrictEqual(newQuest);
        })

        it ('prepends activeQuest to completedQuest', () => {
            const previousState: PlayerState = {
                ...gameStateBuilder(0),
                quests: {
                    active: questBuilder(1),
                    open: [],
                    completed: [questBuilder(0)]
                }
            }

            const newQuest = questBuilder(3);

            const newState = playerReducer(previousState, questStarted(newQuest))
            
            expect(newState.quests.completed).toStrictEqual([previousState.quests.active, previousState.quests.completed[0]])
        })
    })
})