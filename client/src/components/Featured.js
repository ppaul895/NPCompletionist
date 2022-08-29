import { useEffect, useState } from 'react';

function Featured() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=fe487707d2de401dacea3b793a51f537&ordering=-metacritic&page=1')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                setGames(data.results);
            })
            .catch(console.log);
    }, []);

    function renderPlatforms(platforms) {
        return platforms.map(p => `${p.platform.name}`).join(', ');
    }

    function renderGenres(genres) {
        return genres.map(g => `${g.name}`).join(', ');
    }

    function renderDevelopers(id) {
        const apiURL = `https://api.rawg.io/api/games/${id}?key=fe487707d2de401dacea3b793a51f537`;
        let dev;
        
        fetch(apiURL)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                dev = data.developers[0] ? data.developers[0].name : 'noDev';
                console.log(dev);
            })
            .catch(console.log);
        console.log(dev);
        return dev;
    }

    return (
        <>
            <h2 className="mb-4">Games</h2>
            <table className="table table-striped table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Developers</th>
                        <th>Score</th>
                        <th>Image URL</th>
                        <th>Genres</th>
                        <th>Platforms</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td>{game.name}</td>
                            <td>{game.released}</td>
                            <td>{renderDevelopers(game.id)}</td>
                            <td>{game.metacritic}</td>
                            <td>{game.background_image}</td>
                            <td>{renderGenres(game.genres)}</td>
                            <td>{renderPlatforms(game.parent_platforms)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Featured;