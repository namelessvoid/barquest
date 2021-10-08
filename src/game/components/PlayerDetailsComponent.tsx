import React from 'react';
import { selectXP } from '../playerSlice';
import { getLevelByXP, getLevelProgress, getRequiredXPForLevel } from '../XPService';
import { useAppSelector } from '../../hooks';
import { ProgressBar } from '../../components/ProgressBar';

export const PlayerDetailsComponent: React.FC = () => {
    const xp = useAppSelector(selectXP);
    const level = getLevelByXP(xp);
    const nextLevelXP = getRequiredXPForLevel(level + 1)
  
    const levelProgress = getLevelProgress(level, xp);
  
    const label = `${xp} / ${nextLevelXP} XP`;

    return <>
        <div>Level {level} <ProgressBar value={levelProgress} label={label} color="blue" /></div>
    </>
}