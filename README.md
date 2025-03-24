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
     yarn pcs_cp pool_state --index <index> --token0Mint <token0Mint> --token1Mint <token1Mint> --programId <programId>
     ```
   - **Parameters**:

     - `--index` (required): The index of the pool. Example: `0`.
     - `--token0Mint` (required): The mint address of the first token in the pool. Example: `HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj`.
     - `--token1Mint` (required): The mint address of the second token in the pool. Example: `Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf`.
     - `--programId` (required): The Solana program ID for the pool. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.

   - **Example**:
     ```shell
     yarn pcs_cp pool_state --index 0 --token0Mint HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj --token1Mint Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf --programId 7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi
     ```

### Notes

- Replace the query parameters (`index`, `programId`, `token0Mint`, `token1Mint`) with appropriate values as needed.
- Use `yarn pcs_cp --help` to see all available commands and options.
