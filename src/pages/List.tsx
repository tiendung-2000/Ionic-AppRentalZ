import { RefresherEventDetail } from '@ionic/core';
import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonList, IonNote, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonText, IonTitle, IonToolbar, } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getRoomRental } from '../databaseHandler';
import { RoomRental } from '../model';
import './List.css';

const ListRoom: React.FC = () => {
    const [allRooms, setAllRooms] = useState<RoomRental[]>([]);
    const [search, setSearch] = useState('');


    async function fetchData() {
        const resultFromDB = await getRoomRental();
        setAllRooms(resultFromDB);
    }

    async function doSearch(search: string) {
        if (search === '') {
            fetchData();
        }
        //const result = await getRoomRental() //Lay ra mang toan bo nhung gia luu trong DB
        let searchResult = allRooms.filter(e => e.titleRoom.toLowerCase().includes(search.toLowerCase()))
        //dung searchResult goi den mang, sau do dung filter nhu 1 vong lap va e se chay het vong lap, de lay ra nhung phan tu giong voi searchResult roi gan vao searchResult
        if (searchResult.length === 0) {
            searchResult = allRooms.filter(e => e.monthlyRentPrice.toLowerCase().includes(search.toLowerCase()))
        }
        // console.log(searchResult[0]);
        if (searchResult[0] === undefined) {
            //console.log('vaoko?')
            searchResult = allRooms.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
        }

        setAllRooms(searchResult);
        //gan setAllRooms = searchResult
    }

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData();
        setTimeout(() => {
            event.detail.complete();
        }, 500);
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
                                    <IonCardTitle>{c.titleRoom}</IonCardTitle>
                                    <IonCardSubtitle style={{ fontSize: "13px", color: "sliver" }}>Date: {c.dateAndTime}</IonCardSubtitle>
                                    <IonNote style={{ fontSize: "25px", color: "white" }}>Price: {c.monthlyRentPrice}$/month</IonNote>
                                    <br />
                                    <IonNote style={{ fontSize: "15px", color: "white" }}>Author: {c.name}</IonNote>
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