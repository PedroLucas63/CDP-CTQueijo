//! Cria a classe de validação de dados:
class Validation {
    //* Método de validação de nome pelo tamanho:
    name(name, length) {
        //? Verifica se o tamanho do nome corresponde ao esperado e retorna o resultado:
        return name.length >= length;
    }

    //* Método de validação de e-mail:
    email(email) {
        //? Define o regex do modelo de e-mail esperado:
        let reEmail = /\S+@\S+\.\S+/;

        //? Verifica se o e-mail corresponde ao modelo e retorna o resultado:
        return reEmail.test(email);
    }

    //* Método de validação de senha:
    password(password) {
        //? Regex com modelo de senha forte:
        /* Exigências da senha:
           - Mínimo de 8 caracteres
           - Mínimo de 1 letra maiúscula
           - Mínimo de 1 número
           - Mínimo de 1 símbolo: $*&@#
           - Sem a presença de sequências com caracteres iguais
        */
        let rePassword =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;

        //? Verifica se a senha corresponde ao modelo e retorna o resultado:
        return rePassword.test(password);
    }

    //* Método de validação do cargo:
    role(role, roles){
        //? Retorna se o cargo se encontra no array de cargos:
        return roles.indexOf(role) != -1;
    }
}

//! Exporta a classe de validação instânciada:
export default new Validation();
