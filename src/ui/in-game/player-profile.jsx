export function PlayerProfile({player}){
    return (
        <div className="profile flex flex-row items-start bg-gray-200 p-1 rounded-sm w-fit gap-1">
            <img src={player.img} alt={player.name} className="size-[50px] rounded-sm border-2 border-amber-800" />
            <span className="font-semibold font-serif inline-block px-2">{player.name}</span>
        </div>
    )
}