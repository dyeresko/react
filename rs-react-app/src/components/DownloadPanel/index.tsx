'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { clearCards } from '@/app/[locale]/lib/features/cards/cardsSlice';
import classes from '@components/DownloadPanel/DownloadPanel.module.css';
import { useRef, type FC } from 'react';
import { charactersToCSV } from '@/utils/utils';

const DownloadPanel: FC = () => {
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
};

export default DownloadPanel;
