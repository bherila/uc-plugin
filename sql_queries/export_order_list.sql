select
  order_guid, order_sku_list, order_user, order_billing_address, order_qty, order_total_price, order_discount, order_credit_discount, order_tax,
  order_timestamp, order_status, order_payment_status, order_offer_id, order_utm_source, order_utm_medium,
  order_utm_campaign, order_user_nth, order_auth_code, order_auth_date, order_billing_instrument,
  order_transaction_id, x_user_email, order_unit_price,
  order_promo_code, x_order_is_authorized_or_captured, cohort_mth, order_reveal_date, cohort_fp_mth,
  is_test_order, order_rejected_dt, order_upgraded_value, order_allocated_cogs, order_cohort_fpdate,
  order_cc_fee, order_refund_transaction_id, order_original_mf, order_yymm_pst, order_mc_eid,
  order_mc_cid, order_subscription_id, order_is_void, order_cash_in, order_disc_c, order_disc_f,
  order_disc_s, order_disc_r, order_disc_t, order_disc_m, order_disc_g, order_disc_other,
  order_ship_revenue, order_previous_order, utm_content, utm_term, netsuite_synced,
  payment_intent_id, utm_device, utm_placement, utm_site, order_type
from order_list
where
  order_type != 'ScrambleLetter' and order_type != 'ScramblePrize' and order_type != 'SignupGift' and is_test_order=false;

SELECT DISTINCT order_type from order_list
