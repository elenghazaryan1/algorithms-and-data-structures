class Node {
  #next;
  #prev;
  constructor(data) {
    this.data = data;
    this.#next = null;
    this.#prev = null;
  }
}

class DoubledLinkedList {
  #size;
  #head;
  #tail;
  constructor(iterables) {
    this.#size = 0;
    this.#head = null;
    this.#tail = null;

    if (iterables && typeof iterables[Symbol.iterator] === "function") {
      for (let val of iterables) {
        this.push_back(val);
      }
    }
  }

  static fromArray(arr) {
    return new DoubledLinkedList(arr);
  }

  get size() {
    return this.#size;
  }

  clear() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  push_back(elem) {
    const newNode = new Node(elem);
    if (!this.#head) {
      this.#head = this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      newNode.prev = this.#tail;
      this.#tail = newNode;
    }
    this.#size++;
  }

  push_front(elem) {
    const newNode = new Node(elem);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.next = this.#head;
      this.#head.prev = newNode;
      this.#head = newNode;
    }
    this.#size++;
  }

  pop_back() {
    if (!this.#head) return;
    else if (this.#size === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }
    this.#size--;
  }

  pop_front() {
    if (!this.#head) return;
    else if (this.#size === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }
    this.#size--;
  }
  toArray() {
    const arr = [];

    let cur = this.#head;
    while (cur) {
      arr.push(cur.data);
      cur = cur.next;
    }
    return arr;
  }

  front() {
    if (!this.#head) return;

    return this.#head.data;
  }

  back() {
    if (!this.#head) return;

    return this.#tail.data;
  }

  isEmpty() {
    return !this.#head;
  }

  at(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error("Invalid position.");
    }

    let cur = this.#head;
    let i = 0;

    while (cur) {
      if (i === index) {
        return cur.data;
      }
      cur = cur.next;
      i++;
    }
  }

  insert(index, value) {
    if (
      index < 0 ||
      index > this.#size ||
      !Number.isInteger(index) ||
      !Number.isInteger(value)
    ) {
      throw new Error("Invalid position or value");
    }

    if (index === 0) {
      this.push_front(value);
      return;
    } else if (index === this.#size) {
      this.push_back(value);
      return;
    }

    const newNode = new Node(value);
    let cur = this.#head;
    let i = 0;

    while (cur) {
      if (i === index - 1) {
        const nextNode = cur.next;

        newNode.prev = cur;
        newNode.next = nextNode;
        cur.next = newNode;
        nextNode.prev = newNode;

        this.#size++;
        return;
      }
      cur = cur.next;
      i++;
    }
  }

  erase(index) {
    if (!this.#head) return;
    if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
      throw new Error("Invalid index");
    }
    if (index === 0) {
      this.pop_front();
    } else if (index === this.#size - 1) {
      this.pop_back();
    } else {
      let cur = this.#head;
      let i = 0;
      while (cur) {
        if (i === index - 1) {
          const deletedNode = cur.next;
          const nextNode = deletedNode.next;

          cur.next = nextNode;
          nextNode.prev = cur;

          this.#size--;
          return;
        }
        cur = cur.next;
        i++;
      }
    }
  }
  reverse() {
    if (!this.#head) return;

    let cur = this.#head;

    while (cur) {
      const next = cur.next;
      cur.next = cur.prev;
      cur.prev = next;
      cur = next;
    }

    const oldHead = this.#head;
    const oldTail = this.#tail;

    this.#head = oldTail;
    this.#tail = oldHead;
  }

  merge(left, right, cmp) {
    if (!left) return right;
    if (!right) return left;

    const dummy = new Node(null);
    let current = dummy;

    while (left && right) {
      if (cmp(left.data, right.data) <= 0) {
        current.next = left;
        left.prev = current;
        left = left.next;
      } else {
        current.next = right;
        right.prev = current;
        right = right.next;
      }
      current = current.next;
    }
    current.next = left || right;

    if (current.next) {
      current.next.prev = current;
    }

    const head = dummy.next;
    head.prev = null;

    return head;
  }

  remove(value) {
    if (!this.#head) return;

    if (this.#head.data === value) {
      this.pop_front();
    } else if (this.#tail.data === value) {
      this.pop_back();
    } else {
      let cur = this.#head;

      while (cur) {
        if (cur.data === value) {
          cur.prev.next = cur.next;
          cur.next.prev = cur.prev;
          this.#size--;
          return;
        }
        cur = cur.next;
      }
    }
  }

  sort(cmp) {
    const comp = typeof cmp === "function" ? cmp : (a, b) => a - b;

    const mergeSort = (head) => {
      if (!head || !head.next) return head;
      let slow = head;
      let fast = head.next;

      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      let mid = slow.next;
      slow.next = null;
      mid.prev = null;
      let left = mergeSort(head);
      let right = mergeSort(mid);

      return this.merge(left, right, comp);
    };

    this.#head = mergeSort(this.#head);
    this.#tail = this.#head;

    while (this.#tail && this.#tail.next) {
      this.#tail = this.#tail.next;
    }
  }

  [Symbol.iterator]() {
    let cur = this.#head;

    return {
      next() {
        if (!cur) {
          return { value: undefined, done: true };
        }

        const value = cur.data;
        cur = cur.next;

        return { value, done: false };
      },
    };
  }
}

// ==================== DoubledLinkedList TESTS ====================

const list = new DoubledLinkedList([3, 1, 4, 2]);

console.log(list.toArray());
// [3, 1, 4, 2]

console.log(list.front());
// 3

console.log(list.back());
// 2

console.log(list.isEmpty());
// false

console.log(list.at(0));
// 3

console.log(list.at(2));
// 4

list.push_front(0);

console.log(list.toArray());
// [0, 3, 1, 4, 2]

list.push_back(5);

console.log(list.toArray());
// [0, 3, 1, 4, 2, 5]

list.insert(3, 10);

console.log(list.toArray());
// [0, 3, 1, 10, 4, 2, 5]

list.erase(3);

console.log(list.toArray());
// [0, 3, 1, 4, 2, 5]

list.remove(4);

console.log(list.toArray());
// [0, 3, 1, 2, 5]

list.reverse();

console.log(list.toArray());
// [5, 2, 1, 3, 0]

list.sort();

console.log(list.toArray());
// [0, 1, 2, 3, 5]

list.sort((a, b) => b - a);

console.log(list.toArray());
// [5, 3, 2, 1, 0]

console.log([...list]);
// [5, 3, 2, 1, 0]

list.clear();

console.log(list.toArray());
// []

console.log(list.isEmpty());
// true

console.log(list.front());
// undefined

console.log(list.back());
// undefined
