class Queue {
  #capacity;
  #size;
  #front;
  #rear;
  #buff;

  constructor(capacity = 8) {
    this.#capacity = capacity;
    this.#size = 0;
    this.#front = 0;
    this.#rear = 0;
    this.#buff = new Array(capacity);
  }

  enqueue(elem) {
    if (this.#size === this.#capacity) {
      throw new Error("Queue overflow");
    }

    this.#buff[this.#rear] = elem;

    this.#rear = (this.#rear + 1) % this.#capacity;
    this.#size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Your buffer is Empty.");
    }

    const value = this.#buff[this.#front];

    this.#front = (this.#front + 1) % this.#capacity;

    this.#size--;
    return value;
  }

  get size() {
    return this.#size;
  }

  get_front() {
    return this.#buff[this.#front];
  }

  get_back() {
    return this.#buff[(this.#rear - 1 + this.#capacity) % this.#capacity];
  }

  print() {
    console.log([...this]);
  }

  isEmpty() {
    return this.#size === 0;
  }

  [Symbol.iterator]() {
    let index = this.#front;
    let count = 0;

    return {
      next: () => {
        if (count === this.#size) {
          return { value: undefined, done: true };
        }

        const value = this.#buff[index];
        index = (index + 1) % this.#capacity;
        count++;

        return { value: value, done: false };
      },
    };
  }
}

// ==================== Queue TESTS ====================

const queue = new Queue(5);

console.log(queue.isEmpty());
// true

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log([...queue]);
// [10, 20, 30]

console.log(queue.get_front());
// 10

console.log(queue.get_back());
// 30

console.log(queue.dequeue());
// 10

console.log([...queue]);
// [20, 30]

queue.enqueue(40);
queue.enqueue(50);
queue.enqueue(60);

console.log([...queue]);
// [20, 30, 40, 50, 60]

console.log(queue.get_front());
// 20

console.log(queue.get_back());
// 60

queue.print();
// [20, 30, 40, 50, 60]

console.log(queue.dequeue());
// 20

console.log(queue.dequeue());
// 30

console.log([...queue]);
// [40, 50, 60]

queue.enqueue(70);
queue.enqueue(80);

console.log([...queue]);
// [40, 50, 60, 70, 80]

console.log(queue.get_front());
// 40

console.log(queue.get_back());
// 80

queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();

console.log(queue.isEmpty());
// true

console.log([...queue]);
// []
