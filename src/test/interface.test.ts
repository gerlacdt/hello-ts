/* tslint:disable:only-arrow-functions */

import chai = require("chai");
const expect = chai.expect;
// tslint:disable-next-line
const { fromJS, Map, Record, List } = require("immutable");
import { Person } from "../types/base";

describe("immutable", function () {
  describe("frist try", function () {
    it("get valid object", function () {
      const p: Person = { name: "foo", firstName: "bar", nickNames: [], age: 10 };
      // tslint:disable-next-line
      expect(p).not.null;
    });

    it("get person record", function () {
      const personRecord = Record({
        age: 0,
        firstName: "",
        name: "",
        nickNames: List([""]),
      });
      const p = new personRecord({ name: "foo", firstName: "bar", nickNames: [], age: 10 });
      // tslint:disable-next-line
      expect(p).not.null;
    });

    it("from js object", function () {
      const p = { name: "foo", firstName: "bar", nickNames: [], moos: [{ foo: "bar" }, { foo: "bar2" }] };
      const person = fromJS(p);
      expect(person.getIn(["moos", "0", "foo"])).equal("bar");
    });

    it("first immutable Map", function () {
      let m = Map({ a: 1, b: 2, c: 3 });
      m = m.set("b", 20);
      expect(m.get("b")).equal(20);
    });

    it("immutable Record", function () {
      const personRecord = Record({ name: "foo", firstName: "bar" });
      const r = new personRecord();
      r.n = 3;
      expect(r.name).equal("foo");
    });

    it("array handling", function () {
      const persons = List([
        { name: "p1", firstName: "fname1", nickNames: ["nickname1"], age: 20 },
        { name: "p2", firstName: "fname2", nickNames: ["nickname2"], age: 30 },
        { name: "p3", firstName: "fname3", nickNames: ["nickname3"], age: 40 },
        { name: "p4", firstName: "fname4", nickNames: ["nickname4"], age: 50 },
        { name: "p5", firstName: "fname5", nickNames: ["nickname5"], age: 60 },
      ]);
      interface IAccumulator {
        names: string[];
      }

      const ps = persons.map((p: Person) => {
        p.age += 1;
        return p;
      })
        .filter((p: any) => {
          return p.age < 50;
        })
        .reduce((acc: IAccumulator, p: any): IAccumulator => {
          acc.names.push(p.name);
          return acc;
        }, { names: [] });

      expect(ps.names.length).equal(3);
      expect(ps.names[2]).equal("p3");
    });
  });
});
