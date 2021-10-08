import React from 'react';
import { questStarted, selectActiveQuest, selectCompletedQuests } from '../playerSlice';
import { useAppSelector } from '../../hooks';

export const StoryComponent: React.FC = () => {
    const activeQuest = useAppSelector(selectActiveQuest);
    const completedQuests = useAppSelector(selectCompletedQuests);

    return <>
        <div>Active Quest:</div>
        <div>{activeQuest ? activeQuest.title : 'None'}</div>
        <ul>
            {activeQuest ? activeQuest.openActivities.map(a => <li key={a.id}>{a.name}</li>) : null}
        </ul>
        <div>Open Quests:</div>
        <div>The story so far:</div>
        <ul>
            {completedQuests.map(q => <li key={q.id}>{q.title}</li>)}
        </ul>
    </>
}