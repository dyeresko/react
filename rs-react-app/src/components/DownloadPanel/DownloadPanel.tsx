import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks.ts';
import { clearCards } from '../../features/cards/cardsSlice.ts';
import type { DetailedCharacter } from '../Panel/Panel.tsx';
import classes from './DownloadPanel.module.css';
import { useRef } from 'react';

function charactersToCSV(characters: DetailedCharacter[]) {
  const headers = [Object.keys(characters[0])].toString() + '\n';
  const rows = characters
    .map((character) => {
      const values = Object.values(character);
      return values.map((value) => {
        if (typeof value === 'object') {
          return Object.values(value)[0];
        }
        return value;
      });
    })
    .join('\n');
  return headers + rows;
}

function DownloadPanel() {
  const cards = useAppSelector((state) => state.cards.items);
  const dispatch = useAppDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleUnselectAllClick = () => {
    dispatch(clearCards());
  };
  const handleDownloadClick = () => {
    const blob = new Blob([charactersToCSV(cards)], {
      type: 'text/csv;charset=utf-8; ',
    });
    const url = URL.createObjectURL(blob);
    const linkTag = linkRef.current;
    if (linkTag) {
      linkTag.href = url;
      linkTag.download = `${cards.length}_items.csv`;
      linkTag.click();
    }
  };
  return (
    <div data-testid="download-panel" className={classes.downloadPanel}>
      <p>There are {cards.length} selected cards</p>
      <div className={classes.panelButtons}>
        <button onClick={handleDownloadClick}>Download</button>
        <a href="#" ref={linkRef} hidden></a>
        <button onClick={handleUnselectAllClick}>Unselect all</button>
      </div>
    </div>
  );
}

export default DownloadPanel;
