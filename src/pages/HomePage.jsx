import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [games, setGames] = useState([]); // state to handle the games data
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("title"); // state to handle the sort

  useEffect(() => {
    getGames();

    async function getGames() {
      const data = localStorage.getItem("games"); // get data from local storage

      let gamesData = [];

      if (data) {
        // if data exists in local storage
        gamesData = JSON.parse(data); // parse the data from string to javascript array
      } else {
        // if data does not exist in local storage, fetch the data from the API
        gamesData = await fetchGames(); // fetch the data from the API
      }

      // Add the new game entry directly
      const newGame = {
        id: "ZfPTVEMQKf9vhNiUh0bj",
        image: "https://www.spelexperten.dk/bilder/artiklar/zoom/ZMGZM7141NOR_1.jpg?m=1643119158",
        title: "Pandemic Zone North America",
        language: "DK",
        rating: ":)",
        difficulty: "Medium",
        genre: "Family",
        players: "2-4",
        playtime: "60-120"
      };

      gamesData.push(newGame); // add the new game to the games array
      localStorage.setItem("games", JSON.stringify(gamesData)); // save the updated games data to local storage

      console.log(gamesData);
      setGames(gamesData); // set the games state with the updated data
    }
  }, []);

  async function fetchGames() {
    const response = await fetch("https://raw.githubusercontent.com/RaliLy/fetch-teachers2/main/games.json"); // fetch the data from the API
    const data = await response.json(); // parse the data from string to javascript array
    return data; // return the data
  }

  // Search, filter and sort the games array
  let filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const titles = [...new Set(games.map((game) => game.title))]; // get all the unique titles from the games array

  if (filter !== "") {
    filteredGames = filteredGames.filter((game) => game.title === filter); // filter the games array by the selected title
  }

  filteredGames.sort((game1, game2) =>
    game1[sortBy].localeCompare(game2[sortBy])
  ); // sort the games array by the selected sort

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Title{" "}
          <input
            placeholder="Search"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Filter by Title
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select title</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={(e) => setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="difficulty">Difficulty</option>
            <option value="players">Players</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredGames.map((game) => (
          <User user={game} key={game.id} />
        ))}
      </section>
    </section>
  );
}
