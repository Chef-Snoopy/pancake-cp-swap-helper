# pancake-pcs_cp-helper

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

### Available Commands

1. **`yarn pcs_cp amm_config`**

   - **Description**: Fetches the AMM configuration for a given `index` and `programId`.
   - **Usage**:
     ```shell
     yarn pcs_cp amm_config --index <index> --programId <programId>
     ```
   - **Parameters**:

     - `--index` (required): The index of the AMM configuration. Example: `0`.
     - `--programId` (required): The Solana program ID for the AMM. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.

   - **Example**:
     ```shell
     yarn pcs_cp amm_config --index 0 --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi
     ```

2. **`yarn pcs_cp pool_state`**

   - **Description**: Fetches the pool state for a given `index`, `token0Mint`, `token1Mint`, and `programId`.
   - **Usage**:
     ```shell
     yarn pcs_cp pool_state --index <index> --t0 <token0Mint> --t1 <token1Mint> --programId <programId>
     ```
   - **Parameters**:

     - `--index` (required): The index of the pool. Example: `0`.
     - `--t0` (required): The mint address of the first token in the pool. Example: `HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj`.
     - `--t1` (required): The mint address of the second token in the pool. Example: `Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf`.
     - `--programId` (required): The Solana program ID for the pool. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.

   - **Example**:
     ```shell
     yarn pcs_cp pool_state --index 0 --t0 HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj --t1 Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi
     ```

3. **`yarn pcs_cp collect_fund_fee_data`**

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
     Hex: 1234567890abcdef1234567890abcdef
     Base58: 3vQB7B6MrGQZaxCuFg4oh
     ```

4. **`yarn pcs_cp collect_protocol_fee_data`**

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
     Hex: abcdef1234567890abcdef1234567890
     Base58: 4vQB7B6MrGQZaxCuFg4oh
     ```

### Notes

- Replace the query parameters (`index`, `programId`, `token0Mint`, `token1Mint`, `amount0`, `amount1`) with appropriate values as needed.
- Use `yarn pcs_cp --help` to see all available commands and options.