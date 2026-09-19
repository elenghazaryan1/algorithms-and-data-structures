const jumpSearch = (arr, target) => {
  let prev = 0;
  let step = Math.floor(Math.sqrt(arr.length));
  const length = arr.length;

  while (arr[Math.min(step, length) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(length));

    if (prev >= length) {
      return -1;
    }
  }
  while (arr[prev] < target) {
    prev++;

    if (prev === Math.min(step, length)) {
      return -1;
    }
    if (arr[prev] === target) {
      return prev;
    }
  }
  return -1;
};

const arr = [1, 3, 5, 7, 10, 13, 15, 17, 19, 21];
console.log("Index of target:", jumpSearch(arr, 19));
