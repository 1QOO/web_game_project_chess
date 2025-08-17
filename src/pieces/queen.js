import {pieceParent} from './pieceParent.js';

class queen extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

export const whiteQueen = new queen(3, 7, "white", "/img/white_queen_highlighted.png");
export const blackQueen = new queen(4, 0, "black", "/img/black_queen_highlighted.png");
