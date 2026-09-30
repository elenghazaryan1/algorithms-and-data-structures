const mergeSort = (arr, left, right) => {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
};

function merge(arr, left, mid, right) {
  let a1 = arr.slice(left, mid + 1);
  let a2 = arr.slice(mid + 1, right + 1); //?
  let i = 0;
  let j = 0;
  let k = left;

  while (i < a1.length && j < a2.length) {
    if (a1[i] > a2[j]) {
      arr[k++] = a2[j++];
    } else {
      arr[k++] = a1[i++];
    }
  }

  while (i < a1.length) {
    arr[k++] = a1[i++];
  }

  while (j < a2.length) {
    arr[k++] = a2[j++];
  }
}

/*
Time complexity:

Worst case: O(n log n)
Average case: O(n log n
Best case: O(n log n

Space complexity: O(n)

Stability: stabil
*/
const arr = [5, 2, 8, 1, 3, 7];

mergeSort(arr, 0, arr.length - 1);

console.log(arr);
