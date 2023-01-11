//! Importação dos módulos:
import request from "supertest";

//* Importação do módulo de rotas dos pedidos:
import OrderRouter from "./order.routes.js";

describe("Testando rota de mostrar ordem por chave única", () => {
    test("Esse teste deverá responder ao método POST em /view", done => {
        request(OrderRouter)
            .post("/employee/view")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de mostrar todos as ordens", () => {
    test("Esse teste deverá responder ao método GET em /viewAll", done => {
        request(OrderRouter)
            .get("/employee/viewAll")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de atualizar ordem", () => {
    test("Esse teste deverá responder ao método UPDATE em /update", done => {
        request(OrderRouter)
            .update("/employee/update")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de excluir ordem", () => {
    test("Esse teste deverá responder ao método DELETE em /delete", done => {
        request(OrderRouter)
            .delete("/employee/delete")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});