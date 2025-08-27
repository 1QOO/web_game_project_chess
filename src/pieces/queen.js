import {pieceParent} from './pieceParent.js';

class queen extends pieceParent {
    constructor(tileIndex, color, image){
        super(tileIndex, color, image);
        this.notation = 'Q';
        this.moves = [-8, -7, +1, +9, +8, +7, -1, -9];
    }
}

export const whiteQueen = new queen(59, "white", "/img/white_queen_highlighted.png");
export const blackQueen = new queen(3, "black", "/img/black_queen_highlighted.png");
