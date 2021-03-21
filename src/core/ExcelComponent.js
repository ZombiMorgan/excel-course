import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsub = [];

    this.prepare();
  }

  prepare() {}

  /**
   * Возвращает шаблон компонента
   * @return {string}
   */
  toHTML() {
    return '';
  }

  $emit(event, ...data) {
    this.emitter.emit(event, ...data);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsub.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsub.forEach((unsub) => unsub());
  }
}
