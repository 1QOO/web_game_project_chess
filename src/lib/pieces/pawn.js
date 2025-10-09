import { pieceParent} from './pieceParent.js';

//WHITE PAWN
class whitePawn extends pieceParent {
    constructor(color, image){
        super(color, image);
        this.notation = 'p';
        this.firstMove = true;
        this.step = -8;
    }
}

//BLACK PAWN
class blackPawn extends pieceParent {
    constructor(color, image){
        super(color, image);
        this.notation = 'p';
        this.firstMove = true;
        this.step = 8;
    }
}


const whitePawn1 = new whitePawn("white", "/img/white_pawn_highlighted.png");
const whitePawn2 = new whitePawn("white", "/img/white_pawn_highlighted.png");
const whitePawn3 = new whitePawn("white", "/img/white_pawn_highlighted.png");
const whitePawn4 = new whitePawn("white", "/img/white_pawn_highlighted.png");
const whitePawn5 = new whitePawn("white", "/img/white_pawn_highlighted.png");
const whitePawn6 = new whitePawn("white", "/img/white_pawn_highlighted.png");
const whitePawn7 = new whitePawn("white", "/img/white_pawn_highlighted.png");
const whitePawn8 = new whitePawn("white", "/img/white_pawn_highlighted.png");

const blackPawn1 = new blackPawn("black", "/img/black_pawn_highlighted.png");
const blackPawn2 = new blackPawn("black", "/img/black_pawn_highlighted.png");
const blackPawn3 = new blackPawn("black", "/img/black_pawn_highlighted.png");
const blackPawn4 = new blackPawn("black", "/img/black_pawn_highlighted.png");
const blackPawn5 = new blackPawn("black", "/img/black_pawn_highlighted.png");
const blackPawn6 = new blackPawn("black", "/img/black_pawn_highlighted.png");
const blackPawn7 = new blackPawn("black", "/img/black_pawn_highlighted.png");
const blackPawn8 = new blackPawn("black", "/img/black_pawn_highlighted.png");

export const whitePawns = [whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8];
export const blackPawns = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8];