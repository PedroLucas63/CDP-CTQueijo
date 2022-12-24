//! Importação do módulo de validação:
import Validation from "../../../utils/ValidationUtils.js";

//* Teste do tamanho do nome:
test("Checks if the name is greater than specified", () => {
    expect(Validation.name("Pedro Lucas", 10)).toBe(true);
    expect(Validation.name("Pedro", 10)).toBe(false);
});

//* Teste de email fora do padrão:
test("Check that the email sent is in the correct pattern", () => {
    expect(Validation.email("pedrolucas@gmail.com")).toBe(true);
    expect(Validation.email("pedrolucas.gmail.com")).toBe(false);
    expect(Validation.email("pedro.jsrn@ifrn.edu.br")).toBe(true);
    expect(Validation.email("@gmail.com")).toBe(false);
    expect(Validation.email("pedrolucas@gmail,com.br")).toBe(false);
});
