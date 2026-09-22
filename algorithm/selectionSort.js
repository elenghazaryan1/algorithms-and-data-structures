const selectionSort = (arr) => {
  const n = arr.length;

  for (let i = 0; i < n - 1; ++i) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
};

/*
 Time Complexity
 
 Worst case : O(n²)
 Average case: O(n²)
 Best case: O(n²)

 Space complexity: O(1)

*/
let arr = [3, 7, 2, 4, 16, 11, 9, 5, 8, 1];
console.log(selectionSort(arr));
