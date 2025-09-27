// dungeon.js
// Dungeon of Syntax - CLI game (Node.js)
// Save as dungeon.js and run: node dungeon.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()));
  });
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Player state
let playerName = '';
let health = 100;
const maxHealth = 100; // reasonable cap on health
let gold = 50;
let inventory = ['sword']; // keeps items as strings; sword is a starting flavor item
let activeEffects = []; // e.g. 'shield', 'amulet'

// Monster options
const monsters = ['Goblin', 'Skeleton', 'Orc', 'Rat King', 'Wraith'];

// Chest item options
const chestItems = ['potion', 'shield', 'amulet'];

function showStatus() {
  console.log('\n--- Current Status ---');
  console.log(`Player: ${playerName}`);
  console.log(`Health: ${health}/${maxHealth}`);
  console.log(`Gold: ${gold}`);
  console.log(`Inventory: ${inventory.length ? inventory.join(', ') : '(empty)'}`);
  console.log(`Active Effects: ${activeEffects.length ? activeEffects.join(', ') : '(none)'}`);
  console.log('----------------------\n');
}

async function battleMonster() {
  const monsterName = monsters[randInt(0, monsters.length - 1)];
  let monsterHealth = randInt(20, 40);

  console.log(`\nA wild ${monsterName} appears! (HP: ${monsterHealth})`);

  while (monsterHealth > 0 && health > 0) {
    const choice = (await ask('Do you [attack] or [run]? ')).toLowerCase();

    if (choice === 'attack' || choice === 'a') {
      let damage = randInt(5, 15);
      if (activeEffects.includes('amulet')) {
        damage += 5;
        // remove ONE amulet effect
        const idx = activeEffects.indexOf('amulet');
        if (idx > -1) activeEffects.splice(idx, 1);
        console.log('Your amulet flares — +5 damage (amulet consumed).');
      }

      monsterHealth -= damage;
      console.log(`You hit the ${monsterName} for ${damage} damage. (${Math.max(monsterHealth, 0)} HP left)`);

      if (monsterHealth > 0) {
        let monsterDamage = randInt(5, 12);
        if (activeEffects.includes('shield')) {
          monsterDamage = Math.floor(monsterDamage / 2);
          const idx = activeEffects.indexOf('shield');
          if (idx > -1) activeEffects.splice(idx, 1);
          console.log('Your shield absorbs part of the blow (shield consumed).');
        }
        health -= monsterDamage;
        console.log(`${monsterName} strikes you for ${monsterDamage} damage. (Your HP: ${Math.max(health, 0)}/${maxHealth})`);
      }
    } else if (choice === 'run' || choice === 'r') {
      console.log('You run away from the battle!');
      return 'ran';
    } else {
      console.log('Unknown action. Type "attack" or "run".');
    }
  }

  if (health <= 0) {
    console.log('\nYou have been slain... Game Over.');
    return 'dead';
  } else {
    const reward = randInt(10, 30);
    gold += reward;
    console.log(`\nYou defeated the ${monsterName}! You loot ${reward} gold.`);
    return 'won';
  }
}

function openChest() {
  const item = chestItems[randInt(0, chestItems.length - 1)];
  inventory.push(item);
  console.log(`\nYou open a chest and find: ${item}! It has been added to your inventory.`);
}

async function useItem() {
  if (inventory.length === 0) {
    console.log('You have no items to use.');
    return;
  }

  // Show items with indices
  console.log('\nInventory:');
  inventory.forEach((it, i) => {
    console.log(`  ${i + 1}. ${it}`);
  });

  const choice = (await ask('Enter the item number or name to use (or type cancel): ')).toLowerCase();
  if (choice === 'cancel' || choice === 'c') {
    console.log('Cancelled item use.');
    return;
  }

  let idx = -1;
  if (/^\d+$/.test(choice)) {
    // number input
    const num = parseInt(choice, 10);
    if (num >= 1 && num <= inventory.length) idx = num - 1;
    else {
      console.log('Invalid item number.');
      return;
    }
  } else {
    // match first occurrence by name (case-insensitive)
    idx = inventory.findIndex(i => i.toLowerCase() === choice);
    if (idx === -1) {
      console.log('Item not found in inventory.');
      return;
    }
  }

  const selected = inventory[idx];
  // Remove selected from inventory
  inventory.splice(idx, 1);

  if (selected === 'potion') {
    const healAmount = 20;
    const prev = health;
    health = Math.min(maxHealth, health + healAmount);
    console.log(`You drink a potion and recover ${health - prev} HP. (HP: ${health}/${maxHealth})`);
  } else if (selected === 'shield') {
    activeEffects.push('shield');
    console.log('You brace yourself and equip an ephemeral shield (will halve next incoming monster attack).');
  } else if (selected === 'amulet') {
    activeEffects.push('amulet');
    console.log('You wear an amulet that will boost your next attack (+5 damage).');
  } else {
    // For non-implemented items (like "sword" flavor) just say nothing happens
    console.log(`Using ${selected} had no immediate effect.`);
  }
}

async function main() {
  console.log('Welcome to the Dungeon of Syntax!');
  playerName = await ask('Enter your player name: ');
  if (!playerName) playerName = 'Adventurer';

  console.log(`\nGreetings, ${playerName}! Your adventure begins...\n`);

  // main loop
  while (health > 0) {
    // Random event
    const events = ['monster', 'chest', 'nothing'];
    const event = events[randInt(0, events.length - 1)];

    if (event === 'monster') {
      const result = await battleMonster();
      if (result === 'dead') break;
      // if 'ran' or 'won', continue to status/prompt below
    } else if (event === 'chest') {
      openChest();
    } else {
      console.log('\nThe room is empty. Nothing happens.');
    }

    // After event - show status
    showStatus();

    // Prompt player's next action
    const action = (await ask('What now? [continue], [use item], or [quit]: ')).toLowerCase();

    if (action === 'use item' || action === 'use' || action === 'u') {
      await useItem();
    } else if (action === 'quit' || action === 'q') {
      console.log('\nYou leave the dungeon with your loot. Safe travels!');
      console.log(`Final gold: ${gold}`);
      console.log(`Final inventory: ${inventory.length ? inventory.join(', ') : '(empty)'}`);
      break;
    } else {
      console.log('You move onward through the dungeon...');
      // loop continues
    }

    // If player health dropped to zero due to item (unlikely) or event, break
    if (health <= 0) {
      console.log('\nYou have succumbed to your wounds. Game Over.');
      break;
    }
  }

  console.log('\nThanks for playing the Dungeon of Syntax!');
  rl.close();
}

main().catch(err => {
  console.error('An error occurred:', err);
  rl.close();
});
