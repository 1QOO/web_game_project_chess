import { board } from './board.js';

let isWhiteTurn = true;
let selectedTile = null;
export const startPieces = [];

for(let tile of board.tiles) if (tile.piece) startPieces.push(tile);

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

    if(isWhiteTurn) return selectTileFilter("white", tileIndex);
    else return selectTileFilter("black", tileIndex);
}

function selectTileFilter(turn, tileIndex){
    if(selectedTile){
        if (selectedTile.piece.tileIndex === tileIndex){
            selectedTile = null;
            return tileIndex;
        }
        else if(selectedTile.piece.legalMoves.includes(tileIndex)){
            const tiles = board.movePiece(selectedTile, tileIndex);
            selectedTile = null;
            isWhiteTurn = !isWhiteTurn;
            return tiles;
        }
        else if(board.tiles[tileIndex].piece && board.tiles[tileIndex].piece.color === turn && board.tiles[tileIndex].piece.legalMoves.length){
            selectedTile = board.tiles[tileIndex];
            return board.tiles[tileIndex].id;
        }
        else {
            selectedTile = null;
            return null;
        }
    }
    else {
        if (board.tiles[tileIndex].piece && board.tiles[tileIndex].piece.color === turn && board.tiles[tileIndex].piece.legalMoves.length){
            selectedTile = board.tiles[tileIndex];
            return board.tiles[tileIndex].id;
        }
        return null;
    }
}