const bubbleSort = (arr) => {
  if (arr.length === 0) return -1;

  const n = arr.length;
  for (let i = 0; i < n - 1; ++i) {
    let flag = false;
    for (let j = 0; j < n - 1 - i; ++j) {
      if (arr[j] > arr[j + 1]) {
        flag = true;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (!flag) break;
  }

  return arr;
};

/*
Time complexity:

Worst case: O(n²)
Average case: O(n²)
Best case: O(n)


Space complexity: O(1)
*/

let arr = [9, 6, 2, 5, 1, 7, 0, 4, 8, 3];

console.log(bubbleSort(arr));
