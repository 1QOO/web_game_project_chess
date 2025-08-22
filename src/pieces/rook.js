import {pieceParent} from './pieceParent.js';

class rook extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }

    findLegalMoves(board){
        this.legalMove = [];
        const position = `${this.row}${this.col}`;

        //UP
        for(let i = this.row; i>0 ; --i){
            if (position != `${i}${this.col}`){
                if(board[i][this.col]){
                    if (board[i][this.col].color != this.color) this.legalMove.push(`${i}${this.col}`);
                    break;
                }
                else this.legalMove.push(`${i}${this.col}`);
                console.log("finish");
                console.log(this.legalMove)
            }
        }

        //RIGHT
        for(let i = this.col; i<7 ; ++i){
            if (position != `${this.row}${i}`){
                if(board[this.row][i]){
                    if (board[this.row][i].color != this.color) this.legalMove.push(`${this.row}${i}`);
                    break;
                }
                else this.legalMove.push(`${this.row}${i}`);
            }
        }

        //DOWN
        for(let i = this.row; i<7 ; ++i){
            if (position != `${i}${this.col}`){
                if(board[i][this.col]){
                    if (board[i][this.col].color != this.color) this.legalMove.push(`${1}${this.col}`);
                    break;
                }
                else this.legalMove.push(`${1}${this.col}`);
            }
        }

        //LEFT
        for(let i = this.col; i>0 ; --i){
            if (position != `${this.row}${i}`){
                if(board[this.row][i]){
                    if (board[this.row][i].color != this.color) this.legalMove.push(`${this.row}${i}`);
                    break;
                }
                else this.legalMove.push(`${this.row}${i}`);
            }
        }
        return this.legalMove[0] ? this.legalMove : [''];
    }
}

const whiteRook1 = new rook(7, 0, "white", "/img/white_rook_highlighted.png");
const whiteRook2 = new rook(7, 7, "white", "/img/white_rook_highlighted.png");
const blackRook1 = new rook(0, 0, "black", "/img/black_rook_highlighted.png");
const blackRook2 = new rook(0, 7, "black", "/img/black_rook_highlighted.png");

export const whiteRooks = [whiteRook1, whiteRook2];
export const blackRooks = [blackRook1, blackRook2];