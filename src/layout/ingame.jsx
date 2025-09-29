import { CreateBoard } from '/src/ui/board';
import { setPieces, selectTile } from '../lib/gameLogic';

export function Board(){
    return (
        <CreateBoard board={setPieces()} callBack={selectTile} />
    )
}