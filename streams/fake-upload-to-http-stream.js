import { Readable } from 'node:stream';
import http from 'http';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buffer = Buffer.from(`${i}\n`, 'utf-8');
        this.push(buffer);
      }
    }, 1000);
  }
}

const url = 'http://localhost:3334/';

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
};

const request =  http.request(url, options, (response) => {
    console.log('Response status:', response.data);
});

const oneToHundredStream = new OneToHundredStream();

oneToHundredStream.pipe(request);

// Optional: Handle errors and the end of the response
request.on('error', (error) => {
  console.error('Request error:', error);
});

request.on('end', () => {
  console.log('Request completed.');
});
