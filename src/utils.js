export const paginateArray = (arr, pageSize = 10) => {
  let idx = 0;
  let ret = [];
  while (idx < arr.length) {
    ret.push(arr.slice(idx,idx+pageSize));
    idx += pageSize;
  }
  return ret;
}

export const getPageArray = (page, totalPage) => {
  page = parseInt(page);
  totalPage = parseInt(totalPage);
  let ret = [];
  let minPage = Math.max(page-4, 1);
  let maxPage = Math.min(page+5, totalPage);
  if ((maxPage-minPage) < 9) {
    while(maxPage < totalPage && ((maxPage-minPage) < 9)) {
      maxPage += 1;
    }
  }
  if (maxPage - minPage < 9) {
    while(minPage > 1 && ((maxPage-minPage) < 9)) {
      minPage -= 1;
    }
  }
  for(let i=minPage; i<=maxPage; ++i) {
    ret.push(i);
  }
  return ret;
}