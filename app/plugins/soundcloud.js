import axios from 'axios';
import qs from 'qs';

const api = ({ method, url, data, query }) => new Promise((resolve, reject) => {

  const queryStrings = qs.stringify({
    ...query,
    client_id: 'a281614d7f34dc30b665dfcaa3ed7505',
  });

  function checkStatus(response, resolve, reject) {
    const { status, data } = response;
    if (status >= 200 && status < 300) {
      return resolve(data);
    }
    return reject(data);
  }

  axios(`https://api.soundcloud.com/${url}?${queryStrings}`, {
    method,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    data: JSON.stringify(data),
  })
    .then((response) => checkStatus(response, resolve, reject))
    .catch((error) => checkStatus(error, resolve, reject))
    .catch(reject);

});

const sc = {
  getUser: async (name) => {
    return await api({
      method: 'get',
      url: `resolve?url=https://soundcloud.com/${name}`,
      query: {}
    })
  },
  getPlaylists: async (id) => {
    return await api({
      method: 'get',
      url: `${id}/playlists`,
      query: {}
    })
  }
}

export default (context, inject) => {
  inject('sc', sc)
}
