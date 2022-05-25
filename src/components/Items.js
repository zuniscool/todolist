import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
      <button class="btn_remove">제거</button>
    `
  }

  // add item
  setEvent () {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
  }

  // remove item
  removeEvent () {
    this.$target.querySelector('button.btn_remove').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState(items.pop());
    });
  }
  
}