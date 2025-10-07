import { gameSettings } from '../../lib/game-settings';
import { useState } from 'react';
import './player.css';

export function PlayerProfile({player}){
    return (
        <div className="profile flex flex-row items-start bg-gray-200 p-1 rounded-sm w-fit gap-1">
            <img src={player.img} alt={player.name} className="size-[50px] rounded-sm border-2 border-amber-800" />
            <span className="font-semibold font-serif inline-block px-2">{player.name}</span>
        </div>
    )
}

export function CapturedPieces(){
    return (
        <div className="cap-pieces flex flex-ro border-2 border-white h-fit w-32">
            <span className="text-white text-sm">Captured pieces displayed here</span>
        </div>
    )
}

export function Time({time}){
    const [timer, setTimer] = useState(`${gameSettings.timeLimit / 60 / 1000} : 00`);
    time.setTime = (time)=>{
        const newTime = time;
        setTimer(newTime);
    }

    return (
        <div className="timer px-2 bg-gray-200 inline-block rounded-full size-fit font-semibold">
            {timer}
        </div>
    )
}