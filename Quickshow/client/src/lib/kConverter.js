export const Kconveter = (Num ) => {
    if (Num >= 1000) {
        return (Num / 1000).toFixed(1) + 'K'
    }else {
        return Num  
    }
}