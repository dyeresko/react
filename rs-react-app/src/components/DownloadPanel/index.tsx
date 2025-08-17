'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { clearCards } from '@/app/[locale]/lib/features/cards/cardsSlice';
import classes from '@components/DownloadPanel/DownloadPanel.module.css';
import { useRef, useState, type FC } from 'react';
import { charactersToCSV } from '@/app/actions/csvActions';

const DownloadPanel: FC = () => {
  const cards = useAppSelector((state) => state.cards.items);
  const dispatch = useAppDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUnselectAllClick = () => {
    dispatch(clearCards());
  };
  const handleDownloadClick = async () => {
    setIsLoading(true);
    const chars = await charactersToCSV(cards);
    const blob = new Blob([chars], {
      type: 'text/csv;charset=utf-8; ',
    });
    const url = URL.createObjectURL(blob);
    const linkTag = linkRef.current;
    if (linkTag) {
      linkTag.href = url;
      linkTag.download = `${cards.length}_items.csv`;
      linkTag.click();
    }
    setIsLoading(false);
  };
  return (
    <div data-testid="download-panel" className={classes.downloadPanel}>
      <p>There are {cards.length} selected cards</p>
      <div className={classes.panelButtons}>
        <button onClick={handleDownloadClick} disabled={isLoading}>
          Download
        </button>
        <a href="#" ref={linkRef} hidden></a>
        <button onClick={handleUnselectAllClick} disabled={isLoading}>
          Unselect all
        </button>
      </div>
    </div>
  );
};

export default DownloadPanel;
