/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type OrderEditAddLineItemDiscountMutationVariables = AdminTypes.Exact<{
  discount: AdminTypes.OrderEditAppliedDiscountInput;
  calculated_order_id: AdminTypes.Scalars['ID']['input'];
  calculated_line_item_id: AdminTypes.Scalars['ID']['input'];
}>;


export type OrderEditAddLineItemDiscountMutation = { orderEditAddLineItemDiscount?: AdminTypes.Maybe<{ addedDiscountStagedChange?: AdminTypes.Maybe<(
      Pick<AdminTypes.OrderStagedChangeAddLineItemDiscount, 'id' | 'description'>
      & { value: { __typename: 'MoneyV2' | 'PricingPercentageValue' } }
    )>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type OrderEditAddVariantMutationVariables = AdminTypes.Exact<{
  calculatedOrderId: AdminTypes.Scalars['ID']['input'];
  quantity: AdminTypes.Scalars['Int']['input'];
  variantId: AdminTypes.Scalars['ID']['input'];
}>;


export type OrderEditAddVariantMutation = { orderEditAddVariant?: AdminTypes.Maybe<{ calculatedLineItem?: AdminTypes.Maybe<Pick<AdminTypes.CalculatedLineItem, 'id'>>, calculatedOrder?: AdminTypes.Maybe<{ totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> } }>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type BeginEditMutationVariables = AdminTypes.Exact<{
  order_id: AdminTypes.Scalars['ID']['input'];
}>;


export type BeginEditMutation = { orderEditBegin?: AdminTypes.Maybe<{ calculatedOrder?: AdminTypes.Maybe<(
      Pick<AdminTypes.CalculatedOrder, 'id'>
      & { lineItems: { nodes: Array<(
          Pick<AdminTypes.CalculatedLineItem, 'id' | 'quantity'>
          & { variant?: AdminTypes.Maybe<(
            Pick<AdminTypes.ProductVariant, 'id'>
            & { product: Pick<AdminTypes.Product, 'tags'> }
          )> }
        )> }, totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )> }> };

export type CancelOrderMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
  restockInventory?: AdminTypes.InputMaybe<AdminTypes.Scalars['Boolean']['input']>;
  refund?: AdminTypes.InputMaybe<AdminTypes.Scalars['Boolean']['input']>;
}>;


export type CancelOrderMutation = { orderCancel?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type GenShopifyDetailQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type GenShopifyDetailQuery = { node?: AdminTypes.Maybe<(
    Pick<AdminTypes.ProductVariant, 'inventoryQuantity'>
    & { inventoryItem: (
      Pick<AdminTypes.InventoryItem, 'tracked' | 'id'>
      & { measurement: (
        Pick<AdminTypes.InventoryItemMeasurement, 'id'>
        & { weight?: AdminTypes.Maybe<Pick<AdminTypes.Weight, 'unit' | 'value'>> }
      ) }
    ), product: Pick<AdminTypes.Product, 'title'> }
  )> };

export type GetOrdersWithLineItemsQueryVariables = AdminTypes.Exact<{
  ids: Array<AdminTypes.Scalars['ID']['input']> | AdminTypes.Scalars['ID']['input'];
}>;


export type GetOrdersWithLineItemsQuery = { nodes: Array<AdminTypes.Maybe<(
    Pick<AdminTypes.Order, 'id' | 'cancelledAt' | 'createdAt' | 'email' | 'displayFinancialStatus'>
    & { totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> }, totalShippingPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, shippingLine?: AdminTypes.Maybe<Pick<AdminTypes.ShippingLine, 'title' | 'code' | 'shippingRateHandle'>>, lineItems: { nodes: Array<(
        Pick<AdminTypes.LineItem, 'currentQuantity' | 'title'>
        & { line_item_id: AdminTypes.LineItem['id'] }
        & { product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'tags'>>, variant?: AdminTypes.Maybe<(
          { variant_graphql_id: AdminTypes.ProductVariant['id'] }
          & { inventoryItem: (
            Pick<AdminTypes.InventoryItem, 'id'>
            & { measurement: (
              Pick<AdminTypes.InventoryItemMeasurement, 'id'>
              & { weight?: AdminTypes.Maybe<Pick<AdminTypes.Weight, 'unit' | 'value'>> }
            ) }
          ) }
        )>, originalUnitPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> }, discountedTotalSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> } }
      )> }, transactions: Array<Pick<AdminTypes.OrderTransaction, 'id' | 'status' | 'kind'>> }
  )>> };

export type GetProductDataQueryVariables = AdminTypes.Exact<{
  IDs: Array<AdminTypes.Scalars['ID']['input']> | AdminTypes.Scalars['ID']['input'];
}>;


export type GetProductDataQuery = { nodes: Array<AdminTypes.Maybe<(
    Pick<AdminTypes.ProductVariant, 'id' | 'inventoryQuantity'>
    & { inventoryItem: (
      Pick<AdminTypes.InventoryItem, 'id' | 'tracked'>
      & { measurement: (
        Pick<AdminTypes.InventoryItemMeasurement, 'id'>
        & { weight?: AdminTypes.Maybe<Pick<AdminTypes.Weight, 'unit' | 'value'>> }
      ), unitCost?: AdminTypes.Maybe<Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'>> }
    ), product: (
      Pick<AdminTypes.Product, 'id' | 'title' | 'status' | 'tags'>
      & { priceRangeV2: { maxVariantPrice: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, metafields: { nodes: Array<Pick<AdminTypes.Metafield, 'key' | 'jsonValue'>> } }
    ) }
  )>> };

export type OrderCaptureMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.OrderCaptureInput;
}>;


export type OrderCaptureMutation = { orderCapture?: AdminTypes.Maybe<{ transaction?: AdminTypes.Maybe<(
      Pick<AdminTypes.OrderTransaction, 'id' | 'status'>
      & { order?: AdminTypes.Maybe<(
        Pick<AdminTypes.Order, 'id' | 'displayFinancialStatus'>
        & { totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> } }
      )> }
    )>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type OrderEditAddShippingLineMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
  shippingLine: AdminTypes.OrderEditAddShippingLineInput;
}>;


export type OrderEditAddShippingLineMutation = { orderEditAddShippingLine?: AdminTypes.Maybe<{ calculatedOrder?: AdminTypes.Maybe<Pick<AdminTypes.CalculatedOrder, 'id'>>, userErrors: Array<Pick<AdminTypes.OrderEditAddShippingLineUserError, 'field' | 'message'>> }> };

export type OrderEditCommitMutationVariables = AdminTypes.Exact<{
  calculated_order_id: AdminTypes.Scalars['ID']['input'];
}>;


export type OrderEditCommitMutation = { orderEditCommit?: AdminTypes.Maybe<{ order?: AdminTypes.Maybe<(
      Pick<AdminTypes.Order, 'id'>
      & { totalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type SetInventoryLevelMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.InventorySetQuantitiesInput;
}>;


export type SetInventoryLevelMutation = { inventorySetQuantities?: AdminTypes.Maybe<{ inventoryAdjustmentGroup?: AdminTypes.Maybe<(
      Pick<AdminTypes.InventoryAdjustmentGroup, 'createdAt' | 'reason' | 'referenceDocumentUri'>
      & { changes: Array<Pick<AdminTypes.InventoryChange, 'name' | 'delta'>> }
    )>, userErrors: Array<Pick<AdminTypes.InventorySetQuantitiesUserError, 'field' | 'message'>> }> };

export type GetFirstLocationQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type GetFirstLocationQuery = { locations: { edges: Array<{ node: Pick<AdminTypes.Location, 'id'> }> } };

export type GetInventoryItemQueryVariables = AdminTypes.Exact<{
  variantId: AdminTypes.Scalars['ID']['input'];
}>;


export type GetInventoryItemQuery = { productVariant?: AdminTypes.Maybe<{ inventoryItem: Pick<AdminTypes.InventoryItem, 'id'> }> };

export type UpdateProductMetafieldMutationVariables = AdminTypes.Exact<{
  productId: AdminTypes.Scalars['ID']['input'];
  key: AdminTypes.Scalars['String']['input'];
  value: AdminTypes.Scalars['String']['input'];
}>;


export type UpdateProductMetafieldMutation = { productUpdate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id'>
      & { metafields: { edges: Array<{ node: Pick<AdminTypes.Metafield, 'key' | 'value'> }> } }
    )> }> };

export type UpdateMetafieldMutationVariables = AdminTypes.Exact<{
  variantId: AdminTypes.Scalars['ID']['input'];
  key: AdminTypes.Scalars['String']['input'];
  value: AdminTypes.Scalars['String']['input'];
}>;


export type UpdateMetafieldMutation = { productVariantUpdate?: AdminTypes.Maybe<{ productVariant?: AdminTypes.Maybe<(
      Pick<AdminTypes.ProductVariant, 'id'>
      & { metafields: { edges: Array<{ node: Pick<AdminTypes.Metafield, 'key' | 'value'> }> } }
    )> }> };

interface GeneratedQueryTypes {
  "#graphql\nquery GenShopifyDetail ($id: ID!) {\n  node(id: $id) {\n    ... on ProductVariant {\n      inventoryQuantity\n      inventoryItem {\n        tracked\n      }\n      product {\n        title\n      }\n      inventoryItem {\n        id\n        measurement {\n          id\n          weight {\n            unit\n            value\n          }\n        }\n      }\n    }\n  }\n}": {return: GenShopifyDetailQuery, variables: GenShopifyDetailQueryVariables},
  "#graphql\n  query GetOrdersWithLineItems ($ids: [ID!]!) {\n    nodes(ids: $ids) {\n      ... on Order {\n        id\n        cancelledAt\n        createdAt\n        email\n        displayFinancialStatus\n        totalPriceSet {\n          shopMoney {\n            amount\n          }\n        }\n        totalShippingPriceSet {\n          shopMoney {\n            amount\n            currencyCode\n          }\n        }\n        shippingLine {\n          title\n          code\n          shippingRateHandle\n        }\n        lineItems(first: 250) {\n          nodes {\n            line_item_id: id\n            currentQuantity\n            title\n            product {\n              tags\n            }\n            variant {\n              variant_graphql_id: id\n              inventoryItem {\n                id\n                measurement {\n                  id\n                  weight {\n                    unit\n                    value\n                  }\n                }\n              }\n            }\n            originalUnitPriceSet {\n              shopMoney {\n                amount\n              }\n            }\n            discountedTotalSet {\n              shopMoney {\n                amount\n              }\n            }\n          }\n        }\n        transactions(first: 10) {\n          id\n          status\n          kind\n        }\n      }\n    }\n  }\n": {return: GetOrdersWithLineItemsQuery, variables: GetOrdersWithLineItemsQueryVariables},
  "#graphql\n  query GetProductData($IDs: [ID!]!) {\n    nodes(ids: $IDs) {\n      ... on ProductVariant {\n        id\n        inventoryQuantity\n        inventoryItem {\n          id\n          tracked\n          measurement {\n            id\n            weight {\n              unit\n              value\n            }\n          }\n          unitCost {\n            amount\n            currencyCode\n          }\n        }\n        product {\n          id\n          title\n          priceRangeV2 {\n            maxVariantPrice {\n              amount\n              currencyCode\n            }\n            minVariantPrice {\n              amount\n              currencyCode\n            }\n          }\n          featuredImage {\n            url(transform: { maxWidth: 500, preferredContentType: WEBP })\n          }\n          metafields(keys: [\"custom.end_date\", \"custom.start_date\"], first: 10) {\n            nodes {\n              key\n              jsonValue\n            }\n          }\n          status\n          tags\n        }\n      }\n    }\n  }\n": {return: GetProductDataQuery, variables: GetProductDataQueryVariables},
  "#graphql\n      query GetFirstLocation {\n        locations(first: 1) {\n          edges {\n            node {\n              id\n            }\n          }\n        }\n      }\n    ": {return: GetFirstLocationQuery, variables: GetFirstLocationQueryVariables},
  "#graphql\n      query GetInventoryItem($variantId: ID!) {\n        productVariant(id: $variantId) {\n          inventoryItem {\n            id\n          }\n        }\n      }\n    ": {return: GetInventoryItemQuery, variables: GetInventoryItemQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\nmutation orderEditAddLineItemDiscount($discount: OrderEditAppliedDiscountInput!, $calculated_order_id: ID!, $calculated_line_item_id: ID!) {\n  orderEditAddLineItemDiscount(discount: $discount, id: $calculated_order_id, lineItemId: $calculated_line_item_id) {\n    addedDiscountStagedChange {\n      # OrderStagedChangeAddLineItemDiscount fields\n      id\n      description\n      value {\n        __typename\n      }\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}": {return: OrderEditAddLineItemDiscountMutation, variables: OrderEditAddLineItemDiscountMutationVariables},
  "#graphql\nmutation orderEditAddVariant($calculatedOrderId: ID!, $quantity: Int!, $variantId: ID!) {\n  orderEditAddVariant(id: $calculatedOrderId, quantity: $quantity, variantId: $variantId, allowDuplicates: false) {\n    calculatedLineItem {\n      # CalculatedLineItem fields\n      id\n    }\n    calculatedOrder {\n      totalPriceSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}": {return: OrderEditAddVariantMutation, variables: OrderEditAddVariantMutationVariables},
  "#graphql\nmutation beginEdit($order_id: ID!) {\n  orderEditBegin(id: $order_id) {\n    calculatedOrder {\n      id\n      lineItems(first: 250) {\n        nodes {\n          id\n          variant {\n            id\n            product {\n              tags\n            }\n          }\n          quantity\n        }\n      }\n      totalPriceSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n    }\n  }\n}": {return: BeginEditMutation, variables: BeginEditMutationVariables},
  "#graphql\n  mutation cancelOrder($id: ID!, $restockInventory: Boolean = false, $refund: Boolean = true) {\n    orderCancel(\n      orderId: $id,\n      refund: $refund,\n      restock: $restockInventory,\n      reason: OTHER\n    ) {\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: CancelOrderMutation, variables: CancelOrderMutationVariables},
  "#graphql\nmutation orderCapture($input: OrderCaptureInput!) {\n  orderCapture(input: $input) {\n    transaction {\n      id\n      status\n      order {\n        id\n        totalPriceSet {\n          shopMoney {\n            amount\n            currencyCode\n          }\n        }\n        displayFinancialStatus\n      }\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}\n": {return: OrderCaptureMutation, variables: OrderCaptureMutationVariables},
  "#graphql\nmutation orderEditAddShippingLine($id: ID!, $shippingLine: OrderEditAddShippingLineInput!) {\n  orderEditAddShippingLine(id: $id, shippingLine: $shippingLine) {\n    calculatedOrder {\n      id\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}": {return: OrderEditAddShippingLineMutation, variables: OrderEditAddShippingLineMutationVariables},
  "#graphql\nmutation orderEditCommit($calculated_order_id: ID!) {\n  orderEditCommit(id: $calculated_order_id, notifyCustomer: true) {\n    order {\n      # Order fields\n      id\n      totalPriceSet {\n        shopMoney {\n          amount\n          currencyCode\n        }\n      }\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}\n": {return: OrderEditCommitMutation, variables: OrderEditCommitMutationVariables},
  "#graphql\n  mutation SetInventoryLevel($input: InventorySetQuantitiesInput!) {\n    inventorySetQuantities(input: $input) {\n      inventoryAdjustmentGroup {\n        createdAt\n        reason\n        referenceDocumentUri\n        changes {\n          name\n          delta\n        }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: SetInventoryLevelMutation, variables: SetInventoryLevelMutationVariables},
  "#graphql\n  mutation UpdateProductMetafield($productId: ID!, $key: String!, $value: String!) {\n    productUpdate(input: {\n      id: $productId,\n      metafields: [\n        {\n          namespace: \"custom\",\n          key: $key,\n          value: $value,\n          type: \"json\",\n        },\n      ],\n    }) {\n      product {\n        id\n        metafields(first: 10) {\n          edges {\n            node {\n              key\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: UpdateProductMetafieldMutation, variables: UpdateProductMetafieldMutationVariables},
  "#graphql\n  mutation UpdateMetafield($variantId: ID!, $key: String!, $value: String!) {\n    productVariantUpdate(input: {\n      id: $variantId,\n      metafields: [\n        {\n          key: $key,\n          value: $value,\n          type: \"json\",\n        },\n      ],\n    }) {\n      productVariant {\n        id\n        metafields(first: 10) {\n          edges {\n            node {\n              key\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: UpdateMetafieldMutation, variables: UpdateMetafieldMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
