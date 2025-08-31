import { useEffect, useRef, type FC } from 'react';
import classes from '@/components/TableCell/TableCell.module.css';

const TableCell: FC<{ cellContent: number | string }> = ({ cellContent }) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  useEffect(() => {
    cellRef.current?.classList.add(classes.highlight);
    setTimeout(() => {
      cellRef.current?.classList.remove(classes.highlight);
    }, 2000);
  }, [cellContent]);
  return (
    <td className={classes.base} ref={cellRef}>
      {cellContent}
    </td>
  );
};

export default TableCell;
