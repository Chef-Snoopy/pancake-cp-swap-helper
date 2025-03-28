#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import getPoolAccountKey from '../client/instructions/getPoolId';
import getPoolState from '../client/instructions/getPoolState';
import getAmmConfig from '../client/instructions/getAmmConfig';
import getCollectFundFeeData from '../client/instructions/data/collectFundFeeData';
import getCollectProtocolFeeData from '../client/instructions/data/collectProtocolFeeData';
import getAmmConfigAddressByIndex from '../client/instructions/getAmmConfigAddress';
import getUserTokenAccount from '../client/utils/getUserTokenAccount';
import getAuthorityAddress from '../client/instructions/getAuthorityAddress';
import getCreateAmmConfigData from '../client/instructions/data/createAmmConfigData';
import collectFundFee from '../client/instructions/collectFundFee';
import collectProtocolFee from '../client/instructions/collectProtocolFee';
import decodeSwapEvent from '../client/event/decodeSwapEvent';
import getSwapLogAndEvent from '../client/event/getSwapLogAndEvent';
import getPoolStateList from '../client/instructions/getPoolStateList';
import getUserTokenAccountInfo from '../client/instructions/getTokenAccountInfo';

yargs(hideBin(process.argv))
  .scriptName('pcs_cp')
  .usage('$0 <cmd> [args]')
  .command(
    'amm_config_address',
    'Calculate AMM Config Address',
    (yargs) =>
      yargs
        .option('programId', { type: 'string', describe: 'Program ID' })
        .option('index', { type: Number, default: 0, describe: 'Amm Config Index' }),
    async (argv) => {
      console.log('get pool state...');
      console.log('id:', argv.programId);
      console.log('index:', argv.index);

      const programId = new PublicKey(argv.programId as string);
      const index = parseInt(argv.index as string, 10);

      const [ammConfigAddress, bump] = await getAmmConfigAddressByIndex(programId, index);
      console.log('amm config address:', ammConfigAddress.toBase58());
    },
  )
  .command(
    'authority_address',
    'Get the authority address for a given program ID',
    (yargs) =>
      yargs.option('programId', {
        type: 'string',
        describe: 'The program ID',
        demandOption: true,
      }),
    async (argv) => {
      console.log('Fetching authority address...');
      console.log('programId:', argv.programId);

      const programId = new PublicKey(argv.programId as string);
      const [authorityAddress, bump] = await getAuthorityAddress(programId);

      console.log('Authority Address:', authorityAddress.toBase58());
      console.log('Bump:', bump);
    },
  )
  .command(
    'pool_state_address',
    'Calculate the pool state address for a given program ID, index, and token mints',
    (yargs) =>
      yargs
        .option('programId', {
          type: 'string',
          describe: 'The program ID',
          demandOption: true,
        })
        .option('index', {
          type: 'number',
          describe: 'The index of the pool',
          demandOption: true,
        })
        .option('token0Mint', {
          type: 'string',
          describe: 'The mint address of token0',
          demandOption: true,
        })
        .option('token1Mint', {
          type: 'string',
          describe: 'The mint address of token1',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Calculating pool state address...');
      console.log('programId:', argv.programId);
      console.log('index:', argv.index);
      console.log('token0Mint:', argv.token0Mint);
      console.log('token1Mint:', argv.token1Mint);

      const programId = new PublicKey(argv.programId as string);
      const index = argv.index as number;
      let token0Mint = new PublicKey(argv.token0Mint as string);
      let token1Mint = new PublicKey(argv.token1Mint as string);

      // Ensure tokens are sorted lexicographically
      const isSorted = new BN(token0Mint.toBuffer()).lte(new BN(token1Mint.toBuffer()));
      if (!isSorted) {
        [token0Mint, token1Mint] = [token1Mint, token0Mint];
      }
      const [poolAccountKey, bump] = await getPoolAccountKey(
        programId,
        index,
        token0Mint,
        token1Mint,
      );

      console.log('Pool State Address:', poolAccountKey.toBase58());
      console.log('Bump:', bump);
    },
  )
  .command(
    'pool_state',
    'Get Pool State Information',
    (yargs) =>
      yargs
        .option('programId', { type: 'string', describe: 'Program ID' })
        .option('index', { type: Number, default: 0, describe: 'Amm Config Index' })
        .option('t0', { type: 'string', describe: 'token0 mint address' })
        .option('t1', { type: 'string', describe: 'token1 mint address' }),
    async (argv) => {
      console.log('get pool state...');
      console.log('id:', argv.programId);
      console.log('index:', argv.index);
      console.log('t0:', argv.t0);
      console.log('t1:', argv.t1);

      const programId = new PublicKey(argv.programId as string);
      const index = parseInt(argv.index as string, 10);
      let token0Mint = new PublicKey(argv.t0 as string);
      let token1Mint = new PublicKey(argv.t1 as string);

      const isSorted = new BN(token0Mint.toBuffer()).lte(new BN(token1Mint.toBuffer()));
      if (!isSorted) {
        [token0Mint, token1Mint] = [token1Mint, token0Mint];
      }

      const [poolAccountKey, bump] = await getPoolAccountKey(
        programId,
        index,
        token0Mint,
        token1Mint,
      );
      const poolState = await getPoolState(programId, poolAccountKey);
      console.log('pool state:', poolState);
    },
  )
  .command(
    'pool_state_by_address',
    'Get Pool State Information from Pool State Address',
    (yargs) =>
      yargs
        .option('programId', { type: 'string', describe: 'Program ID' })
        .option('address', { type: 'string', describe: 'Pool State Address' }),
    async (argv) => {
      console.log('get pool state...');
      console.log('id:', argv.programId);
      console.log('address:', argv.address);

      const programId = new PublicKey(argv.programId as string);
      const poolStateAddress = new PublicKey(argv.address as string);

      const poolState = await getPoolState(programId, poolStateAddress);
      console.log('pool state:', poolState);
    },
  )
  .command(
    'amm_config',
    'Get AMM Config Information',
    (yargs) =>
      yargs
        .option('programId', { type: 'string', describe: 'Program ID' })
        .option('index', { type: Number, default: 0, describe: 'Amm Config Index' }),
    async (argv) => {
      console.log('get amm config...');
      console.log('id:', argv.programId);
      console.log('index:', argv.index);

      const programId = new PublicKey(argv.programId as string);
      const index = parseInt(argv.index as string, 10);

      const ammConfig = await getAmmConfig(programId, index);
      console.log('amm config:', ammConfig);
    },
  )
  .command(
    'collect_fund_fee_data',
    'Collect Fund Fee Instruction Data',
    (yargs) =>
      yargs
        .option('amount0', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_0 to send, can be 0 to collect fees in only token_1',
        })
        .option('amount1', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_1 to send, can be 0 to collect fees in only token_0',
        }),
    async (argv) => {
      console.log('collect fund fee data...');
      console.log('amount0:', argv.amount0);
      console.log('amount1:', argv.amount1);

      const data = await getCollectFundFeeData(argv.amount0, argv.amount1);
      console.log('data:', data);
    },
  )
  .command(
    'collect_protocol_fee_data',
    'Collect Protocol Fee Instruction Data',
    (yargs) =>
      yargs
        .option('amount0', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_0 to send, can be 0 to collect fees in only token_1',
        })
        .option('amount1', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_1 to send, can be 0 to collect fees in only token_0',
        }),
    async (argv) => {
      console.log('collect protocol fee data...');
      console.log('amount0:', argv.amount0);
      console.log('amount1:', argv.amount1);

      const data = await getCollectProtocolFeeData(argv.amount0, argv.amount1);
      console.log('data:', data);
    },
  )
  .command(
    'get_user_token_account',
    "Get the user's associated token account (ATA)",
    (yargs) =>
      yargs
        .option('userAddress', {
          type: 'string',
          describe: 'User wallet address',
          demandOption: true,
        })
        .option('tokenMintAddress', {
          type: 'string',
          describe: 'Token mint address',
          demandOption: true,
        })
        .option('isToken2022', {
          type: 'boolean',
          default: false,
          describe: 'Whether to use Token 2022 program ID',
        })
        .option('allowOwnerOffCurve', {
          type: 'boolean',
          default: false,
          describe: 'Allow owner off curve',
        }),
    async (argv) => {
      console.log('get user token account...');
      console.log('userAddress:', argv.userAddress);
      console.log('tokenMintAddress:', argv.tokenMintAddress);
      console.log('isToken2022:', argv.isToken2022);
      console.log('allowOwnerOffCurve:', argv.allowOwnerOffCurve);

      const tokenAccount = await getUserTokenAccount(
        argv.userAddress as string,
        argv.tokenMintAddress as string,
        argv.isToken2022 as boolean,
        argv.allowOwnerOffCurve as boolean,
      );

      console.log('User token account:', tokenAccount);
    },
  )
  .command(
    'sort_token_order',
    'Sort token0 and token1 addresses',
    (yargs) =>
      yargs
        .option('t0', {
          type: 'string',
          describe: 'The mint address of first token',
          demandOption: true,
        })
        .option('t1', {
          type: 'string',
          describe: 'The mint address of second token',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Sorting tokens...');
      console.log('first token:', argv.t0);
      console.log('second:', argv.t1);

      let token0Mint = new PublicKey(argv.t0 as string);
      let token1Mint = new PublicKey(argv.t1 as string);

      const isSorted = new BN(token0Mint.toBuffer()).lte(new BN(token1Mint.toBuffer()));
      if (!isSorted) {
        [token0Mint, token1Mint] = [token1Mint, token0Mint];
      }

      console.log('Sorted tokens:');
      console.log('token0:', token0Mint.toBase58());
      console.log('token1:', token1Mint.toBase58());
    },
  )
  .command(
    'create_amm_config_data',
    'Generate raw instruction data for creating an AMM config',
    (yargs) =>
      yargs
        .option('index', {
          type: 'number',
          describe: 'The index of the AMM config',
          demandOption: true,
        })
        .option('tradeFeeRate', {
          type: 'number',
          describe: 'The trade fee rate',
          demandOption: true,
        })
        .option('protocolFeeRate', {
          type: 'number',
          describe: 'The protocol fee rate',
          demandOption: true,
        })
        .option('fundFeeRate', {
          type: 'number',
          describe: 'The fund fee rate',
          demandOption: true,
        })
        .option('createPoolFee', {
          type: 'number',
          describe: 'The fee for creating a pool',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Generating create AMM config data...');
      console.log('index:', argv.index);
      console.log('tradeFeeRate:', argv.tradeFeeRate);
      console.log('protocolFeeRate:', argv.protocolFeeRate);
      console.log('fundFeeRate:', argv.fundFeeRate);
      console.log('createPoolFee:', argv.createPoolFee);

      const data = getCreateAmmConfigData(
        argv.index,
        argv.tradeFeeRate,
        argv.protocolFeeRate,
        argv.fundFeeRate,
        argv.createPoolFee,
      );

      console.log('Instruction Data (Hex):', data.hex);
      console.log('Instruction Data (Base58):', data.base58);
    },
  )
  .command(
    'collect_fund_fee',
    'Collect fund fees from a pool',
    (yargs) =>
      yargs
        .option('programId', {
          type: 'string',
          describe: 'The program ID',
          demandOption: true,
        })
        .option('poolState', {
          type: 'string',
          describe: 'The pool state address',
          demandOption: true,
        })
        .option('recipientToken0Account', {
          type: 'string',
          describe: 'The recipient token0 account address',
          demandOption: true,
        })
        .option('recipientToken1Account', {
          type: 'string',
          describe: 'The recipient token1 account address',
          demandOption: true,
        })
        .option('amount0Requested', {
          type: 'number',
          describe: 'The amount of token0 requested',
          demandOption: true,
        })
        .option('amount1Requested', {
          type: 'number',
          describe: 'The amount of token1 requested',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Collecting fund fees...');
      console.log('programId:', argv.programId);
      console.log('poolState:', argv.poolState);
      console.log('recipientToken0Account:', argv.recipientToken0Account);
      console.log('recipientToken1Account:', argv.recipientToken1Account);
      console.log('amount0Requested:', argv.amount0Requested);
      console.log('amount1Requested:', argv.amount1Requested);

      const programId = new PublicKey(argv.programId as string);
      const poolState = new PublicKey(argv.poolState as string);
      const recipientToken0Account = new PublicKey(argv.recipientToken0Account as string);
      const recipientToken1Account = new PublicKey(argv.recipientToken1Account as string);
      const amount0Requested = argv.amount0Requested as number;
      const amount1Requested = argv.amount1Requested as number;

      try {
        const tx = await collectFundFee(
          programId,
          poolState,
          recipientToken0Account,
          recipientToken1Account,
          amount0Requested,
          amount1Requested,
        );
        console.log('Transaction signature:', tx);
      } catch (error) {
        console.error('Error collecting fund fee:', error);
      }
    },
  )
  .command(
    'collect_protocol_fee',
    'Collect protocol fees from a pool',
    (yargs) =>
      yargs
        .option('programId', {
          type: 'string',
          describe: 'The program ID',
          demandOption: true,
        })
        .option('poolState', {
          type: 'string',
          describe: 'The pool state address',
          demandOption: true,
        })
        .option('recipientToken0Account', {
          type: 'string',
          describe: 'The recipient token0 account address',
          demandOption: true,
        })
        .option('recipientToken1Account', {
          type: 'string',
          describe: 'The recipient token1 account address',
          demandOption: true,
        })
        .option('amount0Requested', {
          type: 'number',
          describe: 'The amount of token0 requested',
          demandOption: true,
        })
        .option('amount1Requested', {
          type: 'number',
          describe: 'The amount of token1 requested',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Collecting protocol fees...');
      console.log('programId:', argv.programId);
      console.log('poolState:', argv.poolState);
      console.log('recipientToken0Account:', argv.recipientToken0Account);
      console.log('recipientToken1Account:', argv.recipientToken1Account);
      console.log('amount0Requested:', argv.amount0Requested);
      console.log('amount1Requested:', argv.amount1Requested);

      const programId = new PublicKey(argv.programId as string);
      const poolState = new PublicKey(argv.poolState as string);
      const recipientToken0Account = new PublicKey(argv.recipientToken0Account as string);
      const recipientToken1Account = new PublicKey(argv.recipientToken1Account as string);
      const amount0Requested = argv.amount0Requested as number;
      const amount1Requested = argv.amount1Requested as number;

      try {
        const tx = await collectProtocolFee(
          programId,
          poolState,
          recipientToken0Account,
          recipientToken1Account,
          amount0Requested,
          amount1Requested,
        );
        console.log('Transaction signature:', tx);
      } catch (error) {
        console.error('Error collecting protocol fee:', error);
      }
    },
  )
  .command(
    'decode_swap_event',
    'Decode SwapEvent Program Data',
    (yargs) =>
      yargs.option('data', {
        type: 'string',
        describe: 'The SwapEvent Program Data in Base58 format',
        demandOption: true,
      }),
    async (argv) => {
      console.log('Decoding SwapEvent Program Data...');
      console.log('data:', argv.data);

      try {
        const base58Data = argv.data as string;

        const decodedEvent = decodeSwapEvent(base58Data);

        console.log('Decoded Swap Event:', decodedEvent);
      } catch (error) {
        console.error('Error decoding SwapEvent Program Data:', error);
      }
    },
  )
  .command(
    'get_swap_event',
    'Fetch and decode SwapEvent logs and events',
    (yargs) =>
      yargs
        .option('programId', {
          type: 'string',
          describe: 'The program ID',
          demandOption: true,
        })
        .option('signature', {
          type: 'string',
          describe: 'The transaction signature',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Fetching and decoding SwapEvent logs and events...');
      console.log('programId:', argv.programId);
      console.log('signature:', argv.signature);

      try {
        const programId = argv.programId;
        const signature = argv.signature as string;

        const swapLogAndEvent = await getSwapLogAndEvent(programId, signature);

        console.log('Swap Log and Event:', swapLogAndEvent);
      } catch (error) {
        console.error('Error fetching SwapEvent logs and events:', error);
      }
    },
  )
  .command(
    'get_pool_state_list',
    'Fetch and display all pool states for a given program ID',
    (yargs) =>
      yargs.option('programId', {
        type: 'string',
        describe: 'The program ID',
        demandOption: true,
      }),
    async (argv) => {
      try {
        const programId = new PublicKey(argv.programId as string);

        const poolStateList = await getPoolStateList(programId);
        console.log(poolStateList);
      } catch (error) {
        console.error('Error fetching pool states:', error);
      }
    },
  )
  .command(
    'token_account_info',
    'Fetch and display information about a specific token account',
    (yargs) =>
      yargs
        .option('tokenAccount', {
          type: 'string',
          describe: 'The token account address',
          demandOption: true,
        })
        .option('isToken2022', {
          type: 'boolean',
          default: false,
          describe: 'Whether the token account uses the Token 2022 program',
        }),
    async (argv) => {
      console.log('Fetching token account information...');
      console.log('tokenAccount:', argv.tokenAccount);
      console.log('isToken2022:', argv.isToken2022);

      try {
        const tokenAccountInfo = await getUserTokenAccountInfo(
          argv.tokenAccount as string,
          argv.isToken2022 as boolean,
        );

        console.log('Token Account Info:', tokenAccountInfo);
      } catch (error) {
        console.error('Error fetching token account information:', error);
      }
    },
  )
  .help().argv;
