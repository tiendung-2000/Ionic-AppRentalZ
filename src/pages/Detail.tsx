import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonText, IonToolbar, } from '@ionic/react';
import { useEffect, useState } from 'react';
import { trash } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import { deleteRoom, getRoomById, updateRoom } from '../databaseHandler';
import { RoomRental } from '../model';
import { toast } from '../toast';
import './Add.css';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

interface IdParam {
  id: string
}

const RoomDetail: React.FC = () => {
  const [titleRoom, setTitleRoom] = useState('');
  const [propertyType, setProperty] = useState('')
  const [bedRooms, setBedRooms] = useState('')
  const [dateAndTime, setDateAndTime] = useState(new Date().toISOString())
  const [monthlyRentPrice, setMonthlyRentPrice] = useState('')
  const [furnitureType, setFurnitureType] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [pictureURL, setPictureURL] = useState('assets/placeholder350x200.png');
  const [comment, setComment] = useState('');

  const { id } = useParams<IdParam>()
  const history = useHistory()

  async function roomUpdate() {
    if (propertyType.length === 0 || bedRooms.length === 0 || monthlyRentPrice.length === 0) {
      toast("Is not Empty!")
    }
    else if (isNaN(parseInt(monthlyRentPrice)) || parseInt(monthlyRentPrice) <=0 ) {
      toast("Only input number and it above 0$")
    }
    else {
      //download picture from URL
      const response = await fetch(pictureURL)
      const fileContent = await response.blob()
      //construct object to insert
      const udtRoom = {
        id: Number.parseInt(id),
        titleRoom: titleRoom,
        propertyType: propertyType,
        bedRooms: bedRooms,
        dateAndTime: dateAndTime,
        monthlyRentPrice: monthlyRentPrice,
        furnitureType: furnitureType,
        notes: notes,
        name: name,
        pictureBlob: fileContent,
        comment:comment
      }
      await updateRoom(udtRoom)
      toast('Updated Successfully')
      history.goBack();
    }
  }

  async function takePicture() {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 60
    })
    setPictureURL(cameraPhoto.webPath!)
  }

  async function fetchData() {
    const resultFromDB = await getRoomById(Number.parseInt(id)) as RoomRental;
    
    setProperty(resultFromDB.propertyType);
    setBedRooms(resultFromDB.bedRooms);
    setDateAndTime(resultFromDB.dateAndTime)
    setMonthlyRentPrice(resultFromDB.monthlyRentPrice)
    setFurnitureType(resultFromDB.furnitureType)
    setNotes(resultFromDB.notes)
    setName(resultFromDB.name);
    setPictureURL(URL.createObjectURL(resultFromDB.pictureBlob));
    setComment(resultFromDB.comment);
    setTitleRoom(resultFromDB.titleRoom);
  }

  async function roomDelete() {
    await deleteRoom(Number.parseInt(id))
    toast('Deleted Successfully')
    history.goBack();
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <IonPage>
      <IonContent>

        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonButton onClick={roomDelete} color="danger" slot="end">
            <IonIcon slot="icon-only" icon={trash}></IonIcon>
          </IonButton>
        </IonToolbar>

        <IonHeader class="text-header" >
          Detail
        </IonHeader>

        <IonItem lines="none">
          <IonText class="text">Title: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" value={titleRoom} onIonChange={e => setTitleRoom(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Property Type: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" value={propertyType} onIonChange={e => setProperty(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Bedroom: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" value={bedRooms} onIonChange={e => setBedRooms(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonLabel class="text">Date of birth: </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonDatetime class="ipt1" value={dateAndTime}
            onIonChange={e => setDateAndTime(e.detail.value!)}></IonDatetime>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Monthly Rent Price: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" value={monthlyRentPrice} onIonChange={e => setMonthlyRentPrice(e.detail.value!)}>$</IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Furniture Type: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" value={furnitureType} onIonChange={e => setFurnitureType(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Notes: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" value={notes} onIonChange={e => setNotes(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Name: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Picture: </IonText>
        </IonItem>
        <IonItem lines="none">
          <img src={pictureURL} width="335" height="200" />
        </IonItem>
        <IonItem lines="none">
          <IonButton onClick={takePicture}>Select Picture</IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonText class="text">Comment: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1"value={comment} onIonChange={e => setComment(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonButton class="btn-submit" onClick={roomUpdate}>SUBMIT</IonButton>
        </IonItem>

      </IonContent>
    </IonPage>
  )
};

export default RoomDetail;