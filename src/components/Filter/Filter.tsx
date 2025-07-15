import { Icon20FilterOutline, Icon24Filter } from '@vkontakte/icons';
import {
  ChipsSelect,
  Div,
  Flex,
  FormItem,
  Slider,
  ToolButton,
} from '@vkontakte/vkui';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../stores/RootStore';
import type { Genre } from '../../types/Response';
import { SearchMovies } from '../SearchMovies/SearchMovies';
import styles from './Filter.module.scss';

export const Filter = observer(() => {
  const store = useContext(StoreContext);

  const ratingRangeConst = [0, 10];
  const yearRangeConst = [1990, new Date().getFullYear()];

  const [ratingRange, setRatingRange] = useState<{
    start: number;
    end: number;
  }>({
    start: ratingRangeConst[0],
    end: ratingRangeConst[1],
  });

  const [yearRange, setYearRange] = useState<{
    start: number;
    end: number;
  }>({
    start: yearRangeConst[0],
    end: yearRangeConst[1],
  });

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  useEffect(() => {
    store.setRating(ratingRange);
    store.setYear(yearRange);
    store.setGenres(selectedGenres);
  }, [ratingRange, store, yearRange, selectedGenres]);

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Flex align="center" justify="start" style={{ width: '100%' }}>
        <Div>
          <ToolButton
            IconCompact={Icon20FilterOutline}
            IconRegular={Icon24Filter}
            mode={'secondary'}
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          />
        </Div>
        <SearchMovies />
      </Flex>

      <div
        className={clsx(styles['filter-line'], {
          [styles.active]: isExpanded,
        })}
      >
        <FormItem top="Диапазон рейтинга">
          {ratingRange.start} - {ratingRange.end}
          <Slider
            withTooltip
            multiple
            step={1}
            min={ratingRangeConst[0]}
            max={ratingRangeConst[1]}
            defaultValue={[ratingRange.start, ratingRange.end]}
            value={[ratingRange.start, ratingRange.end]}
            onChange={(value) => {
              console.log(value);
              setRatingRange({
                start: value[0],
                end: value[1],
              });
            }}
            getAriaValueText={(value, index) =>
              index === 0 ? `Start thumb is ${value}` : `End thumb is ${value}`
            }
          />
        </FormItem>
        <FormItem top="Диапазон дат">
          {yearRange.start} - {yearRange.end}
          <Slider
            withTooltip
            multiple
            step={1}
            min={yearRangeConst[0]}
            max={yearRangeConst[1]}
            defaultValue={[yearRange.start, yearRange.end]}
            value={[yearRange.start, yearRange.end]}
            onChange={(value) => {
              setYearRange({
                start: value[0],
                end: value[1],
              });
            }}
            getAriaValueText={(value, index) =>
              index === 0 ? `Start thumb is ${value}` : `End thumb is ${value}`
            }
          />
        </FormItem>
        <div>Выбранные жанры{selectedGenres.map((e) => e.name)}</div>
        {store.availableGenres ? (
          <FormItem top="Выберите жанры" className={styles.chips}>
            <ChipsSelect
              id="groups"
              options={store.availableGenres.map((e) => ({
                value: e.slug,
                label: e.name,
              }))}
              placeholder="Не выбраны"
              emptyText="Совсем ничего не найдено"
              selectedBehavior="hide"
              closeAfterSelect={false}
              allowClearButton={true}
              value={selectedGenres.map((e) => {
                return {
                  value: e.slug,
                  label: e.name,
                };
              })}
              onChange={(e) =>
                setSelectedGenres(
                  e.map((e) => {
                    return {
                      slug: e.value,
                      name: e.label,
                    };
                  }),
                )
              }
            />
          </FormItem>
        ) : (
          <>Загрузка...</>
        )}
      </div>
    </>
  );
});
