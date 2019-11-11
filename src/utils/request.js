const request = (method, url, body) => {
  method = method.toUpperCase();
  if (method === "GET") {
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token") || ""
    },
    body
  }).then(res => {
    if (res.status === 401) {
      history.replace("/login");
      return Promise.reject("Unauthorized.");
    }
    return res;
  });
};

export default request;
