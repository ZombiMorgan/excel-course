export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    this.group
        .forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup($cells) {
    this.clear();
    this.group = $cells;
    this.group.forEach(($cell) => $cell.addClass(TableSelection.className));
  }
}
