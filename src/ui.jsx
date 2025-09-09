import { useState } from "react";

export function CreateBoard({board, callBack}){
    const [tiles, setTiles] = useState(board);

    const selectTile = (id)=>{
        const renderBoard = callBack(id);

        if(renderBoard){
            setTiles(prevTiles=>prevTiles.map(item=>
                renderBoard.updatedTiles.includes(item.id)?{
                    ...item, piece : renderBoard.updatedBoard[item.id].piece, highlight : renderBoard.updatedBoard[item.id].highlight
                }: item
            ))
        }
    }

    return (
        <div id="board" className="grid grid-cols-8 border-double border-amber-900 border-[2px] w-[400px] h-[400px]">
            {tiles.map((tile)=><CreateTiles id={tile.id} color={tile.color} piece={tile.piece} highlight={tile.highlight} tileClick={selectTile} key={tile.id}/>)}
        </div>
    )
}

function CreateTiles({id, color, piece, highlight, tileClick}){

    return (
        <div className={"tile "+color+(highlight?highlight:"")} id={id} onClick={()=>{tileClick(Number(id))}}>
            {piece && <img src={piece} />}
        </div>
    )
}

export function highlight(ON, id){
    const className = document.getElementById(id).className;

    if(ON) document.getElementById(id).className += " highlight";
    else document.getElementById(id).className = className.split(' ')[0]+' '+className.split(' ')[1];
}