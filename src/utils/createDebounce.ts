

const createDebounce = function(func: Function, ms: number) {
    let timeout: NodeJS.Timeout;

    return function(...args: any) {
        clearTimeout(timeout);
        timeout = setTimeout(function(this: any) {return func.apply(this, args)}, ms)
    }
}



export default createDebounce;