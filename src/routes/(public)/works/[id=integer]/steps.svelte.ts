
    
    export let current = $state(3);
    //export let steps = $derived([current-2, current-1, current, current+1, current+2]);
    export function steps(){
        return [current-2, current-1, current, current+1, current+2];
    }
    export function increment(){
        
    }
    export function decrement(){

    }
    let layout = $state("h-3");
    let moving = $state(false);