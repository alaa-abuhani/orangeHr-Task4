export default class GenericHepler {
  static GenericRandomString(maxNumber = 1000) {
    return Math.round(maxNumber * Math.random());
  }
}
