export let gameHistory = [];

export class move{
    constructor(moveOrder, moveNotation, boardState){
        this.moveOrder = moveOrder;
        this.moveNotation = moveNotation;
        this.boardState = boardState;
    }
}