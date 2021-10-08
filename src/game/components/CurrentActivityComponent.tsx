import React from 'react';
import { selectCurrentActivity } from '../playerSlice';
import { useAppSelector } from '../../hooks';
import { ProgressBar } from '../../components/ProgressBar';

export const CurrentActivityComponent: React.FC = () => {
    const currentActivity = useAppSelector(selectCurrentActivity)
    return <>
        <span>{currentActivity ? currentActivity.name : 'Idle'}</span>
        <ProgressBar
            label={currentActivity ? currentActivity.name : ''}
            value={0}
            animated={true}
            animationDurationInMS={currentActivity ? currentActivity.duration * 1000 : 0} />
    </>
}