const BaseRepository = require("../repository/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(Math.random() * (listLength))
  }

  chooseRandomCar(carCategory) {
    const ramdomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[ramdomCarIndex]

    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car;
  }

  // test(id) {
  //     return this.carRepository.find(id)
  // }
}

module.exports = CarService;
