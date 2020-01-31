const axios = require('axios');

const getLugarLatLng = async(adress) => {
    const encodeURL = encodeURI(adress);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeURL}`,
        timeout: 1000,
        headers: { 'x-rapidapi-key': '4d97167919msh073988082b07688p10b0dfjsn62b8f7a96d1c' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para la ${adress}`);
    }
    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    // instance.get().then(resp => {
    //         console.log(resp.data.Results[0]);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}