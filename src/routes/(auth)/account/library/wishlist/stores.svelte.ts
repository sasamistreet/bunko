export function deletingArray(l:Number){
    let deleting:Number[] = $state([]);

    const add = deleting.push(l)
    
    return { 
        get deleting() { 
            return deleting;
        },
        add
    };
}
