export interface IBidReturn {
  id: string;
  value: number;
  createdAt: Date;
  announcement: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    name: string;
  };
}
