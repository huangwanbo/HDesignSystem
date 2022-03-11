import { xor, difference } from "lodash";
/**
 * 寻找两个数组里面是否有相同元素。
 */
export function findInTowArray(arr1: Array<any>, arr2: Array<any>) {
    return difference(xor(arr1, arr2), arr1).length == 0;
}