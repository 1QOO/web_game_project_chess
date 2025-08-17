import { pieceParent } from "./pieceParent";

class knight extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

const whiteKnight1 = new knight(1, 7, "white", "/img/white_knight_highlighted.png");
const whiteKnight2 = new knight(6, 7, "white", "/img/white_knight_highlighted.png");
const blackKnight1 = new knight(1, 0, "black", "/img/black_knight_highlighted.png");
const blackKnight2 = new knight(6, 0, "black", "/img/black_knight_highlighted.png");

export const whiteKnights = [whiteKnight1, whiteKnight2];
export const blackKnights = [blackKnight1, blackKnight2];