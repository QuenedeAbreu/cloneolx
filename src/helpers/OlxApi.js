import Cookies from "js-cookie";
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

async function apiFetchPost(endpoint, body) {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()

  if (data.notallowed) {
    window.location.href = '/signin';
    return;
  }
  return data;
}

// eslint-disable-next-line
async function apiFetchGet(endpoint, body = []) {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`)
  const data = await res.json()

  if (data.notallowed) {
    window.location.href = '/signin';
    return;
  }
  return data;
}


const OlxApi = {

  login: async (email, password) => {
    const reponse = await apiFetchPost('/user/signin', {
      email,
      password,
    });
    return reponse;
  }
}

// eslint-disable-next-line
export default () => OlxApi;