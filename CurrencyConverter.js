const exchangePound = 1.14;
const exchangeEuro = 1.17;

function convert1 (amount, fromCurrency, toCurrency){
    
    let convert

    if (fromCurrency === 'pound' && toCurrency === 'euro'){
        convert = exchangePound * amount
    }else if (fromCurrency === 'euro' && toCurrency === 'pound'){
        convert = amount / exchangePound
    }else if (fromCurrency === 'euro' && toCurrency === 'usd'){
        convert = exchangeEuro * amount
    }else if(fromCurrency === 'usd' && toCurrency === 'euro'){
        convert = amount / exchangeEuro
    }console.log (convert)
} 
convert1(2, 'euro', 'pound')
convert1(2, 'pound', 'euro')
convert1(2, 'euro', 'usd')
convert1(2, 'usd', 'euro')