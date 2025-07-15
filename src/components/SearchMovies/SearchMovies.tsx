import { Icon24Search } from '@vkontakte/icons';
import { FormItem, IconButton, Input } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import { useCallback, useContext } from 'react';
import { StoreContext } from '../../stores/RootStore';

export const SearchMovies = observer(() => {
  const store = useContext(StoreContext);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      store.setSearchInputValue(e.target.value);
    },
    [store],
  );

  const handleSearch = useCallback(() => {
    store.resetPage();
    store.getMoviesWithQuery();
  }, [store]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <>
      <FormItem style={{ flexGrow: 1 }}>
        <Input
          id="search-movies-input"
          placeholder="Введите название фильма"
          value={store.searchInputValue || ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          after={
            <IconButton
              onClick={handleSearch}
              aria-label="Найти фильмы"
              hoverMode="opacity"
            >
              <Icon24Search />
            </IconButton>
          }
        />
      </FormItem>
    </>
  );
});
