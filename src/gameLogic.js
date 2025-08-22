import { whitePieces, blackPieces, board } from './pieces/pieces.js';

let isWhiteTurn = true;
let selectedPiece = "";
let legalTile = [""];
let selectedCoord = "";
const ON = true;
const OFF = false;

export function gameStart(elements, event){
    const arrayOfElements = [];
//SET PIECES ON THEIR STARTING TILE    
    whitePieces.concat(blackPieces).forEach((item)=>item.display(item.col, item.row));

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
    const row = coord.at(0);
    const col = coord.at(1);

    if(isWhiteTurn){
        if (selectedPiece){
            turnTileOnOff(OFF, selectedCoord);
            if(legalTile.includes(coord)){
                selectedPiece.move(coord, board);
                selectedPiece = "";
                legalTile = [];
                isWhiteTurn = !isWhiteTurn;
            }
            else{
                selectedPiece = "";
                legalTile = [""];
                selectPiece(row, col, "white");
            }
        }
        else{
            selectPiece(row, col, "white");
        }
    }
    else{
        const piece = board[row][col]
        if (selectedPiece){
            turnTileOnOff(OFF, selectedCoord);
            if(legalTile.includes(coord)){
                selectedPiece.move(coord, board);
                selectedPiece = "";
                legalTile = [];
                isWhiteTurn = !isWhiteTurn;
            }
            else{
                selectedPiece = "";
                legalTile = [""];
                selectPiece(row, col, "black");
            }
        }
        else{
            selectPiece(row, col, "black");
        }
    }
}

function selectPiece(row, col, turn){
    const selectedTile = board[row][col];
    if (selectedTile){
        if (selectedTile.color == turn){
            selectedPiece = selectedTile;
            legalTile = selectedPiece.findLegalMoves(board);
            selectedCoord = `${row}${col}`;
            if(legalTile[0]) turnTileOnOff(ON, `${row}${col}`);
        }
    }
}

//HIGHLIGHT AND DEHIGHLIGHT A SELECTED PIECE'S TILE
function turnTileOnOff(turn, tileId){
    let tile = document.getElementById(tileId)
    if(turn){
        tile.style.outlineWidth = "5px"
    }
    else{
        tile.style.outlineWidth = 0;
        selectedCoord="";
    }
}