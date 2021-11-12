import { openDB } from 'idb'
import { RoomRental } from './model'

const dbRental = "RentalZ"

initDB().then(() => {
    console.log('Init Done!')
})

export async function insertRoomRental(roomRental: RoomRental) {
    const db = await openDB(dbRental, 1)
    await db.put('RentalZ', roomRental)
}

export async function getRoomRental() {
    const db = await openDB(dbRental, 1);
    return await db.transaction("RentalZ").objectStore("RentalZ").getAll();
}

export async function getRoomById(id: number) {
    const db = await openDB(dbRental, 1);
    return await db.get("RentalZ", id)
}

export async function updateRoom(roomRental: RoomRental) {
    const db = await openDB(dbRental, 1)
    var roomDB = await db.get("RentalZ", roomRental.id!) as RoomRental
    roomDB.propertyType = roomRental.propertyType
    roomDB.bedRooms = roomRental.bedRooms
    roomDB.dateAndTime = roomRental.dateAndTime
    roomDB.monthlyRentPrice = roomRental.monthlyRentPrice
    roomDB.furnitureType = roomRental.furnitureType
    roomDB.notes = roomRental.notes
    roomDB.name = roomRental.name
    roomDB.pictureBlob = roomRental.pictureBlob
    roomDB.comment= roomRental.comment

    await db.put("RentalZ", roomDB);
}

export async function deleteRoom(id: number) {
    const db = await openDB(dbRental,1)
    await db.delete("RentalZ", id)
}

async function initDB() {
    const db = await openDB(dbRental, 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('RentalZ', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        },
    });
}