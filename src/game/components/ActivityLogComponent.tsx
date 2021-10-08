import React from 'react';
import { selectActivityLog } from '../playerSlice';
import { useAppSelector } from '../../hooks';

export const ActivityLogComponent: React.FC = () => {
    const activityLog = useAppSelector(selectActivityLog);

    return <div>
        <div>Recent activities:</div>
        { activityLog.length > 0 ?
            <ul>{activityLog.map((activity) => <li key={activity.id}>{activity.name} (+{activity.xpReward} XP)</li>)}</ul> :
            <div>Nothing</div>
        }
    </div>
}