import { pieceParent } from "./pieceParent";

class knight extends pieceParent {
    constructor(tileIndex, color, image){
        super(tileIndex, color, image);
        this.notation = 'N';
        this.moves = [-10, -17, -15, -6, 10, 17, 15, 6];
    }
}
const whiteKnight1 = new knight(57, "white", "/img/white_knight_highlighted.png");
const whiteKnight2 = new knight(62, "white", "/img/white_knight_highlighted.png");
const blackKnight1 = new knight(1, "black", "/img/black_knight_highlighted.png");
const blackKnight2 = new knight(6, "black", "/img/black_knight_highlighted.png");

export const whiteKnights = [whiteKnight1, whiteKnight2];
export const blackKnights = [blackKnight1, blackKnight2];