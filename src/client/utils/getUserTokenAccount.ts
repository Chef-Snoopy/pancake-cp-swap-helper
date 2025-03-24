import { PublicKey } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

async function getUserTokenAccount(
  userAddress: string,
  tokenMintAddress: string,
  isToken2022 = false,
  allowOwnerOffCurve = false,
) {
  // User wallet address (Owner)
  const ownerPublicKey = new PublicKey(userAddress);

  // Token Mint address
  const mintPublicKey = new PublicKey(tokenMintAddress);

  // Get the user's Associated Token Account (ATA)
  const tokenAccount = await getAssociatedTokenAddress(
    mintPublicKey, // The Mint address of the token
    ownerPublicKey, // The user's wallet address
    allowOwnerOffCurve, // If `true`, indicates ATA is a PDA, usually set to `false`
    isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID, // Whether to use Token 2022 program ID
  );

  return tokenAccount.toBase58(); // Return the readable address string
}

export default getUserTokenAccount;

// Example usage
// const userAddress = "Cf3AyfodkbVZcQdeLgSL6v1vabBXyrgcaj3Ntza3f5gP"; // Example user address
// const tokenMintAddress = "2aA85X6B5QHESQHkwQmQ7Y9tqk43Lxf91523YoHfvvZz"; // Example token Mint address

// getUserTokenAccount(userAddress, tokenMintAddress, true).then(tokenAccount => {
//     console.log("User's Token Account Address:", tokenAccount);
// });
