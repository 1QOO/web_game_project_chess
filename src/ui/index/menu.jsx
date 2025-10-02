import { useState } from 'react';
import './menu.css';

export function Menu({handleMainState}){
    const handleState = (newState)=>{
        setState(newState);
    }

    const [state, setState] = useState("MainMenu");

    switch(state){
        case "MainMenu" : {return <MainMenu handleState={handleState} />}
        case "GameSetting" : {return <GameSetting handleState={handleState} handleMainState={handleMainState}/>}
    }
}

function MainMenu({handleState}){
    return (
        <div className="menu bg-amber-900 border-4 border-amber-500 rounded-2xl p-4">
            <h1 className="text-center text-white font-bold">Main Menu</h1>
            <hr className="my-4 text-gray-300" />
            <div className="flex flex-col gap-4 justify-center items-stretch">
                <button onClick={()=>handleState("GameSetting")}>Play</button>
                <button>Learn Opening</button>
                <button>Analyze Game</button>
            </div>
        </div>
    )
}

function GameSetting({handleState, handleMainState}){
    const opponents = ["Player"];
    const times = [0];
    const [opponent, setOpponent] = useState(0);
    const [time, setTime] = useState(0);

    const leftClickOpponent = ()=>{
        if(opponent)setOpponent(opponent-1);
        else setOpponent(opponents.length-1);
    }
    const rightClickOpponent = ()=>{
        if(opponent<opponents.length-1)setOpponent(opponent+1);
        else setOpponent(0);
    }

    const leftClickTimer = ()=>{
        if(time)setTime(time-1);
        else setTime(times.length-1);
    }
    const rightClickTimer = ()=>{
        if(time<times.length-1)setTime(time+1);
        else setTime(0);
    }

    return (
        <div className="menu bg-amber-900 border-4 border-amber-500 rounded-2xl p-4">
            <h1 className="text-center text-white font-bold">Game Setting</h1>
            <hr className="my-4 text-gray-300" />
            <div className="flex flex-col justify-center items-center text-white">
                <span>Opponent</span>
                <div className='flex flex-row justify-between gap-4 w-[10rem] mb-4'>
                    <button className='left-button' onClick={leftClickOpponent}>&lt;</button>
                    <div>{opponents[opponent]}</div>
                    <button className='right-button' onClick={rightClickOpponent}>&gt;</button>
                </div>
                <span>Timer</span>
                <div className='flex flex-row justify-between gap-4 w-[10rem] mb-4'>
                    <button className='left-button' onClick={leftClickTimer}>&lt;</button>
                    <div>{time?`${times[time]} Min`:"No Timer"}</div>
                    <button className='right-button' onClick={rightClickTimer}>&gt;</button>
                </div>
                <div className='flex flex-row w-full justify-around gap-8'>
                    <button onClick={()=>handleState("MainMenu")}>Back</button>
                    <button onClick={()=>handleMainState("InGame")}>Play</button>
                </div>
            </div>
        </div>
    )
}