import {v4 as uuid } from 'uuid';

export interface Activity
{
    id: string
    name: string
    duration: number
    xpReward: number
}

export const newActivity = (name: string, duration: number, xpReward: number): Activity => {
    return {
        id: uuid(),
        name, duration, xpReward
    }
}