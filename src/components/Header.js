import Component from "../core/Component.js";

export default class Header extends Component {
  template () {
    return `
      <header class="header">
        <div class="header__wrapper">
          <h1>
            <a href="/" class="header__logo-link">
              <img src="" alt="logo" class="header__logo">
                </a>
          </h1>
          <nav class="header__nav">
            <a href="javascript:void(0);" class="header__nav-link"><span class="header__nav-create-pot">POT 생성</span></a>
            <span class="header__nav-link login-info"></span>
          </nav>
        </div>
      </header>
    `;
  }
}

// export default function defineMainHeader() {
//   customElements.define('main-header', Header);
// }


