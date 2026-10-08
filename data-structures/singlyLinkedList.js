class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SingleLinkedList {
  #size;
  constructor(iterables) {
    this.head = null;
    this.#size = 0;
    if (iterables && typeof iterables[Symbol.iterator] === "function") {
      for (let val of iterables) {
        this.push_back(val);
      }
    }
  }

  static fromArray(arr) {
    return new SingleLinkedList(arr);
  }

  get size() {
    return this.#size;
  }

  clear() {
    this.head = null;
    this.#size = 0;
  }

  push_back(elem) {
    const newNode = new Node(elem);
    if (!this.head) {
      this.head = newNode;
      this.#size++;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    this.#size++;
  }

  push_front(elem) {
    const newNode = new Node(elem);

    if (!this.head) {
      this.head = newNode;
      this.#size++;
      return;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.#size++;
  }

  pop_back() {
    if (!this.head) {
      return;
    }
    if (this.head.next) {
      let cur = this.head;

      while (cur.next.next) {
        cur = cur.next;
      }

      cur.next = null;
    } else {
      this.head = null;
    }
    this.#size--;
  }

  pop_front() {
    if (!this.head) return;

    this.head = this.head.next;

    this.#size--;
  }

  toArray() {
    const arr = [];
    let cur = this.head;

    while (cur) {
      arr.push(cur.data);
      cur = cur.next;
    }
    return arr;
  }

  front() {
    if (!this.head) return;

    return this.head.data;
  }

  isEmpty() {
    return !this.head;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
      throw new Error("Invalid position.");
    }

    let cur = this.head;
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
      !Number.isInteger(index) ||
      !Number.isInteger(value) ||
      index < 0 ||
      index > this.#size
    ) {
      throw new Error("Invalid position or value.");
    }

    if (index === 0) {
      this.push_front(value);
      return;
    } else if (index === this.#size) {
      this.push_back(value);
      return;
    }

    let i = 0;
    let cur = this.head;
    const newNode = new Node(value);
    while (cur) {
      if (i === index - 1) {
        newNode.next = cur.next;
        cur.next = newNode;
        this.#size++;
        return;
      }
      cur = cur.next;
      i++;
    }
  }

  erase(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
      throw new Error("Invalid position.");
    }

    if (index === 0) {
      this.pop_front();
      return;
    } else if (index === this.#size - 1) {
      this.pop_back();
      return;
    }

    let cur = this.head;
    let i = 0;

    while (cur) {
      if (i === index - 1) {
        cur.next = cur.next.next;
        this.#size--;
        return;
      }
      cur = cur.next;
      i++;
    }
  }

  reverse() {
    if (!this.head) return;

    let cur = this.head;
    let prev = null;

    while (cur) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }

    this.head = prev;
    return this.head;
  }

  merge(left, right, cmp) {
    if (!left) return right;
    if (!right) return left;

    const dummy = new Node(null);
    let current = dummy;

    while (left && right) {
      if (cmp(left.data, right.data) <= 0) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }
    current.next = left || right;
    return dummy.next;
  }

  remove(value) {
    if (!this.head) return;

    if (this.head.data === value) {
      this.pop_front();
      return;
    }

    let cur = this.head;

    while (cur.next) {
      if (cur.next.data === value) {
        cur.next = cur.next.next;
        this.#size--;
        return;
      }
      cur = cur.next;
    }
  }

  sort(cmp) {
    const comp = typeof cmp === "function" ? cmp : (a, b) => a - b;

    function mergeSort(head) {
      if (!head || !head.next) return head;
      let slow = head;
      let fast = head.next;

      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      let mid = slow.next;
      slow.next = null;

      let left = mergeSort(head);
      let right = mergeSort(mid);

      return this.merge(left, right, comp);
    }

    this.#head = mergeSort.call(this, this.#head);
  }

  [Symbol.iterator]() {
    let cur = this.head;

    return {
      next: () => {
        if (!cur) {
          return {
            value: undefined,
            done: true,
          };
        }
        const value = cur.data;
        cur = cur.next;
        return {
          value: value,
          done: false,
        };
      },
    };
  }
}

// ==================== SingleLinkedList TESTS ====================

const list = new SingleLinkedList([1, 2, 3]);

console.log(list.toArray()); // [1, 2, 3]
console.log(list.size); // 3
console.log(list.isEmpty()); // false
console.log(list.front()); // 1

list.push_back(4);

console.log(list.toArray()); // [1, 2, 3, 4]
console.log(list.size); // 4

list.push_front(0);

console.log(list.toArray()); // [0, 1, 2, 3, 4]
console.log(list.size); // 5

list.pop_back();

console.log(list.toArray()); // [0, 1, 2, 3]
console.log(list.size); // 4

list.pop_front();

console.log(list.toArray()); // [1, 2, 3]
console.log(list.size); // 3

console.log(list.at(0)); // 1
console.log(list.at(2)); // 3

try {
  list.at(10);
} catch (error) {
  console.log(error.message); // Invalid position.
}

list.insert(0, 0);
list.insert(2, 1);
list.insert(list.size, 4);

console.log(list.toArray()); // [0, 1, 1, 2, 3, 4]
console.log(list.size); // 6

list.erase(2);
list.erase(0);
list.erase(list.size - 1);

console.log(list.toArray()); // [1, 2, 3]
console.log(list.size); // 3

list.push_back(3);
list.push_back(3);

list.remove(3);

console.log(list.toArray()); // [1, 2, 3, 3]
console.log(list.size); // 4

list.reverse();

console.log(list.toArray()); // [3, 3, 2, 1]

list.sort();

console.log(list.toArray()); // [1, 2, 3, 3]

list.sort((a, b) => b - a);

console.log(list.toArray()); // [3, 3, 2, 1]

for (const value of list) {
  console.log(value);
}

console.log([...list]); // [3, 3, 2, 1]

const l1 = new SingleLinkedList([1, 3, 5]);
const l2 = new SingleLinkedList([2, 4, 6]);

const merged = l1.merge(l1, l2);

console.log(merged.toArray()); // [1, 2, 3, 4, 5, 6]
console.log(merged.size); // 6

const empty = new SingleLinkedList();

console.log(empty.toArray()); // []
console.log(empty.size); // 0
console.log(empty.isEmpty()); // true
console.log(empty.front()); // undefined

empty.pop_front();
empty.pop_back();
empty.reverse();
empty.sort();

const single = new SingleLinkedList([42]);

console.log(single.toArray()); // [42]

single.pop_back();

console.log(single.toArray()); // []
console.log(single.size); // 0
console.log(single.isEmpty()); // true

const duplicates = new SingleLinkedList([4, 2, 4, 1, 2]);

duplicates.sort();

console.log(duplicates.toArray()); // [1, 2, 2, 4, 4]

const negative = new SingleLinkedList([-5, 3, -1, 0, -10]);

negative.sort();

console.log(negative.toArray()); // [-10, -5, -1, 0, 3]
