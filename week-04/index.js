class shape {
  constructor(color, depth) {
    this.color = color;
    this.depth = depth;
  }

  paint() {
    console.log(`Painting with color ${this.color}`);
  }

  area() {
    throw new Error("The area method must be implemented in the subclass");
  }
  // if we forget to define area class in the child class we are calling then this base will throw this error and if area class is already defined in the child class then that will overwrites it

  volume() {
    return this.area() * this.depth;
  }
}

// Classes

// In JavaScript, classes are a way to define blueprints for creating objects (these objects are different from the objects defined in the last section).

class Rectangle extends shape {
  constructor(width, height, depth, color) {
    super(color); // calling constructor of base/parent class with the color property
    this.width = width;
    this.height = height;
  }

  area() {
    const area = this.width * this.height;
    return area;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }

  // static method
  static whoami() {
    return "i am a rectangle";
  }
}

// this keyword takes the shape of the current object on which the function is being called

const rect = new Rectangle(2, 4, "red");
const area = rect.area();
console.log(area);

let r2 = new Rectangle(10, 100, "green");
const clr = r2.paint();

console.log(r2.perimeter());

// whenever new object is created __ the constructor function gets- it is supposed to construct/create the object from this class

// console.log(r2.whoami())  // throws an error

console.log(Rectangle.whoami()); // don't throws an error because static method is attached to a class not on an object so it is called on the class

const d = new Date(); // Date is a predeined class in JS

console.log(d.getDay());
console.log(d.getDate());
console.log(d.getMonth());

// INHERITANCE

class circle extends shape {
  constructor(radius, depth, color) {
    super(color); // calling constructor of base/parent class with the color property
    this.radius = radius;
  }

  area() {
    return 3.14 * this.radius * this.radius;
  }

  perimeter() {
    return 2 * 3.14 * this.radius;
  }
}

class square extends shape {
  constructor(side, depth, color) {
    super(color); // calling constructor of base/parent class with the color proprty
    this.side = side;
  }

  area() {
    return this.side * this.side;
  }

  perimeter() {
    return 4 * this.side;
  }
}

// shape is a parent class and all Rectangle, circle and square are child classes
// rectangle, circle and square are inheriting paint property from its parent class shape
// base/parent class shoould at the top of child class inheriting it

const r3 = new Rectangle(10, 20, "red");
const c1 = new circle(10, "yellow");
const s1 = new square(10, "blue");

console.log(c1.area());

console.log(c1.paint());
console.log(s1.paint());

function whoHasMoreArea(s1, s2) {
  if (s1.volume() > s2.volume()) {
    console.log("first shape has more area");
  } else {
    console.log("second shape has more area");
  }
}

whoHasMoreArea(new Rectangle(10, 10, 10, "red"), new circle(1000, 20, "green"));

// PROMISES IN JS

function callback1() {
  console.log("hii there");
}

setTimeout(callback1, 5 * 1000);

let ctr = 0;
for (let i = 0; i <= 100; i++) {
  ctr = ctr + i;
}

console.log(ctr);

// output -> 5050 -> hii there
// because setTimeout is an async function that will execute here 5 seconds letter

function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function callback() {
  console.log("3 seconds have passed");
}

setTimeoutPromisified(3000).then(callback); // calling a promisified async function

const fs = require("fs"); // You have imported the Node.js File System (fs) core module. This built-in module allows you to interact with the file system on your computer, enabling you to read, write, delete, and manipulate files and directories.

// regular/non-promisified way of writing code to read a file

function callback2(err, data) {
  if (err) {
    console.log("error while reading the file", err.message);
  } else {
    console.log(data);
  }
}

fs.readFile("example.txt", "utf-8", callback2);

// promisified way of writing code to read a file

function fsReadFilePromisified(filePath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function callback3(data) {
  console.log(data);
}

function callbackErr(err) {
  console.log(err.message);
}

fsReadFilePromisified("example.txt", "utf-8")
  .then(callback3) // success call back
  .catch(callbackErr); // error callback



// callback hell -> an async function folloed by another async function that followed by another async function and this hgoes on


// Solution (has callback hell)
setTimeout(function () {
  console.log("hi");
  setTimeout(function () {
    console.log("hello");

    setTimeout(function () {
      console.log("hello there");
    }, 5000);
  }, 3000);
}, 1000);


// Alt solution (doesnt really have callback hell)

function step3Done() {
  console.log("hello there");
}

function step2Done() {
  console.log("hello");
  setTimeout(step3Done, 5000);
}

function step1Done() {
  console.log("hi");
  setTimeout(step2Done, 3000);
}

setTimeout(step1Done, 1000);


// promisified version

// Solution #1 (has callback hell)

function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

setTimeoutPromisified(1000).then(function () {
  console.log("hi");
  setTimeoutPromisified(3000).then(function () {
    console.log("hello");
    setTimeoutPromisified(5000).then(function () {
      console.log("hello there");
    });
  });
});


// Alt solution
// promise chaining -> it is the solution of callback hell
setTimeoutPromisified(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });
