import { blackKing } from "./pieces/king";
import { whitePieces,blackPieces } from "./pieces/pieces";

class tile {
    constructor(id){
        this.id = id;
        this.piece = null;
        this.controledBy = [];
    }
}

export const board = {
    tiles : [],
    whiteKing : 60,
    blackKing : 4,
    enPasantTarget : null,
    movePiece : function(start, end){
        let renderTiles = [start];
        if(this.enPasantTarget)this.enPasantTarget = null;
        
        if(start.piece.notation == 'p'){
            const enPasant = this.pawnMoves(start, end);
            if(enPasant) renderTiles.push(enPasant);
        }

        if(start.piece.notation === 'K' && start.piece.color === "white") this.whiteKing = end;
        if(start.piece.notation === 'K' && start.piece.color === "black") this.blackKing = end;

        start.piece.tileIndex = end;
        end = this.tiles[end]
        end.piece = start.piece;
        start.piece = null;
        renderTiles.push(end);

        for (let tile of this.tiles) tile.controledBy = [];
        for (let tile of this.tiles){
            if(tile.piece) this.scannMoves(tile.piece);
        }
        this.isChecked(end.piece.color);
        this.kingScanns();
        return renderTiles;
    },
    pawnMoves : function(start, end){
        if(start.piece.firstMove){
            start.piece.firstMove = false;
            let isTwoSteps = start.piece.tileIndex - end;
            isTwoSteps<0?isTwoSteps*=-1:isTwoSteps;

            if(isTwoSteps === 16) this.enPasantTarget = end;
            start.piece.moves.pop();
        }
        if((start.piece.tileIndex%8 !== end%8) && !(this.tiles[end].piece)){
            let target = 0;
            start.piece.color == "white"?target = 8: target = -8;
            const targetTile = this.tiles[end+target];
            targetTile.piece = null;

            return targetTile;
        }
        else return null;
    },
    scannMoves : function(piece){
        piece.legalMoves = [];

        for (let move of piece.moves){
            let nextMove = piece.tileIndex+move;

            if(piece.notation !== 'K'){
                if(piece.notation === 'p'){
                    this.pawnScanns(piece, nextMove);
                }
                else {
                    piece.controlsTiles = [];
                    while(true){
                        if (0>nextMove || nextMove>63) break;
        
                        if(move === 1 && nextMove%8 === 0) break;
                        if(move === -1 && nextMove%8 === 7) break;
                        if((move === 7 || move === -9) && nextMove%8 === 7) break;
                        if((move === 9 || move === -7) && nextMove%8 === 0) break;
                        if((move === 15 || move === 17) && nextMove%8 === 0) break;
                        if((move === -6 || move === 10) && nextMove%8 < 2) break;
                        if((move === -17 || move === 15) && nextMove%8 === 7) break;
                        if((move === -10 || move === 6) && nextMove%8 > 5) break;
        
                        if(this.tiles[nextMove].piece){
                            if(this.tiles[nextMove].piece.color != piece.color){
                                piece.legalMoves.push(nextMove);
                                this.tiles[nextMove].controledBy.push(piece);
                                break;
                            }
                            else{
                                this.tiles[nextMove].controledBy.push(piece);
                                break;
                            }
                        }
                        piece.legalMoves.push(nextMove);
                        this.tiles[nextMove].controledBy.push(piece);
                        nextMove += move;
                        if(piece.notation === 'N') break;
                    }
                    piece.controlsTiles.concat(piece.legalMoves);
                }
            }
        }
    },
    pawnScanns : function(piece, nextMove){
        if (0>nextMove || nextMove>63) return;//HERE

        for(let move of piece.controlsTiles){
            const tileIndex = piece.tileIndex;

            if(tileIndex + move <0 || tileIndex + move >63) break;
            if(tileIndex%8 == 0 && (move === -9 || move === 7)) continue;
            if(tileIndex%8 == 7 && (move === -7 || move === 9)) continue;
            if(this.tiles[tileIndex + move].piece && this.tiles[tileIndex + move].piece.color !== piece.color){
                piece.legalMoves.push(tileIndex + move);
            }
            this.tiles[tileIndex+move].controledBy.push(piece);
        }
        for(let enPasant of [-1, 1]){
            const tileIndex = piece.tileIndex;
            let row = 0;
            piece.color == "white"?row=-8:row=8;

            if(tileIndex%8 == 0 && enPasant === -1) continue;
            if(tileIndex%8 == 7 && enPasant === 1) continue;
            if(tileIndex + enPasant == this.enPasantTarget) piece.legalMoves.push(tileIndex+enPasant+row);
        }
        if(this.tiles[nextMove].piece) return; //HERE
        piece.legalMoves.push(nextMove);
    },
    kingScanns : function(){
        const kings = [this.tiles[this.whiteKing].piece, this.tiles[this.blackKing].piece];

        for(let king of kings){
            king.legalMoves = [];
            console.log(king)
            for(let move of king.moves){
                const nextMove = king.tileIndex+move;
                const nextTile = this.tiles[nextMove];
                let opponentColor = "";
                let isTileSafe = true;
                king.color=="white"?opponentColor="black":opponentColor="white";

                if (0>nextMove || nextMove>63) continue;

                if(move === 1 && nextMove%8 === 0) continue;
                if(move === -1 && nextMove%8 === 7) continue;
                if((move === 7 || move === -9) && nextMove%8 === 7) continue;
                if((move === 9 || move === -7) && nextMove%8 === 0) continue;
                if((move === 15 || move === 17) && nextMove%8 === 0) continue;
                if((move === -6 || move === 10) && nextMove%8 < 2) continue;
                if((move === -17 || move === 15) && nextMove%8 === 7) continue;
                if((move === -10 || move === 6) && nextMove%8 > 5) continue;
                console.log(nextTile.id, nextTile.controledBy)

                for(let tile of nextTile.controledBy){
                    if (tile.color === opponentColor){
                        isTileSafe = false;
                        break;
                    }
                }

                if(this.tiles[nextMove].piece){
                    if(nextTile.piece.color === opponentColor){
                        if(isTileSafe) king.legalMoves.push(nextMove);
                        nextTile.controledBy.push(king);
                        continue;
                    }
                    else{
                        nextTile.controledBy.push(king);
                        continue;
                    }
                }
                if(isTileSafe)king.legalMoves.push(nextMove);
                nextTile.controledBy.push(king);
            }
                console.log("")
        }
        
    },
    isChecked : function(turn){
        if(turn === "white"){
            const kingTile = this.tiles[this.blackKing];
            for (let piece of kingTile.controledBy){
                if (piece.color === turn) alert("Check.");
            }
        }
        else {
            const kingTile = this.tiles[this.whiteKing];
            for (let piece of kingTile.controledBy){
                if (piece.color === turn) alert("Check.");
            }
        }
    }
}

for (let row = 8; row > 0; row--){
    for (let column = 1; column < 9; column++){
        let colNotation = '';
        switch(column){
            case 1 : {colNotation = 'a'; break;}
            case 2 : {colNotation = 'b'; break;}
            case 3 : {colNotation = 'c'; break;}
            case 4 : {colNotation = 'd'; break;}
            case 5 : {colNotation = 'e'; break;}
            case 6 : {colNotation = 'f'; break;}
            case 7 : {colNotation = 'g'; break;}
            case 8 : {colNotation = 'h'; break;}
            default : break;
        }
        board.tiles.push(new tile(`${colNotation}${row}`));
    }
}

//ASSIGN PIECES ON TO BOARD FOR THE FIRST TIME
for (let index=0; index<16; index++){
    board.tiles[index].piece = blackPieces[index];
    board.tiles[index+48].piece = whitePieces[index];
}
for (let index=0; index<16; index++){
    board.scannMoves(board.tiles[index].piece);
    board.scannMoves(board.tiles[index+48].piece);
}