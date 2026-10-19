const Queue = require("./Queue");
const Stack = require("./Stack");
class TreeNode {
  constructor(data) {
    if (data == null) return;

    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  _insert(node, value) {
    if (!node) return new TreeNode(value);

    if (value > node.data) {
      node.right = this._insert(node.right, value);
    } else if (value < node.data) {
      node.left = this._insert(node.left, value);
    } else {
      return node;
    }
    return node;
  }

  _contains(node, value) {
    if (!node) return false;

    if (value === node.data) return true;

    if (value > node.data) {
      return this._contains(node.right, value);
    } else {
      return this._contains(node.left, value);
    }
  }

  _inorder(node, result) {
    if (!node) return;

    this._inorder(node.left, result);
    result.push(node.data);
    this._inorder(node.right, result);
  }

  _preOrder(node, result) {
    if (!node) return;

    result.push(node.data);
    this._preOrder(node.left, result);
    this._preOrder(node.right, result);
  }

  _postOrder(node, result) {
    if (!node) return;

    this._postOrder(node.left, result);
    this._postOrder(node.right, result);
    result.push(node.data);
  }

  _levelOrder(node, result) {
    function traverse(node, level) {
      if (!node) return;

      if (result.length === level) {
        result.push([]);
      }

      result[level].push(node.data);

      traverse(node.left, level + 1);
      traverse(node.right, level + 1);
    }

    traverse(node, 0);
    return result;
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
        node.data = this.getMin(node.right);
        node.right = this._remove(node.right, node.data);
      }
    }
    return node;
  }

  getMin(node) {
    if (!node) return null;

    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  insertRecursive(value) {
    this.root = this._insert(this.root, value);
  }

  containsRecursive(value) {
    return this._contains(this.root, value);
  }
  inorderIterative() {
    const result = [];
    const stack = new Stack();
    let cur = this.root;
    while (cur || !stack.isEmpty()) {
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

  postOrderIterative() {
    if (!this.root) return [];
    const result = [];
    const stack1 = new Stack();
    const stack2 = new Stack();
    stack1.push(this.root);
    while (!stack1.isEmpty()) {
      let cur = stack1.pop();
      stack2.push(cur);
      if (cur.left) stack1.push(cur.left);
      if (cur.right) stack1.push(cur.right);
    }
    while (!stack2.isEmpty()) {
      result.push(stack2.pop().data);
    }
    return result;
  }

  preorderIterative() {
    if (!this.root) return [];
    const result = [];
    const stack = new Stack();
    stack.push(this.root);

    while (!stack.isEmpty()) {
      let cur = stack.pop();
      if (cur.right) stack.push(cur.right);
      if (cur.left) stack.push(cur.left);

      result.push(cur.data);
    }
    return result;
  }

  levelOrderIterative() {
    if (!this.root) return [];
    const result = [];
    const queue = new Queue();
    queue.enqueue(this.root);
    let levelCount = 0;

    while (!queue.isEmpty()) {
      let levelSize = queue.size;

      for (let i = 0; i < levelSize; ++i) {
        let cur = queue.dequeue();
        if (cur.left) queue.enqueue(cur.left);
        if (cur.right) queue.enqueue(cur.right);

        result.push(cur.data);
      }
      levelCount++;
    }
    console.log("Level of this tree is", levelCount);
    return result;
  }

  levelOrderRecursive() {
    const result = [];

    this._levelOrder(this.root, result);

    return result.flat();
  }

  inOrderRecursive() {
    const result = [];

    this._inorder(this.root, result);
    return result;
  }

  preOrderRecursive() {
    const result = [];

    this._preOrder(this.root, result);
    return result;
  }

  postOrderRecursive() {
    const result = [];

    this._postOrder(this.root, result);
    return result;
  }

  removeRecursive(value) {
    this.root = this._remove(this.root, value);
  }

  insert(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
      return;
    }
    let cur = this.root;

    while (cur) {
      if (value < cur.data) {
        if (cur.left === null) {
          cur.left = new TreeNode(value);
          return;
        } else {
          cur = cur.left;
        }
      } else if (value > cur.data) {
        if (cur.right === null) {
          cur.right = new TreeNode(value);
          return;
        } else {
          cur = cur.right;
        }
      } else {
        return cur;
      }
    }
  }

  contains(value) {
    let cur = this.root;

    while (cur) {
      if (cur.data === value) return true;
      if (value < cur.data) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    return false;
  }
}

// ==================== Binary Search Tree TESTS ====================

const bst = new BinarySearchTree();

// Insert
[10, 5, 15, 3, 7, 12, 18].forEach((value) => bst.insert(value));

// Contains
console.log(bst.contains(7)); // true
console.log(bst.contains(20)); // false

// Contains Recursive
console.log(bst.containsRecursive(5)); // true
console.log(bst.containsRecursive(20)); // false

// Inorder
console.log("Inorder Recursive:", bst.inOrderRecursive());
// [3, 5, 7, 10, 12, 15, 18]

console.log("Inorder Iterative:", bst.inorderIterative());
// [3, 5, 7, 10, 12, 15, 18]

// Preorder
console.log("Preorder Recursive:", bst.preOrderRecursive());
// [10, 5, 3, 7, 15, 12, 18]

console.log("Preorder Iterative:", bst.preorderIterative());
// [10, 5, 3, 7, 15, 12, 18]

// Postorder
console.log("Postorder Recursive:", bst.postOrderRecursive());
// [3, 7, 5, 12, 18, 15, 10]

console.log("Postorder Iterative:", bst.postOrderIterative());
// [3, 7, 5, 12, 18, 15, 10]

// Level Order
console.log("Level Order Recursive:", bst.levelOrderRecursive());
// [10, 5, 15, 3, 7, 12, 18]

console.log("Level Order Iterative:", bst.levelOrderIterative());
// [10, 5, 15, 3, 7, 12, 18]

// Get Minimum
console.log("Minimum:", bst.getMin(bst.root)); // 3

// Remove a leaf node
bst.removeRecursive(3);
console.log(bst.inOrderRecursive());
// [5, 7, 10, 12, 15, 18]

// Remove a node with two children
bst.removeRecursive(15);
console.log(bst.inOrderRecursive());
// [5, 7, 10, 12, 18]

// Remove the root
bst.removeRecursive(10);
console.log(bst.inOrderRecursive());
// [5, 7, 12, 18]
