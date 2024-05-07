import { useEffect, useState } from "react";
import { fetchAlbums, Album } from "../api/albums";

export default function Albums() {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlbums()
      .then((albums) => {
        setIsLoading(false);
        setAlbums(albums);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Something went wrong");
      });
  }, []);

  if (isLoading) return <p>Loading ...</p>;

  if (error) return <div role="alert">{error}</div>;

  if (!albums?.length) return <div>No albums</div>;

  return (
    <ul>
      {albums?.map((album) => (
        <li key={album.id}>
          <h2>{album.title}</h2>
        </li>
      ))}
    </ul>
  );
}
