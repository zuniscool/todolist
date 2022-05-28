import Items from "./components/Items.js";

import Header from "./components/Header.js";

class App {
  constructor() {
    const $app = document.querySelector('#app');
    const $header = document.querySelector('#header1');
    new Items($app);
    new Header($header);
  }
}

new App();