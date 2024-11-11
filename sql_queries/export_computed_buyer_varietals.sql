select winner_guid, cola_varietal, sum(tax_value) total_paid
from cloud_view
where cola_varietal != '@virtual' and cola_varietal != '@gift'
group by winner_guid, winner_email, cola_varietal
