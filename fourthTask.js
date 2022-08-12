const readlineSync = require("readline-sync");

const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const decCooldown = (cooldown) => {
  for (spell in cooldown) {
    cooldown[spell]--;
    if (cooldown[spell] <= 0) {
      delete cooldown[spell];
    }
  }
};

const calculateDmg = (dmgGiver, dmgTaker) => {
  const result =
    dmgGiver.magicDmg * (1 - dmgTaker.magicArmorPercents / 100) +
    dmgGiver.physicalDmg * (1 - dmgTaker.physicArmorPercents / 100);
  return result;
};

const difLevel = readlineSync.question(
  "||| select difficulty: 1 - hard, 2 - normal, 3 - easy ||| "
);

let playerHealth = 0;

switch (difLevel) {
  case "1":
  case "hard":
    playerHealth = 10;
    break;

  case "2":
  case "normal":
    playerHealth = 15;
    break;

  case "3":
  case "easy":
    playerHealth = 20;
    break;

  default:
    console.log("некорректный ввод");
    break;
}

const chooseSkill = (availablePlayerSkills, chooseSkillText) => {
  const result = Number(readlineSync.question(chooseSkillText));
  if (result != 0 && result <= availablePlayerSkills.length) {
    return result - 1;
  } else {
    console.log("Неверный ввод способности");
    return chooseSkill(availablePlayerSkills, chooseSkillText);
  }
};

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3,
      magicDmg: 0,
      physicArmorPercents: 20,
      magicArmorPercents: 20,
      cooldown: 0,
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};

const player = {
  maxHealth: playerHealth,
  name: "Евстафий",
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};

let progressCounter = 1;
const cooldown = {};

while (monster.maxHealth > 0 && player.maxHealth > 0) {
  decCooldown(cooldown);
  let chooseSkillText = "Выберите умение: ||";
  let availablePlayerSkills = player.moves.filter(
    (spell) => !Object.keys(cooldown).includes(spell.name)
  );
  let availableMonsterSkills = monster.moves.filter(
    (spell) => !Object.keys(cooldown).includes(spell.name)
  );
  console.log(`====== ТЕКУЩИЙ ХОД - ${progressCounter} ======`);
  console.log(
    `== Ваше здоровье - ${player.maxHealth.toFixed(
      1
    )} ОЗ || Здоровье Лютого - ${monster.maxHealth.toFixed(1)} ОЗ ==`
  );
  const randomSkill = getRandomInteger(0, availableMonsterSkills.length - 1);
  const skillByMonster = availableMonsterSkills[randomSkill];

  console.log(
    `${monster.name} собирается использовать - ${skillByMonster.name}`
  );

  for (let i = 0; i < availablePlayerSkills.length; i++) {
    chooseSkillText += ` ${i + 1} - ${availablePlayerSkills[i].name} || `;
  }

  const playerSkill = chooseSkill(availablePlayerSkills, chooseSkillText);

  const skillByPlayer = availablePlayerSkills[playerSkill];
  console.log(`Вы использовали - ${skillByPlayer.name}`);
  player.maxHealth -= calculateDmg(skillByMonster, skillByPlayer);
  monster.maxHealth -= calculateDmg(skillByPlayer, skillByMonster);

  cooldown[skillByMonster.name] = skillByMonster.cooldown;
  cooldown[skillByPlayer.name] = skillByPlayer.cooldown;

  progressCounter++;
}

if (monster.maxHealth <= 0) {
  console.log("Поздравляем, Вы победили!");
} else console.log("К сожалению, Вы проиграли! Попробуйте еще раз!");
