import { Activity, newActivity } from "./Activity";
import { getRandomFromArray } from "./random";

const slayMonster = (): Activity => {
    const verbs = ['Slaying', 'Killing', 'Fighting', 'Battling', 'Engaging']
    const monsters = ['Orc', 'Daemon', 'Imp', 'Rat', 'Goblin', 'Zombie', 'Mutant', 'Ghost', 'Dark Spirit', 'Skeleton', 'Evil Presence', 'Grasshopper', 'Ant', 'Spider']
    const xps = [2, 3, 4, 5, 7]
    
    const verb = getRandomFromArray(verbs);
    const monster = getRandomFromArray(monsters);
    const xp = getRandomFromArray(xps);
    const duration = xp;

    return newActivity(`${verb} ${monster}`, duration, xp)
}

const roamArea = () => {
    const descriptions = ["Roaming area", "Searching areal", "Investigate surroundings", "Tracking footsteps", "Following trails"]
    return newActivity(getRandomFromArray(descriptions), 5, 1)
}

const loot = () => {
    const verbs = ['Looting', 'Plundering', 'Pillaging', 'Robbing', 'Ransacking']
    const objects = ['Corpse', 'Body', 'Chest', 'Trove', 'Hideout', 'House', 'Shack', 'Cave', 'Den', 'Lair', 'Crate', 'Case', 'Hutch', 'Box', 'Sack']

    const verb = getRandomFromArray(verbs);
    const object = getRandomFromArray(objects)

    return newActivity(`${verb} ${object}`, 2, 1)
}

const activityGenerators: {[name: string]: () => Activity} = {
    slayMonster, roamArea, loot
}

export const ActivityFactory = {
    newActivity(): Activity {
        const generatorNames = Object.keys(activityGenerators);
        const randomChoice = generatorNames[Math.floor(generatorNames.length * Math.random())]

        return activityGenerators[randomChoice]();
    }
}