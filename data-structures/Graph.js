const Queue = require("./Queue");
const Stack = require("./Stack");
class Graph {
  constructor(size, isDirected = false) {
    this.size = size;
    this.directed = isDirected;
    this.matrix = Array.from({ length: size }, () => new Array(size).fill(0));
    this.vertex = new Array(size).fill(0);
  }

  addVertex(obj) {
    this.vertex.push(obj);
    for (const row of this.matrix) {
      row.push(0);
    }
    this.size++;
    this.matrix.push(new Array(this.size).fill(0));
  }

  addEdge(u, v) {
    this.matrix[u][v] = 1;
    if (!this.directed) {
      this.matrix[v][u] = 1;
    }
  }

  print() {
    for (let i = 0; i < this.size; ++i) {
      console.log(this.matrix[i]);
    }
  }
  dfs(start) {
    const stack = new Stack();
    const result = [];
    let visited = new Array(this.size).fill(false);

    stack.push(start);
    visited[start] = true;

    while (!stack.isEmpty()) {
      const current = stack.pop();
      result.push(current);

      for (let i = this.size - 1; i >= 0; --i) {
        if (this.matrix[current][i] === 1 && !visited[i]) {
          stack.push(i);
          visited[i] = true;
        }
      }
    }
    return result;
  }
  bfs(start) {
    const queue = new Queue();
    const result = [];
    let visited = new Array(this.size).fill(false);

    visited[start] = true;

    queue.enqueue(start);
    visited[start] = true;

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      result.push(current);

      for (let i = 0; i < this.size; ++i) {
        if (this.matrix[current][i] === 1 && !visited[i]) {
          queue.enqueue(i);
          visited[i] = true;
        }
      }
    }
    return result;
  }
}

const graph1 = new Graph(3, false);

graph1.addEdge(0, 1);
graph1.addEdge(1, 2);

graph1.print();

graph1.addEdge(0, 1);
graph1.addEdge(1, 2);

console.log("DFS:", graph1.dfs(0));
console.log("BFS:", graph1.bfs(0));
