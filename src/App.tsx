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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Favorites } from './pages/Favorites/Favorites';
import { Main } from './pages/Main/Main';
import { MovieDetails } from './pages/MovieDetails/MovieDetails';

const App = () => {
  const platform = usePlatform();

  return (
    <BrowserRouter>
      <AppRoot>
        <SplitLayout
          header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
        >
          <SplitCol autoSpaced>
            <View activePanel="main">
              <Panel id="main">
                <PanelHeader>
                  <Navbar />
                </PanelHeader>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/movies/:id" element={<MovieDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </BrowserRouter>
  );
};

export default App;
