import Mage from './mage.js';
import Warrior from './warrior.js';
import Dragon from './enemies/dragon.js';
import Ogre from './enemies/ogre.js';
import Kraken from './enemies/kraken.js';
import Unknown from './enemies/unknown.js';
// $
// It is common when working on a team to write jQuery
// as a function to the .ready() method. This ensures
// that the DOM has loaded and we can run our script.
// Although, you added your script tag right before
// </body>, when working on a team or code is being
// shared with other, someone may move the script tag
// to another part of the HTML document. We want to
// wait until DOM load regardless of where in the
// markup the script tag is. This is a safeguard.
//
// * a shorthand exists: $(function() {});
$(document).ready(function() {
  const ogre = new Ogre('Gilgamesh', 3, 'Ogre');
  const kraken = new Kraken('The Kraken', 5, 'Sea Creature');
  const unknown = new Unknown('Unknown', 5, '?');
  const dragon = new Dragon('Grim Matchstick', 7, 'Dragon');
  // Variables that hold jQuery objects should be prepended
  // with a $.
  const $mage = $('div.mage');
  const $warrior = $('div.warrior');
  const $modal = $('.modal');
  const $playerTile = $('div.player-tile');
  const $playerIcon = $('span.player-icon')
  const $playerName = $('span.player-name');
  const $enemyIcon = $('span.enemy-icon');
  const $enemyName = $('span.enemy-name');
  const enemies = [ogre, kraken, unknown, dragon];
  const App = { // Main functionality
    init: function(event) {
      this.isMage = event.currentTarget.classList.contains('mage');
      this.hero = (this.isMage) ? new Mage('Gandalf', 1, 'Mage') :
        new Warrior('Aragorn', 1, 'Warrior');
      this.enemy = enemies[0];

      // Hide current modal:
        // $
        // jQuery method for adding a class to existing
        // classList:
      $modal.addClass('hide-modal');
      // call rendering functions and set event listeners:
      this.renderHero();
      this.renderEnemy(this.enemy);
      this.eventListeners();
    },
    renderHero: function() {
      $playerIcon.text(this.hero.icon);
      $playerName.append(this.hero.name);
    },
    renderEnemy: function(enemy) {
      $enemyIcon.text(enemy.icon);
      $enemyName.text(enemy.name);
    },
    eventListeners: function() {
      // The below is a shorthand for writing:
      // const $heroMenu = $('div.hero-options');
      $('div.hero-options').on('click', this.triggerMenu.bind(this));
    },
    triggerMenu: function(event) {
      const menuClicked = event.target.innerText.toLowerCase();

      switch (menuClicked) {
        case "attack":
          this.heroAttack();
          break; // prevents fallthrough behavior.
        case "magic":
          const magicMenu = $('div.magic');
          magicMenu.addClass('show-options-submenu');
          this.renderMenu(menuClicked, magicMenu);
          this.heroMagicMenu();
          break;
        case "items":
          const itemsMenu = $('div.items');
          itemsMenu.addClass('show-options-submenu');
          this.renderMenu(menuClicked, itemsMenu);
          break;
      }
    },
    renderMenu: function(menuType, menuElement) {
      // Use the "in" keyword to iterate through the keys in an
      // object:
      for (let menuItem in this.hero[menuType]) {
        menuElement.append(`<p>${menuItem}</p>`);
      }
    },
    heroAttack: function() {
      this.processGame('attack', {
        class: this.hero.class,
        attackInfo: this.hero.attack(),
      });
    },
    enemyAttack: function() {
      this.processGame('attack', {
        class: this.enemy.class,
        attackInfo: this.enemy.attack(),
      });
    },
    heroMagicMenu: function() {
      const $magicMenu = $('div.magic.show-options-submenu');
      $magicMenu.on('click', this.heroMagicAttack.bind(this));
    },
    heroMagicAttack: function(magicEvent, magicMenu) {
      const $magicMenu = $('div.magic.show-options-submenu');
      const magicSpell = magicEvent.target.innerText;
      // jQuery method for removing a class:
      $magicMenu.removeClass('show-options-submenu');

      this.processGame('magic', {
        class: this.hero.class,
        magicInfo: this.hero.magic[magicSpell].bind(this.hero)(),
      });
    },
    enemyMagicAttack: function() {
      // Implement logic
    },
    processGame: function(payloadType, payload) {
      const player = this[`${payload.class}`];

      if (payloadType === 'attack') {
        console.log(`${player.name}'s ${payload.attackInfo.weapon} did ${payload.attackInfo.damage} damage!`);
        this.setHealth(player.class, payload.attackInfo.damage);
      } else if (payloadType === 'magic') {
        console.log(payload.magicInfo.message);
        this.setHealth(player.class, payload.magicInfo.damage);
        this.setMana(payload);
      }
    },
    setHealth: function(playerClass, damage) {
      // When using $ to select elements, an object is returned with
      // references to the found elements. You can use $ methods to
      // apply changes to all references, or just target one element
      // as is done below:
      const target = playerClass === 'hero' ? this.enemy : this.hero;
      const $targetHealthBar = playerClass === 'hero' ? $('div.enemy-damage-bar') : $('div.damage-bar');
      const healthBarWidth = $targetHealthBar[0].offsetWidth;
      const pixelPerDamageDealt = healthBarWidth / target.health;
      const totalWidthReduction = damage * pixelPerDamageDealt;

      target.health -= damage;
      $targetHealthBar.css('width', `${healthBarWidth - totalWidthReduction}`);
      console.log(`${target.name}'s health is now ${target.health}`);
    },
    setMana: function(payload) {
      const $targetManaBar = $('div.mana-spent');
      const manaBarWidth = $targetManaBar[0].offsetWidth;
      const pixelPerManaCost = manaBarWidth / this.hero.mana;
      const totalWidthReduction = payload.magicInfo.manaCost * pixelPerManaCost;

      this.hero.mana -= payload.magicInfo.manaCost;
      $targetManaBar.css('width', `${manaBarWidth - totalWidthReduction}`);
      console.log(`${this.hero.name}'s mana is now ${this.hero.mana}`);
    },
  };

  // jQuery event listeners. Remember, the callback
  // is invoked whenever the event occurs, don't invoke
  // it prematurely by doing something like App.init(event).
  // The event object is always passed automatically in a
  // listener:
  $mage.on('click', App.init.bind(App));
  $warrior.on('click', App.init.bind(App));
});