import {pieceParent} from './pieceParent.js';

class rook extends pieceParent {
    constructor(color, image){
        super(color, image);
        this.notation = 'R';
        this.moves = [-8, 1, 8, -1];
        this.hasNotMoved = true;
    }
}

const whiteRook1 = new rook("white", "/img/white_rook_highlighted.png");
const whiteRook2 = new rook("white", "/img/white_rook_highlighted.png");
const blackRook1 = new rook("black", "/img/black_rook_highlighted.png");
const blackRook2 = new rook("black", "/img/black_rook_highlighted.png");

export const whiteRooks = [whiteRook1, whiteRook2];
export const blackRooks = [blackRook1, blackRook2];