export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function uploadProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("products?" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllMensProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?gender=men");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchMenProductsByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("products?gender=men&" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllMensTshirts() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=tshirt&gender=men&");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchMenTshirtsByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=tshirt&gender=men&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllMensShorts() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=shorts&gender=men&");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchMenShortsByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=shorts&gender=men&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllMensJoggers() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=joggers&gender=men&");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchMenJoggersByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=joggers&gender=men&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllMensVests() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=vest&gender=men&");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchMenVestByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=vest&gender=men&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllWomensProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?gender=women");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWomenProductsByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("products?gender=women&" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllWomensDresses() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=dress&gender=women");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWomenDresssByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=dress&gender=women&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllWomensJoggers() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=joggers&gender=women");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWomenJoggersByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=joggers&gender=women&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllWomensTops() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=top&gender=women");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWomenTopsByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=top&gender=women&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllWomensTshirt() {
  return new Promise(async (resolve) => {
    const response = await fetch("products?category=tshirt&gender=women");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWomenTshirtByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?category=tshirt&gender=women&" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
