import { User } from "../../entities/User.entity";

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
  isSold?: boolean;
  imgs?: {
    img1?: string;
    img2?: string;
    img3?: string;
    img4?: string;
    img5?: string;
    img6?: string;
  };
  user?: User;
}
