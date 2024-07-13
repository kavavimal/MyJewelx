import axios from "axios";

export async function get(url, params) {
  return await axios.get(url);
}

export async function post(url, data) {
  const fromData = new FormData();
  Object.keys(data).map((key) => fromData.append(key, data[key]));
  return await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function del(url, params) {
  return await axios.delete(url);
}

export async function update(url, data) {
  const fromData = new FormData();
  Object.keys(data).map((key) => fromData.append(key, data[key]));
  return await axios.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
