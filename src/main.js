import './style.css';
import { createBoard, displayPiece } from './ui.js';
import { startPieces, selectTile } from './gameLogic.js';

document.querySelector("#app").innerHTML = createBoard();

function gameStart(elements, event, displayPiece){
    const arrayOfElements = [];

//ADD EVENT LISTENER TO ALL TILES
    for (let i=0;i<elements.length;++i){
        arrayOfElements.push(elements[i]);
    }
    arrayOfElements.forEach((element)=>{
        element.addEventListener(event, ()=>handleBoard(element.id));
    })
    for (let tile of startPieces) displayPiece(tile);
}

function handleBoard(tileId){
    let renderTiles = null;
    renderTiles = selectTile(tileId);

    if (renderTiles){
        console.log(renderTiles)
        for (let tile of renderTiles) displayPiece(tile);
    }
}

//MAIN LOOP
document.addEventListener("DOMContentLoaded",()=>{
    gameStart(document.getElementsByClassName("tile"), "click", displayPiece);
});