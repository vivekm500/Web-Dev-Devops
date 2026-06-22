// SYNCHRONOUS CODE

// Synchronous code is executed line by line, in the order it's written. Each operation waits for the previous one to complete before moving on to the next one.

// For example


function add(n) {
	
	let ans = 0;
	for (let i = 1; i <= n; i++) {
		ans = ans + i
	}
	return ans;
}

const ans1 = add(100);
console.log(ans1);
const ans2 = add(1000);
console.log(ans2);
const ans3 = add(10000);
console.log(ans3);



// **I/O (Input/Output) heavy operations** refer to tasks in a computer program that involve a lot of data transfer between the program and external systems or devices. These operations usually require waiting for data to be read from or written to sources like disks, networks, databases, or other external devices, which can be time-consuming compared to in-memory computations.

// ### Examples of I/O Heavy Operations:

// 1. Reading a file
// 2. Starting a clock
// 3. HTTP Requests


// We’re going to introduce imports/requires next. A require statement lets you import code/functions export from another file/module.

const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8"); // we are doing this asynchronous task synchronously
console.log(contents);



// ## CPU bound tasks

// CPU-bound tasks are operations that are limited by the speed and power of the CPU. These tasks require significant computation and processing power, meaning that the performance bottleneck is the CPU itself.


let ans = 0;
for (let i = 1; i <= 1000000; i++) {
	ans = ans + i
}
console.log(ans);


// ## I/O bound tasks

// I/O-bound tasks are operations that are limited by the system’s input/output capabilities, such as disk I/O, network I/O, or any other form of data transfer. These tasks spend most of their time waiting for I/O operations to complete.


const fs2 = require("fs");

const contents2 = fs.readFileSync("a.txt", "utf-8");
console.log(contents);


// Functional arguments

// Passing in what needs to be done as an argument.


function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function doOperation(a, b, op) {
  return op(a, b)
}

console.log(doOperation(1, 2, sum))



// Asynchronous code, callbacks

// Let’s look at the code to read from a file asynchronously. Here, we pass in a function as an argument. This function is called a callback since the function gets called back when the file is read 

const fs3 = require("fs");

function fileReadCallback(err, contents){
	console.log(contents)
}

fs.readFile("a.txt", "utf-8", fileReadCallback);

let s = 0;
for(let i=0; i<100000; i++){
	s += i
}

console.log(`S = ${s}`)

const x=1;
const y=2;

console.log(x)
console.log(y)

let beforeTime = Date.now();
for(let i =0; i<100000000000; i++){
	let currentTime = Date.now();
	if(currentTime-beforeTime >= 1000){
		break;
	}
}

console.log(x+y)

// ## setTimeout

// setTimeout is another asynchronous function that executes a certain code after some time


function run() {
	console.log("I will run after 1s");
}

setTimeout(run, 1000);
console.log("I will run immedietely");


// setInterval

let ctr = 0;
function cb(){
	console.log(ctr)
	ctr += 1;
}

setInterval(cb, 1000)

let n = 0;
for(let i=0; i<10000000000; i++){
	n += i;
}

console.log(n)

// if any asynchronous code hits in the program cpu will skip that async code and  wait for its computation gets completed and meanwhile it will continue executing the next lines of code and while it is executing that code after async code ,,,cpu will not comeback to the async code even if its computation gets completed first cpu will complete its ongoing task only then it will comeback to the async code


// ### **1. Call Stack**

// - The call stack is a data structure that keeps track of the function calls in your program. It operates in a "Last In, First Out" (LIFO) manner, meaning the last function that was called is the first one to be executed and removed from the stack.
// - When a function is called, it gets pushed onto the call stack. When the function completes, it's popped off the stack.


// ### **2. Web APIs**

// - Web APIs are provided by the browser (or the Node.js runtime) and allow you to perform tasks that are outside the scope of the JavaScript language itself, such as making network requests, setting timers, or handling DOM events.


// ### **Callback Queue**

// The callback queue is a list of tasks (callbacks) that are waiting to be executed once the call stack is empty. These tasks are added to the queue by Web APIs after they have completed their operation.

// ### 4. Event loop

// The event loop constantly checks if the call stack is empty. If it is, and there are callbacks in the callback queue, it will push the first callback from the queue onto the call stack for execution.