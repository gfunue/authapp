export interface Blog {
  id?: number;
  title: string;
  intro: string;
  content: string;
  conclusion: string;
  imageUrl?: string;
  creationDate?: Date;
}
