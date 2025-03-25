# pancake-cp-swap-helper

## Environment Setup

Install dependencies using `yarn`:

```shell
yarn
```

## CLI Commands

This project provides a CLI tool for interacting with the CP swap helper. Use the following command to see available options:

```shell
yarn pcs_cp --help
```

### Command Index

- [1. `yarn pcs_cp amm_config_address`](#1-yarn-pcs_cp-amm_config_address)
- [2. `yarn pcs_cp amm_config`](#2-yarn-pcs_cp-amm_config)
- [3. `yarn pcs_cp pool_state_address`](#3-yarn-pcs_cp-pool_state_address)
- [4. `yarn pcs_cp pool_state`](#4-yarn-pcs_cp-pool_state)
- [5. `yarn pcs_cp pool_state_by_address`](#5-yarn-pcs_cp-pool_state_by_address)
- [6. `yarn pcs_cp collect_fund_fee_data`](#6-yarn-pcs_cp-collect_fund_fee_data)
- [7. `yarn pcs_cp collect_protocol_fee_data`](#7-yarn-pcs_cp-collect_protocol_fee_data)
- [8. `yarn pcs_cp get_user_token_account`](#8-yarn-pcs_cp-get_user_token_account)
- [9. `yarn pcs_cp sort_token_order`](#9-yarn-pcs_cp-sort_token_order)
- [10. `yarn pcs_cp authority_address`](#10-yarn-pcs_cp-authority_address)
- [11. `yarn pcs_cp create_amm_config_data`](#11-yarn-pcs_cp-create_amm_config_data)

### Available Commands

#### 1. `yarn pcs_cp amm_config_address`

- **Description**: Calculates the AMM Config Address for a given `programId` and `index`.
- **Usage**:
  ```shell
  yarn pcs_cp amm_config_address --programId <programId> --index <index>
  ```
- **Parameters**:

  - `--programId` (required): The Solana program ID for the AMM. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.
  - `--index` (optional): The index of the AMM configuration. Default: `0`.

- **Example**:

  ```shell
  yarn pcs_cp amm_config_address --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi --index 0
  ```

- **Output**:
  The command will return the AMM Config Address in Base58 format. Example:
  ```plaintext
  amm config address: 4cqiCu7pWjTrYz2x2JGDmCAtTcRZzCzZPhRmkrPunJsm
  ```

#### 2. `yarn pcs_cp amm_config`

- **Description**: Fetches the AMM configuration for a given `index` and `programId`.
- **Usage**:
  ```shell
  yarn pcs_cp amm_config --programId <programId> --index <index>
  ```
- **Parameters**:

  - `--programId` (required): The Solana program ID for the AMM. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.
  - `--index` (optional): The index of the AMM configuration. Default: `0`.

- **Example**:
  ```shell
  yarn pcs_cp amm_config --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi --index 0
  ```
#### 3. `yarn pcs_cp pool_state_address`

- **Description**: Calculates the pool state address for a given `programId`, `index`, and token mints.
- **Usage**:
  ```shell
  yarn pcs_cp pool_state_address --programId <programId> --index <index> --token0Mint <token0Mint> --token1Mint <token1Mint>
  ```
- **Parameters**:
  - `--programId` (required): The Solana program ID for the pool. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.
  - `--index` (required): The index of the pool. Example: `0`.
  - `--token0Mint` (required): The mint address of token0. Example: `HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj`.
  - `--token1Mint` (required): The mint address of token1. Example: `Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf`.

- **Example**:
  ```shell
  yarn pcs_cp pool_state_address --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi --index 0 --token0Mint HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj --token1Mint Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf
  ```

- **Output**:
  The command will return the pool state address and its bump value. Example:
  ```plaintext
  Pool State Address: CVp8wzY6VC7yqSeXjthRwn1R8qXAcctLY7tTibCC5mvH
  Bump: 254
  ```

#### 4. `yarn pcs_cp pool_state`

- **Description**: Fetches the pool state for a given `index`, `token0Mint`, `token1Mint`, and `programId`.
- **Usage**:
  ```shell
  yarn pcs_cp pool_state --programId <programId> --index <index> --t0 <token0Mint> --t1 <token1Mint>
  ```
- **Parameters**:

  - `--programId` (required): The Solana program ID for the pool. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.
  - `--index` (optional): The index of the AMM configuration. Default: `0`.
  - `--t0` (required): The mint address of the first token in the pool. Example: `HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj`.
  - `--t1` (required): The mint address of the second token in the pool. Example: `Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf`.

- **Example**:
  ```shell
  yarn pcs_cp pool_state --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi --index 0 --t0 HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj --t1 Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf
  ```
#### 5. `yarn pcs_cp pool_state_by_address`

- **Description**: Fetches the pool state information using a given pool state address.
- **Usage**:
  ```shell
  yarn pcs_cp pool_state_by_address --programId <programId> --address <poolStateAddress>
  ```
- **Parameters**:
  - `--programId` (required): The Solana program ID. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.
  - `--address` (required): The pool state address. Example: `CVp8wzY6VC7yqSeXjthRwn1R8qXAcctLY7tTibCC5mvH`.

- **Example**:
  ```shell
  yarn pcs_cp pool_state_by_address --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi --address CVp8wzY6VC7yqSeXjthRwn1R8qXAcctLY7tTibCC5mvH
  ```

#### 6. `yarn pcs_cp collect_fund_fee_data`

- **Description**: Generates instruction data for collecting fund fees with the specified amounts.
- **Usage**:
  ```shell
  yarn pcs_cp collect_fund_fee_data --amount0 <amount0> --amount1 <amount1>
  ```
- **Parameters**:

  - `--amount0` (required): The requested amount for token0. Example: `9`.
  - `--amount1` (required): The requested amount for token1. Example: `7`.

- **Example**:

  ```shell
  yarn pcs_cp collect_fund_fee_data --amount0 9 --amount1 7
  ```

- **Output**:
  The command will return the instruction data in both `hex` and `base58` formats. Example:
  ```plaintext
  Hex: 'a78a4e95dfc2067e09000000000000000700000000000000'
  Base58: 'GGsXmpU86JjxG5Ms9aAUPCJSw84SjvfgB'
  ```

#### 7. `yarn pcs_cp collect_protocol_fee_data`

- **Description**: Generates instruction data for collecting protocol fees with the specified amounts.
- **Usage**:
  ```shell
  yarn pcs_cp collect_protocol_fee_data --amount0 <amount0> --amount1 <amount1>
  ```
- **Parameters**:

  - `--amount0` (required): The requested amount for token0. Example: `9`.
  - `--amount1` (required): The requested amount for token1. Example: `7`.

- **Example**:

  ```shell
  yarn pcs_cp collect_protocol_fee_data --amount0 9 --amount1 7
  ```

- **Output**:
  The command will return the instruction data in both `hex` and `base58` formats. Example:
  ```plaintext
  Hex: '8888fcddc2427e5909000000000000000700000000000000'
  Base58: 'DSw1Ab12gjzNAFVfRrqoJeNn3o7irvEtf'
  ```

#### 8. `yarn pcs_cp get_user_token_account`

- **Description**: Retrieves the user's associated token account (ATA) for a given wallet address and token mint.
- **Usage**:
  ```shell
  yarn pcs_cp get_user_token_account --userAddress <userAddress> --tokenMintAddress <tokenMintAddress> [--isToken2022] [--allowOwnerOffCurve]
  ```
- **Parameters**:

  - `--userAddress` (required): The user's wallet address. Example: `Cf3AyfodkbVZcQdeLgSL6v1vabBXyrgcaj3Ntza3f5gP`.
  - `--tokenMintAddress` (required): The mint address of the token. Example: `2aA85X6B5QHESQHkwQmQ7Y9tqk43Lxf91523YoHfvvZz`.
  - `--isToken2022` (optional): Whether to use the Token 2022 program ID. Default: `false`.
  - `--allowOwnerOffCurve` (optional): Whether to allow owner off curve. Default: `false`.

- **Example**:

  ```shell
  yarn pcs_cp get_user_token_account --userAddress Cf3AyfodkbVZcQdeLgSL6v1vabBXyrgcaj3Ntza3f5gP --tokenMintAddress 2aA85X6B5QHESQHkwQmQ7Y9tqk43Lxf91523YoHfvvZz --isToken2022 true
  ```

- **Output**:
  The command will return the user's associated token account (ATA) address. Example:
  ```plaintext
  User token account: 3qjUVuqkQrGxkLzxEc4NTPECGnvUcrsDBFUarKe3tarP
  ```

#### 9. `yarn pcs_cp sort_token_order`

- **Description**: Sorts two token mint addresses (`token0` and `token1`) in order.
- **Usage**:
  ```shell
  yarn pcs_cp sort_token_order --t0 <token0Mint> --t1 <token1Mint>
  ```
- **Parameters**:

  - `--t0` (required): The mint address of the first token. Example: `HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj`.
  - `--t1` (required): The mint address of the second token. Example: `Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf`.

- **Example**:

  ```shell
  yarn pcs_cp sort_token_order --t0 HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj --t1 Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf
  ```

- **Output**:
  The command will return the sorted token addresses. Example:
  ```plaintext
  Sorted tokens:
  token0: Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf
  token1: HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj
  ```

#### 10. `yarn pcs_cp authority_address`

- **Description**: Retrieves the authority address for a given program ID.
- **Usage**:
  ```shell
  yarn pcs_cp authority_address --programId <programId>
  ```
- **Parameters**:

  - `--programId` (required): The Solana program ID. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.

- **Example**:

  ```shell
  yarn pcs_cp authority_address --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi
  ```

- **Output**:
  The command will return the authority address and its bump value. Example:
  ```plaintext
  Authority Address: DMniUUFG7jkXg8dAoWZwbcf2AiYFtYMvKNmdj9CVBaXw
  Bump: 255
  ```

#### 11. `yarn pcs_cp create_amm_config_data`

   - **Description**: Generates raw instruction data for creating an AMM config.
   - **Usage**:
     ```shell
     yarn pcs_cp create_amm_config_data --index <index> --tradeFeeRate <tradeFeeRate> --protocolFeeRate <protocolFeeRate> --fundFeeRate <fundFeeRate> --createPoolFee <createPoolFee>
     ```
   - **Parameters**:
     - `--index` (required): The index of the AMM config. Example: `2`.
     - `--tradeFeeRate` (required): The trade fee rate. Example: `20000` , 2%.
     - `--protocolFeeRate` (required): The protocol fee rate. Example: `120000`, 12%.
     - `--fundFeeRate` (required): The fund fee rate. Example: `40000`, 4%.
     - `--createPoolFee` (required): The fee for creating a pool. Example: `8880000`.

   - **Example**:
     ```shell
     yarn pcs_cp create_amm_config_data --index 0 --tradeFeeRate 20000 --protocolFeeRate 120000 --fundFeeRate 40000 --createPoolFee 8880000
     ```

   - **Output**:
     The command will return the raw instruction data in both hex and base58 formats. Example:
     ```plaintext
     Instruction Data (Hex): 8934edd4d7756c680000204e000000000000c0d4010000000000409c000000000000807f870000000000
     Instruction Data (Base58): 3HpFwckDLu4anrc3VTv9gPYMcfE6SB4n2YZJ1EBHhAH3WLydoiHJ5BWrPy
     ```

### Notes

- Replace the query parameters (`programId`, `index`, `t0`, `t1`, `amount0`, `amount1`) with appropriate values as needed.
- Use `yarn pcs_cp --help` to see all available commands and options.
