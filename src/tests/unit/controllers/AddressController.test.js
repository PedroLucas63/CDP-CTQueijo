//! Importação dos módulos:
import request from "supertest";

//* Importação do módulo de rotas dos endereços:
import AddressRouter from "./address.routes.js";

describe("Testando rota de mostrar endereço por chave única", () => {
    test("Esse teste deverá responder ao método POST em /view", done => {
        request(AddressRouter)
            .post("/address/view")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de mostrar todos os endereços", () => {
    test("Esse teste deverá responder ao método GET em /viewAll", done => {
        request(AddressRouter)
            .get("/address/viewAll")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de atualizar endereços", () => {
    test("Esse teste deverá responder ao método UPDATE em /update", done => {
        request(AddressRouter)
            .update("/address/update")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de excluir endereços", () => {
    test("Esse teste deverá responder ao método DELETE em /delete", done => {
        request(AddressRouter)
            .delete("/address/delete")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});