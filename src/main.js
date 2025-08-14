import './style.css';
import { createBoard } from './ui.js';
import { gameStart, addEvent, checkPiece } from './gameLogic.js';

document.querySelector("#app").innerHTML = createBoard();


document.addEventListener("DOMContentLoaded",()=>{
    addEvent(document.getElementsByClassName("tile"), "click");
    gameStart();
    window.checkCoord = checkPiece;
});