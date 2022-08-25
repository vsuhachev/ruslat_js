import {latToRus, rusToLat} from '../index.js'
import {latCaseCorrect} from '../index.js'
import {latTypoCorrect, rusTypoCorrect} from '../index.js'

describe("Ruslat", function () {
  describe(".latToRus", function () {
    it("not changes passed var", function () {
      let a = "Zz"
      latToRus(a)
      expect(a).toEqual("Zz")
    })

    it("converts to Rus", function () {
      expect(latToRus("Gadya Petrovich Xrenovo")).toEqual("Гадя Петрович Хреново")
    })
  })

  describe(".rusToLat", function () {
    it("not changes passed var", function () {
      let a = "Ыы"
      rusToLat(a)
      expect(a).toEqual("Ыы")
    })

    it("converts to Lat", function () {
      expect(rusToLat("Примелькавшийся")).toEqual("Primeljkavshijsya")
    })
  })

  describe("latCaseCorrect", function () {
    it("not changes passed var", function () {
      let a = "ALYoShA"
      latCaseCorrect(a)
      expect(a).toEqual("ALYoShA")
    })

    it("", function () {
      expect(rusToLat("АЛЁША")).toEqual("ALYoShA")
    })
    it("", function () {
      expect(latCaseCorrect(rusToLat("АЛЁША"))).toEqual("ALYOSHA")
    })

    it("", function () {
      expect(rusToLat("Я КРЕВЕДКО")).toEqual("Ja KREVEDKO")
    })
    it("", function () {
      expect(latCaseCorrect(rusToLat("Я КРЕВЕДКО"))).toEqual("JA KREVEDKO")
    })
  })

  describe(".rusTypoCorrect", function () {
    it("not changes passed var", function () {
      let a = "Capa"
      rusTypoCorrect(a)
      expect(a).toEqual("Capa")
    })

    it("", function () {
      expect(rusTypoCorrect("Пpивeт")).toEqual("Привет")
    })
  })

  describe(".latTypoCorrect", function () {
    it("not changes passed var", function () {
      let a = "Sаrа"
      latTypoCorrect(a)
      expect(a).toEqual("Sаrа")
    })

    it("", function () {
      expect(latTypoCorrect("Sаrа")).toEqual("Sara")
    })
  })
})
