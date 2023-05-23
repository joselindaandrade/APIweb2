const http = require('http');
const https = require('https');

const apiKey = 'live_kdBlm5vjAoHGpp1yofEFW8lc1LEfkDitnLAi4mwHcyOymQVozOVyo0ei9gvcLl1j'; // Replace 'YOUR_API_KEY' with your actual API key

const options = {
  headers: {
    'x-api-key': apiKey
  }
};

https.get('https://api.thedogapi.com/v1/breeds', options, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    const breeds = JSON.parse(data);
    
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      breeds.forEach((breed) => {
        res.write(`<h1>${breed.name}</h1>`);
        res.write(`<img src="${breed.image.url}" alt="${breed.name}"/>`);
        res.write(`<p>${breed.life_span}</p>`);
      });

      res.end();
    });

    server.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
