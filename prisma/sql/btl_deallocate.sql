-- @param {String} $1:assignee_id
-- @param {BigInt} $2:offer_id
-- @param {Int} $3:quantity
UPDATE v3_offer_manifest
SET
  assignee_id = null
WHERE
  assignee_id = ?
  AND offer_id = ?
ORDER BY
  assignment_ordering
LIMIT
  ?
