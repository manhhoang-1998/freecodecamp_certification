// Sorted Union
// function uniteUnique(...arr) {
//   let newArr = arr.reduce((total, subArr) => total.concat(subArr), []);
//   let result = [];
//   result.push(newArr[0]);
//   for (let i = 1; i < newArr.length; i++) {
//     let check = true;
//     for (let j = 0; j < i; j++) {
//       if (newArr[i] == newArr[j]) {
//         check = false;
//         break;
//       }
//     }
//     if (check) result.push(newArr[i]);
//   }
//   return result;
// }

const uniteUnique = (...arg) => [...new Set(arg.flat())];

// console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));

// Convert HTML entities
function convertHTML(str) {
  let htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };
  return str
    .split("")
    .map((entity) => htmlEntities[entity] || entity)
    .join("");
}

convertHTML("Dolce & Gabbana");

// Sum All Odd Fibonacci Numbers
function sumFibs(num) {
  function fib(index) {
    let result = 0;
    if (index == 1) {
      result = 1;
    } else if (index == 2) {
      result = 1;
    } else {
      result = fib(index - 1) + fib(index - 2);
    }
    return result;
  }
  let sum = 0;
  let i = 1;
  let arr = [];
  while (fib(i) < num) {
    arr.push(fib(i));
    i++;
  }
  return arr
    .filter((ele) => !(ele % 2 == 0))
    .reduce((total, curr) => total + curr, 0);
}

// console.log(sumFibs(75000));
//cach 2
function sumFibs(num) {
  let prevNumber = 0;
  let currNumber = 1;
  let result = 0;
  while (currNumber <= num) {
    if (currNumber % 2 !== 0) {
      result += currNumber;
    }
    currNumber += prevNumber;
    prevNumber = currNumber - prevNumber;
  }

  return result;
}

sumFibs(4);

// console.log(new Array(5));

//  Sum All Primes
// use The Sieve of Eratosthenes
// function sumPrimes(num) {
//   let arr = new Array(num + 1);
//   arr[0] = -1;
//   arr[1] = -1;
//   for (let i = 2; i < num + 1; i++) {
//     arr[i] = i;
//   }
//   for (let j = 2; j < num; j++) {
//     if (arr[j] == -1) {
//       continue;
//     } else {
//       // console.log(arr[j], arr[num + 1]);
//       for (let k = arr[j] + 1; k < num + 1; k++) {
//         if (arr[k] != -1 && arr[k] % j == 0) {
//           arr[k] = -1;
//         }
//       }
//     }
//   }
//   console.log(arr);
//   return arr.reduce((sum, curr) => {
//     if (curr != -1) return sum + curr;
//     else return sum;
//   }, 0);
// }

function sumPrimes(num) {
  const orgArr = new Array(num + 1);
  for (let index = 0; index < orgArr.length; index++) {
    orgArr[index] = index;
  }
  orgArr[0] = false;
  orgArr[1] = false;

  for (let i = 2; i < Math.sqrt(num + 1); i++) {
    if (orgArr[i]) {
      for (let j = i * i; j <= num; j += i) {
        orgArr[j] = false;
      }
    }
  }
  const isPrimesArr = orgArr.filter((element) => element != false);
  console.log(isPrimesArr);
  return isPrimesArr.reduce((result, current) => result + current, 0);
}
// console.log(sumPrimes(10));

// Smallest common Multiple
function smallestCommons(arr) {
  let max = Math.max(...arr);
  let min = Math.min(...arr);
  let result = 0;
  for (let i = min; i <= max; i++) {
    result = smallestMultipleOfTwoNumber(min, i);
    min = result;
  }

  return result;
}
function smallestMultipleOfTwoNumber(firstNumber, secondNumber) {
  let resultArr = [];
  let maxLength = firstNumber * secondNumber;
  let maxOfTwoNUmber = Math.max(firstNumber, secondNumber);
  let minOfTwoNUmber = Math.min(firstNumber, secondNumber);

  for (let i = maxOfTwoNUmber; i <= maxLength; i += maxOfTwoNUmber) {
    resultArr.push(i);
  }
  //   console.log(resultArr);
  return resultArr.find((result) => result % minOfTwoNUmber == 0);
}
// console.log(smallestMultipleOfTwoNumber(5, 6));
smallestCommons([23, 18]);

// cách 2
function smallestCommons(arr) {
  // Setup
  const [min, max] = arr.sort((a, b) => a - b);
  const range = Array(max - min + 1)
    .fill(0)
    .map((_, i) => i + min);
  // GCD of two numbers
  // https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclid's_algorithm
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  // LCM of two numbers
  // https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
  const lcm = (a, b) => (a * b) / gcd(a, b);
  // LCM of multiple numbers
  // https://en.wikipedia.org/wiki/Least_common_multiple#Other
  return range.reduce((multiple, curr) => lcm(multiple, curr));
}

smallestCommons([1, 5]);

// Drop it
function dropElements(arr, func) {
  let index;
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i]) == false) {
      continue;
    } else {
      index = i;
      break;
    }
  }
  let newArr = [];
  if (index >= 0) {
    newArr = arr.slice(index);
  }
  return newArr;
}

dropElements([1, 2, 3, 4], function (n) {
  return n > 5;
});

//Steamroller
// solution 1:
function steamrollArray(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...steamrollArray(arr[i]));
    } else result.push(arr[i]);

    return result;
  }
}

steamrollArray([1, [2], [3, [[4]]]]);

//solution 2:
function steamrollArray(arr) {
  const result = [].concat(...arr);
  return result.some((element) => Array.isArray(element))
    ? steamrollArray(result)
    : result;
}

steamrollArray([1, [2], [3, [[4]]]]);

//Binary Agents
function binaryAgent(str) {
  let newArr = str.split(" ");
  return newArr
    .map((element) => String.fromCharCode(parseInt(element, 2)))
    .join("");
}

binaryAgent(
  "01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"
);

// Everything be true
function truthCheck(collection, pre) {
  let newArr = collection.map((obj) => obj[pre]);

  return newArr.every((element) => element);
}

truthCheck(
  [
    { name: "Quincy", role: "Founder", isBot: false },
    { name: "Naomi", role: "", isBot: false },
    { name: "Camperbot", role: "Bot", isBot: true },
  ],
  "isBot"
);

//Arguments Optional
function addTogether() {
  const [x, y] = arguments;
  if (typeof x != "number") return undefined;
  if (y === undefined) return (y) => addTogether(x, y);
  if (typeof y !== "number") return undefined;
  return x + y;
}

addTogether(2, 3);

//Make a Person
const Person = function (firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly
  let fullName = firstAndLast;

  this.getFirstName = function () {
    return fullName.split(" ")[0];
  };

  this.getLastName = function () {
    return fullName.split(" ")[1];
  };

  this.getFullName = function () {
    return fullName;
  };

  this.setFirstName = function (name) {
    fullName = name + " " + fullName.split(" ")[1];
  };

  this.setLasttName = function (name) {
    fullName = fullName.split(" ")[0] + " " + name;
  };

  this.setFullName = function (name) {
    fullName = name;
  };
};

const bob = new Person("Bob Ross");
bob.getFullName();
// console.log(bob.getFullName());

//Map the Debris

function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;

  return arr.map((obj) => {
    const earth = earthRadius + obj.avgAlt;
    const orbitalPeriod = Math.round(
      2 * Math.PI * Math.sqrt(Math.pow(earth, 3) / GM)
    );
    return { name: obj.name, orbitalPeriod: orbitalPeriod };
  });
}

// console.log(orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]));

//JAVASCRIP ALGORITHMS AND DATA STRUCTURES
// Palindrome Checker
function palindrome(str) {
  let regex = /\W+|_/g;
  str = str.replace(regex, "").toLowerCase();
  let arr = str.split("").reverse();
  let reverseStr = arr.join("");
  return str === reverseStr;
}

palindrome("My age is 0, 0 si ega ym.");

//Roman Numeral Converter
function convertToRoman(num) {
  let result = [];
  let romanArr = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  romanArr.forEach((subArr) => {
    while (num >= subArr[0]) {
      result.push(subArr[1]);
      num -= subArr[0];
    }
  });
  // console.log(result.join(""));
  return result.join("");
}

convertToRoman(36);

// Caesars Cipher
function rot13(str) {
  // let rotObj = {
  //   A: "N",
  //   B: "O",
  //   C: "P",
  //   D: "Q",
  //   E: "R",
  //   F: "S",
  //   G: "T",
  //   H: "U",
  //   I: "V",
  //   J: "W",
  //   K: "X",
  //   L: "Y",
  //   M: "Z",
  //   N: "A",
  //   O: "B",
  //   P: "C",
  //   Q: "D",
  //   R: "E",
  //   S: "F",
  //   T: "G",
  //   U: "H",
  //   V: "I",
  //   W: "J",
  //   X: "K",
  //   Y: "L",
  //   Z: "M",
  // };
  let rotObj = {};
  let A = "A".charCodeAt();
  let B = "Z".charCodeAt();
  for (let x = A; x <= A + 12; x++) {
    rotObj[String.fromCharCode(x)] = String.fromCharCode(x + 13);
  }
  for (let x = A + 13; x <= B; x++) {
    rotObj[String.fromCharCode(x)] = String.fromCharCode(x - 13);
  }
  // console.log(rotObj);

  let checkArr = str.split("");
  return checkArr
    .map((letter) => (/[A-Za-z]/.test(letter) ? rotObj[letter] : letter))
    .join("");
}

// console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));

//Telephone Number Validator
function telephoneCheck(str) {
  let regex =
    /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;
  return regex.test(str);
}

telephoneCheck("555-555-5555");

//Cash Register
const denom = [
  { name: "ONE HUNDRED", val: 100 },
  { name: "TWENTY", val: 20 },
  { name: "TEN", val: 10 },
  { name: "FIVE", val: 5 },
  { name: "ONE", val: 1 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 },
];

function checkCashRegister(price, cash, cid) {
  const output = {};
  let change = cash - price;
  const register = cid.reduce(
    function (acc, curr) {
      acc.total += curr[1];
      acc[curr[0]] = curr[1];
      return acc;
    },
    { total: 0 }
  );
  // console.log(register);

  if (register.total === change) {
    output.status = "CLOSED";
    output.change = cid;
    return output;
  }
  if (register.total < change) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
  const change_arr = denom.reduce(function (acc, curr) {
    let value = 0;
    while (register[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;
      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      acc.push([curr.name, value]);
    }
    return acc;
  }, []);
  // console.log(change_arr);

  if (change_arr.length < 1 || change > 0) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
  output.status = "OPEN";
  output.change = change_arr;
  return output;
}
let result = checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
// console.log(result);

//
