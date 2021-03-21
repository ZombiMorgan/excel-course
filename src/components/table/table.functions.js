import {range} from '@core/utils';
import {Table} from './Table';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return rows.reduce((acc, row) => {
    cols.forEach((col) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

function left($current) {
  const current = $current.id(true);
  current.col = current.col > 0 ? current.col - 1 : 0;
  return `${current.row}:${current.col}`;
}
function up($current) {
  const current = $current.id(true);
  current.row = current.row > 0 ? current.row - 1 : 0;
  return `${current.row}:${current.col}`;
}
function right($current) {
  const current = $current.id(true);
  current.col = current.col < Table.tableCols ?
    current.col + 1 :
    Table.tableCols;
  return `${current.row}:${current.col}`;
}
function down($current) {
  const current = $current.id(true);
  current.row = current.row < Table.tableRows ?
    current.row + 1 :
    Table.tableRows;
  return `${current.row}:${current.col}`;
}

export function nextSelector(current, key) {
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      return right(current);
    case 'Enter':
    case 'ArrowDown':
      return down(current);
    case 'ArrowLeft':
      return left(current);
    case 'ArrowUp':
      return up(current);
    default:
      return '0:0';
  }
}
