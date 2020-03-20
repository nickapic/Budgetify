import axios from "axios";

export async function login(user) {
  try {
    const res = await axios.post(`/api/v1/user/login`, user);
  } catch (err) {
    console.log(err.response.data.message);
  }
}

export async function signup(user) {
  try {
    const res = await axios.post(`/api/v1/user/signup`, user);
  } catch (err) {
    console.log(err.response.data.message);
  }
}
