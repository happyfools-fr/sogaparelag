

export default class Utils {

  /**
  * Check that an target array is included in array
  */
  static checker(arr, target)
  {
    return target.every(v => arr.includes(v));
  }

}
