import classes from '@components/Results/Result/Result.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import type { ChangeEvent, FC } from 'react';
import type { DetailedCharacter } from '@/types/interfaces';
import { addCard, removeCard } from '@/app/[locale]/lib/features/cards/cardsSlice';
import { imageNotFoundURL } from '@/data/data';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
const Result: FC<{ character: DetailedCharacter }> = ({ character }) => {
  const t = useTranslations('Result');
  const cards = useAppSelector((state) => state.cards.items);
  const dispatch = useAppDispatch();
  const { id, image, name, status, species, gender } = character;
  const isChecked = (id: number) => {
    const foundCard = cards.find((card) => card.id === id);
    return !!foundCard;
  };

  const handleResultClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => event.stopPropagation();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(addCard(character));
    } else {
      dispatch(removeCard(id));
    }
  };
  return (
    <div className={classes.result} data-testid="result">
      <input
        onClick={handleResultClick}
        onChange={handleCheckboxChange}
        checked={isChecked(id)}
        className={classes.checkbox}
        type="checkbox"
        aria-label={`cb-${id}`}
      />
      <Image
        width={300}
        height={300}
        alt={t('alt-result')}
        className={classes.resultImage}
        src={image ?? imageNotFoundURL}
        data-testid="image"
      />
      <div className={classes.resultInfo}>
        <div className={classes.infoItem}>
          <span>{t('name')}:</span>
          <span data-testid="name">{name ?? 'name is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('status')}:</span>
          <span data-testid="status">{status ?? 'status is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('species')}:</span>
          <span data-testid="species">{species ?? 'species is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('gender')}:</span>
          <span data-testid="gender">{gender ?? 'gender is missing'}</span>
        </div>
      </div>
    </div>
  );
};

export default Result;
