import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  prepare() {

  }

  init() {
    super.init();

    const $formula = this.$root.find('#formula');
    this.$on('table:input', (data) => $formula.text(data));
    this.$on('table:select', (data) => $formula.text(data));
  }

  onInput(event) {
    const $target = $(event.target);
    this.$emit('formula:input', $target.text());
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
    ];
    const {key} = event;
    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }
}
