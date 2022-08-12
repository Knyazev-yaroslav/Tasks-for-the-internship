const readlineSync = require("readline-sync");

const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const numberOfAttempts = 5;

let computerNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const numberLength = getRandomInteger(4, 7); // всего цифр 10, нужно удалить из массива от 4 до 7, поскольку, по условиям задачи, нужно, чтобы их было 3-6

shuffle(computerNumbers);

computerNumbers = computerNumbers.slice(
  0,
  computerNumbers.length - numberLength
);

const enterUserNumbers = () => {
  const result = ("" + readlineSync.question("Enter a number with 3-6 digits "))
    .split("")
    .map(Number);

  if (result.every((el) => !isNaN(el))) {
    return result;
  } else {
    console.log("Некорректный ввод");
    return enterUserNumbers();
  }
};

for (let i = 0; i < numberOfAttempts; i++) {
  const userNumbers = enterUserNumbers();

  const partialMatching = [];
  const completeMatching = [];

  for (let i = 0; i < computerNumbers.length; i++) {
    if (computerNumbers.includes(userNumbers[i])) {
      partialMatching.push(userNumbers[i]);
    }
  }

  for (let i = 0; i < computerNumbers.length; i++) {
    if (computerNumbers[i] === userNumbers[i]) {
      completeMatching.push(userNumbers[i]);
    }
  }

  console.log(
    `Всего неполных совпадений ${partialMatching.length} (${partialMatching})`
  );
  console.log(
    `Всего полных совпадений ${completeMatching.length} (${completeMatching})`
  );

  if (JSON.stringify(computerNumbers) === JSON.stringify(userNumbers)) {
    console.log("Ураа, вы выиграли!");
    break;
  }
}

console.log(`Загаданное число - ${computerNumbers.join("")}`);
