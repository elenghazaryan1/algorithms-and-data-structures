class DynamicArray {
  #arr;
  #size;
  #capacity;
  #GROWTH = 2;
  #MIN_INT32 = -(2 ** 31);
  #MAX_INT32 = 2 ** 31 - 1;

  constructor(cap) {
    if (cap <= 0 || !Number.isInteger(cap)) {
      throw new Error("Your capacity must be a valid integer");
    }

    this.#arr = new Int32Array(cap);
    this.#capacity = cap;
    this.#size = 0;
  }

  #resize() {
    const newCap = this.#capacity * this.#GROWTH;
    const tmp = new Int32Array(newCap);

    for (let i = 0; i < this.#size; ++i) {
      tmp[i] = this.#arr[i];
    }

    this.#capacity = newCap;
    this.#arr = tmp;
  }
  get data() {
    return this.#arr;
  }

  push_back(elem) {
    if (
      !Number.isInteger(elem) ||
      elem < this.#MIN_INT32 ||
      elem > this.#MAX_INT32
    ) {
      throw new Error("Value must be a valid integer");
    }

    if (this.#size === this.#capacity) {
      this.#resize();
    }

    this.#arr[this.#size++] = elem;
  }

  pop_back() {
    if (!this.#size) {
      throw new Error("error");
    }

    return this.#arr[--this.#size];
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
      throw new Error("Invalid index for this array");
    }

    return this.#arr[index];
  }

  set(index, value) {
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= this.#size ||
      !Number.isInteger(value) ||
      value < this.#MIN_INT32 ||
      value > this.#MAX_INT32
    ) {
      throw new Error("Invalid index or value");
    }

    this.#arr[index] = value;

    return value;
  }

  front() {
    if (this.#size === 0) {
      throw new Error("Your array is empty.");
    }

    return this.#arr[0];
  }

  back() {
    if (this.#size === 0) {
      throw new Error("Your array is empty.");
    }

    return this.#arr[this.#size - 1];
  }

  erase(pos) {
    if (!Number.isInteger(pos) || pos < 0 || pos >= this.#size) {
      throw new Error("Position is out of bounds");
    }

    for (let i = pos; i < this.#size - 1; ++i) {
      this.#arr[i] = this.#arr[i + 1];
    }
    this.#size--;

    return pos;
  }

  insert(pos, value) {
    if (
      !Number.isInteger(pos) ||
      pos < 0 ||
      pos > this.#size ||
      !Number.isInteger(value) ||
      value < this.#MIN_INT32 ||
      value > this.#MAX_INT32
    ) {
      throw new Error("Invalid position or value");
    }

    if (this.#size === this.#capacity) {
      this.#resize();
    }

    for (let i = this.#size; i > pos; --i) {
      this.#arr[i] = this.#arr[i - 1];
    }

    this.#arr[pos] = value;
    this.#size++;

    return pos;
  }

  swap(i, j) {
    if (
      !Number.isInteger(i) ||
      !Number.isInteger(j) ||
      i < 0 ||
      j < 0 ||
      i >= this.#size ||
      j >= this.#size
    ) {
      throw new Error("Invalid positions for swapping.");
    }

    [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
  }

  *values() {
    for (let i = 0; i < this.#size; ++i) {
      yield this.#arr[i];
    }
  }

  *keys() {
    for (let i = 0; i < this.#size; ++i) {
      yield i;
    }
  }

  forEach(fn) {
    if (typeof fn !== "function") {
      throw new Error("Callback must be a function");
    }

    for (let i = 0; i < this.#size; ++i) {
      fn(this.#arr[i], i);
    }
  }

  map(fn) {
    if (typeof fn !== "function") {
      throw new Error("Callback must be a function");
    }

    const result = [];
    for (let i = 0; i < this.#size; ++i) {
      result[i] = fn(this.#arr[i], i);
    }
    return result;
  }

  filter(fn) {
    if (typeof fn !== "function") {
      throw new Error("Callback must be a function");
    }

    const result = [];
    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i)) {
        result.push(this.#arr[i]);
      }
    }
    return result;
  }

  reduce(fn, init) {
    if (typeof fn !== "function") {
      throw new Error("Callback must be a function");
    } else if (init === undefined) {
      throw new Error("You must enter an initial value");
    }
    let acc = init;
    for (let i = 0; i < this.#size; ++i) {
      acc = fn(acc, this.#arr[i]);
    }
    return acc;
  }

  some(fn) {
    if (typeof fn !== "function") {
      throw new Error("Callback must be a function");
    }

    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i, this.#arr)) {
        return true;
      }
    }

    return false;
  }

  find(fn) {
    if (typeof fn !== "function") {
      throw new Error("Callback must be a function");
    }

    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i, this.#arr)) {
        return this.#arr[i];
      }
    }
    return undefined;
  }

  findIndex(fn) {
    if (typeof fn !== "function") {
      throw new Error("Callback must be a function");
    }

    for (let i = 0; i < this.#size; ++i) {
      if (fn(this.#arr[i], i, this.#arr)) {
        return i;
      }
    }
    return -1;
  }

  includes(value) {
    if (
      !Number.isInteger(value) ||
      value < this.#MIN_INT32 ||
      value > this.#MAX_INT32
    ) {
      throw new Error("Value must be a valid integer");
    }

    for (let i = 0; i < this.#size; ++i) {
      if (this.#arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.#size) {
          return {
            value: this.#arr[index++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  }
}

const arr = new DynamicArray(5);
arr.push_back(10);
arr.push_back(-15);
arr.push_back(20);
arr.push_back(-30);
arr.push_back(40);
arr.push_back(60);

console.log(arr.data);
// Int32Array(10) [10, -15, 20, -30, 40, 60, 0, 0, 0, 0]

console.log(arr.at(0)); // 10
console.log(arr.at(2)); // 20
console.log(arr.at(5)); // 60

console.log(arr.front()); // 10
console.log(arr.back()); // 60

console.log(arr.set(1, 100)); // 100

console.log(arr.data);
// Int32Array(10) [10, 100, 20, -30, 40, 60, 0, 0, 0, 0]

console.log(arr.insert(2, -200)); // 2
console.log([...arr]);
// [10, 100, -200, 20, -30, 40, 60]

console.log(arr.erase(2)); // 2
console.log([...arr]);
// [10, 100, 20, -30, 40, 60]

arr.swap(0, 5);
console.log([...arr]);
// [60, 100, 20, -30, 40,10]

const values = arr.values();

console.log(values.next().value);
console.log(values.next().value);
console.log(values.next().value);

console.log([...arr.keys()]);
// [0, 1, 2, 3, 4, 5]

arr.forEach((value, index) => {
  console.log(`index: ${index}, value: ${value}`);
});

const doubled = arr.map((value) => value * 2);

console.log(doubled);
// [ 120, 200, 40, -60, 80, 20]

const positive = arr.filter((value) => value > 0);

console.log(positive);
// [60, 100, 20, 40, 10]

const sum = arr.reduce((acc, value) => acc + value, 0);

console.log(sum);
// 200

console.log(arr.some((value) => value < 0));
// true

console.log(arr.some((value) => value > 1000));
// false

console.log(arr.find((value) => value < 0));
// -30

console.log(arr.find((value) => value === 500));
// undefined

console.log(arr.findIndex((value) => value === 60));
// 0

console.log(arr.findIndex((value) => value === 500));
// -1

console.log(arr.includes(100));
// true

console.log(arr.includes(-30));
// true

console.log(arr.includes(500));
// false

for (const value of arr) {
  console.log(value);
}
// 60, 100, 20, -30, 40, 10
