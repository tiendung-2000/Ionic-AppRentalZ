import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Detail from './pages/Detail';
import Add from './pages/Add';
import List from './pages/List';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>

        <IonRouterOutlet>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/AddRent" component={Add} exact />
          <Route path="/ListRoom" component={List} exact />
          <Route path="/RoomDetail/:id" component={Detail} exact />
        </IonRouterOutlet>

        <IonTabBar color="primary" slot="bottom">

          <IonTabButton href="/AddRent" tab="AddRent">
            <IonLabel class="text1" >Add Room</IonLabel>
          </IonTabButton>

          <IonTabButton href="/home" tab="home">
            <IonLabel class="text1">Home</IonLabel>
          </IonTabButton>

          <IonTabButton href="/ListRoom" tab="ListRoom">
            <IonLabel class="text1">List Room</IonLabel>
          </IonTabButton>

        </IonTabBar>
        
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
