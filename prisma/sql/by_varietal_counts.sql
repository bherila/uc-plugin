select count(*) num, sum(total_paid) total
from computed_buyer_varietals cv join user_list ul on ul.user_guid = cv.winner_guid
where cola_varietal like ?