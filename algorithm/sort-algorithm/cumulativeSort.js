const cumulativeSort = (arr) => {
  const n = arr.length;
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const countArr = new Array(max - min + 1).fill(0);

  for (let i = 0; i < n; ++i) {
    let num = arr[i];
    countArr[num - min]++;
  }
  const res = [];
  for (let i = 1; i < countArr.length; ++i) {
    countArr[i] += countArr[i - 1];
  }
  for (let j = arr.length - 1; j >= 0; j--) {
    let num = arr[j];
    index = countArr[num - min] - 1;
    res[index] = num;
    countArr[num - min]--;
  }

  return res;
};

/*
Time complexity:

Worst case: O(n + k)
Average case: O(n + k)
Best case: O(n + k)

Space complexity: O(n + k)
*/

let arr = [5, 3, 11, 2, 13, 6, 4, 7];

console.log(cumulativeSort(arr));
