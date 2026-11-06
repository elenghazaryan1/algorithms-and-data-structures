const quickSort = (arr, low = 0, high = arr.length - 1) => {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }

  return arr;
};

function medianOfThree(arr, low, high) {
  const mid = Math.floor((low + high) / 2);
  const a = arr[low];
  const b = arr[mid];
  const c = arr[high];

  if ((a - b) * (c - a) >= 0) return low;
  if ((b - a) * (c - b) >= 0) return mid;
  return high;
}

const partition = (arr, low, high) => {
  const pivotIndex = medianOfThree(arr, low, high);

  [arr[low], arr[pivotIndex]] = [arr[pivotIndex], arr[low]];

  const pivot = arr[low];
  let i = low + 1;
  let j = high;
  while (i <= j) {
    while (arr[i] <= pivot) ++i;
    while (arr[j] > pivot) --j;

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      ++i;
      --j;
    }
  }
  [arr[low], arr[j]] = [arr[j], arr[low]];

  return j;
};

/*
Time complexity:

Worst case: O(n²)
Average case:O(n²)
Best case:O(n log n)

Space complexity: O(1)

Stability: non stabil
*/

let arr = [10, 2, 1, 9, 13, 4, 8];

console.log(quickSort(arr));
