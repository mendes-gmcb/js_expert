const Service = require('./service')
const assert = require('assert')
const { createSandbox } = require('sinon')
const sinon = createSandbox()

// tatooine
const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
// alderaan
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"

const mocks = {
    alderaan: require("./../mocks/alderaan.json"),
    tatooine: require("./../mocks/tatooine.json")
}

;(async () => {
    // {
    //     // vai para a internet!!
    //     const service = new Service()
    //     const dados = await service.makeRequest(BASE_URL_1)
    //     console.log('dados', dados)
    // }

    const service = new Service()
    const stub = sinon.stub(
        service,
        service.makeRequest.name    
    )

    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)


    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)

    {
        const expected = {
            name: "Tatooine",
            surfaceWater: "1",
            appeardIn: 5
        }

        const results = await service.getPlanets(BASE_URL_1)
        assert.deepStrictEqual(results, expected)
    }

    {
        const expected = {
            name: "Alderaan",
            surfaceWater: "40",
            appeardIn: 2
        }

        const results = await service.getPlanets(BASE_URL_2)
        assert.deepStrictEqual(results, expected)
    }
})()