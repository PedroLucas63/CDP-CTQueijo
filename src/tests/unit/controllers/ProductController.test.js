//! Importação dos módulos:
import request from "supertest";

//* Importação do módulo de controle dos dados do produto:
import ProductController from "../controllers/ProductController.js";

describe("Testando rota de mostrar produto por chave única", () => {
    test("Esse teste deverá responder ao método POST em /view", done => {
        request(ProductController)
            .post("/product/view")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de mostrar todos os produtos", () => {
    test("Esse teste deverá responder ao método GET em /viewAll", done => {
        request(ProductController)
            .get("/product/viewAll")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de atualizar produto", () => {
    test("Esse teste deverá responder ao método UPDATE em /update", done => {
        request(ProductController)
            .update("/product/update")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de excluir produto", () => {
    test("Esse teste deverá responder ao método DELETE em /delete", done => {
        request(ProductController)
            .delete("/product/delete")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});