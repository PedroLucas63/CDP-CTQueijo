//! Importação dos módulos:
import request from "supertest";

//* Importação do módulo de rotas das vendas:
import SaleRouter from "./sale.routes.js";

describe("Testando rota de mostrar venda por chave única", () => {
    test("Esse teste deverá responder ao método POST em /view", done => {
        request(SaleRouter)
            .post("/employee/view")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de mostrar todos as vendas", () => {
    test("Esse teste deverá responder ao método GET em /viewAll", done => {
        request(SaleRouter)
            .get("/employee/viewAll")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de atualizar venda", () => {
    test("Esse teste deverá responder ao método UPDATE em /update", done => {
        request(SaleRouter)
            .update("/employee/update")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de excluir venda", () => {
    test("Esse teste deverá responder ao método DELETE em /delete", done => {
        request(SaleRouter)
            .delete("/employee/delete")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});