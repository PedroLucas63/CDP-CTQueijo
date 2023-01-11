//! Importação dos módulos:
import request from "supertest";

//* Importação do módulo de rotas de Login:
import LoginRouter from "./login.routes.js";

describe("Testando rota de fazer login", () => {
    test("Esse teste deverá responder ao método GET em /login", done => {
        request(LoginRouter)
            .get("/login")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de logar usuário", () => {
    test("Esse teste deverá responder ao método POST em /logar", done => {
        request(LoginRouter)
            .post("/logar")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota de deslogar usuário", () => {
    test("Esse teste deverá responder ao método GET em /logout", done => {
        request(LoginRouter)
            .get("/logout")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});