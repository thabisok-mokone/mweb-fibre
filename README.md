# Mweb Fibre Product Browser

This project demonstrates how to use Mweb's Fibre APIs to create a React web application using Next.js. The application allows users to browse Mweb's Fibre products from different providers, filter them based on price range, and select multiple providers to view their associated products.

## Requirements

To run this application, you need to have the following:

- Node.js installed on your machine
- Access to Mweb's Fibre APIs

## Installation

1. Clone the repository from GitHub:

```bash
git clone https://github.com/thabisok-mokone/mweb-fibre
```

2. Navigate to the project directory:

```bash
cd mweb-fibre
```

3. Install the dependencies:

```bash
npm install
```

# Configuration

Please note that the URL used to fetch data is public and accessible:

```bash
https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public
```

# Usage

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to access the application.

# Features

# 1. Get Fibre products for all providers
The application retrieves Fibre products from Mweb's API for all available providers. These products are then displayed in a user-friendly format.

# 2. Display icons for each provider
Each Fibre provider is associated with a unique icon. The application fetches these icons from Mweb's API and displays them alongside the provider's name.

# 3. Multiple select providers and display associated products
Users can select one or more providers using checkboxes. Once selected, the application filters and displays only the products associated with the selected providers.

# 4. Filter by price range
A price range filter allows users to refine their search results based on the product's price. The application provides a slider interface to select the desired price range, and the products are updated accordingly.

# Deployment
The application is deployed to production on Vercel. You can access the deployed version using the following link:

[MWEB-Fibre-App](https://mweb-fibre-9hgzyxr50-thabisok-mokone.vercel.app/)





