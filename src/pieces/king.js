import { pieceParent } from "./pieceParent";

class king extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.notation = 'K';
        this.isCheckedBy = [];
    }
    
    findLegalMoves(board){
        this.legalMove = [];
        this.tilesId =  [`${this.row-1}${this.col-1}`, `${this.row-1}${this.col}`, `${this.row-1}${this.col+1}`, `${this.row}${this.col+1}`,
                        `${this.row+1}${this.col+1}`, `${this.row+1}${this.col}`, `${this.row+1}${this.col-1}`, `${this.row}${this.col-1}`,]

        for (let id of this.tilesId){
            const row = Number(id.at(0));
            const col = Number(id.at(1));

            if (0<=row && row<=7 && 0<=col && col<=7){
                if (board[row][col] && board[row][col].color != this.color) this.legalMove.push(id);
                else if (board[row][col] && board[row][col].color == this.color){}
                else  this.legalMove.push(id);
            }
        }
        return this.legalMove;
    }
    isChecked(board){
        const checkedBy = [];
        const kingPosition = `${this.row}${this.col}`;
        const knightTilesId =  [`${this.row-2}${this.col+1}`, `${this.row-1}${this.col+2}`, `${this.row+1}${this.col+2}`, `${this.row+2}${this.col+1}`,
                        `${this.row+2}${this.col-1}`, `${this.row+1}${this.col-2}`, `${this.row-1}${this.col-2}`, `${this.row-2}${this.col-1}`
                        ]

        //BY PAWN
        if(this.color=="white"){
            const bottomLeftTile = board[this.row-1][this.col-1];
            const bottomRightTile = board[this.row-1][this.col+1];
            if (bottomLeftTile && bottomLeftTile.color!=this.color&&bottomLeftTile.notation=='p')checkedBy.push(bottomLeftTile);
            if (bottomRightTile && bottomRightTile.color!=this.color&&bottomRightTile.notation=='p')checkedBy.push(bottomRightTile);
        }
        if(this.color=="black"){
            const bottomLeftTile = board[this.row+1][this.col-1];
            const bottomRightTile = board[this.row+1][this.col+1];
            if (bottomLeftTile && bottomLeftTile.color!=this.color&&bottomLeftTile.notation=='p')checkedBy.push(bottomLeftTile);
            if (bottomRightTile && bottomRightTile.color!=this.color&&bottomRightTile.notation=='p')checkedBy.push(bottomRightTile);
        }

        //BY KNIGHT
        for (let id of knightTilesId){
            const row = Number(id.at(0));
            const col = Number(id.at(1));
            if(0<=row&&row<=7 && 0<=col&&col<=7){
                const tile = board[row][col];
                if (tile && tile.color != this.color && tile.notation == 'N'){
                    checkedBy.push(tile);
                    break;
                }
            }
        }

        //BY ROOK OR QUEEN
        //UP
        for(let i = this.row; i>0 ; --i){
            const tile = board[i][this.col];
            if (kingPosition != `${i}${this.col}`){
                if(tile){
                    if(tile.color!=this.color && (tile.notation=='R' || tile.notation=='Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }

        //RIGHT
        for(let i = this.col; i<7 ; ++i){
            const tile = board[this.row][i];
            if (kingPosition != `${this.row}${i}`){
                if(tile){
                    if(tile.color!=this.color && (tile.notation=='R' || tile.notation == 'Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }

        //DOWN
        for(let i = this.row; i<7 ; ++i){
            const tile = board[i][this.col];
            if (kingPosition != `${i}${this.col}`){
                if(tile){
                    if(tile.color!=this.color && (tile.notation=='R' || tile.notation=='Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }

        //LEFT
        for(let i = this.col; i>0 ; --i){
            const tile = board[this.row][i];
            if (kingPosition != `${this.row}${i}`){
                if(tile){
                    if(tile.color!=this.color && (tile.notation=='R' || tile.notation == 'Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }

        //UP-RIGHT
        for(let i = this.row, j = this.col; i>=0 && j<=7 ; --i, ++j){
            const tile = board[i][j];
            if (kingPosition != `${i}${j}`){
                if(tile){
                    if (tile.color!=this.color && (tile.notation=='B' || tile.notation=='Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }

        //DOWN-RIGHT
        for(let i = this.row, j = this.col; i<=7 && j<=7 ; ++i, ++j){
            const tile = board[i][j];
            if (kingPosition != `${i}${j}`){
                if(tile){
                    if (tile.color!=this.color && (tile.notation=='B' || tile.notation=='Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }

        //DOWN-LEFT
        for(let i = this.row, j = this.col; i<=7 && j>=0 ; ++i, --j){
            const tile = board[i][j];
            if (kingPosition != `${i}${j}`){
                if(tile){
                    if (tile.color!=this.color && (tile.notation=='B' || tile.notation=='Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }

        //UP-LEFT
        for(let i = this.row, j = this.col; i>=0 && j>=0 ; --i, --j){
            const tile = board[i][j];
            if (kingPosition != `${i}${j}`){
                if(tile){
                    if (tile.color!=this.color && (tile.notation=='B' || tile.notation=='Q')){
                        checkedBy.push(tile);
                        break;
                    }
                    else break;
                }
            }
        }
        if(checkedBy.length){
            alert("CHECKED!");
            this.isCheckedBy = checkedBy;
        }
    }
}

export const whiteKing = new king(7, 4, "white", "/img/white_king_highlighted.png");
export const blackKing = new king(0, 4, "black", "/img/black_king_highlighted.png");
