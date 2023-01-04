//! Importação dos módulos:
//* Importação do módulo de endereço via CEP:
import cepPromise from "cep-promise";

//! Definição da função de procurar um endereço pelo CEP:
async function cepSearch(cep) {
    //* Define o JSON de resultado:
    let result = {
        message: "Endereço encontrado com sucesso",
        error: 0,
        data: null,
    };

    //* Remove caracteres que não sejam números:
    cep = String(cep.replace(/\D/g, ''));

    //* Tenta fazer a busca pelo CEP:
    try {
        //? Recebe os dados do encontro:
        address = cepPromise(cep);

        //? Adiciona o endereço nos dados do resultado:
        result.data = address;
    } catch (e) {
        //? Define a mensagem e o erro:
        result.message = "Código de endereçamento postal não encontrado";
        result.error = 14;
    }

    //* Retorna o resultado:
    return result;
}

//! Exportação do módulo:
export default cepSearch;
