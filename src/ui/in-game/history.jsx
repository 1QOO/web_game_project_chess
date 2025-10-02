export function History({history}){
    return (
        <div>
            <p>
                {history.map(item=>`${history.notation} `)}
            </p>
        </div>
    )
}