import axios from "redaxios";
export interface Album {
  userId: number;
  id: number;
  title: string;
}
export const fetchAlbums = () =>
  axios
    .get<Album[]>("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data);
