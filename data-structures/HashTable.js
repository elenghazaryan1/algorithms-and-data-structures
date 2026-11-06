function isPrime(n) {
  if (n <= 1) return false;

  if (n === 2) return true;

  if (n % 2 === 0) return false;

  const limit = Math.sqrt(n);
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function nextPrime(n) {
  while (!isPrime(n)) {
    n++;
  }
  return n;
}

class HashTable {
  constructor(initialCapacity = 11, maxLoadFactor = 1.0) {
    this.capacity = nextPrime(initialCapacity);
    this.maxLoadFactor = maxLoadFactor;
    this.size = 0;
    this.bucket = new Array(this.capacity).fill(null).map(() => []);
  }

  _hash(key) {
    if (
      (typeof key !== "string" && typeof key !== "number") ||
      (typeof key === "number" && !Number.isFinite(key))
    ) {
      throw new Error("Your key for hashing must be number or string!");
    }

    if (typeof key === "string") {
      let sum = 0;

      for (let i = 0; i < key.length; ++i) {
        sum += key.charCodeAt(i);
      }

      return sum % this.capacity;
    } else if (typeof key === "number") {
      return ((key % this.capacity) + this.capacity) % this.capacity;
    }
  }

  loadFactor() {
    return this.size / this.capacity;
  }

  _loadFactorChecking() {
    if (this.size / this.capacity > this.maxLoadFactor) {
      this._resize();
    }
  }
  has(key) {
    const index = this._hash(key);
    const elem = this.bucket[index];
    for (const i of elem) {
      if (key === i.key) {
        return true;
      }
    }
    return false;
  }

  get(key) {
    const index = this._hash(key);
    const elem = this.bucket[index];
    for (const i of elem) {
      if (key === i.key) {
        return i.value;
      }
    }
  }

  set(key, value) {
    const index = this._hash(key);
    let elem = this.bucket[index];
    for (const i of elem) {
      if (key === i.key) {
        i.value = value;
        this._loadFactorChecking();
        return value;
      }
    }
    elem.push({ key, value });
    this.size++;
    this._loadFactorChecking();
    return value;
  }

  getSize() {
    return this.size;
  }

  delete(key) {
    const index = this._hash(key);
    const elem = this.bucket[index];

    const val = elem.findIndex((item) => item.key === key);
    if (val !== -1) {
      elem.splice(val, 1);
      this.size--;
      return true;
    }
    return false;
  }

  *keys() {
    for (const arr of this.bucket) {
      for (const elem of arr) {
        yield elem.key;
      }
    }
  }

  *values() {
    for (const arr of this.bucket) {
      for (const elem of arr) {
        yield elem.value;
      }
    }
  }

  *entries() {
    for (const arr of this.bucket) {
      for (const elem of arr) {
        yield [elem.key, elem.value];
      }
    }
  }

  _resize() {
    const oldBucket = this.bucket;

    this.capacity = nextPrime(this.capacity * 2);

    this.bucket = new Array(this.capacity).fill(null).map(() => []);

    for (const arr of oldBucket) {
      for (const elem of arr) {
        const index = this._hash(elem.key);
        this.bucket[index].push(elem);
      }
    }
  }

  clear() {
    this.bucket = new Array(this.bucket.length).fill(null).map(() => []);
    this.size = 0;
  }

  *[Symbol.iterator]() {
    yield* this.entries();
  }
}
const hash = new HashTable();

hash.set("name", "Elen");
hash.set("age", 18);
hash.set("city", "Yerevan");

console.log(hash.get("name")); // "Elen"
console.log(hash.get("age")); // 18
console.log(hash.has("city")); // true
console.log(hash.has("country")); // false
console.log(hash.getSize()); // 3
