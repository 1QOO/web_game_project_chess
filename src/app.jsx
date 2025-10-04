import { Index } from '/src/layout/index';
import { InGame } from '/src/layout/ingame';
import { useState } from 'react';

export function App(){
    const [state, setState] = useState("Index");
    
    const handleMainState = (newState)=>{
        setState(newState);
    }

    switch(state){
        case "Index" : {return <Index handleMainState={handleMainState}/>}
        case "InGame" : {return <InGame />}
    }
}