export function CapturedPieces({pieces}=null){
    return (
        <div className="cap-pieces flex flex-ro border-2 border-white h-fit w-32">
            <span className="text-white text-sm">Captured pieces displayed here</span>{pieces && pieces.map((piece)=><img src={piece.img} />)}
        </div>
    )
}