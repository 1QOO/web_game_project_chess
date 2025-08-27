import { whitePieces,blackPieces } from "./pieces/pieces";

class tile {
    constructor(id){
        this.id = id;
        this.piece = null;
        this.controledBy = [];
    }
}

export const board = {
    tiles : [],
    movePiece : function(start, end){
        start.piece.tileIndex = end.piece.tileIndex;
        end.piece = start.piece;
        scannMoves(end.piece);
    },
    scannMoves : function(piece){}
}

for (let row = 8; row > 0; row--){
    for (let column = 1; column < 9; column++){
        let colNotation = '';
        switch(column){
            case 1 : {colNotation = 'a'; break;}
            case 2 : {colNotation = 'b'; break;}
            case 3 : {colNotation = 'c'; break;}
            case 4 : {colNotation = 'd'; break;}
            case 5 : {colNotation = 'e'; break;}
            case 6 : {colNotation = 'f'; break;}
            case 7 : {colNotation = 'g'; break;}
            case 8 : {colNotation = 'h'; break;}
            default : break;
        }
        board.tiles.push(new tile(`${colNotation}${row}`));
    }
}

//ASSIGN PIECES ON TO BOARD FOR THE FIRST TIME
for (let index=0; index<16; index++){
    board.tiles[index].piece = blackPieces[index];
    board.tiles[index+48].piece = whitePieces[index];
}