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

const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
