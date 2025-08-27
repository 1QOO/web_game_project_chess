import { pieceParent } from "./pieceParent";

class bishop extends pieceParent {
    constructor(tileIndex, color, image){
        super(tileIndex, color, image);
        this.notation = 'B';
        this.moves = [7, -7, 9, -9];
    }
}

const whiteBishop1 = new bishop(58, "white", "/img/white_bishop_highlighted.png");
const whiteBishop2 = new bishop(61, "white", "/img/white_bishop_highlighted.png");
const blackBishop1 = new bishop(2, "black", "/img/black_bishop_highlighted.png");
const blackBishop2 = new bishop(5, "black", "/img/black_bishop_highlighted.png");

export const whiteBishops = [whiteBishop1, whiteBishop2];
export const blackBishops = [blackBishop1, blackBishop2];