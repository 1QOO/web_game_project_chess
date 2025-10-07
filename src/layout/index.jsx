import { Menu } from '/src/ui/index/menu';

export function Index({handleMainState}){
    return (
        <div className="size-[100%] flex justify-center items-center">
            <Menu handleMainState={handleMainState} />
        </div>
    )
}