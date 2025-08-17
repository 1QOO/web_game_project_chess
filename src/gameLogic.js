import { whitePieces, blackPieces } from './pieces/pieces.js';

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
        element.addEventListener(event, ()=>selectTile(element.id));
    })
}

//FUNCTION TO SELECT A TILE
export function selectTile(coord){
    if (coord == selectedCoord) {
        turnTileOnOff(OFF, selectedCoord);
        selectedCoord = "";
        selectedPiece = "";
    }
    else {
        if (!(selectedPiece)) {
            if (isWhiteTurn) checkNSelectPiece(whitePieces, coord);
            else checkNSelectPiece(blackPieces, coord);
        }
        else {
            if (legalTile.includes(coord)) {
                isWhiteTurn ? selectedPiece.move(coord, blackPieces) : selectedPiece.move(coord, whitePieces);
                isWhiteTurn = !isWhiteTurn;
            }
            turnTileOnOff(OFF, selectedCoord);
            selectedCoord = "";
            selectedPiece = "";
        }
    }
}

function checkNSelectPiece(pieces, coord){
    const tile = document.getElementById(coord);
    if (tile.style.backgroundImage){
        for (let piece of pieces){
            if (piece.position==coord){
                if (piece.isPlayable) {
                    legalTile = isWhiteTurn ? piece.findLegalMoves(blackPieces) : piece.findLegalMoves(whitePieces);
                    if (legalTile[0]){
                        selectedPiece = piece;
                        selectedCoord = coord
                        turnTileOnOff(ON);
                    }
                    break;
                }
                break;
            }
        }
    }
}

//HIGHLIGHT AND DEHIGHLIGHT A SELECTED PIECE'S TILE
function turnTileOnOff(turn){
    let tile = document.getElementById(selectedCoord)
    turn?tile.style.outlineWidth = "5px":tile.style.outlineWidth = 0;
}