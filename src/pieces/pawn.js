import { pieceParent} from './pieceParent.js';

//WHITE PAWN
class whitePawn extends pieceParent {
    constructor(tileIndex, color, image){
        super(tileIndex, color, image);
        this.notation = 'p';
        this.firstMove = true;
        this.moves = [-8, -16];
        this.controlsTiles = [-9, -7];
    }
}

//BLACK PAWN
class blackPawn extends pieceParent {
    constructor(tileIndex, color, image){
        super(tileIndex, color, image);
        this.notation = 'p';
        this.firstMove = true;
        this.moves = [8, 16];
        this.controlsTiles = [7, 9];
    }
}


const whitePawn1 = new whitePawn(48, "white", "/img/white_pawn_highlighted.png");
const whitePawn2 = new whitePawn(49, "white", "/img/white_pawn_highlighted.png");
const whitePawn3 = new whitePawn(50, "white", "/img/white_pawn_highlighted.png");
const whitePawn4 = new whitePawn(51, "white", "/img/white_pawn_highlighted.png");
const whitePawn5 = new whitePawn(52, "white", "/img/white_pawn_highlighted.png");
const whitePawn6 = new whitePawn(53, "white", "/img/white_pawn_highlighted.png");
const whitePawn7 = new whitePawn(54, "white", "/img/white_pawn_highlighted.png");
const whitePawn8 = new whitePawn(55, "white", "/img/white_pawn_highlighted.png");

const blackPawn1 = new blackPawn(8, "black", "/img/black_pawn_highlighted.png");
const blackPawn2 = new blackPawn(9, "black", "/img/black_pawn_highlighted.png");
const blackPawn3 = new blackPawn(10, "black", "/img/black_pawn_highlighted.png");
const blackPawn4 = new blackPawn(11, "black", "/img/black_pawn_highlighted.png");
const blackPawn5 = new blackPawn(12, "black", "/img/black_pawn_highlighted.png");
const blackPawn6 = new blackPawn(13, "black", "/img/black_pawn_highlighted.png");
const blackPawn7 = new blackPawn(14, "black", "/img/black_pawn_highlighted.png");
const blackPawn8 = new blackPawn(15, "black", "/img/black_pawn_highlighted.png");

export const whitePawns = [whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8];
export const blackPawns = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8];