export function CapturedPieces({pieces}=null){
    return (
        <div className="flex flex-row">
            {pieces && pieces.map((piece)=><img src={piece.img} />)}
        </div>
    )
}