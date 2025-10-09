import { pieceParent } from "./pieceParent";

class king extends pieceParent {
    constructor(color, image){
        super(color, image);
        this.notation = 'K';
        this.step = [-8, -7, +1, +9, +8, +7, -1, -9];
        this.hasNotMoved = true;
    }
}

export const whiteKing = new king("white", "/img/white_king_highlighted.png");
export const blackKing = new king("black", "/img/black_king_highlighted.png");
