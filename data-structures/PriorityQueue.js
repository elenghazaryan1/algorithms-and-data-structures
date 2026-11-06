class PriorityQueue {
  constructor(compareFn) {
    this.heap = [];
    this.compareFn = compareFn || ((a, b) => a - b);
  }

  swap(i, j) {
    return ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]);
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.compareFn(this.heap[index], this.heap[this.getParent(index)]) < 0
    ) {
      this.swap(index, this.getParent(index));
      index = this.getParent(index);
    }
  }

  heapifyDown(index = 0) {
    while (true) {
      let smallest = index;

      let left = this.getLeftChild(index);
      let right = this.getRightChild(index);
      if (
        left < this.heap.length &&
        this.compareFn(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.compareFn(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }

  getParent(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChild(i) {
    return i * 2 + 1;
  }

  getRightChild(i) {
    return i * 2 + 2;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  pop() {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return root;
  }
}

/* Time complexity:

heapifyUp - O(log n)
heapifyDown - O(log n)
push - O(log n)
pop - O(log n)

*/

const minPQ = new PriorityQueue();

minPQ.push(10);
minPQ.push(4);
minPQ.push(15);
minPQ.push(2);
minPQ.push(8);

console.log(minPQ.pop()); // 2
console.log(minPQ.pop()); // 4
console.log(minPQ.pop()); // 8
console.log(minPQ.pop()); // 10
console.log(minPQ.pop()); // 15
console.log(minPQ.pop()); // undefined

const maxPQ = new PriorityQueue((a, b) => b - a);

maxPQ.push(10);
maxPQ.push(4);
maxPQ.push(15);
maxPQ.push(2);
maxPQ.push(8);

console.log(maxPQ.heap); // [15, 8, 10, 2, 4]
console.log(maxPQ.pop()); // 15
console.log(maxPQ.pop()); // 10
