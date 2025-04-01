      select user_email,
             user_fname,
             user_lname,
             cola_varietal,
             cv.total_paid AS total_paid_for_varietal
      from computed_buyer_varietals cv
             join user_list ul on ul.user_guid = cv.winner_guid
      where cola_varietal like ?
      order by total_paid_for_varietal desc 
      limit 100