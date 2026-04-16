export const kConverter = (Num ) => {
    if (Num >= 1000) {
        return (Num / 1000).toFixed(1) + 'K'
    }else {
        return Num  
    }
}

export default kConverter;