import {whitePawns, blackPawns} from "/src/lib/pieces/pawn.js";
import {whiteRooks, blackRooks} from "/src/lib/pieces/rook.js";
import {whiteKnights, blackKnights} from "/src/lib/pieces/knight.js"
import {whiteBishops, blackBishops} from "/src/lib/pieces/bishop.js";
import {whiteQueen, blackQueen} from "/src/lib/pieces/queen.js";
import {whiteKing, blackKing} from "/src/lib/pieces/king.js"

export const whitePieces = [...whitePawns, whiteRooks[0], whiteKnights[0], whiteBishops[0], whiteQueen, whiteKing, whiteBishops[1], whiteKnights[1], whiteRooks[1]];
export const blackPieces = [blackRooks[0], blackKnights[0], blackBishops[0], blackQueen, blackKing, blackBishops[1], blackKnights[1], blackRooks[1], ...blackPawns];

class tile {
    constructor(id){
        this.id = id;
        this.color = null;
        this.piece = null;
        this.highlight = null;
        this.controledBy = [];
        
        if(Math.floor(id/8)%2===0) this.color = id%2===0?"light-square":"dark-square";
        else this.color = id%2===1?"light-square":"dark-square";
    }
}

export const board = {
    tiles : [],
    whiteKing : whiteKing,
    blackKing : blackKing,
    enPasantTarget : null,
    pinnedPiece : [],
}

for (let i=0; i<64; i++) board.tiles.push(new tile(i));