console.log("hello everyone");

// JavaScript is an interpreted language, meaning it's executed line-by-line at runtime by the JavaScript engine in the browser or server environment, rather than being compiled into machine code beforehand.

// # Dynamically Typed
//  Variables in JavaScript are not bound to a specific data type. Types are determined at runtime and can change as the program executes

// JavaScript executes code in a single-threaded environment, meaning it processes one task at a time.

// # Garbage collected

// JavaScript automatically manages memory allocation and deallocation through garbage collection, which helps prevent memory leaks by automatically reclaiming memory used by objects no longer in use.

// . Variables
let name = "John"; // Variable that can be reassigned
const age = 30; // Constant variable that cannot be reassigned
var isStudent = true; // Older way to declare variables, function-scoped

// Data types

let number = 42; // Number
let string = "Hello World"; // String
let isActive = false; // Boolean
let numbers = [1, 2, 3]; // Array

// ### 4. **Functions**

// Function declaration
function greet(name) {
  return "Hello, " + name;
}

// Function call
let message = greet("John"); // "Hello, John"

console.log(message);

// ### If/Else

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}

// ### Loops

// For loop
for (let i = 0; i < 5; i++) {
  console.log(i); // Outputs 0 to 4
}

// While loop
let j = 0;
while (j < 5) {
  console.log(j); // Outputs 0 to 4
  j++;
}

// ## Objects

// An object in JavaScript is a collection of `key-value pairs`, where each `key` is a string and each `value` can be any valid JavaScript data type, including another object.

function isLegal(admin) {
  if (admin.age >= 18) {
    console.log(admin.name + " is able to vote");
  } else {
    console.log(admin.name + " is not able to vote");
  }
}

let user1 = {
  name: "vivek",
  age: 21,
  password: "dfjskhn",
  address: {
    city: "patna",
    pin: 800001,
  },
};

let user2 = {
  name: "sarthak",
  age: 11,
  password: "dfjskhn",
};

isLegal(user1);
isLegal(user2);

console.log(user1.address.city);

// ## Arrays

// Arrays let you group data together

const users = ["harkirat", "raman", "diljeet"];
const tatalUsers = users.length;
const firstUser = users[0];

console.log(users[0]);

// ## Array of Objects

// We can have more complex objects, for example an array of objects


const users2 = [{
		name: "Harkirat",
		age: 21,
    password: 'rgeae'
	}, {
		name: "raman",
		age: 22,
    password: "fdsf"
	}, {
    name: "sridhi",
    age: 17,
    password: "twea"
  }, {
    name: "rahul",
    age: 24,
    password: "esdagf",
  }, {
    name: "tia",
    age: 45,
    password: "gdfsrgwea"
  }
]

const x = users2[0] 
console.log(x.name);
const user1Age = users2[0].age
console.log(user1Age)


for(let i=0; i<5; i++){
  isLegal(users2[i])
}


function Allowed(user){
  let AllowedUsers = []
  for(let i=0; i<user.length; i++){
    if(user[i].age>=18){
      AllowedUsers.push(user[i])
    }
  }
  return AllowedUsers;
}

const public = [
  {
    name: "Anii",
    age: 22
  }, {
    name: "sonu",
    age: 16
  }, {
    name: "Jitesh",
    age: 34
  }
]

let allowedPublic = Allowed(public);
console.log(allowedPublic)