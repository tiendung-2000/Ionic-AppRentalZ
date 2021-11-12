import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Edit: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  var inputRef = useRef<HTMLInputElement>(null);
  try {
    var id_num = parseInt(id);
  } catch (e) {
    <Redirect to="/" />;
  }
  const [propertyType, setProperty] = useState('')
  const [bedRooms, setBedRooms] = useState('')
  const [dateAndTime, setDateAndTime] = useState(new Date().toISOString())
  const [monthlyRentPrice, setMonthlyRentPrice] = useState('')
  const [furnitureType, setFurnitureType] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Edit;