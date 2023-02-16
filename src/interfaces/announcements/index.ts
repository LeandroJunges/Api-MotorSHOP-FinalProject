export interface IAnnouncement {
  isAuction: boolean;
  vehicleType: string;
  title: string;
  mileage: number;
  description: string;
  price?: number;
  isSold: boolean;
  initialBid?: number;
  imgMain: string;
  year: string;
}

export interface IAnnouncementCreate {
  isAuction: boolean;
  vehicleType: string;
  title: string;
  mileage: number;
  description: string;
  price?: number;
  imgMain: string;
  year: string;
  initialBid?: number;
  isSold: boolean;
}
