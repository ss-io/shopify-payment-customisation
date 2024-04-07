// @ts-check
// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/
/**
* @type {FunctionRunResult}
*/
const NO_CHANGES = {
  operations: [],
};
// The configured entrypoint for the 'purchase.payment-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  // Get product/s in cart
  const cartProducts = input.cart.lines;

  // Check if products in cart has NoAfterpay Tag
  if(cartProducts.some(prod => prod.merchandise.product.hasAnyTag) == false) {
    console.error("No products in cart contain tag 'NoAfterpay'");

    return NO_CHANGES;
  }

  // Find the payment method to hide
  const hidePaymentMethod = input.paymentMethods
    .find(method => method.name.includes("Afterpay"));

  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [{
      hide: {
        paymentMethodId: hidePaymentMethod.id
      }
    }]
  };
};