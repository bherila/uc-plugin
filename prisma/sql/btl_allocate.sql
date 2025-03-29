-- @param {String} $1:assignee_id
-- @param {BigInt} $2:offer_id
-- @param {Int} $3:quantity
UPDATE v3_offer_manifest
SET
  assignee_id = ?
WHERE
  offer_id = ?
  AND assignee_id IS NULL
ORDER BY
  assignment_ordering
LIMIT
  ?
