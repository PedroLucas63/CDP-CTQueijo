//! Definição da função de verificação se uma cadeira de caracteres é um número:
function isNumber(value) {
    //* Cria o regex que só aceita números:
    const regex = /^\d+$/;

    //* Retorna o resultado do teste da cadeira de caracteres no regex:
    return regex.test(value);
}

//! Exporta como padrão a função:
export default isNumber;
