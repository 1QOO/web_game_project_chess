import {whitePieces, blackPieces} from './pieces.js';

let isWhiteTurn = true;
let selectedCoord = "";
let selectedPiece = "";
let legalTile = [""];
const ON = true;
const OFF = false;

export function gameStart(elements, event){
    const arrayOfElements = [];
//SET PIECES ON THEIR STARTING TILE    
    whitePieces.concat(blackPieces).forEach((item)=>item.display(item.position));

//ADD EVENT LISTENER TO ALL TILES
    for (let i=0;i<elements.length;++i){
        arrayOfElements.push(elements[i]);
    }
    arrayOfElements.forEach((element)=>{
        element.addEventListener(event, ()=>checkCoord(element.id));
    })
}

//FUNCTION TO SELECT A TILE, IF A TILE HAS A PIECE ON IT, THE PIECE CAN TAKE ACTION
export function checkPiece(coord){
    action(coord);
    if (isWhiteTurn){
        for (let piece of whitePieces){
            if (piece.position==coord){
                legalTile = piece.findLegalMoves();
                selectedPiece = piece;
                selectedCoord = coord;
                turnTileOnOff(ON, selectedCoord);
                break;
            }
        }
    }
    else {
        for (let piece of blackPieces){
            if (piece.position==coord){
                legalTile = piece.findLegalMoves();
                selectedPiece = piece;
                selectedCoord = coord;
                turnTileOnOff(ON, selectedCoord);
                break;
            }
        }
    }
}

//FUNCTION IF PLAYER TAKE A LEGAL MOVE
function action(coord){
    if (legalTile[0]){
        turnTileOnOff(OFF, selectedCoord);
        if (legalTile.includes(coord)){
            isWhiteTurn = !isWhiteTurn
            legalTile = [""];
            selectedPiece.move(coord.at(0), coord.at(1));
            selectedPiece = "";
        }
        else {
            selectedPiece = "";
            legalTile = [""];
        }
    }
    else {
    }
}

//HIGHLIGHT AND DEHIGHLIGHT A SELECTED PIECE'S TILE
function turnTileOnOff(turn, coord){
    let tile = document.getElementById(coord)
    turn?tile.style.outlineWidth = "5px":tile.style.outlineWidth = 0;
}