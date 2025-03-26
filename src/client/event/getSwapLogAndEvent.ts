import { Connection, PublicKey } from '@solana/web3.js';
import { decode } from 'punycode';
import provider from '../utils/getProvider';
import decodeSwapEvent from './decodeSwapEvent';

const connection = provider.connection;

async function getSwapLogAndEvent(programId: string, txSignature: string) {
  const tx = await connection.getTransaction(txSignature, { commitment: 'finalized' });

  if (!tx) {
    console.log('Transaction not found.');
    return;
  }

  if (tx.meta && tx.meta.logMessages) {
    console.log('Transaction Logs:');

    let shouldPrint = false; // Flag to determine whether to start printing logs
    for (const log of tx.meta.logMessages) {
      // Check if the log contains the specified programId
      if (log.includes(`Program ${programId} invoke [1]`)) {
        console.log(`Found programId: ${programId}`);
        shouldPrint = true; // Start printing subsequent logs
      }

      if (shouldPrint) {
        console.log(log);

        // If the log contains "Program data:", extract and print the data
        if (log.includes('Program data:')) {
          const base64Data = log.split('Program data: ')[1]; // Extract Base64 data
          let decodedData = decodeSwapEvent(base64Data);
          console.log('SwapEvent Data:', decodedData);

          // Stop processing further logs
          break;
        }
      }
    }
  } else {
    console.log('No logs found.');
  }
}
export default getSwapLogAndEvent;

// example usage
// getSwapLogAndEvent(
//   'ByX8vTQDfMuTi8Th66LpXtXeTcRkg4CWfXcr6mRhdXi4',
//   '2wNfe41Q9bLZmcfUFFDzHAcavFWM8FRr9Kii3ZEzYsvt76ewB5g98hR3wkA9jnFJk9ZVGrMrFYnm9D6SuBhmBeuu',
// );
