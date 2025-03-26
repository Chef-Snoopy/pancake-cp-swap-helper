const { PublicKey } = require('@solana/web3.js');

function decodeSwapEvent(base58Data: string) {
  // Convert Base58 to Buffer
  const buffer = Buffer.from(base58Data, 'base64');

  // Convert Buffer to Hex
  const hexData = buffer.toString('hex');

  // Extract the header (first 16 bytes) and convert to Base58
  const headerHex = hexData.slice(0, 16); // First 16 bytes in hex
  const headerBuffer = Buffer.from(headerHex, 'hex');
  const headerBase58 = headerBuffer.toString('base64');
  console.log('Header Base58:', headerBase58);

  // Remove the header and parse the remaining data
  const remainingHex = hexData.slice(16); // Remove the first 16 bytes
  const remainingBuffer = Buffer.from(remainingHex, 'hex');

  return parseSwapEvent(remainingBuffer);
}

function parseSwapEvent(data: Buffer) {
  let offset = 0;

  // Parse pool_id (Pubkey, 32 bytes)
  const poolId = new PublicKey(data.slice(offset, offset + 32));
  offset += 32;

  // Parse u64 values (little-endian)
  const inputVaultBefore = Number(data.readBigUInt64LE(offset));
  offset += 8;
  const outputVaultBefore = Number(data.readBigUInt64LE(offset));
  offset += 8;
  const inputAmount = Number(data.readBigUInt64LE(offset));
  offset += 8;
  const outputAmount = Number(data.readBigUInt64LE(offset));
  offset += 8;
  const inputTransferFee = Number(data.readBigUInt64LE(offset));
  offset += 8;
  const outputTransferFee = Number(data.readBigUInt64LE(offset));
  offset += 8;

  // Parse base_input (bool, 1 byte)
  const baseInput = data.readUInt8(offset) !== 0;

  // Return parsed event
  return {
    pool_id: poolId.toBase58(),
    input_vault_before: inputVaultBefore,
    output_vault_before: outputVaultBefore,
    input_amount: inputAmount,
    output_amount: outputAmount,
    input_transfer_fee: inputTransferFee,
    output_transfer_fee: outputTransferFee,
    base_input: baseInput,
  };
}

export default decodeSwapEvent;

// Example usage
// const base58Data = "QMbN6CYIceKt1WaadvnRftWwjq0xrsqHkuBLfHBm8q08bvmU05ns2g+eq4zRAAAAD56rjNEAAABA4gEAAAAAAArhAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAE=";
// const decodedEvent = decodeSwapEvent(base58Data);
// console.log("Decoded Event:", decodedEvent);
