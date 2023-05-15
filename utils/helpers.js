export function arrayToObj(arr){
    return arr.reduce((a, b) => ({
        [b.key]: b,
        ...a
    }), {})
}

export function currencyFormat(value){
    if(value == undefined || !value.toFixed ) return 'R$ -'
    return `R$ ` + (Math.floor(value * 100) / 100).toFixed(2).replace('.', ',')
}

export function validateCPF(value){
    var soma = 0;
    var resto;
    var numberPattern = /\d+/g;
    const inputCPF =  value.length !== 0 ? value.match(numberPattern).join('').substring(0, 11) : value

   

    if(inputCPF == '00000000000') return false;
    for(i=1; i<=9; i++) soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for(i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
}