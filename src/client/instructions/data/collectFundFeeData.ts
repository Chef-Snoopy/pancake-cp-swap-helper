import { sha256 } from 'js-sha256';
import { BN } from '@project-serum/anchor';
import * as borsh from '@coral-xyz/borsh';
import bs58 from 'bs58';

// Calculate the Discriminator (first 8 bytes)
function getDiscriminator(functionName: string): Buffer {
  const hash = sha256.digest(`global:${functionName}`);
  return Buffer.from(hash.slice(0, 8)); // Take the first 8 bytes
}

// Generate `instruction data`
function getCollectFundFeeData(amount0: number, amount1: number): { hex: string; base58: string } {
  const discriminator = getDiscriminator('collect_fund_fee');

  // Serialize parameters (two u64) using Borsh
  const schema = borsh.struct([borsh.u64('amount_0_requested'), borsh.u64('amount_1_requested')]);

  const buffer = Buffer.alloc(16); // u64 * 2 = 16 bytes
  schema.encode(
    {
      amount_0_requested: new BN(amount0),
      amount_1_requested: new BN(amount1),
    },
    buffer,
  );

  const instructionBuffer = Buffer.concat([discriminator, buffer]); // Concatenate Discriminator and parameters

  // Return both hex and base58 formats
  return {
    hex: instructionBuffer.toString('hex'),
    base58: bs58.encode(instructionBuffer),
  };
}

export default getCollectFundFeeData;

// Generate data
// const instructionData = getCollectFundFeeData(999, 99999);
// console.log("Hex:", instructionData.hex); // Hexadecimal format
// console.log("Base58:", instructionData.base58); // Base58 encoding
