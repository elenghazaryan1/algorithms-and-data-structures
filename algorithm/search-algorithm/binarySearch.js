const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

// Time Complexity: O(log n)
// Space Complexity: O(1)

/*
Time complexity:

Worst case:O(log n)
Average case: O(log n)
Best case: O(1)

Space complecity: O(1)
*/

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Index of target:", binarySearch(arr, 6));
