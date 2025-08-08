import classes from '@components/Results/Result/Result.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import type { ChangeEvent } from 'react';
import type { DetailedCharacter } from '@/types/interfaces';
import { addCard, removeCard } from '@/features/cards/cardsSlice.ts';
import { imageNotFoundURL } from '@/data/data';

function Result(props: DetailedCharacter) {
  const cards = useAppSelector((state) => state.cards.items);
  const dispatch = useAppDispatch();

  const isChecked = (id: number) => {
    const foundCard = cards.find((card) => card.id === id);
    return !!foundCard;
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(addCard(props));
    } else {
      dispatch(removeCard(props.id));
    }
  };
  return (
    <div className={classes.result} data-testid="result">
      <input
        onClick={(event) => {
          event.stopPropagation();
        }}
        onChange={handleCheckboxChange}
        checked={isChecked(props.id)}
        className={classes.checkbox}
        type="checkbox"
        aria-label={`cb-${props.id}`}
      />
      <img
        alt="Result image"
        className={classes.resultImage}
        src={props.image ? props.image : imageNotFoundURL}
        data-testid="image"
      />
      <div className={classes.resultInfo}>
        <div className={classes.infoItem}>
          <span>Name:</span>
          <span data-testid="name">
            {props.name ? props.name : 'name is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Status:</span>
          <span data-testid="status">
            {props.status ? props.status : 'status is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Species:</span>
          <span data-testid="species">
            {props.species ? props.species : 'species is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Gender:</span>
          <span data-testid="gender">
            {props.gender ? props.gender : 'gender is missing'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Result;
