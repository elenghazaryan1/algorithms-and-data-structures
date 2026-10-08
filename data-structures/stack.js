class Stack {
  #capacity;
  #size;
  #array;
  #top;

  constructor(initialCapacity = 16) {
    this.#capacity = initialCapacity;
    this.#size = 0;
    this.#array = new Int32Array(initialCapacity);
    this.#top = 0;
  }

  isEmpty() {
    return this.#size === 0;
  }

  get size() {
    return this.#size;
  }

  push(elem) {
    if (this.#size === this.#capacity) {
      throw new Error("Segmentation fault");
    }

    this.#array[this.#top++] = elem;
    this.#size++;
  }

  pop() {
    if (this.#size === 0) return;

    const value = this.#array[--this.#top];
    this.#size--;

    return value;
  }

  clear() {
    this.#size = 0;
    this.#top = 0;
  }

  [Symbol.iterator]() {
    let size = this.#top - 1;

    return {
      next: () => {
        if (size < 0) {
          return {
            value: undefined,
            done: true,
          };
        }

        return {
          value: this.#array[size--],
          done: false,
        };
      },
    };
  }
}

// ==================== Stack TESTS ====================

const stack = new Stack(5);

console.log(stack.isEmpty());
// true

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.isEmpty());
// false

console.log(stack.pop());
// 30

console.log(stack.pop());
// 20

stack.push(40);
stack.push(50);

console.log([...stack]);
// [50, 40, 10]

console.log(stack.pop());
// 50

console.log(stack.pop());
// 40

console.log(stack.pop());
// 10

console.log(stack.pop());
// undefined

stack.push(100);
stack.push(200);
stack.push(300);

console.log([...stack]);
// [300, 200, 100]

stack.clear();

console.log(stack.isEmpty());
// true

console.log([...stack]);
// []
