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
- [3. `yarn pcs_cp pool_state`](#3-yarn-pcs_cp-pool_state)
- [4. `yarn pcs_cp collect_fund_fee_data`](#4-yarn-pcs_cp-collect_fund_fee_data)
- [5. `yarn pcs_cp collect_protocol_fee_data`](#5-yarn-pcs_cp-collect_protocol_fee_data)
- [6. `yarn pcs_cp get_user_token_account`](#6-yarn-pcs_cp-get_user_token_account)
- [7. `yarn pcs_cp sort_token_order`](#7-yarn-pcs_cp-sort_token_order)
- [8. `yarn pcs_cp authority_address`](#8-yarn-pcs_cp-authority_address)

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

#### 3. `yarn pcs_cp pool_state`

- **Description**: Fetches the pool state for a given `index`, `token0Mint`, `token1Mint`, and `programId`.
- **Usage**:
  ```shell
  yarn pcs_cp pool_state --programId <programId> --index <index> --t0 <token0Mint> --t1 <token1Mint>
  ```
- **Parameters**:

  - `--programId` (required): The Solana program ID for the pool. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.
  - `--index` (optional): The index of the pool. Default: `0`.
  - `--t0` (required): The mint address of the first token in the pool. Example: `HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj`.
  - `--t1` (required): The mint address of the second token in the pool. Example: `Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf`.

- **Example**:
  ```shell
  yarn pcs_cp pool_state --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi --index 0 --t0 HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj --t1 Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf
  ```

#### 4. `yarn pcs_cp collect_fund_fee_data`

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

#### 5. `yarn pcs_cp collect_protocol_fee_data`

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

#### 6. `yarn pcs_cp get_user_token_account`

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

#### 7. `yarn pcs_cp sort_token_order`

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

#### 8. `yarn pcs_cp authority_address`

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

### Notes

- Replace the query parameters (`programId`, `index`, `t0`, `t1`, `amount0`, `amount1`) with appropriate values as needed.
- Use `yarn pcs_cp --help` to see all available commands and options.
