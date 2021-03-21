import {$} from '@core/Dom';

export function resizeHandler(event, $root) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizable"]');
  const col = $parent.data.col;
  const coords = $parent.getCoords();
  const prop = type === 'col' ? 'bottom' : 'right';
  $resizer.css({
    opacity: 1,
    [prop]: '-5000px',
  });
  let value;
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({
        right: -delta + 'px',
      });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({
        bottom: -delta + 'px',
      });
    }
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
    if (type === 'col') {
      $parent.css({width: value +'px'});
      $root.findAll(`[data-col="${col}"]`)
          .forEach(($cell) => $cell.style.width = value +'px');
    } else {
      $parent.css({height: value +'px'});
    }
  };
}
