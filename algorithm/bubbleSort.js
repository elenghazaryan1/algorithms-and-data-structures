const bubbleSort = (arr) => {
  const n = arr.length;
  let flag = false;
  for (let i = 0; i < n - 1; ++i) {
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

// Time Complexity: O(n²)
// Space Complexity: O(1)
