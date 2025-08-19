export const boardRows = ['8', '7', '6', '5', '4', '3', '2', '1'];
export const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export class pieceParent {
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
    capturePiece(position, opponentPieces){
        for (this.piece of opponentPieces) {
            if (position == this.piece.position){
                this.piece.isPlayable = false;
                break;
            }
        }
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
    }
    move(position, opponentPieces){
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
        this.position = position;
        this.col = boardCols.indexOf(position.at(0));
        this.row = boardRows.indexOf(position.at(1));
        if (document.querySelector(`#${this.position}`).style.backgroundImage){
            this.capturePiece(this.position, opponentPieces);
        }
        this.display(this.position);
    }
}