import { Icon16Clear, Icon24Search } from '@vkontakte/icons';
import { FormItem, IconButton, Input } from '@vkontakte/vkui';

export const SearchMovies = () => {
  return (
    <>
      <FormItem style={{ flexGrow: 1 }}>
        <Input
          id="example"
          before={<Icon24Search />}
          after={
            <IconButton
              hoverMode="opacity"
              label="Очистить поле"
              // onClick={clear}
            >
              <Icon16Clear />
            </IconButton>
          }
          type="text"
          defaultValue="Lorem ipsum dolor sit amet"
        />
      </FormItem>
    </>
  );
};
