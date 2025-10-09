import { pieceParent } from "./pieceParent";

class knight extends pieceParent {
    constructor(color, image){
        super(color, image);
        this.notation = 'N';
        this.step = [-10, -17, -15, -6, 10, 17, 15, 6];
    }
}
const whiteKnight1 = new knight("white", "/img/white_knight_highlighted.png");
const whiteKnight2 = new knight("white", "/img/white_knight_highlighted.png");
const blackKnight1 = new knight("black", "/img/black_knight_highlighted.png");
const blackKnight2 = new knight("black", "/img/black_knight_highlighted.png");

export const whiteKnights = [whiteKnight1, whiteKnight2];
export const blackKnights = [blackKnight1, blackKnight2];