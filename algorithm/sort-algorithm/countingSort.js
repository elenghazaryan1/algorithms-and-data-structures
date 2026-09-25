const countingSort = (arr) => {
  if (arr.length === 0) return -1;

  const n = arr.length;
  let max = Math.max(...arr);
  let min = Math.min(...arr);
  let countArr = new Array(max - min + 1).fill(0);

  for (let i = 0; i < n; ++i) {
    let num = arr[i];
    countArr[num - min]++;
  }
  const res = [];
  for (let i = 0; i < countArr.length; ++i) {
    while (countArr[i] > 0) {
      res.push(i + min);
      countArr[i]--;
    }
  }

  return res;
};

/*
Time complexity: 

Worst case: O(n * k)
Average case: O(n * k)
Best case: O(n * k)

Space complexity: O(n + k)
*/

const arr = [1, 5, 2, 8, 7, 11, 9, 3];

console.log(countingSort(arr));
