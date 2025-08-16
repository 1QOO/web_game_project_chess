const boardRows = ['8', '7', '6', '5', '4', '3', '2', '1'];
const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class piece {
    constructor(col, row, color, image){
        this.isPlayable = true;
        this.row = row;
        this.col = col;
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.color = color;
        this.image = `url("${image}")`;
    }
    display(position){
        document.querySelector(`#${position}`).style.backgroundImage = this.image
    };
    capturePiece(position){
        if (this.color == "white"){
            for (this.piece of blackPieces) {
                if (position == this.piece.position){
                    this.piece.isPlayable = false;
                    break;
                }
            }
        }
        else {
            for (this.piece of whitePieces) {
                if (position == this.piece.position){
                    this.piece.isPlayable = false;
                    break;
                }
            }
        }
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
    }
}

//WHITE PAWN
class whitePawn extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.firstMove = true;
    }

    findLegalMoves(){
        this.legalMove = [];
        this.tileAheadCoord = `${boardCols[this.col]}${boardRows[this.row-1]}`;
        this.tileAhead = document.querySelector(`#${this.tileAheadCoord}`);
        this.capturableTiles = [`${boardCols[this.col-1]}${boardRows[this.row-1]}`, `${boardCols[this.col+1]}${boardRows[this.row-1]}`];

        (!(this.tileAhead.style.backgroundImage) && this.row>0) ? this.legalMove.unshift(this.tileAheadCoord) : this.legalMove.unshift("");
        for (this.tileId of this.capturableTiles){
            this.tile = document.getElementById(this.tileId);

            if (this.tile.style.backgroundImage){
                for (this.piece of blackPieces) if (this.tileId == this.piece.position) {
                    this.legalMove.unshift(this.tileId);
                    break;
                }
            }
        }
        if (this.legalMove[0] && this.firstMove){
            this.twoTileAheadCoord =`${boardCols[this.col]}${boardRows[this.row-2]}`;

            !(document.getElementById(this.twoTileAheadCoord).style.backgroundImage) ? this.legalMove.unshift(this.twoTileAheadCoord):false;
        }
        return this.legalMove;
    }
    move(position){
        if (this.firstMove) this.firstMove = false;
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
        this.position = position;
        this.col = boardCols.indexOf(position.at(0));
        this.row = boardRows.indexOf(position.at(1));
        if (document.querySelector(`#${this.position}`).style.backgroundImage){
            super.capturePiece(this.position);
        }
        this.display(this.position);
    }
}

//BLACK PAWN
class blackPawn extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.firstMove = true;
    }

    findLegalMoves(){
        this.legalMove = [];
        this.tileAheadCoord = `${boardCols[this.col]}${boardRows[this.row+1]}`;
        this.tileAhead = document.querySelector(`#${this.tileAheadCoord}`);
        this.capturableTiles = [`${boardCols[this.col-1]}${boardRows[this.row+1]}`, `${boardCols[this.col+1]}${boardRows[this.row+1]}`];

        (!(this.tileAhead.style.backgroundImage) && this.row<7) ? this.legalMove.unshift(this.tileAheadCoord) : this.legalMove.unshift("");
        for (this.tileId of this.capturableTiles){
            this.tile = document.getElementById(this.tileId);

            if (this.tile.style.backgroundImage){
                for (this.piece of whitePieces) if (this.tileId == this.piece.position) {
                    this.legalMove.unshift(this.tileId);
                    break;
                }
            }
        }
        if (this.legalMove[0] && this.firstMove){
            this.twoTileAheadCoord =`${boardCols[this.col]}${boardRows[this.row+2]}`;

            !(document.getElementById(this.twoTileAheadCoord).style.backgroundImage) ? this.legalMove.unshift(this.twoTileAheadCoord):false;
        }
        return this.legalMove;
    }
    move(position){
        if (this.firstMove) this.firstMove = false;
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
        this.position = position;
        this.col = boardCols.indexOf(position.at(0));
        this.row = boardRows.indexOf(position.at(1));
        if (document.querySelector(`#${this.position}`).style.backgroundImage){
            super.capturePiece(this.position);
        }
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
const whitePawn1 = new whitePawn(0, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn2 = new whitePawn(1, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn3 = new whitePawn(2, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn4 = new whitePawn(3, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn5 = new whitePawn(4, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn6 = new whitePawn(5, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn7 = new whitePawn(6, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn8 = new whitePawn(7, 6, "white", "/img/white_pawn_highlighted.png");
const whiteRook1 = new rook(0, 7, "white", "/img/white_rook_highlighted.png");
const whiteRook2 = new rook(7, 7, "white", "/img/white_rook_highlighted.png");
const whiteKnight1 = new knight(1, 7, "white", "/img/white_knight_highlighted.png");
const whiteKnight2 = new knight(6, 7, "white", "/img/white_knight_highlighted.png");
const whiteBishop1 = new bishop(2, 7, "white", "/img/white_bishop_highlighted.png");
const whiteBishop2 = new bishop(5, 7, "white", "/img/white_bishop_highlighted.png");
const whiteQueen = new queen(3, 7, "white", "/img/white_queen_highlighted.png");
const whiteKing = new king(4, 7, "white", "/img/white_king_highlighted.png");

//BLACK PIECES
const blackPawn1 = new blackPawn(0, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn2 = new blackPawn(1, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn3 = new blackPawn(2, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn4 = new blackPawn(3, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn5 = new blackPawn(4, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn6 = new blackPawn(5, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn7 = new blackPawn(6, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn8 = new blackPawn(7, 1, "black", "/img/black_pawn_highlighted.png");
const blackRook1 = new rook(0, 0, "black", "/img/black_rook_highlighted.png");
const blackRook2 = new rook(7, 0, "black", "/img/black_rook_highlighted.png");
const blackKnight1 = new knight(1, 0, "black", "/img/black_knight_highlighted.png");
const blackKnight2 = new knight(6, 0, "black", "/img/black_knight_highlighted.png");
const blackBishop1 = new bishop(2, 0, "black", "/img/black_bishop_highlighted.png");
const blackBishop2 = new bishop(5, 0, "black", "/img/black_bishop_highlighted.png");
const blackQueen = new queen(4, 0, "black", "/img/black_queen_highlighted.png");
const blackKing = new king(3, 0, "black", "/img/black_king_highlighted.png");

export const whitePieces = [
    whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8,
    whiteRook1, whiteRook2, whiteKnight1, whiteKnight2, whiteBishop1, whiteBishop2, whiteQueen, whiteKing
]

export const blackPieces = [
    blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8,
    blackRook1, blackRook2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing
]