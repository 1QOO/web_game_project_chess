
const boardRows = [8, 7, 6, 5, 4, 3, 2, 1];
const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class piece {
    constructor(row, col, color, image){
        this.row = row;
        this.col = col;
        this.color = color;
        this.image = `url("${image}")`;

        this.display();
    }
    display(){
        const cellId = `${boardCols[this.col]}${boardRows[this.row]}`;
        document.querySelector(`#${cellId}`).style.backgroundImage = this.image};
}

export class pawn extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        super.display();
    }
}

export class rook extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        super.display();
    }
}

export class knight extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        super.display();
    }
}

export class bishop extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        super.display();
    }
}

export class queen extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        super.display();
    }
}

export class king extends piece {
    constructor(row, col, color, image){
        super(row, col, color, image);
        super.display();
    }
}