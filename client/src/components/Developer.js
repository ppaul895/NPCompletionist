import { useEffect, useState } from 'react';

function Developer(props) {
    const [dev, setDev] = useState('');

    useEffect(() => {
        const apiURL = `https://api.rawg.io/api/games/${props.gameId}?key=1f3f83a36dda4d97a9e97270a8975ecf`;
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