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

      // Hide current modal:
        // $
        // jQuery method for adding a class to existing
        // classList:
      $modal.addClass('hide-modal');
      // call rendering functions and set event listeners:
      this.renderHero();
      this.renderEnemy(enemies[0]);
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
          const attackMenu = $('div.attacks');
          attackMenu.addClass('show-options-submenu');
          this.renderMenu(menuClicked, attackMenu);
          break; // prevents fallthrough behavior.
        case "magic":
          const magicMenu = $('div.magic');
          magicMenu.addClass('show-options-submenu');
          this.renderMenu(menuClicked, magicMenu);
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
      for (let spell in this.hero[menuType]) {
        menuElement.append(`<p>${spell}</p>`);
        console.log(spell);
      }
    }
  };

  // jQuery event listeners. Remember, the callback
  // is invoked whenever the event occurs, don't invoke
  // it prematurely by doing something like App.init(event).
  // The event object is always passed automatically in a
  // listener:
  $mage.on('click', App.init.bind(App));
  $warrior.on('click', App.init.bind(App));
});