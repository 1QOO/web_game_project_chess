import {whitePieces, blackPieces} from './pieces.js';

let isWhiteTurn = true;
let selectedPiece = "";
let legalTile = [""];

export function gameStart(){
    whitePieces.concat(blackPieces).forEach((item)=>item.display(item.position));
}

export function addEvent(elements, event){
    const arrayOfElements = [];
    for (let i=0;i<elements.length;++i){
        arrayOfElements.push(elements[i]);
    }
    arrayOfElements.forEach((element)=>{
        element.addEventListener(event, ()=>checkCoord(element.id));
    })
}

export function checkPiece(coord){
    if (legalTile[0]){
        if (legalTile.includes(coord)){
            isWhiteTurn = !isWhiteTurn
            legalTile = [""];
            console.log(isWhiteTurn+legalTile[0])
            selectedPiece.move(coord.at(0), coord.at(1));
            selectedPiece = "";
        }
        else {
            selectedPiece = "";
            legalTile = [""]
        }
    }
    else {
        if (isWhiteTurn){
            for (let piece of whitePieces){
                if (piece.position==coord){
                    selectedPiece = piece
                    legalTile = piece.findLegalMoves();
                    break;
                }
            }
        }
        else {
            for (let piece of blackPieces){
                if (piece.position==coord){
                    selectedPiece = piece;
                    console.log("start find legal move for black.")
                    legalTile = piece.findLegalMoves();
                    console.log(legalTile);
                    break;
                }
            }
        }
    }
}