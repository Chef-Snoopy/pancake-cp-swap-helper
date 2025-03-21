# pancake-cp-swap-helper

## Environment Setup

```shell
yarn
```

## Quickstart

```shell
yarn dev
```

## How To Use

You can get CP swap information by accessing the following endpoints:

### Endpoints

1. **Get AMM Config**

   - **URL**: [http://127.0.0.1:3066/amm_config?index=0&programId=7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi](http://127.0.0.1:3066/amm_config?index=0&programId=7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi)
   - **Description**: Fetches the AMM configuration for the specified `index` and `programId`.
   - **Parameters**:
     - `index` (required): The index of the AMM configuration. Example: `0`.
     - `programId` (required): The Solana program ID for the AMM. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.

2. **Get Pool State**
   - **URL**: [http://127.0.0.1:3066/pool_state?index=0&token0Mint=HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj&token1Mint=Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf&programId=7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi](http://127.0.0.1:3066/pool_state?index=0&token0Mint=HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj&token1Mint=Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf&programId=7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi)
   - **Description**: Fetches the pool state for the specified `index`, `token0Mint`, `token1Mint`, and `programId`.
   - **Parameters**:
     - `index` (required): The index of the pool. Example: `0`.
     - `token0Mint` (required): The mint address of the first token in the pool. Example: `HPaNPtnnPZahNdsM7Mg6aTAfDwhrc7Lusem975YrR4Wj`.
     - `token1Mint` (required): The mint address of the second token in the pool. Example: `Hn1deFTBXS8iBLFHTx4AREoXTzqv4VeEq715NemZaqxf`.
     - `programId` (required): The Solana program ID for the pool. Example: `7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi`.

### Example Usage

- Open your browser or use a tool like `curl` or Postman to access the above URLs.
- The data will be returned in an HTML table format for easy viewing.
