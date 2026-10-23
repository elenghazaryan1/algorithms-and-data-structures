const Queue = require("./Queue");
const Stack = require("./Stack");
class AvlNode {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
  constructor(value) {
    this.root =
      value === undefined || value === null ? null : new AvlNode(value);
  }

  _getHeight(node) {
    if (!node) return 0;
    return node.height;
  }

  _update(node) {
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
  }

  _bf(node) {
    if (!node) return 0;

    return this._getHeight(node.left) - this._getHeight(node.right);
  }

  _getMin(node) {
    if (!node) return null;

    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  _rotateRight(y) {
    let x = y.left;
    let T1 = x.right;

    x.right = y;
    y.left = T1;
    this._update(y);
    this._update(x);

    return x;
  }

  _rotateLeft(x) {
    let y = x.right;
    let T1 = y.left;

    y.left = x;
    x.right = T1;

    this._update(x);
    this._update(y);

    return y;
  }

  _insert(node, value) {
    if (!node) return new AvlNode(value);

    if (value < node.data) {
      node.left = this._insert(node.left, value);
    } else if (value > node.data) {
      node.right = this._insert(node.right, value);
    } else {
      return node;
    }
    this._update(node);

    let balance = this._bf(node);

    //Left Left rotate
    if (balance > 1 && value < node.left.data) {
      return this._rotateRight(node);
    } else if (balance > 1 && value > node.left.data) {
      // Left Right rotate
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    } else if (balance < -1 && value > node.right.data) {
      // Right Right rotate
      return this._rotateLeft(node);
    } else if (balance < -1 && value < node.right.data) {
      // Right Left rotate
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }

    return node;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }
  _remove(node, value) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this._remove(node.left, value);
    } else if (value > node.data) {
      node.right = this._remove(node.right, value);
    } else {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left || !node.right) {
        return node.left || node.right;
      } else {
        node.data = this._getMin(node.right);
        node.right = this._remove(node.right, node.data);
      }
    }
    this._update(node);

    let balance = this._bf(node);

    //Left Left
    if (balance > 1 && this._bf(node.left) >= 0) {
      return this._rotateRight(node);
    } else if (balance > 1 && this._bf(node.left) < 0) {
      // Left Right
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    } else if (balance < -1 && this._bf(node.right) <= 0) {
      // Right Right
      return this._rotateLeft(node);
    } else if (balance < -1 && this._bf(node.right) > 0) {
      // Right Left
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }

    return node;
  }

  remove(value) {
    this.root = this._remove(this.root, value);
  }

  inorder() {
    if (!this.root) return [];
    const result = [];
    const stack = new Stack();
    let cur = this.root;
    while (cur || stack.size) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }

      cur = stack.pop();
      result.push(cur.data);
      cur = cur.right;
    }

    return result;
  }

  preorder() {
    if (!this.root) return [];
    const result = [];
    const stack = new Stack();
    stack.push(this.root);

    while (stack.size) {
      let cur = stack.pop();

      if (cur.right) stack.push(cur.right);
      if (cur.left) stack.push(cur.left);

      result.push(cur.data);
    }
    return result;
  }

  postorder() {
    if (!this.root) return [];

    const result = [];
    const stack1 = new Stack();
    const stack2 = new Stack();
    stack1.push(this.root);

    while (stack1.size) {
      let cur = stack1.pop();
      stack2.push(cur);
      if (cur.left) stack1.push(cur.left);
      if (cur.right) stack1.push(cur.right);
    }
    while (stack2.size) {
      result.push(stack2.pop().data);
    }

    return result;
  }

  levelorder() {
    if (!this.root) return [];
    const result = [];
    const queue = new Queue();
    queue.enqueue(this.root);

    let levelCount = 0;

    while (queue.size) {
      let levelSize = queue.size;
      for (let i = 0; i < levelSize; ++i) {
        let cur = queue.dequeue();
        if (cur.left) queue.enqueue(cur.left);
        if (cur.right) queue.enqueue(cur.right);

        result.push(cur.data);
      }
      levelCount++;
    }
    return result;
  }
}

const tree = new AVL();

[10, 20, 30, 40, 50, 25].forEach((v) => {
  tree.insert(v);
});

console.log("Inorder:", tree.inorder());
console.log("Preorder:", tree.preorder());
console.log("Postorder:", tree.postorder());
console.log("Level order:", tree.levelorder());
console.log("Root:", tree.root.data);
console.log("Height:", tree.root.height);

// Duplicate
tree.insert(25);
console.log("After duplicate:", tree.inorder());

// Remove
tree.remove(40);
console.log("After remove:", tree.inorder());

// Remove root
tree.remove(tree.root.data);
console.log("After removing root:", tree.inorder());

// All 4 rotations
[
  [30, 20, 10], // LL
  [10, 20, 30], // RR
  [30, 10, 20], // LR
  [10, 30, 20], // RL
].forEach((values) => {
  const t = new AVL();
  values.forEach((v) => t.insert(v));
  console.log("Rotation:", values, "Root:", t.root.data);
});
