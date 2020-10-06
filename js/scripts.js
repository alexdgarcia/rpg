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
  // $
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

  const App = {
    init: function(hero) {
      // console.log('game has begun!');
      // hero.greet();
      // hero.attack();
      this.renderHero(hero);
      this.renderEnemy(enemies[0]);
      this.eventListeners();
    },
    renderHero: function(hero) {
      $playerIcon.text(hero.icon);
      $playerName.append(hero.name);
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
      switch (event.target.innerText) {
        case "Attack":
          $('div.attacks').addClass('show-options-submenu');
          break; // prevents fallthrough behavior.
        case "Magic":
          $('div.magic').addClass('show-options-submenu');
          break;
        case "Items":
          $('div.items').addClass('show-options-submenu');
          break;
      }
    }
  };

  function heroSelected(event) {
    if (event.currentTarget.classList.contains('mage')) {
      const hero = new Mage('Gandalf', 1, 'Mage');
      App.init(hero);
    } else {
      const hero = new Warrior('Aragorn', 1, 'Warrior');
      App.init(hero);
    }

    // $
    // jQuery method for adding a class to existing
    // classList:
    $modal.addClass('hide-modal');
  }

  $mage.on('click', heroSelected);
  $warrior.on('click', heroSelected);
});