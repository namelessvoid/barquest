export function getRequiredXPForLevel(level: number): number {
    if (level <= 0) {
        return 0;
    }

    return (level - 1) * 100;
}

export function getLevelByXP(xp: number): number {
    if (xp <= 0) {
        return 1;
    }

    return 1 + Math.floor(xp / 100);
}

export function getLevelProgress(currentLevel: number, currentXP: number): number {
    const xpRequiredForCurrentLevel = getRequiredXPForLevel(currentLevel);
    const xpRequiredForNextLevel = getRequiredXPForLevel(currentLevel + 1);

    return (currentXP - xpRequiredForCurrentLevel) / (xpRequiredForNextLevel - xpRequiredForCurrentLevel); 
}