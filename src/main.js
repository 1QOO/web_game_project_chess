import './style.css';
import { createBoard, displayPiece } from './ui.js';
import { gameStart, selectTile } from './gameLogic.js';

document.querySelector("#app").innerHTML = createBoard();

//MAIN LOOP
document.addEventListener("DOMContentLoaded",()=>{
    gameStart(document.getElementsByClassName("tile"), "click", displayPiece);
    window.selectTile = selectTile;
});
