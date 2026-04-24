const product = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWViNTU5MWJkNmE5NTAwMTVmNzk4MmIiLCJpYXQiOjE3NzcwMzA1NDYsImV4cCI6MTc3ODI0MDE0Nn0.kiLQr5R33LPplW8iCQZzMa_Qcwvapojjotvj62zFxVg";
const authorization = `Bearer ${token}`;

// recupero da HTML

const productsRow = document.getElementById("products-row");
const loader = document.getElementById("loader");

// collego API

const getProducts = () => {
  loader.classList.remove("d-none");

  fetch(product, {
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel caricamento dei prodotti");
      }
    })
    .then((products) => {
      // svuoto contenitore per inserire le card da qui in HTML
      productsRow.innerHTML = "";
      //ciclo i prodotti dell'array
      products.forEach((product) => {
        //creo la colonna delle card ed aggiungo le classi
        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-4");
        // creo la card da qui in HTML - con id?${product._id} passo l'id del prodotto nell'url in entrambi i collegamenti alle altre pagine
        col.innerHTML = `  <div class="card h-100 shadow-sm">
      <img src="${product.imageUrl}" class="card-img-top" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.brand}</p>
        <p class="fw-bold mt-auto">${product.price}€</p>

        <a href="./details.html?id=${product._id}" class="btn btn-dark mt-2">
          Dettagli
        </a>

        <a href="./backoffice.html?id=${product._id}" class="btn btn-outline-secondary mt-2">
          Modifica
        </a>
      </div>
    </div>
        `;
        //appendo dentro al contenitore
        productsRow.appendChild(col);
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Errore nel caricamento dei prodotti");
    })

    //nascondo il loader con finally (aiutata da google)
    .finally(() => {
      loader.classList.add("d-none");
    });
};

getProducts();
