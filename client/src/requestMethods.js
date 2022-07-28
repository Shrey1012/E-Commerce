import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGZlOTgzNWZkZjg4YjE0YzJjNDVlYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTAwMDQyMiwiZXhwIjoxNjU5MjU5NjIyfQ.XJ-9zpB-gERNR95AFomfvwNgohzZ0qUWMt9IBh98rO0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
