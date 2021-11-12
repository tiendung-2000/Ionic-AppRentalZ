export interface RoomRental {
    id?: number;
    propertyType: string;
    bedRooms: string;
    dateAndTime: string;
    monthlyRentPrice: string;
    furnitureType: string;
    notes: string;
    name: string;
    pictureBlob: Blob;
    comment: string;
}