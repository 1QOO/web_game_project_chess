import { Menu } from '/src/ui/index/menu';

export function Index({handleMainState}){
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Menu handleMainState={handleMainState} />
        </div>
    )
}