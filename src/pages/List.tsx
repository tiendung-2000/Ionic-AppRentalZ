import { RefresherEventDetail } from '@ionic/core';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonList, IonNote, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonText, IonTitle, IonToolbar, } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getRoomRental } from '../databaseHandler';
import { RoomRental } from '../model';
import './List.css';

const ListRoom: React.FC = () => {
    const [allRooms, setAllRooms] = useState<RoomRental[]>([]);
    const [search,setSearch] = useState('');

    async function doSearch(search: string) {
        const  result = await getRoomRental() //Lay ra mang toan bo nhung gia luu trong DB
        const searchResult = result.filter(e => e.name.toLowerCase().includes(search.toLowerCase())) 
        //dung searchResult goi den mang, sau do dung filter nhu 1 vong lap va e se chay het vong lap, de lay ra nhung phan tu giong voi searchResult roi gan vao searchResult
        setAllRooms(searchResult);
        //gan setAllRooms = searchResult
    }

    async function fetchData() {
        const resultFromDB = await getRoomRental();
        setAllRooms(resultFromDB);
    }

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData();
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                </IonToolbar>

                <IonHeader class="text-header" >
                    List Room
                </IonHeader>
                <IonSearchbar placeholder="Search for name, price ..." onIonChange={e => doSearch(e.detail.value!)}></IonSearchbar>

                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                {allRooms &&
                    <IonList>
                        {allRooms.map(c =>
                            <IonCard routerLink={'/RoomDetail/' + c.id} button key={c.id}>
                                <img src={URL.createObjectURL(c.pictureBlob)} width="385" height="200" />
                                <IonCardHeader>
                                    <IonCardTitle>
                                        {c.name}
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                        {c.dateAndTime}
                                    </IonCardSubtitle>
                                    <IonNote style={{ fontSize: "25px", color: "white" }}>
                                        {c.monthlyRentPrice}$
                                    </IonNote>
                                    <br/>
                                    <IonNote style={{ fontSize: "15px", color: "white" }}>
                                        {c.notes}
                                    </IonNote>
                                </IonCardHeader>
                            </IonCard>
                        )}
                    </IonList>
                }
            </IonContent>
        </IonPage>
    )
};

export default ListRoom;