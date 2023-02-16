export interface IBidReturn {
  id: string;
  value: number;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
}
