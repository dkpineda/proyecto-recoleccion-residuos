# Project Setup and Development Guide

## Prerequisites

1. Before starting, ensure you have `nvm` (Node Version Manager) installed to manage your Node.js versions.

2. Request the `.env` file from a team member. This file contains essential environment variables required for the application to function properly.

### Setting Up the Correct Node Version

1. To install the Node version specified in the `.nvmrc` file, execute:

   ```bash
   nvm install
   ```

   This command automatically installs the required Node.js version.

2. To switch to the Node version specified in the `.nvmrc` file, execute:

   ```bash
   nvm use
   ```

## Yarn Configuration

Set up Yarn by following these steps:

1. Enable Corepack to manage Yarn versions:

   ```bash
   corepack enable
   ```

2. Install and activate the specified Yarn version:

   ```bash
   corepack prepare yarn@4.1.1 --activate
   ```

   This command installs and activates the specified Yarn version.

## Development

To run the application in development mode:

```bash
yarn dev
```
