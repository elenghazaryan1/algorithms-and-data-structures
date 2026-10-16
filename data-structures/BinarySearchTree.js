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
    this.root = this._contains(this.root, value);
  }

  inOrderRecursive() {
    const result = [];

    this._inorder(this.root, result);
    console.log(result);
    return result;
  }

  preOrderRecursive() {
    const result = [];

    this._preOrder(this.root, result);
    console.log(result);
    return result;
  }

  postOrderRecursive() {
    const result = [];

    this._postOrder(this.root, result);
    console.log(result);
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

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

bst.inOrderRecursive();
// [3, 5, 7, 10, 15]

bst.preOrderRecursive();
// [10, 5, 3, 7, 15]

bst.postOrderRecursive();
// [3, 7, 5, 15, 10]

console.log(bst.contains(5)); // true
console.log(bst.contains(20)); // false

console.log(bst.getMin(bst.root)); // 3

bst.removeRecursive(3);
bst.inOrderRecursive();
// [5, 7, 10, 15]

bst.removeRecursive(10);
bst.inOrderRecursive();
// [5, 7, 15]
