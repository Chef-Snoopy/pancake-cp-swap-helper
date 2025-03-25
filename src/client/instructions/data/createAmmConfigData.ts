import { sha256 } from 'js-sha256';
import { BN } from '@project-serum/anchor';
import * as borsh from '@coral-xyz/borsh';
import bs58 from 'bs58';

// Calculate the Discriminator (first 8 bytes)
function getDiscriminator(functionName: string): Buffer {
  const hash = sha256.digest(`global:${functionName}`);
  return Buffer.from(hash.slice(0, 8)); // Take the first 8 bytes
}

// Generate `instruction data` for create_amm_config
function getCreateAmmConfigData(
  index: number,
  tradeFeeRate: number,
  protocolFeeRate: number,
  fundFeeRate: number,
  createPoolFee: number,
): { hex: string; base58: string } {
  const discriminator = getDiscriminator('create_amm_config');

  // Serialize parameters using Borsh
  const schema = borsh.struct([
    borsh.u16('index'), // u16 for index
    borsh.u64('trade_fee_rate'), // u64 for trade fee rate
    borsh.u64('protocol_fee_rate'), // u64 for protocol fee rate
    borsh.u64('fund_fee_rate'), // u64 for fund fee rate
    borsh.u64('create_pool_fee'), // u64 for create pool fee
  ]);

  const buffer = Buffer.alloc(34); // u16 + u64 * 4 = 34 bytes
  schema.encode(
    {
      index: index,
      trade_fee_rate: new BN(tradeFeeRate),
      protocol_fee_rate: new BN(protocolFeeRate),
      fund_fee_rate: new BN(fundFeeRate),
      create_pool_fee: new BN(createPoolFee),
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

export default getCreateAmmConfigData;

// Example usage
// const instructionData = getCreateAmmConfigData(2, 20000, 120000, 40000, 8880000);
// console.log('Hex:', instructionData.hex); // Hexadecimal format
// console.log('Base58:', instructionData.base58); // Base58 encoding