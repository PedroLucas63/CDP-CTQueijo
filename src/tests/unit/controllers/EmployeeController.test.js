//! Importação dos módulos:
import request from "supertest";

//* Importação do módulo de rotas dos funcionários:
import EmployeeRouter from "./employee.routes.js";

describe("Testando rota de mostrar empregado por chave única", () => {
    test("Esse teste deverá responder ao método POST em /view", done => {
        request(EmployeeRouter)
            .post("/employee/view")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de mostrar todos os empregados", () => {
    test("Esse teste deverá responder ao método GET em /viewAll", done => {
        request(EmployeeRouter)
            .get("/employee/viewAll")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de atualizar empregados", () => {
    test("Esse teste deverá responder ao método UPDATE em /update", done => {
        request(EmployeeRouter)
            .update("/employee/update")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de excluir empregado", () => {
    test("Esse teste deverá responder ao método DELETE em /delete", done => {
        request(EmployeeRouter)
            .delete("/employee/delete")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});