import './style.css';
import { createBoard } from './ui.js';
import { gameStart, selectTile } from './gameLogic.js';

document.querySelector("#app").innerHTML = createBoard();

document.addEventListener("DOMContentLoaded",()=>{
    gameStart(document.getElementsByClassName("tile"), "click");
    window.selectTile = selectTile;
});