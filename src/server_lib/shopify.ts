import 'server-only'
import Shopify from 'shopify-api-node'

if (!process.env.SHOPIFY_APP_NAME) {
  throw new Error('Missing SHOPIFY_APP_NAME')
}
if (!process.env.SHOPIFY_ADMIN_API_TOKEN) {
  throw new Error('Missing SHOPIFY_ADMIN_API_TOKEN')
}
if (!process.env.SHOPIFY_API_KEY) {
  throw new Error('Missing SHOPIFY_API_KEY')
}
if (!process.env.SHOPIFY_API_SECRET_KEY) {
  throw new Error('Missing SHOPIFY_API_SECRET_KEY')
}

const cfg: Shopify.IPublicShopifyConfig | Shopify.IPrivateShopifyConfig = {
  shopName: process.env.SHOPIFY_APP_NAME,
  accessToken: process.env.SHOPIFY_ADMIN_API_TOKEN,
  autoLimit: true, // Automatically handles rate limiting
  apiVersion: '2024-07',
}

// Initialize the Shopify client
const shopify = new Shopify(cfg)

shopify.on('callGraphqlLimits',
  (limits: Shopify.ICallGraphqlLimits) => console.info(limits));

export default shopify
