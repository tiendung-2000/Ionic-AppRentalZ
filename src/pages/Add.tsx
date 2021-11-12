import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonText, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { toast } from '../toast';
import './Add.css';
import { insertRoomRental } from '../databaseHandler';
import {
  Camera,
  CameraResultType,
  CameraSource
} from "@capacitor/camera";

const AddRent: React.FC = () => {
  const [propertyType, setProperty] = useState('');
  const [bedRooms, setBedRooms] = useState('');
  const [dateAndTime, setDateAndTime] = useState(new Date().toLocaleString("vi-VN"));
  const [monthlyRentPrice, setMonthlyRentPrice] = useState('');
  const [furnitureType, setFurnitureType] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [pictureURL, setPictureURL] = useState('assets/placeholder350x200.png');
  const [comment, setComment] = useState('');

  const formatVNDate = (iosString: string) => {
    return new Date(iosString).toLocaleString("vi-VN");
  };

  async function takePicture() {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 60
    })
    setPictureURL(cameraPhoto.webPath!)
  }

  async function validation() {
    if (propertyType.length === 0 || bedRooms.length === 0 || monthlyRentPrice.length === 0) {
      toast("Is not Empty!")
    }
    else if (isNaN(parseInt(monthlyRentPrice)) || parseInt(monthlyRentPrice) <= 0) {
      toast("Only input number and it above 0$")
    }
    else {
      //download picture from URL
      const response = await fetch(pictureURL)
      const fileContent = await response.blob()
      //construct object to insert
      const newCus = {
        propertyType: propertyType,
        bedRooms: bedRooms,
        dateAndTime: dateAndTime,
        monthlyRentPrice: monthlyRentPrice,
        furnitureType: furnitureType,
        notes: notes,
        name: name,
        pictureBlob: fileContent,
        comment: comment
      }
      insertRoomRental(newCus).then(() => {
        toast("Insert Successfully!")
      })
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>

        <IonHeader class="text-header" >
          Add Room
        </IonHeader>

        <IonItem lines="none">
          <IonText class="text">Property Type: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" placeholder="House, Villas, etc." onIonChange={e => setProperty(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Bedroom: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" placeholder="One, Two, etc." onIonChange={e => setBedRooms(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonLabel class="text">Date and Time: </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonDatetime class="ipt1" placeholder="Pick Date and Time" value={dateAndTime}
            onIonChange={e => setDateAndTime(e.detail.value!)}></IonDatetime>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Monthly Rent Price: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" placeholder="Price/Month." onIonChange={e => setMonthlyRentPrice(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Furniture Type: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" placeholder="TV, Sofa, etc." onIonChange={e => setFurnitureType(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Notes: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" placeholder="Near School, Market, ect" onIonChange={e => setNotes(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text">Name: </IonText>
        </IonItem>
        <IonItem lines="none">
          <IonInput class="ipt1" placeholder="Write your name." onIonChange={e => setName(e.detail.value!)}></IonInput>
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
          <IonButton class="btn-submit" onClick={validation}>SUBMIT</IonButton>
        </IonItem>

      </IonContent>
    </IonPage>
  );
};

export default AddRent;