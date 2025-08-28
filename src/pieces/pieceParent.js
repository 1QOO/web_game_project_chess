export class pieceParent {
    constructor(tileIndex, color, image){
        this.tileIndex = tileIndex;
        this.color = color;
        this.image = image
        this.legalMoves = null;
        this.controlsTiles = null;
    }
}