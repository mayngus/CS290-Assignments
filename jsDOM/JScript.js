// No main function, will run line-by-line

console.log("We are running JS"); //how to print stuff to console (cout or println)

//variables no need to specify int, char, string
//Java script will know
//If there is a space in a var name just put cpas, ex...
//uses longer var names
var thisIsAVariable;

//how js implements different types

//type: number
//All numbers are computed
//using float (9/5)= 1.8 not 1
var i = 16;
var pi = 3.1415;

//type: string
var str = "abc";

//type: boolean
var t = true;
var f = false;

//type: arrary
var arrayR = [1, 2, 3];

//type: object
var obj = {a: 1, b: 2, c:3};

//type: function
var fn = function() {console.log("Within fn()");};

console.log("typeof(t):", typeof(t));
console.log("typeof(pi):", typeof(pi));
console.log("typeof(obj):", typeof(obj));
console.log("typeof(fn):", typeof(fn));
fn();

//Can compare with == and !=, or === and !==
console.log("2==2", 2==2);
console.log("2==3", 2==3);
console.log("2=='a'", 2=='a'); //' ' and " " are the same
console.log("2=='2'", 2=='2');//compares 2 and '2' not looking at type
console.log("2==='2'", 2==='2'); //compares 2 and '2' with looking at type


//Strings
console.log("");
console.log("==============Strings");
console.log("");

var str1 = "This is a 'string'"
var str2 = 'This is also a "string"';
console.log("str1:", str1);
console.log("str2:", str2);

//concat
var greeting = "Hello, my ame is: ";
var name = "Rob";
var wholeGreeting = greeting + name;
console.log("Whole Greeting: ", wholeGreeting);

//other types get converted with concat
var problem = "2 + 2 = ";
var answer = 4;
var problemAndAnswer = problem + answer;
console.log("problemAndAnswer", problemAndAnswer);
console.log("problemAndAnswer.length", problemAndAnswer.length);
console.log("problemAndAnswer[4]", problemAndAnswer[4]);

console.log("'decathlon'.indexOf('cat')", 'decathlon'.indexOf('cat'));
console.log("'team'.indexOf('i')", 'team'.indexOf('i'));
console.log("'I love dogs.'.replace('dog', 'cat')", 'I love dogs.'.replace('dog', 'cat'));



//ARRAYS (are passed by reference in function)
console.log("\n================Arrays\n");

var array1 = [1, 2, 3];
var array2 = [1, true, "three"];

console.log("array1: ", array1);
console.log("array2: ", array2);

for (var j = 0; j < array2.length; j++){
  console.log("array2[" + j + "]", array2[j]);
}

console.log("'1,2,3,4'.split(',')", '1,2,3,4'.split(','));
console.log("'1,2,3,4'.split(',')", '1,2,3,4'.split(','));

//DAY 2

//can take up to three parameters (can't pass arbitrary elements for this function)
// the third parameter can pass the entire array
function printArrayElem(elem, idx){
  console.log("Element ", idx, "is: ", elem);
}
console.log("Using forEach();");
array2.forEach(printArrayElem); //loops through each element in array2, for each doesnt expect return value

function multBy2(val) {
  return val * 2;
}

//use map when you awnt to construct an array from another array
var array1Times2 = array1.map(multBy2);
console.log("array1Times2: ", array1Times2);

array1.push(4);
array1.push(5);
array1.push(6);
console.log("array1:", array1);

var popped = array1.pop();
console.log("popped:", popped);
array1.pop();
console.log("array1:", array1);

array1.unshift(-4);
array1.unshift(-5);
array1.unshift(-6);
console.log("array1:", array1);

array1.shift();
array1.shift();
console.log("array1:", array1);



//FUNCTIONS
console.log("\n================Functions\n");

//no need for var(type info)
function addThreeThings(a, b, c) {
  if(c){
     return a + b + c;
   }
   else {
     return a + b;
   }
}
console.log("addThreeThings(1, 2, 3)", addThreeThings(1, 2, 3));
console.log("addThreeThings('1', '2', '3')", addThreeThings('1', '2', '3'));
console.log("addThreeThings(1, 2)", addThreeThings(1, 2));

//Functions with no parameters
function addManyThings() {
  var sum = arguments[0]; //JS keyword to get all arguments passed to the function
  for (var i = 1; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
console.log("addManyThings(1, 2, 3):", addManyThings(1, 2, 3));

//Annoymous Functions
var five = 5;
array1.forEach(function (elem) { //called callback function: useful for when say in servers, calling other functions may take longer than this way
  console.log(elem + five); //can access and modify higher level varibales in callback functions
});




//OBJECTS
console.log("\n================Objects\n");

//EXAMPLE
var obj = { //can do Obj['cat'], obj['dog'], etc.)
//strings are called 'keys', data associated with them called 'values'
  cat: 1,
  dog: 2,
  fish: 3,
};

//can do functions in them, accessing obj elements with this., and can nest objets
//not very reusable
var luke = {
  firstName: "Luke",
  lastName: "Skywalker",
  age: 22,
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  }
};

var key = "lastName";
console.log("luke['fistname']:", luke['firstName']); //this method is good for if space in string or...
console.log("luke.fistname:", luke.firstName);
console.log("luke[key]:", luke[key]);

console.log("luke.getFullName()", luke.getFullName());

//CLASSES
//object that is reusable using classes
//capitalize first letter to show its a constructor for a class
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

//Prototypes
//functions that can be used by Person class
Person.prototype.getFullName = function () {
  return this.firstName + " " + this.lastName;
};

var person = new Person("Leia", "Organa", 23);
console.log("person:", person);
console.log("Person:", Person); //constructor
console.log("person.getFullName()", person.getFullName());
