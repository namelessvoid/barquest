import { CreateAnimation, Animation } from '@ionic/react';
import React, { useEffect, useRef } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    value: number
    animated?: boolean
    animationDurationInMS?: number
    label?: string
    color?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({value, animated, animationDurationInMS, label, color}) => {
    const barColor = color ?? 'green';
    const barLabel = label ?? Math.round(value * 100) + '%'

    const animation: any = useRef(null);
    useEffect(() => {
        if (animation && animated) {
            animation.current!.animation.stop();
            animation.current!.animation.play();
        }
    }, [animated, animationDurationInMS, animation])

    return (<>
        <div className="progressbar-outer">
            <CreateAnimation
                duration={animationDurationInMS}
                iterations={Infinity}
                fromTo={{
                    property: "width",
                    fromValue: "0",
                    toValue: "100%"
                }}
                // keyframes={[
                //     { offset: 0, background: 'red' },
                //     { offset: 0.72, background: 'blue' },
                //     { offset: 1, background: 'green' }
                // ]}
                ref={animation}
            >
                <div className="progressbar-inner" style={{width: `${value*100}%`, backgroundColor: barColor}}></div>
            </CreateAnimation>
            <div className="progressbar-percentage"><span>{barLabel}</span></div>
        </div>
        </>
    )
}