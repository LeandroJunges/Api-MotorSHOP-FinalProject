export interface IAnnouncement {
  isAuction: boolean;
  vehicleType: string;
  title: string;
  mileage: number;
  description: string;
  price: number;
  isSold: boolean;
  initialBid?: number;
  imgFront: string;
  imgsGallery: string;
  year?: string;
}

export interface IAnnouncementCreate {
  isAuction: boolean;
  vehicleType: string;
  title: string;
  mileage: number;
  description: string;
  price: number;
  imgFront: string;
  imgsGallery: string;
  year?: string;
  isSold: boolean;
}
