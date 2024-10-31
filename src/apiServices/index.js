import axios from "axios";

export const fetchTnx = () => {
  return axios.get("https://dummyjson.com/c/1ce0-1790-4962-a985");
};
