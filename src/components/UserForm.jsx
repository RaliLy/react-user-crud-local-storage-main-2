import { useEffect, useState } from "react";

export default function UserForm({ onSubmit, onCancel, user }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [rating, setRating] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [genre, setGenre] = useState("");
  const [players, setPlayers] = useState("");
  const [playtime, setPlaytime] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      setTitle(user.title || "");
      setLanguage(user.language || "");
      setRating(user.rating || "");
      setDifficulty(user.difficulty || "");
      setGenre(user.genre || "");
      setPlayers(user.players || "");
      setPlaytime(user.playtime || "");
      setImage(user.image || "");
    }
  }, [user]);

  function handleOnSubmit(event) {
    event.preventDefault();

    const updatedUser = {
      title,
      language,
      rating,
      difficulty,
      genre,
      players,
      playtime,
      image
    };

    onSubmit(updatedUser);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        placeholder="Type a title"
        onChange={e => setTitle(e.target.value)}
      />

      <label htmlFor="language">Language</label>
      <input
        id="language"
        type="text"
        value={language}
        placeholder="Enter the language"
        onChange={e => setLanguage(e.target.value)}
      />

      <label htmlFor="rating">Rating</label>
      <input
        id="rating"
        type="text"
        value={rating}
        placeholder="Enter rating (e.g., :), :)) )"
        onChange={e => setRating(e.target.value)}
      />

      <label htmlFor="difficulty">Difficulty</label>
      <input
        id="difficulty"
        type="text"
        value={difficulty}
        placeholder="Enter difficulty"
        onChange={e => setDifficulty(e.target.value)}
      />

      <label htmlFor="genre">Genre</label>
      <input
        id="genre"
        type="text"
        value={genre}
        placeholder="Enter genre"
        onChange={e => setGenre(e.target.value)}
      />

      <label htmlFor="players">Players</label>
      <input
        id="players"
        type="text"
        value={players}
        placeholder="Enter players (e.g., 2-4)"
        onChange={e => setPlayers(e.target.value)}
      />

      <label htmlFor="playtime">Playtime</label>
      <input
        id="playtime"
        type="text"
        value={playtime}
        placeholder="Enter playtime (e.g., 60-120)"
        onChange={e => setPlaytime(e.target.value)}
      />

      <label htmlFor="image">Image</label>
      <input
        type="url"
        value={image}
        placeholder="Paste image URL"
        onChange={e => setImage(e.target.value)}
      />
      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={image || "https://placehold.co/600x400?text=Paste+an+image+URL"}
        alt="Image preview"
        onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
      />

      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">{user ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
