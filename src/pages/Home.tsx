import { IonContent, IonHeader, IonText, IonPage } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage >
      <IonContent class="background">
        <IonHeader class="text-header">
          <IonText>RentalZ</IonText>
          <br/>
        </IonHeader>
        <IonHeader class="text-header2">
        <IonText>Rental Apartments Finder</IonText>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
};

export default Home;