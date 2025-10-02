export function Timer({time}){
    return (
        <div className="px-2 bg-gray-200 inline-block rounded-full size-fit font-semibold">00 : 00{/* `${time.min} : ${time.sec}` */}</div>
    )
}