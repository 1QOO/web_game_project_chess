export class pieceParent {
    constructor(row, col, color, image){
        this.isPlayable = true;
        this.row = row;
        this.col = col;
        this.color = color;
        this.image = `url("${image}")`;
    }
    display(){
        document.getElementById(`${this.row}${this.col}`).style.backgroundImage = this.image
    };
    capturePiece(coord, board){
        const row = Number(coord.at(0));
        const col = Number(coord.at(1));
        document.getElementById(coord).style.backgroundImage = "";
        board[row][col].isPlayable = false;
    }
    move(coord, board){
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