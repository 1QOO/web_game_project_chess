import './board.css';
import { useState } from "react";

export const boardStatus = {dissableBoard: null} 

export function CreateBoard({board, callBack}){
    const [tiles, setTiles] = useState(board);

    boardStatus.dissableBoard = board=>setTiles(board);

    const selectTile = (id)=>{
        const renderBoard = callBack(id);

        if(renderBoard){
            setTiles((newState)=>{
                newState = [...renderBoard];
                return newState;
            })
        }
    }

    return (
        <div id="board" className="board grid grid-cols-8 grid-rows-8 border-4 border-amber-900">
            {tiles.map((tile)=><CreateTiles id={tile.id} color={tile.color} piece={tile.piece} highlight={tile.highlight} tileClick={selectTile} key={tile.id}/>)}
        </div>
    )
}

function CreateTiles({id, color, piece, highlight, tileClick}){

    return (
        <div className={"tile size-[100%] "+color+(highlight?highlight:"")} id={id} onClick={()=>{tileClick(Number(id))}}>
            {piece && <img src={piece} />}
        </div>
    )
}