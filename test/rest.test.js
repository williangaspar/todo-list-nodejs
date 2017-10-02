process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Tarefa = require("../app/db").Tarefa;
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const assert = require("assert");
chai.use(chaiHttp);

const server = require("../server");

describe("Rest Tarefas", () => {

  it("retornar lista de tarefas", (done) => {
    const mongoObj = {
      limit: function () { return this },
      exec: (cb) => cb(null, [{ id: 1 }])
    }
    
    Tarefa.find = () => mongoObj;

    chai.request(server)
      .get("/tarefas")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });

  it("criar nova tarefa", (done) => {

    Tarefa.prototype.save = function (cb) {
      return cb(null, {_id:100});
    }

    const tarefa = {
      titulo: "Tarefa",
      descricao: "descricao da tarefa"
    }

    chai.request(server)
      .post("/tarefa")
      .send(tarefa)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
      done();
    });
  });

  it("atualizar item", (done) => {
    const tarefa = {
      _id: 1000,
      titulo: "Tarefa",
      descricao: "descricao da tarefa"
    }
    Tarefa.update = function (obj, update, cb) {
      assert.equal(obj._id, 1000);
      assert.equal(update.$set.titulo, "Tarefa");
      assert.equal(update.$set.descricao, "descricao da tarefa");
      return cb(null);
    }

    chai.request(server)
      .put("/tarefa")
      .send(tarefa)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });

  it("remover item", (done) => {
    Tarefa.remove = function (obj, cb) {
      assert.equal(obj._id, 123);
      return cb(null);
    }

    chai.request(server)
      .delete("/tarefa/123")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });

  it("atualizar tarefa feita", (done) => {
    const tarefa = {
      _id: 1000,
     finalizada: true
    }
    Tarefa.update = function (obj, update, cb) {
      assert.equal(obj._id, 1000);
      assert.equal(update.$set.finalizada, true);
      return cb(null);
    }

    chai.request(server)
      .put("/tarefa/feita")
      .send(tarefa)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });

});
