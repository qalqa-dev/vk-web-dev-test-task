import { Icon20FilterOutline, Icon24Filter } from '@vkontakte/icons';
import {
  ChipsSelect,
  Div,
  Flex,
  FormItem,
  Group,
  Slider,
  ToolButton,
  type ChipOption,
} from '@vkontakte/vkui';
import clsx from 'clsx';
import { useState } from 'react';
import { SearchMovies } from '../SearchMovies/SearchMovies';
import styles from './Filter.module.scss';

export const Filter = ({ chipGroups }: { chipGroups: ChipOption[] }) => {
  const { minRating, maxRating } = { minRating: 0, maxRating: 10 };
  const { minYear, maxYear } = {
    minYear: 1990,
    maxYear: new Date().getFullYear(),
  };

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Group>
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
      </Group>

      <Group
        className={clsx(styles['filter-line'], {
          [styles.active]: isExpanded,
        })}
      >
        <FormItem top="Диапазон рейтинга">
          <Slider
            withTooltip
            multiple
            step={1}
            min={minRating}
            max={maxRating}
            defaultValue={[minRating, maxRating]}
            getAriaValueText={(value, index) =>
              index === 0 ? `Start thumb is ${value}` : `End thumb is ${value}`
            }
          />
        </FormItem>
        <FormItem top="Диапазон дат">
          <Slider
            withTooltip
            multiple
            step={1}
            min={minYear}
            max={maxYear}
            defaultValue={[minYear, maxYear]}
            getAriaValueText={(value, index) =>
              index === 0 ? `Start thumb is ${value}` : `End thumb is ${value}`
            }
          />
        </FormItem>
        <FormItem top="Выберите жанры" className={styles.chips}>
          <ChipsSelect
            id="groups"
            options={chipGroups}
            placeholder="Не выбраны"
            emptyText="Совсем ничего не найдено"
            selectedBehavior="hide"
            closeAfterSelect={false}
            allowClearButton={true}
          />
        </FormItem>
      </Group>
    </>
  );
};
