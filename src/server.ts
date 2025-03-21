import express, { Request, Response } from 'express';
import { PublicKey } from '@solana/web3.js';
import getPoolAccountKey from './client/instructions/getPoolId';
import getPoolState from './client/instructions/getPoolState';
import getAmmConfig from './client/instructions/getAmmConfig';

const app = express();
const PORT = 3066;

// 中间件
app.use(express.json());

// 路由
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express + TypeScript!');
});

app.get('/pool_state', async (req: Request, res: Response) => {
  try {
    const programId = new PublicKey(req.query.programId as string);
    const index = parseInt(req.query.index as string, 10);
    let token0Mint = new PublicKey(req.query.token0Mint as string);
    let token1Mint = new PublicKey(req.query.token1Mint as string);

    if (token0Mint.toBase58() > token1Mint.toBase58()) {
      [token0Mint, token1Mint] = [token1Mint, token0Mint];
    }

    const [poolAccountKey, bump] = await getPoolAccountKey(
      programId,
      index,
      token0Mint,
      token1Mint,
    );
    const poolState = await getPoolState(programId, poolAccountKey);

    // Convert JSON to HTML table
    const tableRows = Object.entries(poolState)
      .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
      .join('');
    const htmlTable = `
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

    res.send(htmlTable);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

app.get('/amm_config', async (req: Request, res: Response) => {
  try {
    const programId = new PublicKey(req.query.programId as string);
    const index = parseInt(req.query.index as string, 10);
    const ammConfig = await getAmmConfig(programId, index);
    const tableRows = Object.entries(ammConfig)
      .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
      .join('');
    const htmlTable = `
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

    res.send(htmlTable);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
