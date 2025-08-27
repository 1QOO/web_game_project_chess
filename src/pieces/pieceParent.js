export class pieceParent {
    constructor(tileIndex, color, image){
        this.tileIndex = tileIndex;
        this.color = color;
        this.image = `url("${image}")`;
        this.legalMoves = null;
        this.controlsTiles = null;
    }
}