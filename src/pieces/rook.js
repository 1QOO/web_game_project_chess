import {pieceParent} from './pieceParent.js';

class rook extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

const whiteRook1 = new rook(0, 7, "white", "/img/white_rook_highlighted.png");
const whiteRook2 = new rook(7, 7, "white", "/img/white_rook_highlighted.png");
const blackRook1 = new rook(0, 0, "black", "/img/black_rook_highlighted.png");
const blackRook2 = new rook(7, 0, "black", "/img/black_rook_highlighted.png");

export const whiteRooks = [whiteRook1, whiteRook2];
export const blackRooks = [blackRook1, blackRook2];