
import Axios from "axios";

const fetchAPI = (requestUri) => Axios.get(requestUri)
.then(res => (res.data))
.catch(e => ({ err: e }));

export default fetchAPI;

export const generateRandomNumber = () =>{
    return Math.random(100000000000).toString().split(".")[1];
};
