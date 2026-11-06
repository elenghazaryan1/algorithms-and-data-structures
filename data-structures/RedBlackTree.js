const RED = "RED";
const BLACK = "BLACK";

class TreeNode {
  constructor(data, color = RED, parent = null, left = null, right = null) {
    this.data = data;
    this.color = color;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class RBTree {
  constructor() {
    this.nil = new TreeNode(null);
    this.nil.color = BLACK;
    this.root = this.nil;
  }

  rightRotate(y) {
    let x = y.left;

    y.left = x.right;

    if (y.left !== this.nil) {
      y.left.parent = y;
    }

    if (y.parent === this.nil) {
      this.root = x;
    } else if (y === y.parent.left) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }

    x.parent = y.parent;
    x.right = y;
    y.parent = x;
  }

  leftRotate(x) {
    let y = x.right;
    x.right = y.left;

    if (x.right !== this.nil) {
      x.right.parent = x;
    }
    if (x.parent === this.nil) {
      this.root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }
    y.parent = x.parent;
    y.left = x;
    x.parent = y;
  }

  insertFixUp(newNode) {
    while (newNode.parent.color === RED) {
      let gp = newNode.parent.parent;
      if (newNode.parent === gp.left) {
        let uncle = gp.right;
        if (uncle.color === RED) {
          newNode.parent.color = uncle.color = BLACK;
          newNode.parent.parent.color = RED;
          newNode = newNode.parent.parent;
        } else {
          if (newNode === newNode.parent.right) {
            newNode = newNode.parent;
            this.leftRotate(newNode);
          }
          newNode.parent.color = BLACK;
          newNode.parent.parent.color = RED;
          this.rightRotate(newNode.parent.parent);
        }
      } else {
        let uncle = gp.left;
        if (uncle.color === RED) {
          newNode.parent.color = uncle.color = BLACK;
          gp.color = RED;
          newNode = gp;
        } else {
          if (newNode === newNode.parent.left) {
            newNode = newNode.parent;
            this.rightRotate(newNode);
          }
          newNode.parent.color = BLACK;
          gp.color = RED;
          this.leftRotate(gp);
        }
      }
    }
  }

  insert(data) {
    let newNode = new TreeNode(data);
    let parentNode = this.nil;
    let current = this.root;

    while (current !== this.nil) {
      parentNode = current;
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        return current;
      }
    }
    if (parentNode === this.nil) {
      this.root = newNode;
    } else if (newNode.data > parentNode.data) {
      parentNode.right = newNode;
    } else {
      parentNode.left = newNode;
    }
    newNode.parent = parentNode;
    newNode.left = newNode.right = this.nil;
    this.insertFixUp(newNode);
    this.root.color = BLACK;
  }
}

// Test 1
const tree1 = new RBTree();
[10].forEach((value) => tree1.insert(value));
console.log(tree1.root.data); // 10
console.log(tree1.root.color); // BLACK

// Test 2
const tree2 = new RBTree();
[10, 20, 30].forEach((value) => tree2.insert(value));
console.log(tree2.root.data); // 20

// Test 3
const tree3 = new RBTree();
[10, 30, 20].forEach((value) => tree3.insert(value));
console.log(tree3.root.data); // 20

// Test 4
const tree4 = new RBTree();
[7, 3, 18, 10, 22].forEach((value) => tree4.insert(value));
console.log(tree4.root.color); // BLACK

// Test 5 — duplicate
const tree5 = new RBTree();
tree5.insert(5);
tree5.insert(5);
console.log(tree5.root.data); // 5
console.log(tree5.root.left === tree5.nil); // true
console.log(tree5.root.right === tree5.nil); // true
