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
    pinnedPiece : [],
    movePiece : function(start, end){
        const turnColor = start.piece.color;
        let renderTiles = [start];
        if(this.enPasantTarget)this.enPasantTarget = null;
        
        if(start.piece.notation == 'p'){
            const enPasant = this.pawnMoves(start, end);
            if(enPasant) renderTiles.push(enPasant);
        }

        if(start.piece.notation === 'K'){
            let renderRook = null;
            if(start.piece.color === "white") this.whiteKing = end;
            else this.blackKing = end;

            if(start.piece.tileIndex-end === 2 || start.piece.tileIndex-end === -2) renderRook = this.castle(start.piece.tileIndex, end);
            if(renderRook) renderTiles=renderTiles.concat(renderRook);
        }

        start.piece.tileIndex = end;
        end = this.tiles[end]
        end.piece = start.piece;
        start.piece = null;
        renderTiles.push(end);
        if((end.piece.notation === 'K' || end.piece.notation === 'R') && end.piece.hasNotMoved) end.piece.hasNotMoved = false;

        for (let tile of this.tiles) tile.controledBy = [];
        for (let tile of this.tiles) if(tile.piece) this.scannMoves(tile.piece);
        for(let piece of this.pinnedPiece) piece.legalMoves = [];
        this.pinnedPiece = [];

        this.isChecked(turnColor);
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
                    let pinnedPiece = null;
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
                                if(!pinnedPiece){
                                    piece.legalMoves.push(nextMove);
                                    this.tiles[nextMove].controledBy.push(piece);
                                    if(this.tiles[nextMove].piece.notation !== 'K') pinnedPiece = this.tiles[nextMove].piece;
                                }
                                else {
                                    if(this.tiles[nextMove].piece.notation === 'K') this.pinnedPiece.push(pinnedPiece);
                                    break;
                                }
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
            this.castlingScann(king);
        }
        
    },
    isChecked : function(turn){
        const kingTile = turn === "white"?this.tiles[this.blackKing]:this.tiles[this.whiteKing];
        let checkCount = 0;
        let doubleCheck = false;
        let attacker;

        for (let piece of kingTile.controledBy) if (piece.color === turn){
            attacker = piece;
            checkCount++;
        }

        if(checkCount){
            alert("Check.");
            this.checkResponse(turn, doubleCheck, attacker);
        }
    },
    checkResponse : function(turnColor, doubleCheck, attacker){
        const piecesSet = turnColor === "white"?blackPieces:whitePieces;
        let kingTile;
        let step;
        let attackerIndex;
        const attackerLine = [];
        const attackerLineIndex = [];
        turnColor === "white"?kingTile=this.tiles[this.blackKing]:kingTile=this.tiles[this.whiteKing];
        const kingIndex = kingTile.piece.tileIndex;

        if(doubleCheck){
            for(let piece of piecesSet) piece.legalMoves = [];
            return;
        }

        if(attacker.notation === 'N'){
            let legalPieces = [];
            for(let piece of this.tiles[attacker.tileIndex].controledBy) if(piece.color !== turnColor) legalPieces.push(piece);

            for(let piece of piecesSet) piece.legalMoves = [];
            for(let piece of legalPieces) piece.legalMoves.push(attacker.tileIndex);
            console.log(piecesSet)
            return;
        }

        for (let piece of kingTile.controledBy) if(piece.color === turnColor) attacker = piece;
        attackerIndex = attacker.tileIndex;
        if(kingIndex%8 === attackerIndex%8) kingIndex>attackerIndex? step=8: step=-8;
        if(kingIndex - attackerIndex<8 || kingIndex - attackerIndex>-8) kingIndex>attackerIndex? step=1: step=-1;
        if(kingIndex%8>attackerIndex%8) kingIndex>attackerIndex? step=9: step=-7;
        if(kingIndex%8<attackerIndex%8) kingIndex>attackerIndex? step=7: step=-9;
        console.log("Step =", step)

        while(true){
            console.log("Tile Index =",attackerIndex);
            if(attackerIndex === kingIndex) break;
            attackerLine.push(this.tiles[attackerIndex]);
            attackerLineIndex.push(attackerIndex);
            attackerIndex+=step;
            if(attackerIndex<0) break;
        }
        
        if(turnColor==="white") for(let piece of blackPieces){
            if(piece.notation === 'p'){
                for(let move of piece.moves){
                    if(attackerLineIndex.includes(piece.tileIndex+move)){
                        console.log(piece.legalMoves.length);
                        piece.legalMoves = [piece.tileIndex+move]
                        console.log(piece.legalMoves.length);
                        console.log("")
                        break;
                    }
                    else piece.legalMoves = [];
                }
            }
            else piece.legalMoves = [];
        }
        else for(let piece of whitePieces){
            if(piece.notation === 'p'){
                for(let move of piece.moves){
                    if(attackerLineIndex.includes(piece.tileIndex+move)){
                        piece.legalMoves = [piece.tileIndex+move]
                        break;
                    }
                    else piece.legalMoves = [];
                }
            }
            else piece.legalMoves = [];
        }
        
        for(let tile of attackerLine){
            for(let piece of tile.controledBy){
                if(piece.color !== turnColor){
                    piece.legalMoves.push(this.tiles.indexOf(tile))
                }
            }
        }
    },
    castlingScann : function(king){
        let kingIsSafe = true;
        for(let piece of this.tiles[king.tileIndex].controledBy) if(piece.color !== king.color) kingIsSafe = false;

        if(king.hasNotMoved && kingIsSafe){
            let shortCastling = true;
            let longCastling = true;
            const leftCornerTile = this.tiles[king.tileIndex-4];
            const rightCornerTile = this.tiles[king.tileIndex+3];

            if(leftCornerTile.piece && leftCornerTile.piece.color === king.color && leftCornerTile.piece.notation === 'R' && leftCornerTile.piece.hasNotMoved){
                for(let tileIndex = king.tileIndex-1; tileIndex%8>0; tileIndex--){
                    if(this.tiles[tileIndex].piece){
                        longCastling = false;
                        break;
                    }
                    else if(tileIndex%8>1){
                        for(let piece of this.tiles[tileIndex].controledBy) if(piece.color !== king.color){
                            longCastling = false;
                            break;
                        }
                    }
                }
            }
            if(rightCornerTile.piece && rightCornerTile.piece.color === king.color && rightCornerTile.piece.notation === 'R' && rightCornerTile.piece.hasNotMoved){
                for(let tileIndex = king.tileIndex+1; tileIndex%8<7; tileIndex++){
                    if(this.tiles[tileIndex].piece){
                        shortCastling = false;
                        break;
                    }
                    else if(tileIndex%8<7){
                        for(let piece of this.tiles[tileIndex].controledBy) if(piece.color !== king.color){
                            shortCastling = false;
                            break;
                        }
                    }
                }
            }
            if(longCastling)king.legalMoves.push(king.tileIndex-2);
            if(shortCastling)king.legalMoves.push(king.tileIndex+2);
        }
    },
    castle : function(start, end){
        if(start>end){
            this.tiles[start-1].piece = this.tiles[start-4].piece;
            this.tiles[start-4].piece = null;
            this.tiles[start-1].piece.hasNotMoved = false;

            return [this.tiles[start-1], this.tiles[start-4]];
        }
        else {
            this.tiles[start+1].piece = this.tiles[start+3].piece;
            this.tiles[start+3].piece = null;
            this.tiles[start+1].piece.hasNotMoved = false;

            return [this.tiles[start+1], this.tiles[start+3]];
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
    if(board.tiles[index].piece) board.scannMoves(board.tiles[index].piece);
    if(board.tiles[index+48].piece) board.scannMoves(board.tiles[index+48].piece);
}