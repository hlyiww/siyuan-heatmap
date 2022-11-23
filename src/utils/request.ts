import axios from "axios";

const getCurrentServerUrl = (port = "64407") => {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}`;
};

const service = axios.create({
  baseURL: getCurrentServerUrl(),
  timeout: 8000,
});

service.interceptors.request.use((req) => {
  return req;
});

service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 0) {
    return data;
  }
});

function request(options: apiOptions) {
  options.method = options.method ?? "post";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
    delete options.data;
  }
  return service(options);
}

export default request;
