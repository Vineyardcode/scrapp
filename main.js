const axios = require('axios');


async function scrapeProducts() {
  
  //ASSUMPTIONS:

  //lets assume that we were not given a tricky question and that there really are some products that cost 0 and are added as a free bonus into certain orders. 

  //the prices have max two decimal places. i have never seen a price online with 3 decimal places.

  const apiUrl = 'https://api.ecommerce.com/products';

  let minPrice = 0;
  let maxPrice = 1000;

  let products = [];

  try {

    while (minPrice <= 100000 || maxPrice <= 100000) {

      const responseBatch = await axios.get(apiUrl, {
        params: { minPrice, maxPrice },

      });

      minPrice += 0.01;
      maxPrice += 0.01;

      products = products.push(responseBatch);
    }
  } catch (error) {
    console.error('an error occurred while scraping the products:', error.message);
  }

  return products;
}

scrapeProducts()
  .then(products => console.log(products))
  .catch(error => console.error('an error occurred:', error));
