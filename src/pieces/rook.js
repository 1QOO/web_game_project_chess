import {pieceParent} from './pieceParent.js';

class rook extends pieceParent {
    constructor(tileIndex, color, image){
        super(tileIndex, color, image);
        this.notation = 'R';
        this.moves = [-8, 1, 8, -1];
    }
}

const whiteRook1 = new rook(56, "white", "/img/white_rook_highlighted.png");
const whiteRook2 = new rook(63, "white", "/img/white_rook_highlighted.png");
const blackRook1 = new rook(0, "black", "/img/black_rook_highlighted.png");
const blackRook2 = new rook(7, "black", "/img/black_rook_highlighted.png");

export const whiteRooks = [whiteRook1, whiteRook2];
export const blackRooks = [blackRook1, blackRook2];