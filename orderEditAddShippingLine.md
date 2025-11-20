Skip to main content
Docs page
Apps
Storefronts
Agents
References

Assistant

search + assistant



Help
Log in
Shopify uses cookies to provide necessary site functionality and improve your experience. By using our website, you agree to our privacy policy and our cookie policy.

OK
Collapse sidebar
GraphQL Admin API
Choose a version:

2025-04


orderEditAddShippingLine
mutation


Copy page MD



Requires write_order_edits access scope.
Adds a shipping line to an existing order. For more information on how to use the GraphQL Admin API to edit an existing order, refer to Edit existing orders.
Arguments

id
•
ID!
required
The ID of the calculated order to edit.
shippingLine
•
OrderEditAddShippingLineInput!
required
The shipping line to be added.
Show input fields
Was this section helpful?

Yes

No
OrderEditAddShippingLinePayload returns

calculatedOrder
•
CalculatedOrder
The calculated order with the edits applied but not saved.
Show fields
calculatedShippingLine
•
CalculatedShippingLine
The calculated shipping line that's added during this order edit.
Show fields
userErrors
•
[OrderEditAddShippingLineUserError!]!
non-null
The list of errors that occurred from executing the mutation.
Show fields
Was this section helpful?

Yes

No
Examples


Add a shipping line to an order edit

Hide content
GQL
cURL
React Router
Node.js
Ruby
Open in GraphiQL
Copy
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
import { authenticate } from "../shopify.server";

export const loader = async ({request}) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
  mutation addShippingLine($id: ID!, $shippingLine: OrderEditAddShippingLineInput!) {
    orderEditAddShippingLine(id: $id, shippingLine: $shippingLine) {
      calculatedOrder {
        id
        totalOutstandingSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
        totalPriceSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
      }
      calculatedShippingLine {
        id
        title
        price {
          presentmentMoney {
            amount
            currencyCode
          }
        }
        stagedStatus
      }
      userErrors {
        field
Hide content
Input variables
JSON
Copy
1
2
3
4
5
6
7
8
9
10
{
  "id": "gid://shopify/CalculatedOrder/607673083",
  "shippingLine": {
    "title": "2-Day Shipping",
    "price": {
      "amount": 19.99,
      "currencyCode": "USD"
    }
  }
}
Hide content
Response
JSON
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
{
  "orderEditAddShippingLine": {
    "calculatedOrder": {
      "id": "gid://shopify/CalculatedOrder/607673083",
      "totalOutstandingSet": {
        "presentmentMoney": {
          "amount": "19.99",
          "currencyCode": "USD"
        }
      },
      "totalPriceSet": {
        "presentmentMoney": {
          "amount": "31.49",
          "currencyCode": "USD"
        }
      }
    },
    "calculatedShippingLine": {
      "id": "gid://shopify/CalculatedShippingLine/52c5ee83-d24a-4a4d-a048-b00ad90aa19f",
      "title": "2-Day Shipping",
      "price": {
        "presentmentMoney": {
          "amount": "19.99",
          "currencyCode": "USD"
        }
      },
      "stagedStatus": "ADDED"
    },
    "userErrors": []
  }
}
Updates

Developer changelog
Shopify Editions
Business growth

Shopify Partners Program
Shopify App Store
Shopify Academy
Legal

Terms of service
API terms of use
Privacy policy
Partners Program Agreement
Shopify

About Shopify
Shopify Plus
Careers
Investors
Press and media