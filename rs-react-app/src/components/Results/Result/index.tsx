import classes from '@components/Results/Result/Result.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import type { ChangeEvent, FC } from 'react';
import type { DetailedCharacter } from '@/types/interfaces';
import { addCard, removeCard } from '@/app/lib/features/cards/cardsSlice';
import { imageNotFoundURL } from '@/data/data';
import Image from 'next/image';
const Result: FC<{ character: DetailedCharacter }> = ({ character }) => {
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
        alt="Result image"
        className={classes.resultImage}
        src={image ?? imageNotFoundURL}
        data-testid="image"
      />
      <div className={classes.resultInfo}>
        <div className={classes.infoItem}>
          <span>Name:</span>
          <span data-testid="name">{name ?? 'name is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>Status:</span>
          <span data-testid="status">{status ?? 'status is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>Species:</span>
          <span data-testid="species">{species ?? 'species is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>Gender:</span>
          <span data-testid="gender">{gender ?? 'gender is missing'}</span>
        </div>
      </div>
    </div>
  );
};

export default Result;
