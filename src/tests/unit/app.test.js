import request from "supertest";
import app from "../../app"

describe("Testando guia de produtos", () => {
    test("Esse teste deverá responder ao método GET em /produtos", done => {
        request(app)
            .get("/produtos")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Testando rota principal", () => {
    test("Esse teste deverá responder ao método GET em /produtos", done => {
        request(app)
            .get("/")
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});