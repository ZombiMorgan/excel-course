import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import {isCell, matrix, nextSelector, shouldResize}
  from './table.functions';
import {resizeHandler} from './table.resize';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  static tableRows = 30;
  static tableCols = 26;

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(Table.tableRows);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
    this.$on('formula:input', (data) => {
      this.selection.current.text(data);
    });
    this.$on('formula:enter', () => this.selection.current.focus());
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell.text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
    ];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const nextId = nextSelector(this.selection.current, key);
      const $next = this.$root.find(`[data-id="${nextId}"]`);
      this.selectCell($next);
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$emit('table:input', $target.text());
  }
}
