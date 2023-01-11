//! Importação dos módulos:
import request from "supertest";

//* Importação do módulo de rotas dos clientes:
import ClientRouter from "./client.routes.js";

describe("Testando rota de mostrar cliente por chave única", () => {
    test("Esse teste deverá responder ao método POST em /view", done => {
        request(ClientRouter)
            .post("/client/view")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de mostrar todos os clientes", () => {
    test("Esse teste deverá responder ao método GET em /viewAll", done => {
        request(ClientRouter)
            .get("/client/viewAll")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de atualizar clientes", () => {
    test("Esse teste deverá responder ao método UPDATE em /update", done => {
        request(ClientRouter)
            .update("/client/update")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de excluir clientes", () => {
    test("Esse teste deverá responder ao método DELETE em /delete", done => {
        request(ClientRouter)
            .delete("/client/delete")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});