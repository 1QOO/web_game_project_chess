import { pieceParent} from './pieceParent.js';

//WHITE PAWN
class whitePawn extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.firstMove = true;
        this.targetOfEnPasant = false;
    }

    findLegalMoves(board){
        this.legalMove = [];
        const tileAhead = board[this.row-1][this.col];
        const twoTileAhead = board[this.row-2][this.col];
        const capturableTile1 = board[this.row-1][this.col-1];
        const capturableTile2 = board[this.row-1][this.col+1];

        if (this.row>0 && !(tileAhead)){
            this.legalMove.push(`${this.row-1}${this.col}`);
            if (this.firstMove && !(twoTileAhead)) this.legalMove.push(`${this.row-2}${this.col}`);
        }
        if (this.row>0 && this.col>0 && capturableTile1){
            if (capturableTile1.color = "black") this.legalMove.push(`${capturableTile1.row}${capturableTile1.col}`)
        }
        if (this.row>0 && this.col<7 && capturableTile2){
            if (capturableTile2.color = "black") this.legalMove.push(`${capturableTile2.row}${capturableTile2.col}`)
        }
        return this.legalMove;
    }
    move(coord, board){
        if (this.firstMove) this.firstMove = false;
        document.getElementById(`${this.row}${this.col}`).style.backgroundImage = "";
        if (board[coord.at(0)][coord.at(1)]){
            this.capturePiece(`${coord.at(0)}${coord.at(1)}`, board);
        }
        board[coord.at(0)][coord.at(1)] = board[this.row][this.col]
        board[this.row][this.col] = "";
        this.row = Number(coord.at(0));
        this.col = Number(coord.at(1));
        this.display();
    }
}

//BLACK PAWN
class blackPawn extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.firstMove = true;
        this.targetOfEnPasant = false;
    }

    findLegalMoves(board){
        this.legalMove = [];
        const tileAhead = board[this.row+1][this.col];
        const twoTileAhead = board[this.row+2][this.col];
        const capturableTile1 = board[this.row+1][this.col-1];
        const capturableTile2 = board[this.row+1][this.col+1];

        if (this.row<7 && !(tileAhead)){
            this.legalMove.push(`${this.row+1}${this.col}`);
            if (this.firstMove && !(twoTileAhead)) this.legalMove.push(`${this.row+2}${this.col}`);
        }
        if (this.row<7 && this.col>0 && capturableTile1){
            if (capturableTile1.color = "white") this.legalMove.push(`${capturableTile1.row}${capturableTile1.col}`)
        }
        if (this.row<7 && this.col<7 && capturableTile2){
            if (capturableTile2.color = "white") this.legalMove.push(`${capturableTile2.row}${capturableTile2.col}`)
        }
        return this.legalMove;
    }
    move(coord, board){
        if (this.firstMove) this.firstMove = false;
        document.getElementById(`${this.row}${this.col}`).style.backgroundImage = "";
        if (board[coord.at(0)][coord.at(1)]){
            this.capturePiece(`${coord.at(0)}${coord.at(1)}`, board);
        }
        board[coord.at(0)][coord.at(1)] = board[this.row][this.col]
        board[this.row][this.col] = "";
        this.row = Number(coord.at(0));
        this.col = Number(coord.at(1));
        this.display();
    }
}


const whitePawn1 = new whitePawn(6, 0, "white", "/img/white_pawn_highlighted.png");
const whitePawn2 = new whitePawn(6, 1, "white", "/img/white_pawn_highlighted.png");
const whitePawn3 = new whitePawn(6, 2, "white", "/img/white_pawn_highlighted.png");
const whitePawn4 = new whitePawn(6, 3, "white", "/img/white_pawn_highlighted.png");
const whitePawn5 = new whitePawn(6, 4, "white", "/img/white_pawn_highlighted.png");
const whitePawn6 = new whitePawn(6, 5, "white", "/img/white_pawn_highlighted.png");
const whitePawn7 = new whitePawn(6, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn8 = new whitePawn(6, 7, "white", "/img/white_pawn_highlighted.png");

const blackPawn1 = new blackPawn(1, 0, "black", "/img/black_pawn_highlighted.png");
const blackPawn2 = new blackPawn(1, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn3 = new blackPawn(1, 2, "black", "/img/black_pawn_highlighted.png");
const blackPawn4 = new blackPawn(1, 3, "black", "/img/black_pawn_highlighted.png");
const blackPawn5 = new blackPawn(1, 4, "black", "/img/black_pawn_highlighted.png");
const blackPawn6 = new blackPawn(1, 5, "black", "/img/black_pawn_highlighted.png");
const blackPawn7 = new blackPawn(1, 6, "black", "/img/black_pawn_highlighted.png");
const blackPawn8 = new blackPawn(1, 7, "black", "/img/black_pawn_highlighted.png");

export const whitePawns = [whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8];
export const blackPawns = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8];