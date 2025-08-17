import { pieceParent } from "./pieceParent";

class king extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

export const whiteKing = new king(4, 7, "white", "/img/white_king_highlighted.png");
export const blackKing = new king(3, 0, "black", "/img/black_king_highlighted.png");
