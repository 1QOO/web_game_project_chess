const boardRows = [8, 7, 6, 5, 4, 3, 2, 1];
const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class piece {
    constructor(row, col, color, image){
        this.row = row;
        this.col = col;
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.color = color;
        this.image = `url("${image}")`;
    }
    display(position){
        document.querySelector(`#${position}`).style.backgroundImage = this.image
    };
}

class whitePawn extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.firstMove = true;
    }

    findLegalMoves(){
        if (this.firstMove){
            return [`${boardCols[this.col]}${boardRows[this.row-1]}`, `${boardCols[this.col]}${boardRows[this.row-2]}`];

        }
        return this.row>0?`${boardCols[this.col]}${boardRows[this.row-1]}`:"";
    }
    move(col, row){
        if (this.firstMove) this.firstMove = false;
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
        this.col = boardCols.indexOf(col);
        this.row = boardRows[row];
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.display(this.position);
    }
}

class blackPawn extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.firstMove = true;
    }

    findLegalMoves(){
        if (this.firstMove){
            return [`${boardCols[this.col]}${boardRows[this.row+1]}`, `${boardCols[this.col]}${boardRows[this.row+2]}`];

        }
        return this.row>0?`${boardCols[this.col]}${boardRows[this.row+1]}`:"";
    }
    move(col, row){
        if (this.firstMove) this.firstMove = false;
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
        this.col = boardCols.indexOf(col);
        this.row = boardRows[row];
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.display(this.position);
    }
}

class rook extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

class knight extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

class bishop extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

class queen extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

class king extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

//WHITE PIECES
const whitePawn1 = new whitePawn(6, 0, "white", "/img/white_pawn_highlighted.png");
const whitePawn2 = new whitePawn(6, 1, "white", "/img/white_pawn_highlighted.png");
const whitePawn3 = new whitePawn(6, 2, "white", "/img/white_pawn_highlighted.png");
const whitePawn4 = new whitePawn(6, 3, "white", "/img/white_pawn_highlighted.png");
const whitePawn5 = new whitePawn(6, 4, "white", "/img/white_pawn_highlighted.png");
const whitePawn6 = new whitePawn(6, 5, "white", "/img/white_pawn_highlighted.png");
const whitePawn7 = new whitePawn(6, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn8 = new whitePawn(6, 7, "white", "/img/white_pawn_highlighted.png");
const whiteRook1 = new rook(7, 0, "white", "/img/white_rook_highlighted.png");
const whiteRook2 = new rook(7, 7, "white", "/img/white_rook_highlighted.png");
const whiteKnight1 = new knight(7, 1, "white", "/img/white_knight_highlighted.png");
const whiteKnight2 = new knight(7, 6, "white", "/img/white_knight_highlighted.png");
const whiteBishop1 = new bishop(7, 2, "white", "/img/white_bishop_highlighted.png");
const whiteBishop2 = new bishop(7, 5, "white", "/img/white_bishop_highlighted.png");
const whiteQueen = new queen(7, 3, "white", "/img/white_queen_highlighted.png");
const whiteKing = new king(7, 4, "white", "/img/white_king_highlighted.png");

//BLACK PIECES
const blackPawn1 = new blackPawn(1, 0, "black", "/img/black_pawn_highlighted.png");
const blackPawn2 = new blackPawn(1, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn3 = new blackPawn(1, 2, "black", "/img/black_pawn_highlighted.png");
const blackPawn4 = new blackPawn(1, 3, "black", "/img/black_pawn_highlighted.png");
const blackPawn5 = new blackPawn(1, 4, "black", "/img/black_pawn_highlighted.png");
const blackPawn6 = new blackPawn(1, 5, "black", "/img/black_pawn_highlighted.png");
const blackPawn7 = new blackPawn(1, 6, "black", "/img/black_pawn_highlighted.png");
const blackPawn8 = new blackPawn(1, 7, "black", "/img/black_pawn_highlighted.png");
const blackRook1 = new rook(0, 0, "black", "/img/black_rook_highlighted.png");
const blackRook2 = new rook(0, 7, "black", "/img/black_rook_highlighted.png");
const blackKnight1 = new knight(0, 1, "black", "/img/black_knight_highlighted.png");
const blackKnight2 = new knight(0, 6, "black", "/img/black_knight_highlighted.png");
const blackBishop1 = new bishop(0, 2, "black", "/img/black_bishop_highlighted.png");
const blackBishop2 = new bishop(0, 5, "black", "/img/black_bishop_highlighted.png");
const blackQueen = new queen(0, 4, "black", "/img/black_queen_highlighted.png");
const blackKing = new king(0, 3, "black", "/img/black_king_highlighted.png");

export const whitePieces = [
    whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8,
    whiteRook1, whiteRook2, whiteKnight1, whiteKnight2, whiteBishop1, whiteBishop2, whiteQueen, whiteKing
]

export const blackPieces = [
    blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8,
    blackRook1, blackRook2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing
]