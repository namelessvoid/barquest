import { v4 as uuid } from 'uuid';
import { ActivityFactory } from "./ActivityFactory";
import { Quest } from "./Chapter";
import { getRandomFromArray } from './random';

export interface IStoryGenerator {
    generatePrologue: () => Quest
    generateRandomQuest: () => Quest
}

export const StoryGenerator: IStoryGenerator = {
    generatePrologue: (): Quest => {
        return {
            title: 'Prologue',
            id: 'prologue',
            openActivities: [
                ActivityFactory.newActivity(),
                ActivityFactory.newActivity(),
                ActivityFactory.newActivity()
            ]
        }
    },
    generateRandomQuest: (): Quest => {
        return {
            title: getRandomFromArray(['Get me the dollars', 'Save the day', 'Deliver this letter']),
            id: uuid(),
            openActivities: [
                ActivityFactory.newActivity(),
                ActivityFactory.newActivity(),
                ActivityFactory.newActivity()
            ]
        }
    }
}