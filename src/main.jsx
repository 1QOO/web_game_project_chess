import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './style.css';
import { CreateBoard} from './ui';
 import { selectTile, setPieces } from './gameLogic.js';


let selectedTileId = null;

createRoot(document.getElementById("app")).render(
    <StrictMode>
        <CreateBoard board={setPieces()} callBack={selectTile}/>
    </StrictMode>
)
/* 
function gameSet(elements, event, displayPiece){
    const arrayOfElements = [];

//ADD EVENT LISTENER TO ALL TILES
    for (let i=0;i<elements.length;++i){
        arrayOfElements.push(elements[i]);
    }
    arrayOfElements.forEach((element)=>{
        element.addEventListener(event, ()=>handleBoard(element.id));
    })
    for(let tile of setPieces()) renderTile(tile);
}
*/
    // console.log(setPieces());
/*
function handleBoard(tileId){
    let renderTiles = null;
    renderTiles = selectTile(tileId);

    if (renderTiles){
        if(!Array.isArray(renderTiles)){
            if(!selectedTileId){
                highlight(true, tileId);
                selectedTileId = tileId;
            }
            else{
                if(selectedTileId === tileId){
                    highlight(false, tileId);
                    selectedTileId = null;
                }
                else {
                    highlight(false, selectedTileId);
                    highlight(true, tileId);
                    selectedTileId = tileId;
                }
            }
        }
        else{
            for (let tile of renderTiles) displayPiece(tile);
            highlight(false, selectedTileId);
            selectedTileId = null;
        }
    }
    else {
        if(selectedTileId){
            highlight(false, selectedTileId);
            selectedTileId = null;
        }
    }
}

//MAIN LOOP
document.addEventListener("DOMContentLoaded",()=>{
    gameSet(document.getElementsByClassName("tile"), "click", renderTile);
}); */