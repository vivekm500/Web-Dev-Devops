NOTES AND ASSIGNMENTS

https://petal-estimate-4e9.notion.site/Week-4-Async-Deep-Dive-2f47dfd1073581fea951c765a48fc8da


---------------------------------------------
CLASS IN JS


RESOURCES:-

1. https://www.geeksforgeeks.org/javascript/javascript-classes/

2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

in a JavaScript class, the this keyword refers to the specific object instance that is currently being created or operated on. It acts as a placeholder that lets your class blueprint dynamically read and modify the unique properties of each object you instantiate.How this Works Inside a ClassThe value of this changes its immediate context based on where it is written inside the class block:Inside the constructor: It targets the fresh, blank object that JavaScript is actively building when you call new ClassName().Inside standard methods: It points directly to the instance that invoked the method, granting access to that object's personal data fields.
```javascript
class Car {
  constructor(brand) {
    // 1. 'this' points to the new object being created
    this.brand = brand; 
  }

  drive() {
    // 2. 'this' points to the specific object that called .drive()
    console.log(`${this.brand} is moving.`); 
  }
}

// Creating two distinct object instances
const car1 = new Car("Tesla");
const car2 = new Car("Ford");

car1.drive(); // Logs: "Tesla is moving." (this refers to car1)
car2.drive(); // Logs: "Ford is moving." (this refers to car2)
```
Critical Rules and Common Gotchas
The super() rule in inheritance: If your class extends a parent class using extends, you must call super() in the constructor before using this. If you do not, JavaScript throws a reference error.

Losing context in callbacks: Passing a standard class method into a callback (like setTimeout or an event listener) breaks the connection to this, resetting it to undefined. To prevent this issue, assign the method using an arrow function, which automatically captures the correct instance context.
```javascriptclass User {
  constructor(name) {
    this.name = name;
  }

  // BAD: Loses context if used as a callback
  sayHi() { console.log(this.name); }

  // GOOD: Safely locks 'this' to the instance
  sayHello = () => { console.log(this.name); }
}
```


-------------------------------------
INHERITANCE IN JS

RESOURCES:- 

1. https://www.geeksforgeeks.org/javascript/javascript-inheritance/

2. https://www.w3schools.com/js/js_class_inheritance.asp

3. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain


Inheritance in JavaScript is a mechanism that allows one object to access properties and methods of another object, achieved natively through the Prototype Chain. Unlike traditional class-based languages (like Java or C++) that use classes as blueprint schemas, JavaScript is fundamentally dynamic and relies on an object-to-object delegation model. 

Even with the modern class syntax, JavaScript still operates on prototypes under the hood.1. The Core Engine: Prototypal InheritanceEvery JavaScript object has a hidden, internal property known as [[Prototype]]. This property points to another object, which acts as its fallback repository for properties and methods.The Prototype ChainWhen you request a property or execute a method on an object, JavaScript follows a specific lookup path:It looks at the object's own properties.If not found, it travels to the object's [[Prototype]].It moves up this chain link by link until it finds the property or reaches null.Reaching null signifies the end of the chain, returning undefined.Real-World Object DelegationYou can establish this link directly using Object.create():

```javascript
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};

// Create a new object with 'animal' as its prototype
const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.jumps); // true (Own property)
console.log(rabbit.eats);  // true (Inherited from animal)
rabbit.walk();             // "Animal walks" (Method inherited)
 ```
 Modern Inheritance: ES6 ClassesIntroduced to provide cleaner syntax, the class keyword abstracts away the complexities of the prototype chain while utilizing it directly behind the scenes.Implementation via extends and superTo inherit from a parent class, use the extends keyword. If the child class contains a constructor, it must call super() before accessing this to properly instantiate the parent object.
```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I am ${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, role) {
    super(name); // Invokes the Parent constructor
    this.role = role;
  }

  // Method Overriding
  greet() {
    // You can extend parent behavior using super
    return `${super.greet()} and I work as a ${this.role}.`;
  }
}

const employee = new Child("Alice", "Developer");
console.log(employee.greet()); 

// Output: "Hello, I am Alice and I work as a Developer."
``` 

3. Key Concepts to RememberProperty Shadowing: If a child object defines a property or method with the exact same name as one in its prototype chain, the child's property "shadows" (overrides) the parent's.The Behavior of this: No matter where a method is located on the prototype chain, this always references the object that originally initiated the method call.Single Inheritance: JavaScript objects and classes can only inherit directly from one parent prototype.Performance Impact: Looking up deep prototype properties takes time. Iterating over keys using for...in will scan inherited properties unless checked with hasOwnProperty()


**can we extends more than one class in javascript**

No, JavaScript does not support multiple inheritance, meaning a class cannot directly extend more than one class using the extends keyword. The syntax class Child extends Parent1, Parent2 will throw a syntax error because JavaScript objects can only have a single prototype link.However, you can achieve the functionality of extending multiple classes using alternative design patterns.Alternative 1: Mixins (Function Composition)A mixin is a function that accepts a base class as an argument and returns a new subclass extending that base class. You can chain these functions to inherit from multiple sources.

```javascript
// Base class
class Person {
  constructor(name) { this.name = name; }
}

// Mixin 1
const CanFly = (Base) => class extends Base {
  fly() { console.log(`${this.name} is flying!`); }
};

// Mixin 2
const CanSwim = (Base) => class extends Base {
  swim() { console.log(`${this.name} is swimming!`); }
};

// Combining them into a single class
class Superhero extends CanSwim(CanFly(Person)) {}

const hero = new Superhero("Clark Kent");
hero.fly();  // "Clark Kent is flying!"
hero.swim(); // "Clark Kent is swimming!"
```

Alternative 2: Manual Prototype MergingYou can use Object.assign() to copy properties and methods from other class prototypes directly onto your main target class prototype.
```javascript
class Runner {
  run() { console.log("Running..."); }
}

class Jumper {
  jump() { console.log("Jumping..."); }
}

class Athlete {}

// Copy methods onto Athlete's prototype
Object.assign(Athlete.prototype, Runner.prototype, Jumper.prototype);

const player = new Athlete();
player.run();  // "Running..."
player.jump(); // "Jumping..."
```
Alternative 3: Composition over InheritanceInstead of forcing an object to be multiple things, give it instances of those things. This is often the cleanest and most scalable architecture.
```javascript
class Engine { start() { console.log("Vroom!"); } }
class Radio { play() { console.log("Playing music..."); } }

class Car {
  constructor() {
    this.engine = new Engine();
    this.radio = new Radio();
  }
}

const myCar = new Car();
myCar.engine.start();
myCar.radio.play();
```


---------------------------------------------------
**PROMISES**

RESOURCES:-

1. https://www.geeksforgeeks.org/javascript/javascript-promise/

2. https://www.w3schools.com/js/js_promise.asp

3. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


Synchronous means tasks happen one after another, while asynchronous means tasks can run in the background without blocking the main program.Because JavaScript is a single-threaded language, it can only execute one line of code at a time using a single Call Stack.Synchronous Operations (Blocking)In synchronous code, every line executes sequentially. Each line must finish before the next line starts. If a task takes a long time, the entire browser freezes.

```javascript
console.log("Step 1: Open book");
console.log("Step 2: Read chapter"); // Takes time
console.log("Step 3: Close book");
```
Output sequence: Step 1 → Step 2 → Step 3.Asynchronous Operations (Non-Blocking)In asynchronous code, long-running tasks are offloaded to the browser environment. The main script continues running immediately, and the offloaded task signals the script when it finishes.

```javascript
console.log("1. Order food");

// Simulating a 3-second network request or timer
setTimeout(() => {
  console.log("2. Food arrives");
}, 3000);

console.log("3. Chat with friends");
```
Output sequence:1. Order food3. Chat with friends (Executed immediately without waiting!)2. Food arrives (Executed after 3 seconds)How JS Handles Async Code (The Event Loop)JavaScript manages asynchronous operations using three distinct components working together:Web APIs / Node.js Runtime: Handles the actual background waiting (like timers, network fetches, or database queries).Callback Queue (Task Queue): Holds the finished asynchronous tasks waiting to be executed.The Event Loop: Continuously checks if the Call Stack is empty. If it is empty, it pushes the first task from the queue into the stack to be executed.



// setTimeout nfunction in js

The setTimeout function is a built-in JavaScript method that executes a specific piece of code or function once, after a designated period of delay measured in milliseconds.It is a core asynchronous tool that allows you to delay actions without freezing the browser's user interface.
Syntax
```javascript
setTimeout(function, delay, param1, param2, ...);
```
function: The callback function you want to execute.
delay: The time to wait in milliseconds (1 second = 1000 milliseconds). If omitted, it defaults to 0.
param1, param2...: Optional extra arguments passed directly into your callback function.
Basic Example
```javascript
function greet() {
  console.log("Hello after 2 seconds!");
}

// Executes greet() after 2000 milliseconds
setTimeout(greet, 2000); 
Use code with caution.You can also pass an anonymous arrow function directly inside it:javascriptsetTimeout(() => {
  console.log("This ran after 1 second!");
}, 1000);
```
Canceling a Timeout (clearTimeout)When you call setTimeout, it returns a unique Timeout ID (an integer). You can store this ID in a variable and pass it to clearTimeout() to stop the function from running before the timer finishes.
```javascript
const timerId = setTimeout(() => {
  console.log("This will never print.");
}, 5000);

// Cancel the timeout immediately
clearTimeout(timerId);
Passing Arguments to the CallbackInstead of using wrapper functions, you can pass parameters safely as trailing arguments:javascriptfunction welcome(user, role) {
  console.log(`Welcome ${user}, Role: ${role}`);
}

// Passes "Alice" and "Admin" directly to the welcome function
setTimeout(welcome, 1500, "Alice", "Admin");
```
The 0 Millisecond Delay TrickSetting a delay of 0 does not mean the code runs instantly. Instead, it forces the code to wait until all synchronous code currently in the call stack finishes execution.

```javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Inside timeout");
}, 0);

console.log("3. End");
```
Output:1. Start3. End2. Inside timeout (Pushed to the Callback Queue and runs only after the stack clears!)


Yes, Promise is a built-in class in modern JavaScript (introduced in ES6).While JavaScript uses prototype-based inheritance under the hood, Promise behaves exactly like a standard class. 
You interact with it by instantiating it with the new keyword and accessing its static methods.Evidence that Promise behaves as a Class1. It requires the new keywordJust like custom classes, you must use new to create an instance. Calling it as a regular function throws a runtime environment error.
```javascript
// Correct: Creates a new Promise instance
const myPromise = new Promise((resolve) => resolve("Done")); 


// TypeError: Class constructor Promise cannot be invoked without 'new'
const brokenPromise = Promise((resolve) => resolve("Done")); 
```
2. It has Static MethodsClasses often group helper utility functions directly on the class constructor rather than on individual instances. Promise has several powerful static methods:
Promise.resolve(value)
Promise.reject(reason)
Promise.all([promises])
Promise.race([promises])

3. It can be extended using extendsBecause it is a standard class, you can create a subclass that inherits all its behavior.

```javascript
class CustomPromise extends Promise {
  logState() {
    console.log("Checking this promise instance...");
  }
}

const custom = new CustomPromise((res) => res("Success"));
custom.logState(); // Custom method works
```


// MicroTask and MacroTask queue 

The Microtask Queue and Macrotask Queue (often just called the Task Queue) are two separate queues managed by the JavaScript Event Loop to prioritize and execute asynchronous callbacks.Because JavaScript is single-threaded, it uses these queues to decide exactly which async task gets to run next once the main synchronous execution stack is empty.

The Golden Rule of PriorityThe Event Loop treats these two queues with a strict hierarchy: The Microtask Queue has absolute priority over the Macrotask Queue.
Execute all synchronous code in the Call Stack.Check the Microtask Queue.
Execute ALL available microtasks until the queue is completely empty.
Check the Macrotask Queue. Move exactly ONE macrotask to the Call Stack and execute it.Go back to step 2 (repeat the cycle).
1. The Microtask Queue (High Priority)Microtasks are short tasks that must be executed immediately after the currently executing synchronous code finishes, before the browser renders or moves on to any other event.

What goes here?

Promises callbacks (.then(), .catch(), .finally())async/await execution steps (which are built on promises)MutationObserver callbacksqueueMicrotask() functionsprocess.nextTick() (Specific to Node.js; this actually sits in its own microtask-like queue that runs even before standard microtasks).

2. The Macrotask Queue (Low Priority)Macrotasks represent large, discrete pieces of asynchronous work offloaded to the browser environment or Node.js runtime.
What goes here?
Timers (setTimeout(), setInterval())File I/O operations (like your fs.readFile callbacks!)Network requests (like fetch responses or XMLHttpRequest)DOM Events (like a user clicking a button or scrolling)setImmediate() (Specific to Node.js)Code Execution ExampleLet's look at how a script containing both types of queues executes:
```javascript
console.log("1. Script Start (Sync)");

// Macrotask
setTimeout(() => {
  console.log("2. setTimeout (Macrotask)");
}, 0);

// Microtask
Promise.resolve().then(() => {
  console.log("3. Promise (Microtask)");
});

console.log("4. Script End (Sync)");
```
Output Sequence:1. Script Start (Sync) (Runs immediately)4. Script End (Sync) (Runs immediately, Call Stack is now empty)3. Promise (Microtask) (Event loop empties the Microtask Queue first!)2. setTimeout (Macrotask) (Event loop finally handles the Macrotask Queue)



// callback hell and its solution- promise chaining

Callback Hell (The Pyramid of Doom)Callback Hell is a term used to describe heavily nested, unreadable, and unmaintainable JavaScript code. It happens when multiple asynchronous operations depend on one another, forcing you to nest callback functions inside callback functions.Because each nested step moves further to the right, your code creates a deep triangle shape (often called the Pyramid of Doom).What it looks like:Imagine using your fs module to read a configuration file, fetch data from a database based on that config, and then write a log file.

```javascript

const fs = require("fs");

// Step 1: Read config file
fs.readFile("config.json", "utf8", (err, config) => {
  if (err) {
    console.error(err);
  } else {
    // Step 2: Use config to find user data
    db.findUser(config.userId, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        // Step 3: Write user logs to a file
        fs.writeFile(`log-${user.id}.txt`, "Logged in", (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("All operations finished successfully!");
          }
        });
      }
    });
  }
});
```

Why Callback Hell is bad:Unreadable: Your code grows horizontally instead of vertically.Repetitive Error Handling: You have to manually handle if (err) at every single level.Fragile: Moving or editing a block of code safely becomes incredibly difficult.Promise Chaining (The Solution)Promise Chaining is a technique that flattens this pyramid. Instead of nesting operations, you return a new Promise inside a .then() block. 
This forwards the result straight down to the next .then() block in a clean, linear vertical line.The Flattened Solution:Using the promisified version of your operations (fs.promises), the exact same logic looks like this:javascriptconst fs = require("fs").promises;

```js
// Start the chain
fs.readFile("config.json", "utf8")
  .then((config) => {
    // Step 2: Return a new promise to pass control down
    return db.findUser(config.userId); 
  })
  .then((user) => {
    // Step 3: Return another promise
    return fs.writeFile(`log-${user.id}.txt`, "Logged in");
  })
  .then(() => {
    console.log("All operations finished successfully!");
  })
  .catch((err) => {
    // ONE catch block handles errors for the ENTIRE chain!
    console.error("An error occurred somewhere in the chain:", err);
  });
  ```
Why Promise Chaining is superior:
Linear Structure: Code reads from top to bottom, making it easy to track the flow of data.Centralised Error Handling: You only need one .catch() block at the bottom. If an error occurs in any of the steps, JavaScript immediately skips the remaining .then() blocks and jumps straight to the .catch()



// how promise chaining works

Promise chaining works because the .then() method always returns a brand new Promise instance. This behavior allows you to link asynchronous tasks sequentially, reading from top to bottom.When you attach .then() to a promise, what happens next depends entirely on what your callback function returns.The Two Rules of Promise ChainingRule 

1: Returning a plain value or nothingIf your .then() callback returns a regular value (like a string, number, or object), .then() automatically wraps that value inside a fulfilled promise. This wrapped value is then passed as the input argument to the next .then() in the chain.

```javascript
Promise.resolve(2)
  .then((num) => {
    console.log(num); // Prints: 2
    return num * 2;   // Returns a plain number (4)
  })
  .then((result) => {
    console.log(result); // Prints: 4 (received the value automatically)
    // Returns nothing (undefined)
  })
  .then((final) => {
    console.log(final); // Prints: undefined
  });
  ```
Rule 2: Returning another Promise (For Async Tasks)If your .then() callback returns a new Promise, the chain pauses. The next .then() in line waits patiently until this new promise resolves or rejects.

```javascript
const fs = require("fs").promises;

fs.readFile("user.json", "utf8")
  .then((userData) => {
    const user = JSON.parse(userData);
    
    // Returning a NEW asynchronous promise operation
    return fs.readFile(`profile-${user.id}.txt`, "utf8"); 
  })
  .then((profileData) => {
    // This runs ONLY after the second file read finishes successfully
    console.log("Profile loaded:", profileData);
  });
Use code with caution.Visualizing the Data FlowEvery step passes data down to the next link via its return statement:[ Initial Promise ] 
       │ (resolves with "data.txt")
       ▼
 .then(file => { return fs.readFile(file) }) ──► Returns New Promise
       │ (waits for file content)
       ▼
 .then(content => { return JSON.parse(content) }) ──► Returns plain object
       │ (instantly wraps in fulfilled promise)
       ▼
 .then(json => { console.log(json) })
 ```
How Errors Intercept the ChainYou do not need to write error handling logic for every step. If any promise breaks or throws an error anywhere inside the chain, JavaScript immediately terminates the sequence, skips all subsequent .then() blocks, and jumps straight to the nearest .catch().

```javascript
fs.readFile("missing-file.txt", "utf8") // ❌ Fails here!
  .then((data) => {
    console.log("Step 2"); // Skipped
    return db.save(data);
  })
  .then(() => {
    console.log("Step 3"); // Skipped
  })
  .catch((err) => {
    console.error("Caught error:", err.message); // 🎯 Catches the error from Step 1
  });
  ```