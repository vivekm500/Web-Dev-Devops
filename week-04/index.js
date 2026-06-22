// Classes 

// In JavaScript, classes are a way to define blueprints for creating objects (these objects are different from the objects defined in the last section).


class Rectangle {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  area() {
    const area = this.width * this.height;
    return area;
  }

  paint() {
    console.log(`Painting with color ${this.color}`);
  }

  perimeter(){
    return 2*(this.width + this.height)
  }
}

const rect = new Rectangle(2, 4, "red");
const area = rect.area();
console.log(area);

let r2 = new Rectangle(10,100, "green")
const clr = r2.paint();

console.log(r2.perimeter())

// whenever new object is created __ the constructor function gets- it is supposed to construct/create the object from this class


const d = new Date() // Date is a predeined class in JS

console.log(d.getDay())
console.log(d.getDate())
console.log(d.getMonth())




