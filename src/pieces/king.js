import { pieceParent } from "./pieceParent";

class king extends pieceParent {
    constructor(tileIndex, color, image){
        super(tileIndex, color, image);
        this.notation = 'K';
        this.moves = [-8, -7, +1, +9, +8, +7, -1, -9];
        this.hasNotMoved = true;
    }
}

export const whiteKing = new king(60, "white", "/img/white_king_highlighted.png");
export const blackKing = new king(4, "black", "/img/black_king_highlighted.png");
