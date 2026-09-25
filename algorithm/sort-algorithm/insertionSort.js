const insertionSort = (arr) => {
  if (arr.length === 0) return -1;

  const n = arr.length;
  for (let i = 1; i < n; ++i) {
    let key = arr[i]; // 11
    let j = i - 1; //  5

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
};

/*
Time Complexity:

Worst case: O(n²)
Average case: O(n²)
Best case: O(n)

Space Complexity: O(1)
*/

let arr = [5, 3, 11, 2, 13, 6, 4, 7];

console.log(insertionSort(arr));
