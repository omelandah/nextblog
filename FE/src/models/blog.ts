export interface BlogPost {
  id: string;
  title: string;
  body: string;
  date: string;
  author: {
    id: string;
    username: string;
  };
}
