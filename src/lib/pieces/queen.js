import {pieceParent} from './pieceParent.js';

class queen extends pieceParent {
    constructor(color, image){
        super(color, image);
        this.notation = 'Q';
        this.step = [-8, -7, 1, 9, 8, 7, -1, -9];
    }
}

export const whiteQueen = new queen("white", "/img/white_queen_highlighted.png");
export const blackQueen = new queen("black", "/img/black_queen_highlighted.png");
