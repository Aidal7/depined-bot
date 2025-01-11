import axios from 'axios';
const BASE_URL = 'https://api.depined.org/api';
import * as readline from 'readline';

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const inputToken = (query) => {
  return new Promise((resolve) =>
    readLine.question(query, (answer) => resolve(answer))
  );
};
const ping = async (token) => {
  const headers = {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    Authorization: `Bearer ${token}`,
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'application/json',
    Host: 'api.depined.org',
    Origin: 'chrome-extension://pjlappmodaidbdjhmhifbnnmmkkicjoc',
    Pragma: 'no-cache',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'none',
    'Sec-Gpc': '1',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/user/widget-connect`,
      { connected: true },
      { headers }
    );
    console.log('ping', res.data);
  } catch (error) {
    console.error('failed to ping', error.message);
    if (error.code === 'ECONNABORTED') {
      console.log('Request timed out');
    } else if (error.response) {
      console.log('Error response:', error.response.data);
    }
  }
};

(async () => {
  const main = async () => {
    const token = await inputToken('enter your token: :');

    while (true) {
      ping(token);
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }
  };
  main();
})();
