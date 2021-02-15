export const paginateArray = (arr, pageSize = 10) => {
  let idx = 0;
  let ret = [];
  while (idx < arr.length) {
    ret.push(arr.slice(idx,idx+pageSize));
    idx += pageSize;
  }
  return ret;
}