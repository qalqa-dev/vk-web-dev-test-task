import {
  AppRoot,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  usePlatform,
  View,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { MovieList } from './components/MovieList/MovieList';

const App = () => {
  const platform = usePlatform();

  const mockData = [
    {
      id: 1,
      imgUrl:
        'https://images.pexels.com/photos/1434819/pexels-photo-1434819.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Побег из Шоушенка',
      year: 1994,
      rating: 4,
    },
    {
      id: 2,
      imgUrl:
        'https://images.pexels.com/photos/1434819/pexels-photo-1434819.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Гарри Поттер и Философский камень',
      year: 2001,
      rating: 7.5,
    },
    {
      id: 3,
      imgUrl:
        'https://images.pexels.com/photos/1434819/pexels-photo-1434819.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Крестный отец',
      year: 1972,
      rating: 9.2,
    },
  ];

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              <MovieList movies={mockData}></MovieList>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
