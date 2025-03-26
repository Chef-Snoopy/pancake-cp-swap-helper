import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

function convertJsonValues(input: Record<string, any>): Record<string, any> {
  const output: Record<string, any> = {};

  for (const key in input) {
    const value = input[key];

    if (value instanceof PublicKey) {
      // Convert PublicKey to string
      output[key] = value.toBase58();
    } else if (value instanceof BN) {
      // Convert BN to string
      output[key] = value.toString();
    } else {
      // Keep other values as is
      output[key] = value;
    }
  }

  return output;
}

export default convertJsonValues;
