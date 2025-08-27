import { board } from './board.js';

let isWhiteTurn = true;
let selectedTile = null;

export function gameStart(elements, event, displayPiece){
    const arrayOfElements = [];

//ADD EVENT LISTENER TO ALL TILES
    for (let i=0;i<elements.length;++i){
        arrayOfElements.push(elements[i]);
    }
    arrayOfElements.forEach((element)=>{
        element.addEventListener(event, ()=>selectTile(element.id));
    })
    for (let tile of board.tiles){
        if (tile.piece) displayPiece(tile);
    }
}

export function selectTile(tileId){
    let row = tileId.at(1);
    let col = tileId.at(0);

    switch(col){
        case 'a' : {col = 0; break;}
        case 'b' : {col = 1; break;}
        case 'c' : {col = 2; break;}
        case 'd' : {col = 3; break;}
        case 'e' : {col = 4; break;}
        case 'f' : {col = 5; break;}
        case 'g' : {col = 6; break;}
        case 'h' : {col = 7; break;}
        default : break;
    }

    let tileIndex = 64-(8*row)+col;

    if(isWhiteTurn) selectTileFilter("white", tileIndex);
    else selectTileFilter("black");
}

function selectTileFilter(turn, tileIndex){
    if(selectedTile){
        if (selectedTile.piece.tileIndex === tileIndex){
            selectedTile = null;
        }
        else if(selectedTile.piece.legalMoves.include(tileIndex)){
            board.movePiece(selectedTile, board[tileIndex]);
            selectedTile = null;
        }
        else if(board[tileIndex].piece && board[tileIndex].piece.color === turn){
            selectedTile = board[tileIndex];
        }
        else selectTile = null;
    }
    else if (board[tileIndex].piece && board[tileIndex].piece.color === turn){
        selectedTile = board[tileIndex];
    }
}