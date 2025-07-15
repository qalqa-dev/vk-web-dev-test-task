import { Icon24Search } from '@vkontakte/icons';
import { FormItem, IconButton, Input } from '@vkontakte/vkui';
import { useContext, useState } from 'react';
import { StoreContext } from '../../stores/RootStore';

export const SearchMovies = () => {
  const store = useContext(StoreContext);

  const [inputValue, setInputValue] = useState<string>('');

  return (
    <>
      <FormItem style={{ flexGrow: 1 }}>
        <Input
          id="example"
          placeholder="Введите название фильма"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          after={
            <IconButton
              onClick={() => {
                store.getMoviesWithQuery(inputValue, 1, 10);
              }}
            >
              <Icon24Search />
            </IconButton>
          }
          type="text"
        />
      </FormItem>
    </>
  );
};
