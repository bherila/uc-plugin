import 'server-only'
import shopify from './shopify'
import z from 'zod'

const FulfillmentOrderLineItemInputSchema = z.object({
  id: z.string(),
  quantity: z.number(),
})

const FulfillmentOrderMergeIntentInputSchema = z.object({
  fulfillmentOrderId: z.string(),
  fulfillmentOrderLineItems: z.array(FulfillmentOrderLineItemInputSchema),
})

export const FulfillmentOrderMergeInputSchema = z.object({
  mergeIntents: z.array(FulfillmentOrderMergeIntentInputSchema),
})

export type FulfillmentOrderMergeInput = z.infer<typeof FulfillmentOrderMergeInputSchema>

const FulfillmentOrderMergeResponseSchema = z.object({
  fulfillmentOrderMerge: z.object({
    fulfillmentOrderMerges: z
      .array(
        z.object({
          fulfillmentOrder: z.object({
            id: z.string(),
            status: z.string(),
            assignedLocation: z.object({
              id: z.string(),
              name: z.string(),
            }),
          }),
        }),
      )
      .nullable(),
    userErrors: z.array(
      z.object({
        field: z.array(z.string()).nullable(),
        message: z.string(),
      }),
    ),
  }),
})

export async function shopifyFulfillmentOrderMerge(inputs: FulfillmentOrderMergeInput[]) {
  const query = `
        mutation fulfillmentOrderMerge($fulfillmentOrderMergeInputs: [FulfillmentOrderMergeInput!]!) {
            fulfillmentOrderMerge(fulfillmentOrderMergeInputs: $fulfillmentOrderMergeInputs) {
                fulfillmentOrderMerges {
                    fulfillmentOrder {
                        id
                        status
                        assignedLocation {
                            id
                            name
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `

  const variables = {
    fulfillmentOrderMergeInputs: inputs,
  }

  const response = await shopify.graphql(query, variables)

  const result = FulfillmentOrderMergeResponseSchema.parse(response)

  if (result.fulfillmentOrderMerge.userErrors.length > 0) {
    throw new Error(result.fulfillmentOrderMerge.userErrors.map((e) => e.message).join(', '))
  }

  return result.fulfillmentOrderMerge
}
