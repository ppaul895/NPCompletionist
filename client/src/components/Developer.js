import { useEffect, useState } from 'react';

function Developer(props) {
    const [dev, setDev] = useState('');

    useEffect(() => {
        const apiURL = `https://api.rawg.io/api/games/${props.gameId}?key=349a281c3d9c4c97838c1666b0c84955`;
        fetch(apiURL)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                setDev(data.developers[0] ? data.developers[0].name : 'noDev');
            })
            .catch(console.log);
    }, [props.gameId]);
    return dev;
}

export default Developer;