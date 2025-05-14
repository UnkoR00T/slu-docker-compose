import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter();
const api = {
  verify: (token: string | null = localStorage.getItem('jwt')): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const tempToken = localStorage.getItem('temp_jwt');
      if (!token) {
        localStorage.removeItem('jwt');
        window.location.href = `${import.meta.env.VITE_MAIN_SSO}/site?app=Unihokej`;
        reject();
      }
      await axios.post(`${import.meta.env.VITE_MAIN_BACKEND}/verify`, null, {
        headers: {
          Authorization: `Bearer ${tempToken}`
        },
      }).then(async (res) => {
        if (res.status == 401) {
          await assignToken(token).then(() => resolve());
        } else if(res.status == 200) {
          if(token){
            localStorage.setItem('jwt', token);
          }
        }
      }).catch(async (e) => {
        if(e.status == 401){
          return await assignToken(token);
        }
      })
      resolve();
    })
  }
}

const assignToken = async (jwt: string | null): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (jwt) {
      axios.post(
        `${import.meta.env.VITE_MAIN_BACKEND}/login`,
        {
          token: jwt,
        }
      ).then((res) => {
        if(res.status == 200) {
          localStorage.setItem('temp_jwt', res.data);
          resolve();
        }else{
          reject();
        }
      }).catch((err) => {
        reject();
      })
    }
  })
}

export default api;
