import { z } from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.any(),
})

export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const Customer_list_july_2023ScalarFieldEnumSchema = z.enum(['customer_name','email','orders','ltv','first_order','last_order']);

export const Item_detailScalarFieldEnumSchema = z.enum(['itemdetail_guid','cola_id','cola_name','cola_region','cola_appellation','cola_varietal','cola_vintage','cola_abv','about_wine','tasting_notes','winemaker_notes','label_img_url','bottle_img_url','retail_price','winery_id','url_key','brand','country_code','upc','is_wine','is_beer','is_liquor','is_sparkling','is_cult','is_small_production','ct_wine_id','ct_producer_id','ct_likes','ct_tasting_notes','ct_review','ct_community_score','ct_qty','wine_vineyard','wine_web_url','wine_drink_start','wine_drink_end','wine_producer_uuid','redirect_to','item_tsv','wine_ml','cola_fanciful_name','wd_varietal','wd_region','is_blend','price_range','item_lbs','category','blur_bottle_img','blur_label_img']);

export const Item_skuScalarFieldEnumSchema = z.enum(['sku','srp','is_autographed','is_taxable','is_counted_for_shipment','drink_by_date','sku_itemdetail_guid','index','last_order_date','last_restock','last_stock_update','last_stock_qty','next_delivery_date','last_count_owed','x_friendly_name','scramble_letters','scramble_qty_allowed','sku_allowed_states','comment','sku_tsv','sku_cogs_unit','is_pallet_program','is_deprecated','sku_varietal','sku_region','last_count_shipped','is_in_wd','sku_was_swap','sku_sort','sku_preswap','sku_postswap','sku_qty_reserved','sku_cogs_is_estimated','sku_taxset_id','qty_offsite','sku_external_id','sku_fq_lo','sku_fq_hi','sku_velocity','last_vip_qty','last_open_xfer_qty','sku_is_dropship','sku_ship_alone','sku_supplier_guid','next_stock_update','sku_exclude_metrics','netsuite_synced','category','country_code','unlimited_allocation_until','avg_purchase_price','last_purchase_price','dont_buy_after','pack_size']);

export const New_customer_data_after_bk_from_lccScalarFieldEnumSchema = z.enum(['Customer_ID','Customer_Created_At','First_Order_Date','Email','First_Name','Last_Name','Billing_Address_First_Name','Billing_Address_Last_Name','Billing_Address_Company','Billing_Address_Address_1','Billing_Address_Address_2','Billing_Address_City','Billing_Address_State','Billing_Address_Postcode','Billing_Address_Country','Billing_Address_Email','Billing_Address_Phone','Shipping_Address_First_Name','Shipping_Address_Last_Name','Shipping_Address_Company','Shipping_Address_Address_1','Shipping_Address_Address_2','Shipping_Address_City','Shipping_Address_State','Shipping_Address_Postcode','Shipping_Address_Country','Total_Spent','Order_Count','Item_Count','Last_Order_Date']);

export const Old_order_data_500k_ordersScalarFieldEnumSchema = z.enum(['order_guid','order_user','order_qty','order_total_price','order_timestamp','order_offer_id','order_user_nth','order_auth_date','order_transaction_id','order_yymm_pst','order_type','offer_guid','offer_title','offer_price','offer_meta_title','offer_subtitle','offer_primary_varietal']);

export const Order_listScalarFieldEnumSchema = z.enum(['order_guid','order_sku_list','order_user','order_billing_address','order_qty','order_total_price','order_discount','order_credit_discount','order_tax','order_timestamp','order_status','order_payment_status','order_offer_id','order_utm_source','order_utm_medium','order_utm_campaign','order_user_nth','order_auth_code','order_auth_date','order_billing_instrument','order_transaction_id','x_user_email','order_unit_price','order_promo_code','x_order_is_authorized_or_captured','cohort_mth','order_reveal_date','cohort_fp_mth','is_test_order','order_rejected_dt','order_upgraded_value','order_allocated_cogs','order_cohort_fpdate','order_cc_fee','order_refund_transaction_id','order_original_mf','order_yymm_pst','order_mc_eid','order_mc_cid','order_subscription_id','order_is_void','order_cash_in','order_disc_c','order_disc_f','order_disc_s','order_disc_r','order_disc_t','order_disc_m','order_disc_g','order_disc_other','order_ship_revenue','order_previous_order','utm_content','utm_term','netsuite_synced','payment_intent_id','utm_device','utm_placement','utm_site','order_type']);

export const User_listScalarFieldEnumSchema = z.enum(['user_guid','user_birthday','user_default_address','user_email','user_fname','user_lname','user_is21','user_is_testaccount','user_image_url','user_url_profile','user_name','user_login_dt','user_signup_dt','user_last_purchase_dt','user_first_purchase_dt','user_referred_by_id','user_referral_domain','session_utm_source','session_utm_campaign','session_utm_medium','x_life_credit','x_total_qty','x_life_spend','x_life_discount','x_acquisition_cost','x_achievement_points','user_is_private','user_is_red_buyer','user_is_white_buyer','user_is_largeformat_buyer','user_min_price','user_max_price','user_avg_price','user_is_push','user_outreach_dt','ls_is_student','ls_is_personal_email','ls_grade','ls_company_state_code','ls_fname','ls_lname','ls_location_state','ls_company_name','ls_company_industry','ls_company_country','ls_company_emps','ls_is_spam','ls_customer_fit','ls_customer_fit_ext','x_order_count','user_inactive_dt','user_email_n','user_note','user_expiry','user_last_ship_date','x_cloud_value','x_cloud_count','user_is_vip','user_signup_ym_pst','suspended_at','last_synced_at','is_admin','utm_content','utm_term','user_password','stripe_customer_id','google_id','utm_device','utm_placement','utm_site','holdout_num']);

export const UsersScalarFieldEnumSchema = z.enum(['id','email','password','salt','alias','ax_maxmin','ax_homes','ax_tax','ax_evdb','ax_spgp','ax_uc']);

export const Order_lockScalarFieldEnumSchema = z.enum(['order_id','locked_at']);

export const V3_audit_logScalarFieldEnumSchema = z.enum(['id','event_ts','event_name','event_ext','event_userid','offer_id','order_id','time_taken_ms']);

export const V3_offerScalarFieldEnumSchema = z.enum(['offer_id','offer_name','offer_variant_id','offer_product_name']);

export const V3_offer_manifestScalarFieldEnumSchema = z.enum(['m_id','offer_id','mf_variant','assignee_id','assignment_ordering']);

export const V3_order_to_variantScalarFieldEnumSchema = z.enum(['order_id','variant_id','offer_id']);

export const InventoryScalarFieldEnumSchema = z.enum(['sku','description','units_on_hand','cost_basis_unit','srp_unit']);

export const Computed_buyer_varietalsScalarFieldEnumSchema = z.enum(['id','winner_guid','cola_varietal','total_paid']);

export const Member_list_export_2023_07_06ScalarFieldEnumSchema = z.enum(['Email','Klaviyo_ID','First_Name','Last_Name','Phone_Number','Address','Address_2','City','State___Region','Country','Zip_Code']);

export const Shopify_product_variantScalarFieldEnumSchema = z.enum(['variantId','productId','productName','variantName','variantPrice','variantCompareAtPrice','variantInventoryQuantity','variantSku','variantWeight']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const customer_list_july_2023OrderByRelevanceFieldEnumSchema = z.enum(['customer_name','email','first_order','last_order']);

export const item_detailOrderByRelevanceFieldEnumSchema = z.enum(['itemdetail_guid','cola_id','cola_name','cola_region','cola_appellation','cola_varietal','cola_vintage','about_wine','tasting_notes','winemaker_notes','label_img_url','bottle_img_url','winery_id','url_key','brand','country_code','upc','is_wine','is_beer','is_liquor','is_sparkling','is_cult','is_small_production','ct_community_score','wine_vineyard','wine_web_url','wine_drink_start','wine_drink_end','wine_producer_uuid','redirect_to','item_tsv','wine_ml','cola_fanciful_name','wd_varietal','wd_region','is_blend','price_range','item_lbs','category','blur_bottle_img','blur_label_img']);

export const item_skuOrderByRelevanceFieldEnumSchema = z.enum(['sku','sku_itemdetail_guid','x_friendly_name','scramble_letters','sku_allowed_states','comment','sku_tsv','sku_varietal','sku_region','sku_preswap','sku_postswap','sku_taxset_id','sku_external_id','sku_supplier_guid','category','country_code']);

export const new_customer_data_after_bk_from_lccOrderByRelevanceFieldEnumSchema = z.enum(['Customer_Created_At','First_Order_Date','Email','First_Name','Last_Name','Billing_Address_First_Name','Billing_Address_Last_Name','Billing_Address_Company','Billing_Address_Address_1','Billing_Address_Address_2','Billing_Address_City','Billing_Address_State','Billing_Address_Postcode','Billing_Address_Country','Billing_Address_Email','Billing_Address_Phone','Shipping_Address_First_Name','Shipping_Address_Last_Name','Shipping_Address_Company','Shipping_Address_Address_1','Shipping_Address_Address_2','Shipping_Address_City','Shipping_Address_State','Shipping_Address_Postcode','Shipping_Address_Country','Last_Order_Date']);

export const old_order_data_500k_ordersOrderByRelevanceFieldEnumSchema = z.enum(['order_guid','order_user','order_offer_id','order_user_nth','order_yymm_pst','order_type','offer_guid','offer_title','offer_price','offer_meta_title','offer_subtitle','offer_primary_varietal']);

export const order_listOrderByRelevanceFieldEnumSchema = z.enum(['order_guid','order_sku_list','order_user','order_billing_address','order_timestamp','order_status','order_payment_status','order_offer_id','order_utm_source','order_utm_medium','order_utm_campaign','order_auth_code','order_auth_date','order_billing_instrument','order_transaction_id','x_user_email','order_promo_code','cohort_mth','order_reveal_date','is_test_order','order_rejected_dt','order_cohort_fpdate','order_refund_transaction_id','order_original_mf','order_yymm_pst','order_mc_eid','order_mc_cid','order_subscription_id','order_previous_order','utm_content','utm_term','netsuite_synced','payment_intent_id','utm_device','utm_placement','utm_site']);

export const user_listOrderByRelevanceFieldEnumSchema = z.enum(['user_guid','user_birthday','user_default_address','user_email','user_fname','user_lname','user_is21','user_is_testaccount','user_image_url','user_url_profile','user_name','user_login_dt','user_signup_dt','user_referred_by_id','user_referral_domain','session_utm_source','session_utm_campaign','session_utm_medium','user_is_private','user_is_red_buyer','user_is_white_buyer','user_is_largeformat_buyer','user_min_price','user_max_price','user_avg_price','user_is_push','user_outreach_dt','ls_is_student','ls_is_personal_email','ls_grade','ls_company_state_code','ls_fname','ls_lname','ls_location_state','ls_company_name','ls_company_industry','ls_company_country','ls_company_emps','ls_is_spam','ls_customer_fit','ls_customer_fit_ext','user_inactive_dt','user_email_n','user_note','user_expiry','user_last_ship_date','user_is_vip','user_signup_ym_pst','suspended_at','last_synced_at','is_admin','utm_content','utm_term','user_password','stripe_customer_id','google_id','utm_device','utm_placement','utm_site','holdout_num']);

export const usersOrderByRelevanceFieldEnumSchema = z.enum(['email','password','alias']);

export const order_lockOrderByRelevanceFieldEnumSchema = z.enum(['order_id']);

export const v3_audit_logOrderByRelevanceFieldEnumSchema = z.enum(['event_name','event_ext']);

export const v3_offerOrderByRelevanceFieldEnumSchema = z.enum(['offer_name','offer_variant_id','offer_product_name']);

export const v3_offer_manifestOrderByRelevanceFieldEnumSchema = z.enum(['mf_variant','assignee_id']);

export const v3_order_to_variantOrderByRelevanceFieldEnumSchema = z.enum(['order_id','variant_id']);

export const inventoryOrderByRelevanceFieldEnumSchema = z.enum(['sku','description']);

export const computed_buyer_varietalsOrderByRelevanceFieldEnumSchema = z.enum(['winner_guid','cola_varietal']);

export const member_list_export_2023_07_06OrderByRelevanceFieldEnumSchema = z.enum(['Email','Klaviyo_ID','First_Name','Last_Name','Phone_Number','Address','Address_2','City','State___Region','Country','Zip_Code']);

export const shopify_product_variantOrderByRelevanceFieldEnumSchema = z.enum(['variantId','productId','productName','variantName','variantPrice','variantCompareAtPrice','variantSku','variantWeight']);

export const order_list_x_order_is_authorized_or_capturedSchema = z.enum(['false','true']);

export type order_list_x_order_is_authorized_or_capturedType = `${z.infer<typeof order_list_x_order_is_authorized_or_capturedSchema>}`

export const order_list_order_is_voidSchema = z.enum(['false','true']);

export type order_list_order_is_voidType = `${z.infer<typeof order_list_order_is_voidSchema>}`

export const order_list_order_typeSchema = z.enum(['TastingRoom','SignupGift','UCAdminSingleSKU','Online_Web','ScrambleLetter','UCGrant','ScramblePrize','Offer','WineClub']);

export type order_list_order_typeType = `${z.infer<typeof order_list_order_typeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CUSTOMER LIST JULY 2023 SCHEMA
/////////////////////////////////////////

export const customer_list_july_2023Schema = z.object({
  customer_name: z.string().nullable(),
  email: z.string(),
  orders: z.number().int().nullable(),
  ltv: z.instanceof(Prisma.Decimal, { message: "Field 'ltv' must be a Decimal. Location: ['Models', 'customer_list_july_2023']"}).nullable(),
  first_order: z.string().nullable(),
  last_order: z.string().nullable(),
})

export type customer_list_july_2023 = z.infer<typeof customer_list_july_2023Schema>

/////////////////////////////////////////
// ITEM DETAIL SCHEMA
/////////////////////////////////////////

export const item_detailSchema = z.object({
  itemdetail_guid: z.string(),
  cola_id: z.string().nullable(),
  cola_name: z.string().nullable(),
  cola_region: z.string().nullable(),
  cola_appellation: z.string().nullable(),
  cola_varietal: z.string().nullable(),
  cola_vintage: z.string().nullable(),
  cola_abv: z.number().nullable(),
  about_wine: z.string().nullable(),
  tasting_notes: z.string().nullable(),
  winemaker_notes: z.string().nullable(),
  label_img_url: z.string().nullable(),
  bottle_img_url: z.string().nullable(),
  retail_price: z.number().nullable(),
  winery_id: z.string().nullable(),
  url_key: z.string().nullable(),
  brand: z.string().nullable(),
  country_code: z.string().nullable(),
  upc: z.string().nullable(),
  is_wine: z.string().nullable(),
  is_beer: z.string().nullable(),
  is_liquor: z.string().nullable(),
  is_sparkling: z.string().nullable(),
  is_cult: z.string().nullable(),
  is_small_production: z.string().nullable(),
  ct_wine_id: z.number().int().nullable(),
  ct_producer_id: z.number().int().nullable(),
  ct_likes: z.number().int().nullable(),
  ct_tasting_notes: z.number().int().nullable(),
  ct_review: z.number().int().nullable(),
  ct_community_score: z.string().nullable(),
  ct_qty: z.number().int().nullable(),
  wine_vineyard: z.string().nullable(),
  wine_web_url: z.string().nullable(),
  wine_drink_start: z.string().nullable(),
  wine_drink_end: z.string().nullable(),
  wine_producer_uuid: z.string().nullable(),
  redirect_to: z.string().nullable(),
  item_tsv: z.string().nullable(),
  wine_ml: z.string().nullable(),
  cola_fanciful_name: z.string().nullable(),
  wd_varietal: z.string().nullable(),
  wd_region: z.string().nullable(),
  is_blend: z.string().nullable(),
  price_range: z.string().nullable(),
  item_lbs: z.string().nullable(),
  category: z.string().nullable(),
  blur_bottle_img: z.string().nullable(),
  blur_label_img: z.string().nullable(),
})

export type item_detail = z.infer<typeof item_detailSchema>

/////////////////////////////////////////
// ITEM SKU SCHEMA
/////////////////////////////////////////

export const item_skuSchema = z.object({
  sku: z.string(),
  srp: z.instanceof(Prisma.Decimal, { message: "Field 'srp' must be a Decimal. Location: ['Models', 'item_sku']"}).nullable(),
  is_autographed: z.boolean().nullable(),
  is_taxable: z.boolean().nullable(),
  is_counted_for_shipment: z.boolean().nullable(),
  drink_by_date: z.coerce.date().nullable(),
  sku_itemdetail_guid: z.string().nullable(),
  index: z.number().int().nullable(),
  last_order_date: z.coerce.date().nullable(),
  last_restock: z.coerce.date().nullable(),
  last_stock_update: z.coerce.date().nullable(),
  last_stock_qty: z.number().int(),
  next_delivery_date: z.coerce.date().nullable(),
  last_count_owed: z.number().int(),
  x_friendly_name: z.string().nullable(),
  scramble_letters: z.string().nullable(),
  scramble_qty_allowed: z.number().int(),
  sku_allowed_states: z.string().nullable(),
  comment: z.string().nullable(),
  sku_tsv: z.string().nullable(),
  sku_cogs_unit: z.instanceof(Prisma.Decimal, { message: "Field 'sku_cogs_unit' must be a Decimal. Location: ['Models', 'item_sku']"}),
  is_pallet_program: z.boolean(),
  is_deprecated: z.boolean().nullable(),
  sku_varietal: z.string().nullable(),
  sku_region: z.string().nullable(),
  last_count_shipped: z.number().int(),
  is_in_wd: z.boolean(),
  sku_was_swap: z.boolean(),
  sku_sort: z.number().int(),
  sku_preswap: z.string().nullable(),
  sku_postswap: z.string().nullable(),
  sku_qty_reserved: z.number().int().nullable(),
  sku_cogs_is_estimated: z.boolean(),
  sku_taxset_id: z.string().nullable(),
  qty_offsite: z.number().int(),
  sku_external_id: z.string().nullable(),
  sku_fq_lo: z.number().int(),
  sku_fq_hi: z.number().int(),
  sku_velocity: z.instanceof(Prisma.Decimal, { message: "Field 'sku_velocity' must be a Decimal. Location: ['Models', 'item_sku']"}),
  last_vip_qty: z.number().int(),
  last_open_xfer_qty: z.number().int(),
  sku_is_dropship: z.boolean(),
  sku_ship_alone: z.boolean(),
  sku_supplier_guid: z.string().nullable(),
  next_stock_update: z.coerce.date().nullable(),
  sku_exclude_metrics: z.boolean().nullable(),
  netsuite_synced: z.coerce.date().nullable(),
  category: z.string().nullable(),
  country_code: z.string().nullable(),
  unlimited_allocation_until: z.coerce.date().nullable(),
  avg_purchase_price: z.instanceof(Prisma.Decimal, { message: "Field 'avg_purchase_price' must be a Decimal. Location: ['Models', 'item_sku']"}).nullable(),
  last_purchase_price: z.instanceof(Prisma.Decimal, { message: "Field 'last_purchase_price' must be a Decimal. Location: ['Models', 'item_sku']"}).nullable(),
  dont_buy_after: z.coerce.date().nullable(),
  pack_size: z.number().int().nullable(),
})

export type item_sku = z.infer<typeof item_skuSchema>

/////////////////////////////////////////
// NEW CUSTOMER DATA AFTER BK FROM LCC SCHEMA
/////////////////////////////////////////

export const new_customer_data_after_bk_from_lccSchema = z.object({
  Customer_ID: z.bigint(),
  Customer_Created_At: z.string().nullable(),
  First_Order_Date: z.string().nullable(),
  Email: z.string().nullable(),
  First_Name: z.string().nullable(),
  Last_Name: z.string().nullable(),
  Billing_Address_First_Name: z.string().nullable(),
  Billing_Address_Last_Name: z.string().nullable(),
  Billing_Address_Company: z.string().nullable(),
  Billing_Address_Address_1: z.string().nullable(),
  Billing_Address_Address_2: z.string().nullable(),
  Billing_Address_City: z.string().nullable(),
  Billing_Address_State: z.string().nullable(),
  Billing_Address_Postcode: z.string().nullable(),
  Billing_Address_Country: z.string().nullable(),
  Billing_Address_Email: z.string().nullable(),
  Billing_Address_Phone: z.string().nullable(),
  Shipping_Address_First_Name: z.string().nullable(),
  Shipping_Address_Last_Name: z.string().nullable(),
  Shipping_Address_Company: z.string().nullable(),
  Shipping_Address_Address_1: z.string().nullable(),
  Shipping_Address_Address_2: z.string().nullable(),
  Shipping_Address_City: z.string().nullable(),
  Shipping_Address_State: z.string().nullable(),
  Shipping_Address_Postcode: z.string().nullable(),
  Shipping_Address_Country: z.string().nullable(),
  Total_Spent: z.instanceof(Prisma.Decimal, { message: "Field 'Total_Spent' must be a Decimal. Location: ['Models', 'new_customer_data_after_bk_from_lcc']"}).nullable(),
  Order_Count: z.number().int().nullable(),
  Item_Count: z.number().int().nullable(),
  Last_Order_Date: z.string().nullable(),
})

export type new_customer_data_after_bk_from_lcc = z.infer<typeof new_customer_data_after_bk_from_lccSchema>

/////////////////////////////////////////
// OLD ORDER DATA 500 K ORDERS SCHEMA
/////////////////////////////////////////

export const old_order_data_500k_ordersSchema = z.object({
  order_guid: z.string(),
  order_user: z.string().nullable(),
  order_qty: z.number().int().nullable(),
  order_total_price: z.instanceof(Prisma.Decimal, { message: "Field 'order_total_price' must be a Decimal. Location: ['Models', 'old_order_data_500k_orders']"}).nullable(),
  order_timestamp: z.coerce.date().nullable(),
  order_offer_id: z.string().nullable(),
  order_user_nth: z.string().nullable(),
  order_auth_date: z.coerce.date().nullable(),
  order_transaction_id: z.bigint().nullable(),
  order_yymm_pst: z.string().nullable(),
  order_type: z.string().nullable(),
  offer_guid: z.string().nullable(),
  offer_title: z.string().nullable(),
  offer_price: z.string().nullable(),
  offer_meta_title: z.string().nullable(),
  offer_subtitle: z.string().nullable(),
  offer_primary_varietal: z.string().nullable(),
})

export type old_order_data_500k_orders = z.infer<typeof old_order_data_500k_ordersSchema>

/////////////////////////////////////////
// ORDER LIST SCHEMA
/////////////////////////////////////////

export const order_listSchema = z.object({
  x_order_is_authorized_or_captured: order_list_x_order_is_authorized_or_capturedSchema.nullable(),
  order_is_void: order_list_order_is_voidSchema.nullable(),
  order_type: order_list_order_typeSchema.nullable(),
  order_guid: z.string(),
  order_sku_list: z.string().nullable(),
  order_user: z.string().nullable(),
  order_billing_address: z.string().nullable(),
  order_qty: z.number().int().nullable(),
  order_total_price: z.instanceof(Prisma.Decimal, { message: "Field 'order_total_price' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_discount: z.instanceof(Prisma.Decimal, { message: "Field 'order_discount' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_credit_discount: z.instanceof(Prisma.Decimal, { message: "Field 'order_credit_discount' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_tax: z.instanceof(Prisma.Decimal, { message: "Field 'order_tax' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_timestamp: z.string().nullable(),
  order_status: z.string().nullable(),
  order_payment_status: z.string().nullable(),
  order_offer_id: z.string().nullable(),
  order_utm_source: z.string().nullable(),
  order_utm_medium: z.string().nullable(),
  order_utm_campaign: z.string().nullable(),
  order_user_nth: z.number().int().nullable(),
  order_auth_code: z.string().nullable(),
  order_auth_date: z.string().nullable(),
  order_billing_instrument: z.string().nullable(),
  order_transaction_id: z.string().nullable(),
  x_user_email: z.string().nullable(),
  order_unit_price: z.instanceof(Prisma.Decimal, { message: "Field 'order_unit_price' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_promo_code: z.string().nullable(),
  cohort_mth: z.string().nullable(),
  order_reveal_date: z.string().nullable(),
  cohort_fp_mth: z.instanceof(Prisma.Decimal, { message: "Field 'cohort_fp_mth' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  is_test_order: z.string().nullable(),
  order_rejected_dt: z.string().nullable(),
  order_upgraded_value: z.instanceof(Prisma.Decimal, { message: "Field 'order_upgraded_value' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_allocated_cogs: z.instanceof(Prisma.Decimal, { message: "Field 'order_allocated_cogs' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_cohort_fpdate: z.string().nullable(),
  order_cc_fee: z.instanceof(Prisma.Decimal, { message: "Field 'order_cc_fee' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_refund_transaction_id: z.string().nullable(),
  order_original_mf: z.string().nullable(),
  order_yymm_pst: z.string().nullable(),
  order_mc_eid: z.string().nullable(),
  order_mc_cid: z.string().nullable(),
  order_subscription_id: z.string().nullable(),
  order_cash_in: z.instanceof(Prisma.Decimal, { message: "Field 'order_cash_in' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_c: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_c' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_f: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_f' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_s: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_s' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_r: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_r' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_t: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_t' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_m: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_m' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_g: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_g' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_disc_other: z.instanceof(Prisma.Decimal, { message: "Field 'order_disc_other' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_ship_revenue: z.instanceof(Prisma.Decimal, { message: "Field 'order_ship_revenue' must be a Decimal. Location: ['Models', 'order_list']"}).nullable(),
  order_previous_order: z.string().nullable(),
  utm_content: z.string().nullable(),
  utm_term: z.string().nullable(),
  netsuite_synced: z.string().nullable(),
  payment_intent_id: z.string().nullable(),
  utm_device: z.string().nullable(),
  utm_placement: z.string().nullable(),
  utm_site: z.string().nullable(),
})

export type order_list = z.infer<typeof order_listSchema>

/////////////////////////////////////////
// USER LIST SCHEMA
/////////////////////////////////////////

export const user_listSchema = z.object({
  user_guid: z.string(),
  user_birthday: z.string().nullable(),
  user_default_address: z.string().nullable(),
  user_email: z.string().nullable(),
  user_fname: z.string().nullable(),
  user_lname: z.string().nullable(),
  user_is21: z.string().nullable(),
  user_is_testaccount: z.string().nullable(),
  user_image_url: z.string().nullable(),
  user_url_profile: z.string().nullable(),
  user_name: z.string().nullable(),
  user_login_dt: z.string().nullable(),
  user_signup_dt: z.string().nullable(),
  user_last_purchase_dt: z.coerce.date().nullable(),
  user_first_purchase_dt: z.coerce.date().nullable(),
  user_referred_by_id: z.string().nullable(),
  user_referral_domain: z.string().nullable(),
  session_utm_source: z.string().nullable(),
  session_utm_campaign: z.string().nullable(),
  session_utm_medium: z.string().nullable(),
  x_life_credit: z.instanceof(Prisma.Decimal, { message: "Field 'x_life_credit' must be a Decimal. Location: ['Models', 'user_list']"}).nullable(),
  x_total_qty: z.number().int().nullable(),
  x_life_spend: z.instanceof(Prisma.Decimal, { message: "Field 'x_life_spend' must be a Decimal. Location: ['Models', 'user_list']"}).nullable(),
  x_life_discount: z.instanceof(Prisma.Decimal, { message: "Field 'x_life_discount' must be a Decimal. Location: ['Models', 'user_list']"}).nullable(),
  x_acquisition_cost: z.instanceof(Prisma.Decimal, { message: "Field 'x_acquisition_cost' must be a Decimal. Location: ['Models', 'user_list']"}).nullable(),
  x_achievement_points: z.number().int().nullable(),
  user_is_private: z.string().nullable(),
  user_is_red_buyer: z.string().nullable(),
  user_is_white_buyer: z.string().nullable(),
  user_is_largeformat_buyer: z.string().nullable(),
  user_min_price: z.string().nullable(),
  user_max_price: z.string().nullable(),
  user_avg_price: z.string().nullable(),
  user_is_push: z.string().nullable(),
  user_outreach_dt: z.string().nullable(),
  ls_is_student: z.string().nullable(),
  ls_is_personal_email: z.string().nullable(),
  ls_grade: z.string().nullable(),
  ls_company_state_code: z.string().nullable(),
  ls_fname: z.string().nullable(),
  ls_lname: z.string().nullable(),
  ls_location_state: z.string().nullable(),
  ls_company_name: z.string().nullable(),
  ls_company_industry: z.string().nullable(),
  ls_company_country: z.string().nullable(),
  ls_company_emps: z.string().nullable(),
  ls_is_spam: z.string().nullable(),
  ls_customer_fit: z.string().nullable(),
  ls_customer_fit_ext: z.string().nullable(),
  x_order_count: z.number().int().nullable(),
  user_inactive_dt: z.string().nullable(),
  user_email_n: z.string().nullable(),
  user_note: z.string().nullable(),
  user_expiry: z.string().nullable(),
  user_last_ship_date: z.string().nullable(),
  x_cloud_value: z.instanceof(Prisma.Decimal, { message: "Field 'x_cloud_value' must be a Decimal. Location: ['Models', 'user_list']"}).nullable(),
  x_cloud_count: z.number().int().nullable(),
  user_is_vip: z.string().nullable(),
  user_signup_ym_pst: z.string().nullable(),
  suspended_at: z.string().nullable(),
  last_synced_at: z.string().nullable(),
  is_admin: z.string().nullable(),
  utm_content: z.string().nullable(),
  utm_term: z.string().nullable(),
  user_password: z.string().nullable(),
  stripe_customer_id: z.string().nullable(),
  google_id: z.string().nullable(),
  utm_device: z.string().nullable(),
  utm_placement: z.string().nullable(),
  utm_site: z.string().nullable(),
  holdout_num: z.string().nullable(),
})

export type user_list = z.infer<typeof user_listSchema>

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const usersSchema = z.object({
  id: z.bigint(),
  email: z.string(),
  password: z.string().nullable(),
  salt: z.bigint(),
  alias: z.string().nullable(),
  ax_maxmin: z.boolean(),
  ax_homes: z.boolean().nullable(),
  ax_tax: z.boolean(),
  ax_evdb: z.boolean().nullable(),
  ax_spgp: z.boolean(),
  ax_uc: z.boolean(),
})

export type users = z.infer<typeof usersSchema>

/////////////////////////////////////////
// ORDER LOCK SCHEMA
/////////////////////////////////////////

export const order_lockSchema = z.object({
  order_id: z.string(),
  locked_at: z.coerce.date(),
})

export type order_lock = z.infer<typeof order_lockSchema>

/////////////////////////////////////////
// V 3 AUDIT LOG SCHEMA
/////////////////////////////////////////

export const v3_audit_logSchema = z.object({
  id: z.bigint(),
  event_ts: z.coerce.date(),
  event_name: z.string(),
  event_ext: z.string().nullable(),
  event_userid: z.bigint().nullable(),
  offer_id: z.number().int().nullable(),
  order_id: z.bigint().nullable(),
  time_taken_ms: z.number().int().nullable(),
})

export type v3_audit_log = z.infer<typeof v3_audit_logSchema>

/////////////////////////////////////////
// V 3 OFFER SCHEMA
/////////////////////////////////////////

export const v3_offerSchema = z.object({
  offer_id: z.number().int(),
  offer_name: z.string(),
  offer_variant_id: z.string(),
  offer_product_name: z.string(),
})

export type v3_offer = z.infer<typeof v3_offerSchema>

/////////////////////////////////////////
// V 3 OFFER MANIFEST SCHEMA
/////////////////////////////////////////

export const v3_offer_manifestSchema = z.object({
  m_id: z.bigint(),
  offer_id: z.bigint(),
  mf_variant: z.string(),
  assignee_id: z.string().nullable(),
  assignment_ordering: z.number(),
})

export type v3_offer_manifest = z.infer<typeof v3_offer_manifestSchema>

/////////////////////////////////////////
// V 3 ORDER TO VARIANT SCHEMA
/////////////////////////////////////////

export const v3_order_to_variantSchema = z.object({
  order_id: z.string(),
  variant_id: z.string(),
  offer_id: z.number().int().nullable(),
})

export type v3_order_to_variant = z.infer<typeof v3_order_to_variantSchema>

/////////////////////////////////////////
// INVENTORY SCHEMA
/////////////////////////////////////////

export const inventorySchema = z.object({
  sku: z.string(),
  description: z.string().nullable(),
  units_on_hand: z.number().int().nullable(),
  cost_basis_unit: z.instanceof(Prisma.Decimal, { message: "Field 'cost_basis_unit' must be a Decimal. Location: ['Models', 'inventory']"}).nullable(),
  srp_unit: z.instanceof(Prisma.Decimal, { message: "Field 'srp_unit' must be a Decimal. Location: ['Models', 'inventory']"}).nullable(),
})

export type inventory = z.infer<typeof inventorySchema>

/////////////////////////////////////////
// COMPUTED BUYER VARIETALS SCHEMA
/////////////////////////////////////////

export const computed_buyer_varietalsSchema = z.object({
  id: z.number().int(),
  winner_guid: z.string(),
  cola_varietal: z.string(),
  total_paid: z.instanceof(Prisma.Decimal, { message: "Field 'total_paid' must be a Decimal. Location: ['Models', 'computed_buyer_varietals']"}),
})

export type computed_buyer_varietals = z.infer<typeof computed_buyer_varietalsSchema>

/////////////////////////////////////////
// MEMBER LIST EXPORT 20230706 SCHEMA
/////////////////////////////////////////

export const member_list_export_2023_07_06Schema = z.object({
  Email: z.string().nullable(),
  Klaviyo_ID: z.string(),
  First_Name: z.string().nullable(),
  Last_Name: z.string().nullable(),
  Phone_Number: z.string().nullable(),
  Address: z.string().nullable(),
  Address_2: z.string().nullable(),
  City: z.string().nullable(),
  State___Region: z.string().nullable(),
  Country: z.string().nullable(),
  Zip_Code: z.string().nullable(),
})

export type member_list_export_2023_07_06 = z.infer<typeof member_list_export_2023_07_06Schema>

/////////////////////////////////////////
// SHOPIFY PRODUCT VARIANT SCHEMA
/////////////////////////////////////////

export const shopify_product_variantSchema = z.object({
  variantId: z.string(),
  productId: z.string(),
  productName: z.string(),
  variantName: z.string(),
  variantPrice: z.string().nullable(),
  variantCompareAtPrice: z.string().nullable(),
  variantInventoryQuantity: z.number().int(),
  variantSku: z.string(),
  variantWeight: z.string().nullable(),
})

export type shopify_product_variant = z.infer<typeof shopify_product_variantSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CUSTOMER LIST JULY 2023
//------------------------------------------------------

export const customer_list_july_2023SelectSchema: z.ZodType<Prisma.customer_list_july_2023Select> = z.object({
  customer_name: z.boolean().optional(),
  email: z.boolean().optional(),
  orders: z.boolean().optional(),
  ltv: z.boolean().optional(),
  first_order: z.boolean().optional(),
  last_order: z.boolean().optional(),
}).strict()

// ITEM DETAIL
//------------------------------------------------------

export const item_detailSelectSchema: z.ZodType<Prisma.item_detailSelect> = z.object({
  itemdetail_guid: z.boolean().optional(),
  cola_id: z.boolean().optional(),
  cola_name: z.boolean().optional(),
  cola_region: z.boolean().optional(),
  cola_appellation: z.boolean().optional(),
  cola_varietal: z.boolean().optional(),
  cola_vintage: z.boolean().optional(),
  cola_abv: z.boolean().optional(),
  about_wine: z.boolean().optional(),
  tasting_notes: z.boolean().optional(),
  winemaker_notes: z.boolean().optional(),
  label_img_url: z.boolean().optional(),
  bottle_img_url: z.boolean().optional(),
  retail_price: z.boolean().optional(),
  winery_id: z.boolean().optional(),
  url_key: z.boolean().optional(),
  brand: z.boolean().optional(),
  country_code: z.boolean().optional(),
  upc: z.boolean().optional(),
  is_wine: z.boolean().optional(),
  is_beer: z.boolean().optional(),
  is_liquor: z.boolean().optional(),
  is_sparkling: z.boolean().optional(),
  is_cult: z.boolean().optional(),
  is_small_production: z.boolean().optional(),
  ct_wine_id: z.boolean().optional(),
  ct_producer_id: z.boolean().optional(),
  ct_likes: z.boolean().optional(),
  ct_tasting_notes: z.boolean().optional(),
  ct_review: z.boolean().optional(),
  ct_community_score: z.boolean().optional(),
  ct_qty: z.boolean().optional(),
  wine_vineyard: z.boolean().optional(),
  wine_web_url: z.boolean().optional(),
  wine_drink_start: z.boolean().optional(),
  wine_drink_end: z.boolean().optional(),
  wine_producer_uuid: z.boolean().optional(),
  redirect_to: z.boolean().optional(),
  item_tsv: z.boolean().optional(),
  wine_ml: z.boolean().optional(),
  cola_fanciful_name: z.boolean().optional(),
  wd_varietal: z.boolean().optional(),
  wd_region: z.boolean().optional(),
  is_blend: z.boolean().optional(),
  price_range: z.boolean().optional(),
  item_lbs: z.boolean().optional(),
  category: z.boolean().optional(),
  blur_bottle_img: z.boolean().optional(),
  blur_label_img: z.boolean().optional(),
}).strict()

// ITEM SKU
//------------------------------------------------------

export const item_skuSelectSchema: z.ZodType<Prisma.item_skuSelect> = z.object({
  sku: z.boolean().optional(),
  srp: z.boolean().optional(),
  is_autographed: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_counted_for_shipment: z.boolean().optional(),
  drink_by_date: z.boolean().optional(),
  sku_itemdetail_guid: z.boolean().optional(),
  index: z.boolean().optional(),
  last_order_date: z.boolean().optional(),
  last_restock: z.boolean().optional(),
  last_stock_update: z.boolean().optional(),
  last_stock_qty: z.boolean().optional(),
  next_delivery_date: z.boolean().optional(),
  last_count_owed: z.boolean().optional(),
  x_friendly_name: z.boolean().optional(),
  scramble_letters: z.boolean().optional(),
  scramble_qty_allowed: z.boolean().optional(),
  sku_allowed_states: z.boolean().optional(),
  comment: z.boolean().optional(),
  sku_tsv: z.boolean().optional(),
  sku_cogs_unit: z.boolean().optional(),
  is_pallet_program: z.boolean().optional(),
  is_deprecated: z.boolean().optional(),
  sku_varietal: z.boolean().optional(),
  sku_region: z.boolean().optional(),
  last_count_shipped: z.boolean().optional(),
  is_in_wd: z.boolean().optional(),
  sku_was_swap: z.boolean().optional(),
  sku_sort: z.boolean().optional(),
  sku_preswap: z.boolean().optional(),
  sku_postswap: z.boolean().optional(),
  sku_qty_reserved: z.boolean().optional(),
  sku_cogs_is_estimated: z.boolean().optional(),
  sku_taxset_id: z.boolean().optional(),
  qty_offsite: z.boolean().optional(),
  sku_external_id: z.boolean().optional(),
  sku_fq_lo: z.boolean().optional(),
  sku_fq_hi: z.boolean().optional(),
  sku_velocity: z.boolean().optional(),
  last_vip_qty: z.boolean().optional(),
  last_open_xfer_qty: z.boolean().optional(),
  sku_is_dropship: z.boolean().optional(),
  sku_ship_alone: z.boolean().optional(),
  sku_supplier_guid: z.boolean().optional(),
  next_stock_update: z.boolean().optional(),
  sku_exclude_metrics: z.boolean().optional(),
  netsuite_synced: z.boolean().optional(),
  category: z.boolean().optional(),
  country_code: z.boolean().optional(),
  unlimited_allocation_until: z.boolean().optional(),
  avg_purchase_price: z.boolean().optional(),
  last_purchase_price: z.boolean().optional(),
  dont_buy_after: z.boolean().optional(),
  pack_size: z.boolean().optional(),
}).strict()

// NEW CUSTOMER DATA AFTER BK FROM LCC
//------------------------------------------------------

export const new_customer_data_after_bk_from_lccSelectSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccSelect> = z.object({
  Customer_ID: z.boolean().optional(),
  Customer_Created_At: z.boolean().optional(),
  First_Order_Date: z.boolean().optional(),
  Email: z.boolean().optional(),
  First_Name: z.boolean().optional(),
  Last_Name: z.boolean().optional(),
  Billing_Address_First_Name: z.boolean().optional(),
  Billing_Address_Last_Name: z.boolean().optional(),
  Billing_Address_Company: z.boolean().optional(),
  Billing_Address_Address_1: z.boolean().optional(),
  Billing_Address_Address_2: z.boolean().optional(),
  Billing_Address_City: z.boolean().optional(),
  Billing_Address_State: z.boolean().optional(),
  Billing_Address_Postcode: z.boolean().optional(),
  Billing_Address_Country: z.boolean().optional(),
  Billing_Address_Email: z.boolean().optional(),
  Billing_Address_Phone: z.boolean().optional(),
  Shipping_Address_First_Name: z.boolean().optional(),
  Shipping_Address_Last_Name: z.boolean().optional(),
  Shipping_Address_Company: z.boolean().optional(),
  Shipping_Address_Address_1: z.boolean().optional(),
  Shipping_Address_Address_2: z.boolean().optional(),
  Shipping_Address_City: z.boolean().optional(),
  Shipping_Address_State: z.boolean().optional(),
  Shipping_Address_Postcode: z.boolean().optional(),
  Shipping_Address_Country: z.boolean().optional(),
  Total_Spent: z.boolean().optional(),
  Order_Count: z.boolean().optional(),
  Item_Count: z.boolean().optional(),
  Last_Order_Date: z.boolean().optional(),
}).strict()

// OLD ORDER DATA 500 K ORDERS
//------------------------------------------------------

export const old_order_data_500k_ordersSelectSchema: z.ZodType<Prisma.old_order_data_500k_ordersSelect> = z.object({
  order_guid: z.boolean().optional(),
  order_user: z.boolean().optional(),
  order_qty: z.boolean().optional(),
  order_total_price: z.boolean().optional(),
  order_timestamp: z.boolean().optional(),
  order_offer_id: z.boolean().optional(),
  order_user_nth: z.boolean().optional(),
  order_auth_date: z.boolean().optional(),
  order_transaction_id: z.boolean().optional(),
  order_yymm_pst: z.boolean().optional(),
  order_type: z.boolean().optional(),
  offer_guid: z.boolean().optional(),
  offer_title: z.boolean().optional(),
  offer_price: z.boolean().optional(),
  offer_meta_title: z.boolean().optional(),
  offer_subtitle: z.boolean().optional(),
  offer_primary_varietal: z.boolean().optional(),
}).strict()

// ORDER LIST
//------------------------------------------------------

export const order_listSelectSchema: z.ZodType<Prisma.order_listSelect> = z.object({
  order_guid: z.boolean().optional(),
  order_sku_list: z.boolean().optional(),
  order_user: z.boolean().optional(),
  order_billing_address: z.boolean().optional(),
  order_qty: z.boolean().optional(),
  order_total_price: z.boolean().optional(),
  order_discount: z.boolean().optional(),
  order_credit_discount: z.boolean().optional(),
  order_tax: z.boolean().optional(),
  order_timestamp: z.boolean().optional(),
  order_status: z.boolean().optional(),
  order_payment_status: z.boolean().optional(),
  order_offer_id: z.boolean().optional(),
  order_utm_source: z.boolean().optional(),
  order_utm_medium: z.boolean().optional(),
  order_utm_campaign: z.boolean().optional(),
  order_user_nth: z.boolean().optional(),
  order_auth_code: z.boolean().optional(),
  order_auth_date: z.boolean().optional(),
  order_billing_instrument: z.boolean().optional(),
  order_transaction_id: z.boolean().optional(),
  x_user_email: z.boolean().optional(),
  order_unit_price: z.boolean().optional(),
  order_promo_code: z.boolean().optional(),
  x_order_is_authorized_or_captured: z.boolean().optional(),
  cohort_mth: z.boolean().optional(),
  order_reveal_date: z.boolean().optional(),
  cohort_fp_mth: z.boolean().optional(),
  is_test_order: z.boolean().optional(),
  order_rejected_dt: z.boolean().optional(),
  order_upgraded_value: z.boolean().optional(),
  order_allocated_cogs: z.boolean().optional(),
  order_cohort_fpdate: z.boolean().optional(),
  order_cc_fee: z.boolean().optional(),
  order_refund_transaction_id: z.boolean().optional(),
  order_original_mf: z.boolean().optional(),
  order_yymm_pst: z.boolean().optional(),
  order_mc_eid: z.boolean().optional(),
  order_mc_cid: z.boolean().optional(),
  order_subscription_id: z.boolean().optional(),
  order_is_void: z.boolean().optional(),
  order_cash_in: z.boolean().optional(),
  order_disc_c: z.boolean().optional(),
  order_disc_f: z.boolean().optional(),
  order_disc_s: z.boolean().optional(),
  order_disc_r: z.boolean().optional(),
  order_disc_t: z.boolean().optional(),
  order_disc_m: z.boolean().optional(),
  order_disc_g: z.boolean().optional(),
  order_disc_other: z.boolean().optional(),
  order_ship_revenue: z.boolean().optional(),
  order_previous_order: z.boolean().optional(),
  utm_content: z.boolean().optional(),
  utm_term: z.boolean().optional(),
  netsuite_synced: z.boolean().optional(),
  payment_intent_id: z.boolean().optional(),
  utm_device: z.boolean().optional(),
  utm_placement: z.boolean().optional(),
  utm_site: z.boolean().optional(),
  order_type: z.boolean().optional(),
}).strict()

// USER LIST
//------------------------------------------------------

export const user_listSelectSchema: z.ZodType<Prisma.user_listSelect> = z.object({
  user_guid: z.boolean().optional(),
  user_birthday: z.boolean().optional(),
  user_default_address: z.boolean().optional(),
  user_email: z.boolean().optional(),
  user_fname: z.boolean().optional(),
  user_lname: z.boolean().optional(),
  user_is21: z.boolean().optional(),
  user_is_testaccount: z.boolean().optional(),
  user_image_url: z.boolean().optional(),
  user_url_profile: z.boolean().optional(),
  user_name: z.boolean().optional(),
  user_login_dt: z.boolean().optional(),
  user_signup_dt: z.boolean().optional(),
  user_last_purchase_dt: z.boolean().optional(),
  user_first_purchase_dt: z.boolean().optional(),
  user_referred_by_id: z.boolean().optional(),
  user_referral_domain: z.boolean().optional(),
  session_utm_source: z.boolean().optional(),
  session_utm_campaign: z.boolean().optional(),
  session_utm_medium: z.boolean().optional(),
  x_life_credit: z.boolean().optional(),
  x_total_qty: z.boolean().optional(),
  x_life_spend: z.boolean().optional(),
  x_life_discount: z.boolean().optional(),
  x_acquisition_cost: z.boolean().optional(),
  x_achievement_points: z.boolean().optional(),
  user_is_private: z.boolean().optional(),
  user_is_red_buyer: z.boolean().optional(),
  user_is_white_buyer: z.boolean().optional(),
  user_is_largeformat_buyer: z.boolean().optional(),
  user_min_price: z.boolean().optional(),
  user_max_price: z.boolean().optional(),
  user_avg_price: z.boolean().optional(),
  user_is_push: z.boolean().optional(),
  user_outreach_dt: z.boolean().optional(),
  ls_is_student: z.boolean().optional(),
  ls_is_personal_email: z.boolean().optional(),
  ls_grade: z.boolean().optional(),
  ls_company_state_code: z.boolean().optional(),
  ls_fname: z.boolean().optional(),
  ls_lname: z.boolean().optional(),
  ls_location_state: z.boolean().optional(),
  ls_company_name: z.boolean().optional(),
  ls_company_industry: z.boolean().optional(),
  ls_company_country: z.boolean().optional(),
  ls_company_emps: z.boolean().optional(),
  ls_is_spam: z.boolean().optional(),
  ls_customer_fit: z.boolean().optional(),
  ls_customer_fit_ext: z.boolean().optional(),
  x_order_count: z.boolean().optional(),
  user_inactive_dt: z.boolean().optional(),
  user_email_n: z.boolean().optional(),
  user_note: z.boolean().optional(),
  user_expiry: z.boolean().optional(),
  user_last_ship_date: z.boolean().optional(),
  x_cloud_value: z.boolean().optional(),
  x_cloud_count: z.boolean().optional(),
  user_is_vip: z.boolean().optional(),
  user_signup_ym_pst: z.boolean().optional(),
  suspended_at: z.boolean().optional(),
  last_synced_at: z.boolean().optional(),
  is_admin: z.boolean().optional(),
  utm_content: z.boolean().optional(),
  utm_term: z.boolean().optional(),
  user_password: z.boolean().optional(),
  stripe_customer_id: z.boolean().optional(),
  google_id: z.boolean().optional(),
  utm_device: z.boolean().optional(),
  utm_placement: z.boolean().optional(),
  utm_site: z.boolean().optional(),
  holdout_num: z.boolean().optional(),
}).strict()

// USERS
//------------------------------------------------------

export const usersSelectSchema: z.ZodType<Prisma.usersSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  salt: z.boolean().optional(),
  alias: z.boolean().optional(),
  ax_maxmin: z.boolean().optional(),
  ax_homes: z.boolean().optional(),
  ax_tax: z.boolean().optional(),
  ax_evdb: z.boolean().optional(),
  ax_spgp: z.boolean().optional(),
  ax_uc: z.boolean().optional(),
}).strict()

// ORDER LOCK
//------------------------------------------------------

export const order_lockSelectSchema: z.ZodType<Prisma.order_lockSelect> = z.object({
  order_id: z.boolean().optional(),
  locked_at: z.boolean().optional(),
}).strict()

// V 3 AUDIT LOG
//------------------------------------------------------

export const v3_audit_logSelectSchema: z.ZodType<Prisma.v3_audit_logSelect> = z.object({
  id: z.boolean().optional(),
  event_ts: z.boolean().optional(),
  event_name: z.boolean().optional(),
  event_ext: z.boolean().optional(),
  event_userid: z.boolean().optional(),
  offer_id: z.boolean().optional(),
  order_id: z.boolean().optional(),
  time_taken_ms: z.boolean().optional(),
}).strict()

// V 3 OFFER
//------------------------------------------------------

export const v3_offerSelectSchema: z.ZodType<Prisma.v3_offerSelect> = z.object({
  offer_id: z.boolean().optional(),
  offer_name: z.boolean().optional(),
  offer_variant_id: z.boolean().optional(),
  offer_product_name: z.boolean().optional(),
}).strict()

// V 3 OFFER MANIFEST
//------------------------------------------------------

export const v3_offer_manifestSelectSchema: z.ZodType<Prisma.v3_offer_manifestSelect> = z.object({
  m_id: z.boolean().optional(),
  offer_id: z.boolean().optional(),
  mf_variant: z.boolean().optional(),
  assignee_id: z.boolean().optional(),
  assignment_ordering: z.boolean().optional(),
}).strict()

// V 3 ORDER TO VARIANT
//------------------------------------------------------

export const v3_order_to_variantSelectSchema: z.ZodType<Prisma.v3_order_to_variantSelect> = z.object({
  order_id: z.boolean().optional(),
  variant_id: z.boolean().optional(),
  offer_id: z.boolean().optional(),
}).strict()

// INVENTORY
//------------------------------------------------------

export const inventorySelectSchema: z.ZodType<Prisma.inventorySelect> = z.object({
  sku: z.boolean().optional(),
  description: z.boolean().optional(),
  units_on_hand: z.boolean().optional(),
  cost_basis_unit: z.boolean().optional(),
  srp_unit: z.boolean().optional(),
}).strict()

// COMPUTED BUYER VARIETALS
//------------------------------------------------------

export const computed_buyer_varietalsSelectSchema: z.ZodType<Prisma.computed_buyer_varietalsSelect> = z.object({
  id: z.boolean().optional(),
  winner_guid: z.boolean().optional(),
  cola_varietal: z.boolean().optional(),
  total_paid: z.boolean().optional(),
}).strict()

// MEMBER LIST EXPORT 20230706
//------------------------------------------------------

export const member_list_export_2023_07_06SelectSchema: z.ZodType<Prisma.member_list_export_2023_07_06Select> = z.object({
  Email: z.boolean().optional(),
  Klaviyo_ID: z.boolean().optional(),
  First_Name: z.boolean().optional(),
  Last_Name: z.boolean().optional(),
  Phone_Number: z.boolean().optional(),
  Address: z.boolean().optional(),
  Address_2: z.boolean().optional(),
  City: z.boolean().optional(),
  State___Region: z.boolean().optional(),
  Country: z.boolean().optional(),
  Zip_Code: z.boolean().optional(),
}).strict()

// SHOPIFY PRODUCT VARIANT
//------------------------------------------------------

export const shopify_product_variantSelectSchema: z.ZodType<Prisma.shopify_product_variantSelect> = z.object({
  variantId: z.boolean().optional(),
  productId: z.boolean().optional(),
  productName: z.boolean().optional(),
  variantName: z.boolean().optional(),
  variantPrice: z.boolean().optional(),
  variantCompareAtPrice: z.boolean().optional(),
  variantInventoryQuantity: z.boolean().optional(),
  variantSku: z.boolean().optional(),
  variantWeight: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const customer_list_july_2023WhereInputSchema: z.ZodType<Prisma.customer_list_july_2023WhereInput> = z.object({
  AND: z.union([ z.lazy(() => customer_list_july_2023WhereInputSchema), z.lazy(() => customer_list_july_2023WhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => customer_list_july_2023WhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => customer_list_july_2023WhereInputSchema), z.lazy(() => customer_list_july_2023WhereInputSchema).array() ]).optional(),
  customer_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  orders: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  ltv: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  first_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const customer_list_july_2023OrderByWithRelationInputSchema: z.ZodType<Prisma.customer_list_july_2023OrderByWithRelationInput> = z.object({
  customer_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  orders: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ltv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  first_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => customer_list_july_2023OrderByRelevanceInputSchema).optional(),
}).strict();

export const customer_list_july_2023WhereUniqueInputSchema: z.ZodType<Prisma.customer_list_july_2023WhereUniqueInput> = z.object({
  email: z.string(),
})
.and(z.object({
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => customer_list_july_2023WhereInputSchema), z.lazy(() => customer_list_july_2023WhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => customer_list_july_2023WhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => customer_list_july_2023WhereInputSchema), z.lazy(() => customer_list_july_2023WhereInputSchema).array() ]).optional(),
  customer_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  orders: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  ltv: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  first_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict());

export const customer_list_july_2023OrderByWithAggregationInputSchema: z.ZodType<Prisma.customer_list_july_2023OrderByWithAggregationInput> = z.object({
  customer_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  orders: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ltv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  first_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => customer_list_july_2023CountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => customer_list_july_2023AvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => customer_list_july_2023MaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => customer_list_july_2023MinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => customer_list_july_2023SumOrderByAggregateInputSchema).optional(),
}).strict();

export const customer_list_july_2023ScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.customer_list_july_2023ScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => customer_list_july_2023ScalarWhereWithAggregatesInputSchema), z.lazy(() => customer_list_july_2023ScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => customer_list_july_2023ScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => customer_list_july_2023ScalarWhereWithAggregatesInputSchema), z.lazy(() => customer_list_july_2023ScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  customer_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  orders: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  ltv: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  first_order: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  last_order: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const item_detailWhereInputSchema: z.ZodType<Prisma.item_detailWhereInput> = z.object({
  AND: z.union([ z.lazy(() => item_detailWhereInputSchema), z.lazy(() => item_detailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => item_detailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => item_detailWhereInputSchema), z.lazy(() => item_detailWhereInputSchema).array() ]).optional(),
  itemdetail_guid: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cola_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_appellation: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_vintage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_abv: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  about_wine: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tasting_notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  winemaker_notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  label_img_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  bottle_img_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  retail_price: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  winery_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  url_key: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  brand: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  country_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  upc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_wine: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_beer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_liquor: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_sparkling: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_cult: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_small_production: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ct_wine_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  ct_producer_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  ct_likes: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  ct_tasting_notes: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  ct_review: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  ct_community_score: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ct_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  wine_vineyard: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_web_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_drink_start: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_drink_end: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_producer_uuid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  redirect_to: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  item_tsv: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_ml: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_fanciful_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wd_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wd_region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_blend: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  price_range: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  item_lbs: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  blur_bottle_img: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  blur_label_img: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const item_detailOrderByWithRelationInputSchema: z.ZodType<Prisma.item_detailOrderByWithRelationInput> = z.object({
  itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_appellation: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_vintage: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_abv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  about_wine: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tasting_notes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  winemaker_notes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  label_img_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  bottle_img_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  retail_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  winery_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  url_key: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  brand: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  country_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  upc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_wine: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_beer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_liquor: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_sparkling: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_cult: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_small_production: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_wine_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_producer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_likes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_tasting_notes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_review: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_community_score: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_vineyard: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_web_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_drink_start: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_drink_end: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_producer_uuid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  redirect_to: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  item_tsv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_ml: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_fanciful_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wd_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wd_region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_blend: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price_range: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  item_lbs: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  blur_bottle_img: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  blur_label_img: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => item_detailOrderByRelevanceInputSchema).optional(),
}).strict();

export const item_detailWhereUniqueInputSchema: z.ZodType<Prisma.item_detailWhereUniqueInput> = z.object({
  itemdetail_guid: z.string(),
})
.and(z.object({
  itemdetail_guid: z.string().optional(),
  AND: z.union([ z.lazy(() => item_detailWhereInputSchema), z.lazy(() => item_detailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => item_detailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => item_detailWhereInputSchema), z.lazy(() => item_detailWhereInputSchema).array() ]).optional(),
  cola_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_appellation: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_vintage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_abv: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  about_wine: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tasting_notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  winemaker_notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  label_img_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  bottle_img_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  retail_price: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  winery_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  url_key: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  brand: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  country_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  upc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_wine: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_beer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_liquor: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_sparkling: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_cult: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_small_production: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ct_wine_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  ct_producer_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  ct_likes: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  ct_tasting_notes: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  ct_review: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  ct_community_score: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ct_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  wine_vineyard: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_web_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_drink_start: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_drink_end: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_producer_uuid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  redirect_to: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  item_tsv: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wine_ml: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cola_fanciful_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wd_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  wd_region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_blend: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  price_range: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  item_lbs: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  blur_bottle_img: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  blur_label_img: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict());

export const item_detailOrderByWithAggregationInputSchema: z.ZodType<Prisma.item_detailOrderByWithAggregationInput> = z.object({
  itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_appellation: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_vintage: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_abv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  about_wine: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tasting_notes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  winemaker_notes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  label_img_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  bottle_img_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  retail_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  winery_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  url_key: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  brand: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  country_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  upc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_wine: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_beer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_liquor: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_sparkling: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_cult: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_small_production: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_wine_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_producer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_likes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_tasting_notes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_review: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_community_score: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ct_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_vineyard: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_web_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_drink_start: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_drink_end: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_producer_uuid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  redirect_to: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  item_tsv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wine_ml: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cola_fanciful_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wd_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  wd_region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_blend: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price_range: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  item_lbs: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  blur_bottle_img: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  blur_label_img: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => item_detailCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => item_detailAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => item_detailMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => item_detailMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => item_detailSumOrderByAggregateInputSchema).optional(),
}).strict();

export const item_detailScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.item_detailScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => item_detailScalarWhereWithAggregatesInputSchema), z.lazy(() => item_detailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => item_detailScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => item_detailScalarWhereWithAggregatesInputSchema), z.lazy(() => item_detailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  itemdetail_guid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cola_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cola_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cola_region: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cola_appellation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cola_varietal: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cola_vintage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cola_abv: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  about_wine: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  tasting_notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  winemaker_notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  label_img_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  bottle_img_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  retail_price: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  winery_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  url_key: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  brand: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  country_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  upc: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_wine: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_beer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_liquor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_sparkling: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_cult: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_small_production: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ct_wine_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  ct_producer_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  ct_likes: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  ct_tasting_notes: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  ct_review: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  ct_community_score: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ct_qty: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  wine_vineyard: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  wine_web_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  wine_drink_start: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  wine_drink_end: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  wine_producer_uuid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  redirect_to: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  item_tsv: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  wine_ml: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cola_fanciful_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  wd_varietal: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  wd_region: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_blend: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  price_range: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  item_lbs: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  blur_bottle_img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  blur_label_img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const item_skuWhereInputSchema: z.ZodType<Prisma.item_skuWhereInput> = z.object({
  AND: z.union([ z.lazy(() => item_skuWhereInputSchema), z.lazy(() => item_skuWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => item_skuWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => item_skuWhereInputSchema), z.lazy(() => item_skuWhereInputSchema).array() ]).optional(),
  sku: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  srp: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  is_autographed: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  is_taxable: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  is_counted_for_shipment: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  drink_by_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  sku_itemdetail_guid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  index: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  last_order_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_restock: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_stock_update: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_stock_qty: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  next_delivery_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_count_owed: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  x_friendly_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scramble_letters: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scramble_qty_allowed: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  sku_allowed_states: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_tsv: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_cogs_unit: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  is_pallet_program: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  is_deprecated: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  sku_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_count_shipped: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  is_in_wd: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_was_swap: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_sort: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  sku_preswap: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_postswap: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_qty_reserved: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  sku_cogs_is_estimated: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_taxset_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  qty_offsite: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  sku_external_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_fq_lo: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  sku_fq_hi: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  sku_velocity: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  last_vip_qty: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  last_open_xfer_qty: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  sku_is_dropship: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_ship_alone: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_supplier_guid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  next_stock_update: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  sku_exclude_metrics: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  netsuite_synced: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  category: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  country_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  unlimited_allocation_until: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  avg_purchase_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  last_purchase_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  dont_buy_after: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  pack_size: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
}).strict();

export const item_skuOrderByWithRelationInputSchema: z.ZodType<Prisma.item_skuOrderByWithRelationInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  srp: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_autographed: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_taxable: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_counted_for_shipment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  drink_by_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_itemdetail_guid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  index: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_order_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_restock: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_stock_update: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_stock_qty: z.lazy(() => SortOrderSchema).optional(),
  next_delivery_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_count_owed: z.lazy(() => SortOrderSchema).optional(),
  x_friendly_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scramble_letters: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scramble_qty_allowed: z.lazy(() => SortOrderSchema).optional(),
  sku_allowed_states: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_tsv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_cogs_unit: z.lazy(() => SortOrderSchema).optional(),
  is_pallet_program: z.lazy(() => SortOrderSchema).optional(),
  is_deprecated: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_count_shipped: z.lazy(() => SortOrderSchema).optional(),
  is_in_wd: z.lazy(() => SortOrderSchema).optional(),
  sku_was_swap: z.lazy(() => SortOrderSchema).optional(),
  sku_sort: z.lazy(() => SortOrderSchema).optional(),
  sku_preswap: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_postswap: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_qty_reserved: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_cogs_is_estimated: z.lazy(() => SortOrderSchema).optional(),
  sku_taxset_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  qty_offsite: z.lazy(() => SortOrderSchema).optional(),
  sku_external_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_fq_lo: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_hi: z.lazy(() => SortOrderSchema).optional(),
  sku_velocity: z.lazy(() => SortOrderSchema).optional(),
  last_vip_qty: z.lazy(() => SortOrderSchema).optional(),
  last_open_xfer_qty: z.lazy(() => SortOrderSchema).optional(),
  sku_is_dropship: z.lazy(() => SortOrderSchema).optional(),
  sku_ship_alone: z.lazy(() => SortOrderSchema).optional(),
  sku_supplier_guid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  next_stock_update: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_exclude_metrics: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  netsuite_synced: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  country_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  unlimited_allocation_until: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  avg_purchase_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_purchase_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  dont_buy_after: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  pack_size: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => item_skuOrderByRelevanceInputSchema).optional(),
}).strict();

export const item_skuWhereUniqueInputSchema: z.ZodType<Prisma.item_skuWhereUniqueInput> = z.object({
  sku: z.string(),
})
.and(z.object({
  sku: z.string().optional(),
  AND: z.union([ z.lazy(() => item_skuWhereInputSchema), z.lazy(() => item_skuWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => item_skuWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => item_skuWhereInputSchema), z.lazy(() => item_skuWhereInputSchema).array() ]).optional(),
  srp: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  is_autographed: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  is_taxable: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  is_counted_for_shipment: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  drink_by_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  sku_itemdetail_guid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  index: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  last_order_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_restock: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_stock_update: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_stock_qty: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  next_delivery_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_count_owed: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  x_friendly_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scramble_letters: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scramble_qty_allowed: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  sku_allowed_states: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_tsv: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_cogs_unit: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  is_pallet_program: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  is_deprecated: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  sku_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_count_shipped: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  is_in_wd: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_was_swap: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_sort: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  sku_preswap: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_postswap: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_qty_reserved: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  sku_cogs_is_estimated: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_taxset_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  qty_offsite: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  sku_external_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sku_fq_lo: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  sku_fq_hi: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  sku_velocity: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  last_vip_qty: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  last_open_xfer_qty: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  sku_is_dropship: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_ship_alone: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  sku_supplier_guid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  next_stock_update: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  sku_exclude_metrics: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  netsuite_synced: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  category: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  country_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  unlimited_allocation_until: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  avg_purchase_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  last_purchase_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  dont_buy_after: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  pack_size: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
}).strict());

export const item_skuOrderByWithAggregationInputSchema: z.ZodType<Prisma.item_skuOrderByWithAggregationInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  srp: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_autographed: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_taxable: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_counted_for_shipment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  drink_by_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_itemdetail_guid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  index: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_order_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_restock: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_stock_update: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_stock_qty: z.lazy(() => SortOrderSchema).optional(),
  next_delivery_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_count_owed: z.lazy(() => SortOrderSchema).optional(),
  x_friendly_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scramble_letters: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scramble_qty_allowed: z.lazy(() => SortOrderSchema).optional(),
  sku_allowed_states: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_tsv: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_cogs_unit: z.lazy(() => SortOrderSchema).optional(),
  is_pallet_program: z.lazy(() => SortOrderSchema).optional(),
  is_deprecated: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_count_shipped: z.lazy(() => SortOrderSchema).optional(),
  is_in_wd: z.lazy(() => SortOrderSchema).optional(),
  sku_was_swap: z.lazy(() => SortOrderSchema).optional(),
  sku_sort: z.lazy(() => SortOrderSchema).optional(),
  sku_preswap: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_postswap: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_qty_reserved: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_cogs_is_estimated: z.lazy(() => SortOrderSchema).optional(),
  sku_taxset_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  qty_offsite: z.lazy(() => SortOrderSchema).optional(),
  sku_external_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_fq_lo: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_hi: z.lazy(() => SortOrderSchema).optional(),
  sku_velocity: z.lazy(() => SortOrderSchema).optional(),
  last_vip_qty: z.lazy(() => SortOrderSchema).optional(),
  last_open_xfer_qty: z.lazy(() => SortOrderSchema).optional(),
  sku_is_dropship: z.lazy(() => SortOrderSchema).optional(),
  sku_ship_alone: z.lazy(() => SortOrderSchema).optional(),
  sku_supplier_guid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  next_stock_update: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sku_exclude_metrics: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  netsuite_synced: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  country_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  unlimited_allocation_until: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  avg_purchase_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_purchase_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  dont_buy_after: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  pack_size: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => item_skuCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => item_skuAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => item_skuMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => item_skuMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => item_skuSumOrderByAggregateInputSchema).optional(),
}).strict();

export const item_skuScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.item_skuScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => item_skuScalarWhereWithAggregatesInputSchema), z.lazy(() => item_skuScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => item_skuScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => item_skuScalarWhereWithAggregatesInputSchema), z.lazy(() => item_skuScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sku: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  srp: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  is_autographed: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
  is_taxable: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
  is_counted_for_shipment: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
  drink_by_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  sku_itemdetail_guid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  index: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  last_order_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_restock: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_stock_update: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_stock_qty: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  next_delivery_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  last_count_owed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  x_friendly_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  scramble_letters: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  scramble_qty_allowed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  sku_allowed_states: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  sku_tsv: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  sku_cogs_unit: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  is_pallet_program: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  is_deprecated: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
  sku_varietal: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  sku_region: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  last_count_shipped: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  is_in_wd: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  sku_was_swap: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  sku_sort: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  sku_preswap: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  sku_postswap: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  sku_qty_reserved: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  sku_cogs_is_estimated: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  sku_taxset_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  qty_offsite: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  sku_external_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  sku_fq_lo: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  sku_fq_hi: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  sku_velocity: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  last_vip_qty: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  last_open_xfer_qty: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  sku_is_dropship: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  sku_ship_alone: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  sku_supplier_guid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  next_stock_update: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  sku_exclude_metrics: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
  netsuite_synced: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  category: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  country_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  unlimited_allocation_until: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  avg_purchase_price: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  last_purchase_price: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  dont_buy_after: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  pack_size: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccWhereInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccWhereInput> = z.object({
  AND: z.union([ z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema), z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema), z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema).array() ]).optional(),
  Customer_ID: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  Customer_Created_At: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  First_Order_Date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Company: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Address_1: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Address_2: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_City: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_State: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Postcode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Company: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Address_1: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Address_2: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_City: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_State: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Postcode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Total_Spent: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  Order_Count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  Item_Count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  Last_Order_Date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccOrderByWithRelationInput> = z.object({
  Customer_ID: z.lazy(() => SortOrderSchema).optional(),
  Customer_Created_At: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  First_Order_Date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Company: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Address_1: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Address_2: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_City: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_State: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Postcode: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Company: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Address_1: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Address_2: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_City: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_State: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Postcode: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Total_Spent: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Order_Count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Item_Count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Last_Order_Date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => new_customer_data_after_bk_from_lccOrderByRelevanceInputSchema).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccWhereUniqueInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccWhereUniqueInput> = z.object({
  Customer_ID: z.bigint(),
})
.and(z.object({
  Customer_ID: z.bigint().optional(),
  AND: z.union([ z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema), z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema), z.lazy(() => new_customer_data_after_bk_from_lccWhereInputSchema).array() ]).optional(),
  Customer_Created_At: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  First_Order_Date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Company: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Address_1: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Address_2: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_City: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_State: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Postcode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Company: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Address_1: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Address_2: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_City: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_State: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Postcode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Total_Spent: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  Order_Count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  Item_Count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  Last_Order_Date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict());

export const new_customer_data_after_bk_from_lccOrderByWithAggregationInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccOrderByWithAggregationInput> = z.object({
  Customer_ID: z.lazy(() => SortOrderSchema).optional(),
  Customer_Created_At: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  First_Order_Date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Company: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Address_1: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Address_2: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_City: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_State: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Postcode: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Billing_Address_Phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Company: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Address_1: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Address_2: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_City: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_State: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Postcode: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Shipping_Address_Country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Total_Spent: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Order_Count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Item_Count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Last_Order_Date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => new_customer_data_after_bk_from_lccCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => new_customer_data_after_bk_from_lccAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => new_customer_data_after_bk_from_lccMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => new_customer_data_after_bk_from_lccMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => new_customer_data_after_bk_from_lccSumOrderByAggregateInputSchema).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInputSchema), z.lazy(() => new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInputSchema), z.lazy(() => new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  Customer_ID: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint() ]).optional(),
  Customer_Created_At: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  First_Order_Date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  First_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Last_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_First_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Last_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Company: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Address_1: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Address_2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_City: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_State: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Postcode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Billing_Address_Phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_First_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Last_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Company: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Address_1: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Address_2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_City: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_State: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Postcode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Shipping_Address_Country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Total_Spent: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  Order_Count: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  Item_Count: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  Last_Order_Date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const old_order_data_500k_ordersWhereInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => old_order_data_500k_ordersWhereInputSchema), z.lazy(() => old_order_data_500k_ordersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => old_order_data_500k_ordersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => old_order_data_500k_ordersWhereInputSchema), z.lazy(() => old_order_data_500k_ordersWhereInputSchema).array() ]).optional(),
  order_guid: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  order_user: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  order_total_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_timestamp: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  order_offer_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_user_nth: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_auth_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  order_transaction_id: z.union([ z.lazy(() => BigIntNullableFilterSchema), z.bigint() ]).optional().nullable(),
  order_yymm_pst: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_guid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_title: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_meta_title: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_subtitle: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_primary_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const old_order_data_500k_ordersOrderByWithRelationInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersOrderByWithRelationInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_total_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_timestamp: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_user_nth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_auth_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_transaction_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_yymm_pst: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_guid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_title: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_meta_title: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_subtitle: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_primary_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => old_order_data_500k_ordersOrderByRelevanceInputSchema).optional(),
}).strict();

export const old_order_data_500k_ordersWhereUniqueInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersWhereUniqueInput> = z.object({
  order_guid: z.string(),
})
.and(z.object({
  order_guid: z.string().optional(),
  AND: z.union([ z.lazy(() => old_order_data_500k_ordersWhereInputSchema), z.lazy(() => old_order_data_500k_ordersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => old_order_data_500k_ordersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => old_order_data_500k_ordersWhereInputSchema), z.lazy(() => old_order_data_500k_ordersWhereInputSchema).array() ]).optional(),
  order_user: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  order_total_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_timestamp: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  order_offer_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_user_nth: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_auth_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  order_transaction_id: z.union([ z.lazy(() => BigIntNullableFilterSchema), z.bigint() ]).optional().nullable(),
  order_yymm_pst: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_guid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_title: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_meta_title: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_subtitle: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  offer_primary_varietal: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict());

export const old_order_data_500k_ordersOrderByWithAggregationInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersOrderByWithAggregationInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_total_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_timestamp: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_user_nth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_auth_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_transaction_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_yymm_pst: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_guid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_title: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_meta_title: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_subtitle: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_primary_varietal: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => old_order_data_500k_ordersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => old_order_data_500k_ordersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => old_order_data_500k_ordersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => old_order_data_500k_ordersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => old_order_data_500k_ordersSumOrderByAggregateInputSchema).optional(),
}).strict();

export const old_order_data_500k_ordersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => old_order_data_500k_ordersScalarWhereWithAggregatesInputSchema), z.lazy(() => old_order_data_500k_ordersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => old_order_data_500k_ordersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => old_order_data_500k_ordersScalarWhereWithAggregatesInputSchema), z.lazy(() => old_order_data_500k_ordersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  order_guid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  order_user: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_qty: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  order_total_price: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_timestamp: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  order_offer_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_user_nth: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_auth_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  order_transaction_id: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema), z.bigint() ]).optional().nullable(),
  order_yymm_pst: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  offer_guid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  offer_title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  offer_price: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  offer_meta_title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  offer_subtitle: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  offer_primary_varietal: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const order_listWhereInputSchema: z.ZodType<Prisma.order_listWhereInput> = z.object({
  AND: z.union([ z.lazy(() => order_listWhereInputSchema), z.lazy(() => order_listWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => order_listWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => order_listWhereInputSchema), z.lazy(() => order_listWhereInputSchema).array() ]).optional(),
  order_guid: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  order_sku_list: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_user: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_billing_address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  order_total_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_discount: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_credit_discount: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_tax: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_timestamp: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_status: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_payment_status: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_offer_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_utm_source: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_utm_medium: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_utm_campaign: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_user_nth: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  order_auth_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_auth_date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_billing_instrument: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_transaction_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_user_email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_unit_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_promo_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => Enumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema), z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema) ]).optional().nullable(),
  cohort_mth: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_reveal_date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cohort_fp_mth: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  is_test_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_rejected_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_upgraded_value: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_allocated_cogs: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_cohort_fpdate: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_cc_fee: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_refund_transaction_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_original_mf: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_yymm_pst: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_mc_eid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_mc_cid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_subscription_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_is_void: z.union([ z.lazy(() => Enumorder_list_order_is_voidNullableFilterSchema), z.lazy(() => order_list_order_is_voidSchema) ]).optional().nullable(),
  order_cash_in: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_c: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_f: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_s: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_r: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_t: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_m: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_g: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_other: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_ship_revenue: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_previous_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_content: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  netsuite_synced: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  payment_intent_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_device: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_placement: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_site: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => Enumorder_list_order_typeNullableFilterSchema), z.lazy(() => order_list_order_typeSchema) ]).optional().nullable(),
}).strict();

export const order_listOrderByWithRelationInputSchema: z.ZodType<Prisma.order_listOrderByWithRelationInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_sku_list: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_user: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_billing_address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_total_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_discount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_credit_discount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_tax: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_timestamp: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_status: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_payment_status: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_utm_source: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_utm_medium: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_utm_campaign: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_user_nth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_auth_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_auth_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_billing_instrument: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_transaction_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_user_email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_unit_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_promo_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cohort_mth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_reveal_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cohort_fp_mth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_test_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_rejected_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_upgraded_value: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_allocated_cogs: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_cohort_fpdate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_cc_fee: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_refund_transaction_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_original_mf: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_yymm_pst: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_mc_eid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_mc_cid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_subscription_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_is_void: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_cash_in: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_c: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_f: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_s: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_r: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_t: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_m: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_g: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_other: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_ship_revenue: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_previous_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_content: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_term: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  netsuite_synced: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  payment_intent_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_device: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_placement: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_site: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => order_listOrderByRelevanceInputSchema).optional(),
}).strict();

export const order_listWhereUniqueInputSchema: z.ZodType<Prisma.order_listWhereUniqueInput> = z.object({
  order_guid: z.string(),
})
.and(z.object({
  order_guid: z.string().optional(),
  AND: z.union([ z.lazy(() => order_listWhereInputSchema), z.lazy(() => order_listWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => order_listWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => order_listWhereInputSchema), z.lazy(() => order_listWhereInputSchema).array() ]).optional(),
  order_sku_list: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_user: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_billing_address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  order_total_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_discount: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_credit_discount: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_tax: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_timestamp: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_status: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_payment_status: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_offer_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_utm_source: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_utm_medium: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_utm_campaign: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_user_nth: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  order_auth_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_auth_date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_billing_instrument: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_transaction_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_user_email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_unit_price: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_promo_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => Enumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema), z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema) ]).optional().nullable(),
  cohort_mth: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_reveal_date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cohort_fp_mth: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  is_test_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_rejected_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_upgraded_value: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_allocated_cogs: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_cohort_fpdate: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_cc_fee: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_refund_transaction_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_original_mf: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_yymm_pst: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_mc_eid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_mc_cid: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_subscription_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_is_void: z.union([ z.lazy(() => Enumorder_list_order_is_voidNullableFilterSchema), z.lazy(() => order_list_order_is_voidSchema) ]).optional().nullable(),
  order_cash_in: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_c: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_f: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_s: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_r: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_t: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_m: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_g: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_other: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_ship_revenue: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_previous_order: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_content: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  netsuite_synced: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  payment_intent_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_device: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_placement: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_site: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => Enumorder_list_order_typeNullableFilterSchema), z.lazy(() => order_list_order_typeSchema) ]).optional().nullable(),
}).strict());

export const order_listOrderByWithAggregationInputSchema: z.ZodType<Prisma.order_listOrderByWithAggregationInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_sku_list: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_user: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_billing_address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_total_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_discount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_credit_discount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_tax: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_timestamp: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_status: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_payment_status: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_utm_source: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_utm_medium: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_utm_campaign: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_user_nth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_auth_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_auth_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_billing_instrument: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_transaction_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_user_email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_unit_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_promo_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cohort_mth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_reveal_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cohort_fp_mth: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_test_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_rejected_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_upgraded_value: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_allocated_cogs: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_cohort_fpdate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_cc_fee: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_refund_transaction_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_original_mf: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_yymm_pst: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_mc_eid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_mc_cid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_subscription_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_is_void: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_cash_in: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_c: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_f: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_s: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_r: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_t: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_m: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_g: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_disc_other: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_ship_revenue: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_previous_order: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_content: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_term: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  netsuite_synced: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  payment_intent_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_device: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_placement: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_site: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => order_listCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => order_listAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => order_listMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => order_listMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => order_listSumOrderByAggregateInputSchema).optional(),
}).strict();

export const order_listScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.order_listScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => order_listScalarWhereWithAggregatesInputSchema), z.lazy(() => order_listScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => order_listScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => order_listScalarWhereWithAggregatesInputSchema), z.lazy(() => order_listScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  order_guid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  order_sku_list: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_user: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_billing_address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_qty: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  order_total_price: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_discount: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_credit_discount: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_tax: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_timestamp: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_payment_status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_offer_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_utm_source: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_utm_medium: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_utm_campaign: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_user_nth: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  order_auth_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_auth_date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_billing_instrument: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_transaction_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  x_user_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_unit_price: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_promo_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => Enumorder_list_x_order_is_authorized_or_capturedNullableWithAggregatesFilterSchema), z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema) ]).optional().nullable(),
  cohort_mth: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_reveal_date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  cohort_fp_mth: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  is_test_order: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_rejected_dt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_upgraded_value: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_allocated_cogs: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_cohort_fpdate: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_cc_fee: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_refund_transaction_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_original_mf: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_yymm_pst: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_mc_eid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_mc_cid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_subscription_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_is_void: z.union([ z.lazy(() => Enumorder_list_order_is_voidNullableWithAggregatesFilterSchema), z.lazy(() => order_list_order_is_voidSchema) ]).optional().nullable(),
  order_cash_in: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_c: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_f: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_s: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_r: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_t: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_m: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_g: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_disc_other: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_ship_revenue: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  order_previous_order: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  netsuite_synced: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  payment_intent_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_device: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_placement: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_site: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => Enumorder_list_order_typeNullableWithAggregatesFilterSchema), z.lazy(() => order_list_order_typeSchema) ]).optional().nullable(),
}).strict();

export const user_listWhereInputSchema: z.ZodType<Prisma.user_listWhereInput> = z.object({
  AND: z.union([ z.lazy(() => user_listWhereInputSchema), z.lazy(() => user_listWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => user_listWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => user_listWhereInputSchema), z.lazy(() => user_listWhereInputSchema).array() ]).optional(),
  user_guid: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user_birthday: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_default_address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_fname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_lname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is21: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_testaccount: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_image_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_url_profile: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_login_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_signup_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_last_purchase_dt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  user_first_purchase_dt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  user_referred_by_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_referral_domain: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_utm_source: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_utm_campaign: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_utm_medium: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_life_credit: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_total_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  x_life_spend: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_life_discount: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_acquisition_cost: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_achievement_points: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  user_is_private: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_red_buyer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_white_buyer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_largeformat_buyer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_min_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_max_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_avg_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_push: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_outreach_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_is_student: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_is_personal_email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_grade: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_state_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_fname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_lname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_location_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_industry: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_emps: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_is_spam: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_customer_fit: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_customer_fit_ext: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_order_count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  user_inactive_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_email_n: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_note: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_expiry: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_last_ship_date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_cloud_value: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_cloud_count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  user_is_vip: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_signup_ym_pst: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  suspended_at: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_synced_at: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_admin: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_content: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  google_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_device: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_placement: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_site: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  holdout_num: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const user_listOrderByWithRelationInputSchema: z.ZodType<Prisma.user_listOrderByWithRelationInput> = z.object({
  user_guid: z.lazy(() => SortOrderSchema).optional(),
  user_birthday: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_default_address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_fname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_lname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is21: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_testaccount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_image_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_url_profile: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_login_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_signup_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_last_purchase_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_first_purchase_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_referred_by_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_referral_domain: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_utm_source: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_utm_campaign: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_utm_medium: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_life_credit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_total_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_life_spend: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_life_discount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_acquisition_cost: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_achievement_points: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_private: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_red_buyer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_white_buyer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_largeformat_buyer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_min_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_max_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_avg_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_push: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_outreach_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_is_student: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_is_personal_email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_grade: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_state_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_fname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_lname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_location_state: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_industry: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_emps: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_is_spam: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_customer_fit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_customer_fit_ext: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_order_count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_inactive_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_email_n: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_note: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_expiry: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_last_ship_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_cloud_value: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_cloud_count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_vip: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_signup_ym_pst: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  suspended_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_synced_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_admin: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_content: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_term: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripe_customer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  google_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_device: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_placement: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_site: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  holdout_num: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => user_listOrderByRelevanceInputSchema).optional(),
}).strict();

export const user_listWhereUniqueInputSchema: z.ZodType<Prisma.user_listWhereUniqueInput> = z.object({
  user_guid: z.string(),
})
.and(z.object({
  user_guid: z.string().optional(),
  AND: z.union([ z.lazy(() => user_listWhereInputSchema), z.lazy(() => user_listWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => user_listWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => user_listWhereInputSchema), z.lazy(() => user_listWhereInputSchema).array() ]).optional(),
  user_birthday: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_default_address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_fname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_lname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is21: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_testaccount: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_image_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_url_profile: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_login_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_signup_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_last_purchase_dt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  user_first_purchase_dt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  user_referred_by_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_referral_domain: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_utm_source: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_utm_campaign: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_utm_medium: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_life_credit: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_total_qty: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  x_life_spend: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_life_discount: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_acquisition_cost: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_achievement_points: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  user_is_private: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_red_buyer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_white_buyer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_largeformat_buyer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_min_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_max_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_avg_price: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_is_push: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_outreach_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_is_student: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_is_personal_email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_grade: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_state_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_fname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_lname: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_location_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_industry: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_company_emps: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_is_spam: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_customer_fit: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ls_customer_fit_ext: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_order_count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  user_inactive_dt: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_email_n: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_note: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_expiry: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_last_ship_date: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  x_cloud_value: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_cloud_count: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  user_is_vip: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_signup_ym_pst: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  suspended_at: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_synced_at: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  is_admin: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_content: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user_password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  google_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_device: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_placement: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  utm_site: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  holdout_num: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict());

export const user_listOrderByWithAggregationInputSchema: z.ZodType<Prisma.user_listOrderByWithAggregationInput> = z.object({
  user_guid: z.lazy(() => SortOrderSchema).optional(),
  user_birthday: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_default_address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_fname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_lname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is21: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_testaccount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_image_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_url_profile: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_login_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_signup_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_last_purchase_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_first_purchase_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_referred_by_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_referral_domain: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_utm_source: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_utm_campaign: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_utm_medium: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_life_credit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_total_qty: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_life_spend: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_life_discount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_acquisition_cost: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_achievement_points: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_private: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_red_buyer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_white_buyer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_largeformat_buyer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_min_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_max_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_avg_price: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_push: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_outreach_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_is_student: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_is_personal_email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_grade: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_state_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_fname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_lname: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_location_state: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_industry: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_company_emps: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_is_spam: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_customer_fit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ls_customer_fit_ext: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_order_count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_inactive_dt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_email_n: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_note: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_expiry: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_last_ship_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_cloud_value: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  x_cloud_count: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_is_vip: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_signup_ym_pst: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  suspended_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_synced_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_admin: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_content: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_term: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripe_customer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  google_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_device: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_placement: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  utm_site: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  holdout_num: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => user_listCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => user_listAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => user_listMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => user_listMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => user_listSumOrderByAggregateInputSchema).optional(),
}).strict();

export const user_listScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.user_listScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => user_listScalarWhereWithAggregatesInputSchema), z.lazy(() => user_listScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => user_listScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => user_listScalarWhereWithAggregatesInputSchema), z.lazy(() => user_listScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  user_guid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  user_birthday: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_default_address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_fname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_lname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_is21: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_is_testaccount: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_image_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_url_profile: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_login_dt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_signup_dt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_last_purchase_dt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  user_first_purchase_dt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  user_referred_by_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_referral_domain: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  session_utm_source: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  session_utm_campaign: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  session_utm_medium: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  x_life_credit: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_total_qty: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  x_life_spend: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_life_discount: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_acquisition_cost: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_achievement_points: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  user_is_private: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_is_red_buyer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_is_white_buyer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_is_largeformat_buyer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_min_price: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_max_price: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_avg_price: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_is_push: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_outreach_dt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_is_student: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_is_personal_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_grade: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_company_state_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_fname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_lname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_location_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_company_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_company_industry: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_company_country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_company_emps: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_is_spam: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_customer_fit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ls_customer_fit_ext: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  x_order_count: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  user_inactive_dt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_email_n: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_expiry: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_last_ship_date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  x_cloud_value: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  x_cloud_count: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  user_is_vip: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_signup_ym_pst: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  suspended_at: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  last_synced_at: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  is_admin: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  user_password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  google_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_device: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_placement: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  utm_site: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  holdout_num: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const usersWhereInputSchema: z.ZodType<Prisma.usersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => usersWhereInputSchema), z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersWhereInputSchema), z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  salt: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  alias: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ax_maxmin: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ax_homes: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  ax_tax: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ax_evdb: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  ax_spgp: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ax_uc: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
}).strict();

export const usersOrderByWithRelationInputSchema: z.ZodType<Prisma.usersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  alias: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
  ax_homes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ax_tax: z.lazy(() => SortOrderSchema).optional(),
  ax_evdb: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ax_spgp: z.lazy(() => SortOrderSchema).optional(),
  ax_uc: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => usersOrderByRelevanceInputSchema).optional(),
}).strict();

export const usersWhereUniqueInputSchema: z.ZodType<Prisma.usersWhereUniqueInput> = z.union([
  z.object({
    id: z.bigint(),
    email: z.string(),
  }),
  z.object({
    id: z.bigint(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.bigint().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => usersWhereInputSchema), z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersWhereInputSchema), z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  salt: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  alias: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ax_maxmin: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ax_homes: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  ax_tax: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ax_evdb: z.union([ z.lazy(() => BoolNullableFilterSchema), z.boolean() ]).optional().nullable(),
  ax_spgp: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ax_uc: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
}).strict());

export const usersOrderByWithAggregationInputSchema: z.ZodType<Prisma.usersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  alias: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
  ax_homes: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ax_tax: z.lazy(() => SortOrderSchema).optional(),
  ax_evdb: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ax_spgp: z.lazy(() => SortOrderSchema).optional(),
  ax_uc: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => usersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => usersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => usersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => usersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => usersSumOrderByAggregateInputSchema).optional(),
}).strict();

export const usersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.usersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema), z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema), z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  salt: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint() ]).optional(),
  alias: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  ax_maxmin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  ax_homes: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
  ax_tax: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  ax_evdb: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean() ]).optional().nullable(),
  ax_spgp: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  ax_uc: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
}).strict();

export const order_lockWhereInputSchema: z.ZodType<Prisma.order_lockWhereInput> = z.object({
  AND: z.union([ z.lazy(() => order_lockWhereInputSchema), z.lazy(() => order_lockWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => order_lockWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => order_lockWhereInputSchema), z.lazy(() => order_lockWhereInputSchema).array() ]).optional(),
  order_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  locked_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export const order_lockOrderByWithRelationInputSchema: z.ZodType<Prisma.order_lockOrderByWithRelationInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  locked_at: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => order_lockOrderByRelevanceInputSchema).optional(),
}).strict();

export const order_lockWhereUniqueInputSchema: z.ZodType<Prisma.order_lockWhereUniqueInput> = z.object({
  order_id: z.string(),
})
.and(z.object({
  order_id: z.string().optional(),
  AND: z.union([ z.lazy(() => order_lockWhereInputSchema), z.lazy(() => order_lockWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => order_lockWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => order_lockWhereInputSchema), z.lazy(() => order_lockWhereInputSchema).array() ]).optional(),
  locked_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}).strict());

export const order_lockOrderByWithAggregationInputSchema: z.ZodType<Prisma.order_lockOrderByWithAggregationInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  locked_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => order_lockCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => order_lockMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => order_lockMinOrderByAggregateInputSchema).optional(),
}).strict();

export const order_lockScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.order_lockScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => order_lockScalarWhereWithAggregatesInputSchema), z.lazy(() => order_lockScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => order_lockScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => order_lockScalarWhereWithAggregatesInputSchema), z.lazy(() => order_lockScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  order_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  locked_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export const v3_audit_logWhereInputSchema: z.ZodType<Prisma.v3_audit_logWhereInput> = z.object({
  AND: z.union([ z.lazy(() => v3_audit_logWhereInputSchema), z.lazy(() => v3_audit_logWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_audit_logWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_audit_logWhereInputSchema), z.lazy(() => v3_audit_logWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  event_ts: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  event_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  event_ext: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  event_userid: z.union([ z.lazy(() => BigIntNullableFilterSchema), z.bigint() ]).optional().nullable(),
  offer_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  order_id: z.union([ z.lazy(() => BigIntNullableFilterSchema), z.bigint() ]).optional().nullable(),
  time_taken_ms: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
}).strict();

export const v3_audit_logOrderByWithRelationInputSchema: z.ZodType<Prisma.v3_audit_logOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  event_ts: z.lazy(() => SortOrderSchema).optional(),
  event_name: z.lazy(() => SortOrderSchema).optional(),
  event_ext: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  event_userid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  time_taken_ms: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => v3_audit_logOrderByRelevanceInputSchema).optional(),
}).strict();

export const v3_audit_logWhereUniqueInputSchema: z.ZodType<Prisma.v3_audit_logWhereUniqueInput> = z.object({
  id: z.bigint(),
})
.and(z.object({
  id: z.bigint().optional(),
  AND: z.union([ z.lazy(() => v3_audit_logWhereInputSchema), z.lazy(() => v3_audit_logWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_audit_logWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_audit_logWhereInputSchema), z.lazy(() => v3_audit_logWhereInputSchema).array() ]).optional(),
  event_ts: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  event_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  event_ext: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  event_userid: z.union([ z.lazy(() => BigIntNullableFilterSchema), z.bigint() ]).optional().nullable(),
  offer_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  order_id: z.union([ z.lazy(() => BigIntNullableFilterSchema), z.bigint() ]).optional().nullable(),
  time_taken_ms: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
}).strict());

export const v3_audit_logOrderByWithAggregationInputSchema: z.ZodType<Prisma.v3_audit_logOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  event_ts: z.lazy(() => SortOrderSchema).optional(),
  event_name: z.lazy(() => SortOrderSchema).optional(),
  event_ext: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  event_userid: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  time_taken_ms: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => v3_audit_logCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => v3_audit_logAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => v3_audit_logMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => v3_audit_logMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => v3_audit_logSumOrderByAggregateInputSchema).optional(),
}).strict();

export const v3_audit_logScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.v3_audit_logScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => v3_audit_logScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_audit_logScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_audit_logScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_audit_logScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_audit_logScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint() ]).optional(),
  event_ts: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  event_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  event_ext: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  event_userid: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema), z.bigint() ]).optional().nullable(),
  offer_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  order_id: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema), z.bigint() ]).optional().nullable(),
  time_taken_ms: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
}).strict();

export const v3_offerWhereInputSchema: z.ZodType<Prisma.v3_offerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => v3_offerWhereInputSchema), z.lazy(() => v3_offerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_offerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_offerWhereInputSchema), z.lazy(() => v3_offerWhereInputSchema).array() ]).optional(),
  offer_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  offer_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  offer_variant_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  offer_product_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
}).strict();

export const v3_offerOrderByWithRelationInputSchema: z.ZodType<Prisma.v3_offerOrderByWithRelationInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  offer_name: z.lazy(() => SortOrderSchema).optional(),
  offer_variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_product_name: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => v3_offerOrderByRelevanceInputSchema).optional(),
}).strict();

export const v3_offerWhereUniqueInputSchema: z.ZodType<Prisma.v3_offerWhereUniqueInput> = z.union([
  z.object({
    offer_id: z.number().int(),
    offer_name: z.string(),
    offer_variant_id: z.string(),
  }),
  z.object({
    offer_id: z.number().int(),
    offer_name: z.string(),
  }),
  z.object({
    offer_id: z.number().int(),
    offer_variant_id: z.string(),
  }),
  z.object({
    offer_id: z.number().int(),
  }),
  z.object({
    offer_name: z.string(),
    offer_variant_id: z.string(),
  }),
  z.object({
    offer_name: z.string(),
  }),
  z.object({
    offer_variant_id: z.string(),
  }),
])
.and(z.object({
  offer_id: z.number().int().optional(),
  offer_name: z.string().optional(),
  offer_variant_id: z.string().optional(),
  AND: z.union([ z.lazy(() => v3_offerWhereInputSchema), z.lazy(() => v3_offerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_offerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_offerWhereInputSchema), z.lazy(() => v3_offerWhereInputSchema).array() ]).optional(),
  offer_product_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
}).strict());

export const v3_offerOrderByWithAggregationInputSchema: z.ZodType<Prisma.v3_offerOrderByWithAggregationInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  offer_name: z.lazy(() => SortOrderSchema).optional(),
  offer_variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_product_name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => v3_offerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => v3_offerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => v3_offerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => v3_offerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => v3_offerSumOrderByAggregateInputSchema).optional(),
}).strict();

export const v3_offerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.v3_offerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => v3_offerScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_offerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_offerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_offerScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_offerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  offer_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  offer_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  offer_variant_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  offer_product_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
}).strict();

export const v3_offer_manifestWhereInputSchema: z.ZodType<Prisma.v3_offer_manifestWhereInput> = z.object({
  AND: z.union([ z.lazy(() => v3_offer_manifestWhereInputSchema), z.lazy(() => v3_offer_manifestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_offer_manifestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_offer_manifestWhereInputSchema), z.lazy(() => v3_offer_manifestWhereInputSchema).array() ]).optional(),
  m_id: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  offer_id: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  mf_variant: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  assignee_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  assignment_ordering: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
}).strict();

export const v3_offer_manifestOrderByWithRelationInputSchema: z.ZodType<Prisma.v3_offer_manifestOrderByWithRelationInput> = z.object({
  m_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  mf_variant: z.lazy(() => SortOrderSchema).optional(),
  assignee_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  assignment_ordering: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => v3_offer_manifestOrderByRelevanceInputSchema).optional(),
}).strict();

export const v3_offer_manifestWhereUniqueInputSchema: z.ZodType<Prisma.v3_offer_manifestWhereUniqueInput> = z.object({
  m_id: z.bigint(),
})
.and(z.object({
  m_id: z.bigint().optional(),
  AND: z.union([ z.lazy(() => v3_offer_manifestWhereInputSchema), z.lazy(() => v3_offer_manifestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_offer_manifestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_offer_manifestWhereInputSchema), z.lazy(() => v3_offer_manifestWhereInputSchema).array() ]).optional(),
  offer_id: z.union([ z.lazy(() => BigIntFilterSchema), z.bigint() ]).optional(),
  mf_variant: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  assignee_id: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  assignment_ordering: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
}).strict());

export const v3_offer_manifestOrderByWithAggregationInputSchema: z.ZodType<Prisma.v3_offer_manifestOrderByWithAggregationInput> = z.object({
  m_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  mf_variant: z.lazy(() => SortOrderSchema).optional(),
  assignee_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  assignment_ordering: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => v3_offer_manifestCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => v3_offer_manifestAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => v3_offer_manifestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => v3_offer_manifestMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => v3_offer_manifestSumOrderByAggregateInputSchema).optional(),
}).strict();

export const v3_offer_manifestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.v3_offer_manifestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => v3_offer_manifestScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_offer_manifestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_offer_manifestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_offer_manifestScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_offer_manifestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  m_id: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint() ]).optional(),
  offer_id: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint() ]).optional(),
  mf_variant: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  assignee_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  assignment_ordering: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
}).strict();

export const v3_order_to_variantWhereInputSchema: z.ZodType<Prisma.v3_order_to_variantWhereInput> = z.object({
  AND: z.union([ z.lazy(() => v3_order_to_variantWhereInputSchema), z.lazy(() => v3_order_to_variantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_order_to_variantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_order_to_variantWhereInputSchema), z.lazy(() => v3_order_to_variantWhereInputSchema).array() ]).optional(),
  order_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variant_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  offer_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
}).strict();

export const v3_order_to_variantOrderByWithRelationInputSchema: z.ZodType<Prisma.v3_order_to_variantOrderByWithRelationInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => v3_order_to_variantOrderByRelevanceInputSchema).optional(),
}).strict();

export const v3_order_to_variantWhereUniqueInputSchema: z.ZodType<Prisma.v3_order_to_variantWhereUniqueInput> = z.object({
  variant_id_order_id: z.lazy(() => v3_order_to_variantVariant_idOrder_idCompoundUniqueInputSchema),
})
.and(z.object({
  variant_id_order_id: z.lazy(() => v3_order_to_variantVariant_idOrder_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => v3_order_to_variantWhereInputSchema), z.lazy(() => v3_order_to_variantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_order_to_variantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_order_to_variantWhereInputSchema), z.lazy(() => v3_order_to_variantWhereInputSchema).array() ]).optional(),
  order_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variant_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  offer_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
}).strict());

export const v3_order_to_variantOrderByWithAggregationInputSchema: z.ZodType<Prisma.v3_order_to_variantOrderByWithAggregationInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => v3_order_to_variantCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => v3_order_to_variantAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => v3_order_to_variantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => v3_order_to_variantMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => v3_order_to_variantSumOrderByAggregateInputSchema).optional(),
}).strict();

export const v3_order_to_variantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.v3_order_to_variantScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => v3_order_to_variantScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_order_to_variantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => v3_order_to_variantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => v3_order_to_variantScalarWhereWithAggregatesInputSchema), z.lazy(() => v3_order_to_variantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  order_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  variant_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  offer_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
}).strict();

export const inventoryWhereInputSchema: z.ZodType<Prisma.inventoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => inventoryWhereInputSchema), z.lazy(() => inventoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => inventoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => inventoryWhereInputSchema), z.lazy(() => inventoryWhereInputSchema).array() ]).optional(),
  sku: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  units_on_hand: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  cost_basis_unit: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  srp_unit: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
}).strict();

export const inventoryOrderByWithRelationInputSchema: z.ZodType<Prisma.inventoryOrderByWithRelationInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  units_on_hand: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cost_basis_unit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  srp_unit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => inventoryOrderByRelevanceInputSchema).optional(),
}).strict();

export const inventoryWhereUniqueInputSchema: z.ZodType<Prisma.inventoryWhereUniqueInput> = z.object({
  sku: z.string(),
})
.and(z.object({
  sku: z.string().optional(),
  AND: z.union([ z.lazy(() => inventoryWhereInputSchema), z.lazy(() => inventoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => inventoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => inventoryWhereInputSchema), z.lazy(() => inventoryWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  units_on_hand: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  cost_basis_unit: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  srp_unit: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
}).strict());

export const inventoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.inventoryOrderByWithAggregationInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  units_on_hand: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  cost_basis_unit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  srp_unit: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => inventoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => inventoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => inventoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => inventoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => inventorySumOrderByAggregateInputSchema).optional(),
}).strict();

export const inventoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.inventoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => inventoryScalarWhereWithAggregatesInputSchema), z.lazy(() => inventoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => inventoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => inventoryScalarWhereWithAggregatesInputSchema), z.lazy(() => inventoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sku: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  units_on_hand: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  cost_basis_unit: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  srp_unit: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
}).strict();

export const computed_buyer_varietalsWhereInputSchema: z.ZodType<Prisma.computed_buyer_varietalsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => computed_buyer_varietalsWhereInputSchema), z.lazy(() => computed_buyer_varietalsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => computed_buyer_varietalsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => computed_buyer_varietalsWhereInputSchema), z.lazy(() => computed_buyer_varietalsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  winner_guid: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cola_varietal: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  total_paid: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
}).strict();

export const computed_buyer_varietalsOrderByWithRelationInputSchema: z.ZodType<Prisma.computed_buyer_varietalsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  winner_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  total_paid: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => computed_buyer_varietalsOrderByRelevanceInputSchema).optional(),
}).strict();

export const computed_buyer_varietalsWhereUniqueInputSchema: z.ZodType<Prisma.computed_buyer_varietalsWhereUniqueInput> = z.object({
  id: z.number().int(),
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => computed_buyer_varietalsWhereInputSchema), z.lazy(() => computed_buyer_varietalsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => computed_buyer_varietalsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => computed_buyer_varietalsWhereInputSchema), z.lazy(() => computed_buyer_varietalsWhereInputSchema).array() ]).optional(),
  winner_guid: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  cola_varietal: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  total_paid: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
}).strict());

export const computed_buyer_varietalsOrderByWithAggregationInputSchema: z.ZodType<Prisma.computed_buyer_varietalsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  winner_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  total_paid: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => computed_buyer_varietalsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => computed_buyer_varietalsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => computed_buyer_varietalsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => computed_buyer_varietalsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => computed_buyer_varietalsSumOrderByAggregateInputSchema).optional(),
}).strict();

export const computed_buyer_varietalsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.computed_buyer_varietalsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => computed_buyer_varietalsScalarWhereWithAggregatesInputSchema), z.lazy(() => computed_buyer_varietalsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => computed_buyer_varietalsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => computed_buyer_varietalsScalarWhereWithAggregatesInputSchema), z.lazy(() => computed_buyer_varietalsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  winner_guid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  cola_varietal: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  total_paid: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
}).strict();

export const member_list_export_2023_07_06WhereInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06WhereInput> = z.object({
  AND: z.union([ z.lazy(() => member_list_export_2023_07_06WhereInputSchema), z.lazy(() => member_list_export_2023_07_06WhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => member_list_export_2023_07_06WhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => member_list_export_2023_07_06WhereInputSchema), z.lazy(() => member_list_export_2023_07_06WhereInputSchema).array() ]).optional(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Klaviyo_ID: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Phone_Number: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Address_2: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  City: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  State___Region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Zip_Code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const member_list_export_2023_07_06OrderByWithRelationInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06OrderByWithRelationInput> = z.object({
  Email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Klaviyo_ID: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Phone_Number: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Address_2: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  City: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  State___Region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Zip_Code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => member_list_export_2023_07_06OrderByRelevanceInputSchema).optional(),
}).strict();

export const member_list_export_2023_07_06WhereUniqueInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06WhereUniqueInput> = z.object({
  Klaviyo_ID: z.string(),
})
.and(z.object({
  Klaviyo_ID: z.string().optional(),
  AND: z.union([ z.lazy(() => member_list_export_2023_07_06WhereInputSchema), z.lazy(() => member_list_export_2023_07_06WhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => member_list_export_2023_07_06WhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => member_list_export_2023_07_06WhereInputSchema), z.lazy(() => member_list_export_2023_07_06WhereInputSchema).array() ]).optional(),
  Email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  First_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Last_Name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Phone_Number: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Address_2: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  City: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  State___Region: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Country: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Zip_Code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict());

export const member_list_export_2023_07_06OrderByWithAggregationInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06OrderByWithAggregationInput> = z.object({
  Email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Klaviyo_ID: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Last_Name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Phone_Number: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Address_2: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  City: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  State___Region: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Country: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Zip_Code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => member_list_export_2023_07_06CountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => member_list_export_2023_07_06MaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => member_list_export_2023_07_06MinOrderByAggregateInputSchema).optional(),
}).strict();

export const member_list_export_2023_07_06ScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06ScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => member_list_export_2023_07_06ScalarWhereWithAggregatesInputSchema), z.lazy(() => member_list_export_2023_07_06ScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => member_list_export_2023_07_06ScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => member_list_export_2023_07_06ScalarWhereWithAggregatesInputSchema), z.lazy(() => member_list_export_2023_07_06ScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  Email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Klaviyo_ID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  First_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Last_Name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Phone_Number: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Address_2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  City: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  State___Region: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  Zip_Code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const shopify_product_variantWhereInputSchema: z.ZodType<Prisma.shopify_product_variantWhereInput> = z.object({
  AND: z.union([ z.lazy(() => shopify_product_variantWhereInputSchema), z.lazy(() => shopify_product_variantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => shopify_product_variantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => shopify_product_variantWhereInputSchema), z.lazy(() => shopify_product_variantWhereInputSchema).array() ]).optional(),
  variantId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  productName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variantName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variantPrice: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  variantCompareAtPrice: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  variantInventoryQuantity: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  variantSku: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variantWeight: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const shopify_product_variantOrderByWithRelationInputSchema: z.ZodType<Prisma.shopify_product_variantOrderByWithRelationInput> = z.object({
  variantId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  productName: z.lazy(() => SortOrderSchema).optional(),
  variantName: z.lazy(() => SortOrderSchema).optional(),
  variantPrice: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  variantCompareAtPrice: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  variantInventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  variantSku: z.lazy(() => SortOrderSchema).optional(),
  variantWeight: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => shopify_product_variantOrderByRelevanceInputSchema).optional(),
}).strict();

export const shopify_product_variantWhereUniqueInputSchema: z.ZodType<Prisma.shopify_product_variantWhereUniqueInput> = z.object({
  variantId: z.string(),
})
.and(z.object({
  variantId: z.string().optional(),
  AND: z.union([ z.lazy(() => shopify_product_variantWhereInputSchema), z.lazy(() => shopify_product_variantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => shopify_product_variantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => shopify_product_variantWhereInputSchema), z.lazy(() => shopify_product_variantWhereInputSchema).array() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  productName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variantName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variantPrice: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  variantCompareAtPrice: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  variantInventoryQuantity: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  variantSku: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  variantWeight: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
}).strict());

export const shopify_product_variantOrderByWithAggregationInputSchema: z.ZodType<Prisma.shopify_product_variantOrderByWithAggregationInput> = z.object({
  variantId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  productName: z.lazy(() => SortOrderSchema).optional(),
  variantName: z.lazy(() => SortOrderSchema).optional(),
  variantPrice: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  variantCompareAtPrice: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  variantInventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  variantSku: z.lazy(() => SortOrderSchema).optional(),
  variantWeight: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => shopify_product_variantCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => shopify_product_variantAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => shopify_product_variantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => shopify_product_variantMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => shopify_product_variantSumOrderByAggregateInputSchema).optional(),
}).strict();

export const shopify_product_variantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.shopify_product_variantScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => shopify_product_variantScalarWhereWithAggregatesInputSchema), z.lazy(() => shopify_product_variantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => shopify_product_variantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => shopify_product_variantScalarWhereWithAggregatesInputSchema), z.lazy(() => shopify_product_variantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  variantId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  productName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  variantName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  variantPrice: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  variantCompareAtPrice: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  variantInventoryQuantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  variantSku: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  variantWeight: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
}).strict();

export const customer_list_july_2023CreateInputSchema: z.ZodType<Prisma.customer_list_july_2023CreateInput> = z.object({
  customer_name: z.string().optional().nullable(),
  email: z.string(),
  orders: z.number().int().optional().nullable(),
  ltv: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  first_order: z.string().optional().nullable(),
  last_order: z.string().optional().nullable(),
}).strict();

export const customer_list_july_2023UncheckedCreateInputSchema: z.ZodType<Prisma.customer_list_july_2023UncheckedCreateInput> = z.object({
  customer_name: z.string().optional().nullable(),
  email: z.string(),
  orders: z.number().int().optional().nullable(),
  ltv: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  first_order: z.string().optional().nullable(),
  last_order: z.string().optional().nullable(),
}).strict();

export const customer_list_july_2023UpdateInputSchema: z.ZodType<Prisma.customer_list_july_2023UpdateInput> = z.object({
  customer_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orders: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ltv: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const customer_list_july_2023UncheckedUpdateInputSchema: z.ZodType<Prisma.customer_list_july_2023UncheckedUpdateInput> = z.object({
  customer_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orders: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ltv: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const customer_list_july_2023CreateManyInputSchema: z.ZodType<Prisma.customer_list_july_2023CreateManyInput> = z.object({
  customer_name: z.string().optional().nullable(),
  email: z.string(),
  orders: z.number().int().optional().nullable(),
  ltv: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  first_order: z.string().optional().nullable(),
  last_order: z.string().optional().nullable(),
}).strict();

export const customer_list_july_2023UpdateManyMutationInputSchema: z.ZodType<Prisma.customer_list_july_2023UpdateManyMutationInput> = z.object({
  customer_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orders: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ltv: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const customer_list_july_2023UncheckedUpdateManyInputSchema: z.ZodType<Prisma.customer_list_july_2023UncheckedUpdateManyInput> = z.object({
  customer_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orders: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ltv: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_detailCreateInputSchema: z.ZodType<Prisma.item_detailCreateInput> = z.object({
  itemdetail_guid: z.string(),
  cola_id: z.string().optional().nullable(),
  cola_name: z.string().optional().nullable(),
  cola_region: z.string().optional().nullable(),
  cola_appellation: z.string().optional().nullable(),
  cola_varietal: z.string().optional().nullable(),
  cola_vintage: z.string().optional().nullable(),
  cola_abv: z.number().optional().nullable(),
  about_wine: z.string().optional().nullable(),
  tasting_notes: z.string().optional().nullable(),
  winemaker_notes: z.string().optional().nullable(),
  label_img_url: z.string().optional().nullable(),
  bottle_img_url: z.string().optional().nullable(),
  retail_price: z.number().optional().nullable(),
  winery_id: z.string().optional().nullable(),
  url_key: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
  upc: z.string().optional().nullable(),
  is_wine: z.string().optional().nullable(),
  is_beer: z.string().optional().nullable(),
  is_liquor: z.string().optional().nullable(),
  is_sparkling: z.string().optional().nullable(),
  is_cult: z.string().optional().nullable(),
  is_small_production: z.string().optional().nullable(),
  ct_wine_id: z.number().int().optional().nullable(),
  ct_producer_id: z.number().int().optional().nullable(),
  ct_likes: z.number().int().optional().nullable(),
  ct_tasting_notes: z.number().int().optional().nullable(),
  ct_review: z.number().int().optional().nullable(),
  ct_community_score: z.string().optional().nullable(),
  ct_qty: z.number().int().optional().nullable(),
  wine_vineyard: z.string().optional().nullable(),
  wine_web_url: z.string().optional().nullable(),
  wine_drink_start: z.string().optional().nullable(),
  wine_drink_end: z.string().optional().nullable(),
  wine_producer_uuid: z.string().optional().nullable(),
  redirect_to: z.string().optional().nullable(),
  item_tsv: z.string().optional().nullable(),
  wine_ml: z.string().optional().nullable(),
  cola_fanciful_name: z.string().optional().nullable(),
  wd_varietal: z.string().optional().nullable(),
  wd_region: z.string().optional().nullable(),
  is_blend: z.string().optional().nullable(),
  price_range: z.string().optional().nullable(),
  item_lbs: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  blur_bottle_img: z.string().optional().nullable(),
  blur_label_img: z.string().optional().nullable(),
}).strict();

export const item_detailUncheckedCreateInputSchema: z.ZodType<Prisma.item_detailUncheckedCreateInput> = z.object({
  itemdetail_guid: z.string(),
  cola_id: z.string().optional().nullable(),
  cola_name: z.string().optional().nullable(),
  cola_region: z.string().optional().nullable(),
  cola_appellation: z.string().optional().nullable(),
  cola_varietal: z.string().optional().nullable(),
  cola_vintage: z.string().optional().nullable(),
  cola_abv: z.number().optional().nullable(),
  about_wine: z.string().optional().nullable(),
  tasting_notes: z.string().optional().nullable(),
  winemaker_notes: z.string().optional().nullable(),
  label_img_url: z.string().optional().nullable(),
  bottle_img_url: z.string().optional().nullable(),
  retail_price: z.number().optional().nullable(),
  winery_id: z.string().optional().nullable(),
  url_key: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
  upc: z.string().optional().nullable(),
  is_wine: z.string().optional().nullable(),
  is_beer: z.string().optional().nullable(),
  is_liquor: z.string().optional().nullable(),
  is_sparkling: z.string().optional().nullable(),
  is_cult: z.string().optional().nullable(),
  is_small_production: z.string().optional().nullable(),
  ct_wine_id: z.number().int().optional().nullable(),
  ct_producer_id: z.number().int().optional().nullable(),
  ct_likes: z.number().int().optional().nullable(),
  ct_tasting_notes: z.number().int().optional().nullable(),
  ct_review: z.number().int().optional().nullable(),
  ct_community_score: z.string().optional().nullable(),
  ct_qty: z.number().int().optional().nullable(),
  wine_vineyard: z.string().optional().nullable(),
  wine_web_url: z.string().optional().nullable(),
  wine_drink_start: z.string().optional().nullable(),
  wine_drink_end: z.string().optional().nullable(),
  wine_producer_uuid: z.string().optional().nullable(),
  redirect_to: z.string().optional().nullable(),
  item_tsv: z.string().optional().nullable(),
  wine_ml: z.string().optional().nullable(),
  cola_fanciful_name: z.string().optional().nullable(),
  wd_varietal: z.string().optional().nullable(),
  wd_region: z.string().optional().nullable(),
  is_blend: z.string().optional().nullable(),
  price_range: z.string().optional().nullable(),
  item_lbs: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  blur_bottle_img: z.string().optional().nullable(),
  blur_label_img: z.string().optional().nullable(),
}).strict();

export const item_detailUpdateInputSchema: z.ZodType<Prisma.item_detailUpdateInput> = z.object({
  itemdetail_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_appellation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_vintage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_abv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasting_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winemaker_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  label_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bottle_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  retail_price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winery_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url_key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_beer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_liquor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_sparkling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_cult: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_small_production: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_wine_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_producer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_likes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_tasting_notes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_review: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_community_score: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_vineyard: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_web_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_start: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_end: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_producer_uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redirect_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_ml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_fanciful_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_blend: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_lbs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_bottle_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_label_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_detailUncheckedUpdateInputSchema: z.ZodType<Prisma.item_detailUncheckedUpdateInput> = z.object({
  itemdetail_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_appellation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_vintage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_abv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasting_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winemaker_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  label_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bottle_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  retail_price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winery_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url_key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_beer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_liquor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_sparkling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_cult: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_small_production: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_wine_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_producer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_likes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_tasting_notes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_review: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_community_score: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_vineyard: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_web_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_start: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_end: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_producer_uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redirect_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_ml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_fanciful_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_blend: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_lbs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_bottle_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_label_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_detailCreateManyInputSchema: z.ZodType<Prisma.item_detailCreateManyInput> = z.object({
  itemdetail_guid: z.string(),
  cola_id: z.string().optional().nullable(),
  cola_name: z.string().optional().nullable(),
  cola_region: z.string().optional().nullable(),
  cola_appellation: z.string().optional().nullable(),
  cola_varietal: z.string().optional().nullable(),
  cola_vintage: z.string().optional().nullable(),
  cola_abv: z.number().optional().nullable(),
  about_wine: z.string().optional().nullable(),
  tasting_notes: z.string().optional().nullable(),
  winemaker_notes: z.string().optional().nullable(),
  label_img_url: z.string().optional().nullable(),
  bottle_img_url: z.string().optional().nullable(),
  retail_price: z.number().optional().nullable(),
  winery_id: z.string().optional().nullable(),
  url_key: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
  upc: z.string().optional().nullable(),
  is_wine: z.string().optional().nullable(),
  is_beer: z.string().optional().nullable(),
  is_liquor: z.string().optional().nullable(),
  is_sparkling: z.string().optional().nullable(),
  is_cult: z.string().optional().nullable(),
  is_small_production: z.string().optional().nullable(),
  ct_wine_id: z.number().int().optional().nullable(),
  ct_producer_id: z.number().int().optional().nullable(),
  ct_likes: z.number().int().optional().nullable(),
  ct_tasting_notes: z.number().int().optional().nullable(),
  ct_review: z.number().int().optional().nullable(),
  ct_community_score: z.string().optional().nullable(),
  ct_qty: z.number().int().optional().nullable(),
  wine_vineyard: z.string().optional().nullable(),
  wine_web_url: z.string().optional().nullable(),
  wine_drink_start: z.string().optional().nullable(),
  wine_drink_end: z.string().optional().nullable(),
  wine_producer_uuid: z.string().optional().nullable(),
  redirect_to: z.string().optional().nullable(),
  item_tsv: z.string().optional().nullable(),
  wine_ml: z.string().optional().nullable(),
  cola_fanciful_name: z.string().optional().nullable(),
  wd_varietal: z.string().optional().nullable(),
  wd_region: z.string().optional().nullable(),
  is_blend: z.string().optional().nullable(),
  price_range: z.string().optional().nullable(),
  item_lbs: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  blur_bottle_img: z.string().optional().nullable(),
  blur_label_img: z.string().optional().nullable(),
}).strict();

export const item_detailUpdateManyMutationInputSchema: z.ZodType<Prisma.item_detailUpdateManyMutationInput> = z.object({
  itemdetail_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_appellation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_vintage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_abv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasting_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winemaker_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  label_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bottle_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  retail_price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winery_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url_key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_beer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_liquor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_sparkling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_cult: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_small_production: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_wine_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_producer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_likes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_tasting_notes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_review: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_community_score: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_vineyard: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_web_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_start: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_end: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_producer_uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redirect_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_ml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_fanciful_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_blend: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_lbs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_bottle_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_label_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_detailUncheckedUpdateManyInputSchema: z.ZodType<Prisma.item_detailUncheckedUpdateManyInput> = z.object({
  itemdetail_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_appellation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_vintage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_abv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasting_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winemaker_notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  label_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bottle_img_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  retail_price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winery_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url_key: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_wine: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_beer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_liquor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_sparkling: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_cult: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_small_production: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_wine_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_producer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_likes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_tasting_notes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_review: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_community_score: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ct_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_vineyard: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_web_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_start: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_drink_end: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_producer_uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redirect_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wine_ml: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cola_fanciful_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wd_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_blend: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_range: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  item_lbs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_bottle_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blur_label_img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_skuCreateInputSchema: z.ZodType<Prisma.item_skuCreateInput> = z.object({
  sku: z.string(),
  srp: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  is_autographed: z.boolean().optional().nullable(),
  is_taxable: z.boolean().optional().nullable(),
  is_counted_for_shipment: z.boolean().optional().nullable(),
  drink_by_date: z.coerce.date().optional().nullable(),
  sku_itemdetail_guid: z.string().optional().nullable(),
  index: z.number().int().optional().nullable(),
  last_order_date: z.coerce.date().optional().nullable(),
  last_restock: z.coerce.date().optional().nullable(),
  last_stock_update: z.coerce.date().optional().nullable(),
  last_stock_qty: z.number().int().optional(),
  next_delivery_date: z.coerce.date().optional().nullable(),
  last_count_owed: z.number().int().optional(),
  x_friendly_name: z.string().optional().nullable(),
  scramble_letters: z.string().optional().nullable(),
  scramble_qty_allowed: z.number().int().optional(),
  sku_allowed_states: z.string().optional().nullable(),
  comment: z.string().optional().nullable(),
  sku_tsv: z.string().optional().nullable(),
  sku_cogs_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  is_pallet_program: z.boolean().optional(),
  is_deprecated: z.boolean().optional().nullable(),
  sku_varietal: z.string().optional().nullable(),
  sku_region: z.string().optional().nullable(),
  last_count_shipped: z.number().int().optional(),
  is_in_wd: z.boolean().optional(),
  sku_was_swap: z.boolean().optional(),
  sku_sort: z.number().int().optional(),
  sku_preswap: z.string().optional().nullable(),
  sku_postswap: z.string().optional().nullable(),
  sku_qty_reserved: z.number().int().optional().nullable(),
  sku_cogs_is_estimated: z.boolean().optional(),
  sku_taxset_id: z.string().optional().nullable(),
  qty_offsite: z.number().int().optional(),
  sku_external_id: z.string().optional().nullable(),
  sku_fq_lo: z.number().int().optional(),
  sku_fq_hi: z.number().int().optional(),
  sku_velocity: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  last_vip_qty: z.number().int().optional(),
  last_open_xfer_qty: z.number().int().optional(),
  sku_is_dropship: z.boolean().optional(),
  sku_ship_alone: z.boolean().optional(),
  sku_supplier_guid: z.string().optional().nullable(),
  next_stock_update: z.coerce.date().optional().nullable(),
  sku_exclude_metrics: z.boolean().optional().nullable(),
  netsuite_synced: z.coerce.date().optional().nullable(),
  category: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
  unlimited_allocation_until: z.coerce.date().optional().nullable(),
  avg_purchase_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  last_purchase_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  dont_buy_after: z.coerce.date().optional().nullable(),
  pack_size: z.number().int().optional().nullable(),
}).strict();

export const item_skuUncheckedCreateInputSchema: z.ZodType<Prisma.item_skuUncheckedCreateInput> = z.object({
  sku: z.string(),
  srp: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  is_autographed: z.boolean().optional().nullable(),
  is_taxable: z.boolean().optional().nullable(),
  is_counted_for_shipment: z.boolean().optional().nullable(),
  drink_by_date: z.coerce.date().optional().nullable(),
  sku_itemdetail_guid: z.string().optional().nullable(),
  index: z.number().int().optional().nullable(),
  last_order_date: z.coerce.date().optional().nullable(),
  last_restock: z.coerce.date().optional().nullable(),
  last_stock_update: z.coerce.date().optional().nullable(),
  last_stock_qty: z.number().int().optional(),
  next_delivery_date: z.coerce.date().optional().nullable(),
  last_count_owed: z.number().int().optional(),
  x_friendly_name: z.string().optional().nullable(),
  scramble_letters: z.string().optional().nullable(),
  scramble_qty_allowed: z.number().int().optional(),
  sku_allowed_states: z.string().optional().nullable(),
  comment: z.string().optional().nullable(),
  sku_tsv: z.string().optional().nullable(),
  sku_cogs_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  is_pallet_program: z.boolean().optional(),
  is_deprecated: z.boolean().optional().nullable(),
  sku_varietal: z.string().optional().nullable(),
  sku_region: z.string().optional().nullable(),
  last_count_shipped: z.number().int().optional(),
  is_in_wd: z.boolean().optional(),
  sku_was_swap: z.boolean().optional(),
  sku_sort: z.number().int().optional(),
  sku_preswap: z.string().optional().nullable(),
  sku_postswap: z.string().optional().nullable(),
  sku_qty_reserved: z.number().int().optional().nullable(),
  sku_cogs_is_estimated: z.boolean().optional(),
  sku_taxset_id: z.string().optional().nullable(),
  qty_offsite: z.number().int().optional(),
  sku_external_id: z.string().optional().nullable(),
  sku_fq_lo: z.number().int().optional(),
  sku_fq_hi: z.number().int().optional(),
  sku_velocity: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  last_vip_qty: z.number().int().optional(),
  last_open_xfer_qty: z.number().int().optional(),
  sku_is_dropship: z.boolean().optional(),
  sku_ship_alone: z.boolean().optional(),
  sku_supplier_guid: z.string().optional().nullable(),
  next_stock_update: z.coerce.date().optional().nullable(),
  sku_exclude_metrics: z.boolean().optional().nullable(),
  netsuite_synced: z.coerce.date().optional().nullable(),
  category: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
  unlimited_allocation_until: z.coerce.date().optional().nullable(),
  avg_purchase_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  last_purchase_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  dont_buy_after: z.coerce.date().optional().nullable(),
  pack_size: z.number().int().optional().nullable(),
}).strict();

export const item_skuUpdateInputSchema: z.ZodType<Prisma.item_skuUpdateInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  srp: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_autographed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_counted_for_shipment: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drink_by_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_itemdetail_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_restock: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  next_delivery_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_owed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x_friendly_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_letters: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_qty_allowed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_allowed_states: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  is_pallet_program: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deprecated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_shipped: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_in_wd: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_was_swap: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_sort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_preswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_postswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_qty_reserved: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_is_estimated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_taxset_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  qty_offsite: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_external_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_fq_lo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_fq_hi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_velocity: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  last_vip_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_open_xfer_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_is_dropship: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_ship_alone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_supplier_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  next_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_exclude_metrics: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unlimited_allocation_until: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avg_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dont_buy_after: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pack_size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_skuUncheckedUpdateInputSchema: z.ZodType<Prisma.item_skuUncheckedUpdateInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  srp: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_autographed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_counted_for_shipment: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drink_by_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_itemdetail_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_restock: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  next_delivery_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_owed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x_friendly_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_letters: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_qty_allowed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_allowed_states: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  is_pallet_program: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deprecated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_shipped: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_in_wd: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_was_swap: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_sort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_preswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_postswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_qty_reserved: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_is_estimated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_taxset_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  qty_offsite: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_external_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_fq_lo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_fq_hi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_velocity: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  last_vip_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_open_xfer_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_is_dropship: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_ship_alone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_supplier_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  next_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_exclude_metrics: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unlimited_allocation_until: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avg_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dont_buy_after: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pack_size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_skuCreateManyInputSchema: z.ZodType<Prisma.item_skuCreateManyInput> = z.object({
  sku: z.string(),
  srp: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  is_autographed: z.boolean().optional().nullable(),
  is_taxable: z.boolean().optional().nullable(),
  is_counted_for_shipment: z.boolean().optional().nullable(),
  drink_by_date: z.coerce.date().optional().nullable(),
  sku_itemdetail_guid: z.string().optional().nullable(),
  index: z.number().int().optional().nullable(),
  last_order_date: z.coerce.date().optional().nullable(),
  last_restock: z.coerce.date().optional().nullable(),
  last_stock_update: z.coerce.date().optional().nullable(),
  last_stock_qty: z.number().int().optional(),
  next_delivery_date: z.coerce.date().optional().nullable(),
  last_count_owed: z.number().int().optional(),
  x_friendly_name: z.string().optional().nullable(),
  scramble_letters: z.string().optional().nullable(),
  scramble_qty_allowed: z.number().int().optional(),
  sku_allowed_states: z.string().optional().nullable(),
  comment: z.string().optional().nullable(),
  sku_tsv: z.string().optional().nullable(),
  sku_cogs_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  is_pallet_program: z.boolean().optional(),
  is_deprecated: z.boolean().optional().nullable(),
  sku_varietal: z.string().optional().nullable(),
  sku_region: z.string().optional().nullable(),
  last_count_shipped: z.number().int().optional(),
  is_in_wd: z.boolean().optional(),
  sku_was_swap: z.boolean().optional(),
  sku_sort: z.number().int().optional(),
  sku_preswap: z.string().optional().nullable(),
  sku_postswap: z.string().optional().nullable(),
  sku_qty_reserved: z.number().int().optional().nullable(),
  sku_cogs_is_estimated: z.boolean().optional(),
  sku_taxset_id: z.string().optional().nullable(),
  qty_offsite: z.number().int().optional(),
  sku_external_id: z.string().optional().nullable(),
  sku_fq_lo: z.number().int().optional(),
  sku_fq_hi: z.number().int().optional(),
  sku_velocity: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  last_vip_qty: z.number().int().optional(),
  last_open_xfer_qty: z.number().int().optional(),
  sku_is_dropship: z.boolean().optional(),
  sku_ship_alone: z.boolean().optional(),
  sku_supplier_guid: z.string().optional().nullable(),
  next_stock_update: z.coerce.date().optional().nullable(),
  sku_exclude_metrics: z.boolean().optional().nullable(),
  netsuite_synced: z.coerce.date().optional().nullable(),
  category: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
  unlimited_allocation_until: z.coerce.date().optional().nullable(),
  avg_purchase_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  last_purchase_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  dont_buy_after: z.coerce.date().optional().nullable(),
  pack_size: z.number().int().optional().nullable(),
}).strict();

export const item_skuUpdateManyMutationInputSchema: z.ZodType<Prisma.item_skuUpdateManyMutationInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  srp: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_autographed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_counted_for_shipment: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drink_by_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_itemdetail_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_restock: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  next_delivery_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_owed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x_friendly_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_letters: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_qty_allowed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_allowed_states: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  is_pallet_program: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deprecated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_shipped: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_in_wd: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_was_swap: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_sort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_preswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_postswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_qty_reserved: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_is_estimated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_taxset_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  qty_offsite: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_external_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_fq_lo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_fq_hi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_velocity: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  last_vip_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_open_xfer_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_is_dropship: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_ship_alone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_supplier_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  next_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_exclude_metrics: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unlimited_allocation_until: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avg_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dont_buy_after: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pack_size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const item_skuUncheckedUpdateManyInputSchema: z.ZodType<Prisma.item_skuUncheckedUpdateManyInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  srp: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_autographed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_counted_for_shipment: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drink_by_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_itemdetail_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_order_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_restock: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_stock_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  next_delivery_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_owed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  x_friendly_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_letters: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scramble_qty_allowed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_allowed_states: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_tsv: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  is_pallet_program: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deprecated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_count_shipped: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_in_wd: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_was_swap: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_sort: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_preswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_postswap: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_qty_reserved: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_cogs_is_estimated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_taxset_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  qty_offsite: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_external_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_fq_lo: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_fq_hi: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_velocity: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  last_vip_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_open_xfer_qty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sku_is_dropship: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_ship_alone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sku_supplier_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  next_stock_update: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sku_exclude_metrics: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unlimited_allocation_until: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avg_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_purchase_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dont_buy_after: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pack_size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccCreateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccCreateInput> = z.object({
  Customer_ID: z.bigint().optional(),
  Customer_Created_At: z.string().optional().nullable(),
  First_Order_Date: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  First_Name: z.string().optional().nullable(),
  Last_Name: z.string().optional().nullable(),
  Billing_Address_First_Name: z.string().optional().nullable(),
  Billing_Address_Last_Name: z.string().optional().nullable(),
  Billing_Address_Company: z.string().optional().nullable(),
  Billing_Address_Address_1: z.string().optional().nullable(),
  Billing_Address_Address_2: z.string().optional().nullable(),
  Billing_Address_City: z.string().optional().nullable(),
  Billing_Address_State: z.string().optional().nullable(),
  Billing_Address_Postcode: z.string().optional().nullable(),
  Billing_Address_Country: z.string().optional().nullable(),
  Billing_Address_Email: z.string().optional().nullable(),
  Billing_Address_Phone: z.string().optional().nullable(),
  Shipping_Address_First_Name: z.string().optional().nullable(),
  Shipping_Address_Last_Name: z.string().optional().nullable(),
  Shipping_Address_Company: z.string().optional().nullable(),
  Shipping_Address_Address_1: z.string().optional().nullable(),
  Shipping_Address_Address_2: z.string().optional().nullable(),
  Shipping_Address_City: z.string().optional().nullable(),
  Shipping_Address_State: z.string().optional().nullable(),
  Shipping_Address_Postcode: z.string().optional().nullable(),
  Shipping_Address_Country: z.string().optional().nullable(),
  Total_Spent: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  Order_Count: z.number().int().optional().nullable(),
  Item_Count: z.number().int().optional().nullable(),
  Last_Order_Date: z.string().optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccUncheckedCreateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUncheckedCreateInput> = z.object({
  Customer_ID: z.bigint().optional(),
  Customer_Created_At: z.string().optional().nullable(),
  First_Order_Date: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  First_Name: z.string().optional().nullable(),
  Last_Name: z.string().optional().nullable(),
  Billing_Address_First_Name: z.string().optional().nullable(),
  Billing_Address_Last_Name: z.string().optional().nullable(),
  Billing_Address_Company: z.string().optional().nullable(),
  Billing_Address_Address_1: z.string().optional().nullable(),
  Billing_Address_Address_2: z.string().optional().nullable(),
  Billing_Address_City: z.string().optional().nullable(),
  Billing_Address_State: z.string().optional().nullable(),
  Billing_Address_Postcode: z.string().optional().nullable(),
  Billing_Address_Country: z.string().optional().nullable(),
  Billing_Address_Email: z.string().optional().nullable(),
  Billing_Address_Phone: z.string().optional().nullable(),
  Shipping_Address_First_Name: z.string().optional().nullable(),
  Shipping_Address_Last_Name: z.string().optional().nullable(),
  Shipping_Address_Company: z.string().optional().nullable(),
  Shipping_Address_Address_1: z.string().optional().nullable(),
  Shipping_Address_Address_2: z.string().optional().nullable(),
  Shipping_Address_City: z.string().optional().nullable(),
  Shipping_Address_State: z.string().optional().nullable(),
  Shipping_Address_Postcode: z.string().optional().nullable(),
  Shipping_Address_Country: z.string().optional().nullable(),
  Total_Spent: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  Order_Count: z.number().int().optional().nullable(),
  Item_Count: z.number().int().optional().nullable(),
  Last_Order_Date: z.string().optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccUpdateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUpdateInput> = z.object({
  Customer_ID: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  Customer_Created_At: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Total_Spent: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Order_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Item_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccUncheckedUpdateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUncheckedUpdateInput> = z.object({
  Customer_ID: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  Customer_Created_At: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Total_Spent: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Order_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Item_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccCreateManyInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccCreateManyInput> = z.object({
  Customer_ID: z.bigint().optional(),
  Customer_Created_At: z.string().optional().nullable(),
  First_Order_Date: z.string().optional().nullable(),
  Email: z.string().optional().nullable(),
  First_Name: z.string().optional().nullable(),
  Last_Name: z.string().optional().nullable(),
  Billing_Address_First_Name: z.string().optional().nullable(),
  Billing_Address_Last_Name: z.string().optional().nullable(),
  Billing_Address_Company: z.string().optional().nullable(),
  Billing_Address_Address_1: z.string().optional().nullable(),
  Billing_Address_Address_2: z.string().optional().nullable(),
  Billing_Address_City: z.string().optional().nullable(),
  Billing_Address_State: z.string().optional().nullable(),
  Billing_Address_Postcode: z.string().optional().nullable(),
  Billing_Address_Country: z.string().optional().nullable(),
  Billing_Address_Email: z.string().optional().nullable(),
  Billing_Address_Phone: z.string().optional().nullable(),
  Shipping_Address_First_Name: z.string().optional().nullable(),
  Shipping_Address_Last_Name: z.string().optional().nullable(),
  Shipping_Address_Company: z.string().optional().nullable(),
  Shipping_Address_Address_1: z.string().optional().nullable(),
  Shipping_Address_Address_2: z.string().optional().nullable(),
  Shipping_Address_City: z.string().optional().nullable(),
  Shipping_Address_State: z.string().optional().nullable(),
  Shipping_Address_Postcode: z.string().optional().nullable(),
  Shipping_Address_Country: z.string().optional().nullable(),
  Total_Spent: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  Order_Count: z.number().int().optional().nullable(),
  Item_Count: z.number().int().optional().nullable(),
  Last_Order_Date: z.string().optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccUpdateManyMutationInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUpdateManyMutationInput> = z.object({
  Customer_ID: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  Customer_Created_At: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Total_Spent: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Order_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Item_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const new_customer_data_after_bk_from_lccUncheckedUpdateManyInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUncheckedUpdateManyInput> = z.object({
  Customer_ID: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  Customer_Created_At: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Billing_Address_Phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_1: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_State: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Postcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Shipping_Address_Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Total_Spent: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Order_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Item_Count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Order_Date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const old_order_data_500k_ordersCreateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersCreateInput> = z.object({
  order_guid: z.string(),
  order_user: z.string().optional().nullable(),
  order_qty: z.number().int().optional().nullable(),
  order_total_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_timestamp: z.coerce.date().optional().nullable(),
  order_offer_id: z.string().optional().nullable(),
  order_user_nth: z.string().optional().nullable(),
  order_auth_date: z.coerce.date().optional().nullable(),
  order_transaction_id: z.bigint().optional().nullable(),
  order_yymm_pst: z.string().optional().nullable(),
  order_type: z.string().optional().nullable(),
  offer_guid: z.string().optional().nullable(),
  offer_title: z.string().optional().nullable(),
  offer_price: z.string().optional().nullable(),
  offer_meta_title: z.string().optional().nullable(),
  offer_subtitle: z.string().optional().nullable(),
  offer_primary_varietal: z.string().optional().nullable(),
}).strict();

export const old_order_data_500k_ordersUncheckedCreateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersUncheckedCreateInput> = z.object({
  order_guid: z.string(),
  order_user: z.string().optional().nullable(),
  order_qty: z.number().int().optional().nullable(),
  order_total_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_timestamp: z.coerce.date().optional().nullable(),
  order_offer_id: z.string().optional().nullable(),
  order_user_nth: z.string().optional().nullable(),
  order_auth_date: z.coerce.date().optional().nullable(),
  order_transaction_id: z.bigint().optional().nullable(),
  order_yymm_pst: z.string().optional().nullable(),
  order_type: z.string().optional().nullable(),
  offer_guid: z.string().optional().nullable(),
  offer_title: z.string().optional().nullable(),
  offer_price: z.string().optional().nullable(),
  offer_meta_title: z.string().optional().nullable(),
  offer_subtitle: z.string().optional().nullable(),
  offer_primary_varietal: z.string().optional().nullable(),
}).strict();

export const old_order_data_500k_ordersUpdateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersUpdateInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_meta_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_primary_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const old_order_data_500k_ordersUncheckedUpdateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersUncheckedUpdateInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_meta_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_primary_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const old_order_data_500k_ordersCreateManyInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersCreateManyInput> = z.object({
  order_guid: z.string(),
  order_user: z.string().optional().nullable(),
  order_qty: z.number().int().optional().nullable(),
  order_total_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_timestamp: z.coerce.date().optional().nullable(),
  order_offer_id: z.string().optional().nullable(),
  order_user_nth: z.string().optional().nullable(),
  order_auth_date: z.coerce.date().optional().nullable(),
  order_transaction_id: z.bigint().optional().nullable(),
  order_yymm_pst: z.string().optional().nullable(),
  order_type: z.string().optional().nullable(),
  offer_guid: z.string().optional().nullable(),
  offer_title: z.string().optional().nullable(),
  offer_price: z.string().optional().nullable(),
  offer_meta_title: z.string().optional().nullable(),
  offer_subtitle: z.string().optional().nullable(),
  offer_primary_varietal: z.string().optional().nullable(),
}).strict();

export const old_order_data_500k_ordersUpdateManyMutationInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersUpdateManyMutationInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_meta_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_primary_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const old_order_data_500k_ordersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersUncheckedUpdateManyInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_guid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_meta_title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_primary_varietal: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const order_listCreateInputSchema: z.ZodType<Prisma.order_listCreateInput> = z.object({
  order_guid: z.string(),
  order_sku_list: z.string().optional().nullable(),
  order_user: z.string().optional().nullable(),
  order_billing_address: z.string().optional().nullable(),
  order_qty: z.number().int().optional().nullable(),
  order_total_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_credit_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_tax: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_timestamp: z.string().optional().nullable(),
  order_status: z.string().optional().nullable(),
  order_payment_status: z.string().optional().nullable(),
  order_offer_id: z.string().optional().nullable(),
  order_utm_source: z.string().optional().nullable(),
  order_utm_medium: z.string().optional().nullable(),
  order_utm_campaign: z.string().optional().nullable(),
  order_user_nth: z.number().int().optional().nullable(),
  order_auth_code: z.string().optional().nullable(),
  order_auth_date: z.string().optional().nullable(),
  order_billing_instrument: z.string().optional().nullable(),
  order_transaction_id: z.string().optional().nullable(),
  x_user_email: z.string().optional().nullable(),
  order_unit_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_promo_code: z.string().optional().nullable(),
  x_order_is_authorized_or_captured: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
  cohort_mth: z.string().optional().nullable(),
  order_reveal_date: z.string().optional().nullable(),
  cohort_fp_mth: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  is_test_order: z.string().optional().nullable(),
  order_rejected_dt: z.string().optional().nullable(),
  order_upgraded_value: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_allocated_cogs: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_cohort_fpdate: z.string().optional().nullable(),
  order_cc_fee: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_refund_transaction_id: z.string().optional().nullable(),
  order_original_mf: z.string().optional().nullable(),
  order_yymm_pst: z.string().optional().nullable(),
  order_mc_eid: z.string().optional().nullable(),
  order_mc_cid: z.string().optional().nullable(),
  order_subscription_id: z.string().optional().nullable(),
  order_is_void: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
  order_cash_in: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_c: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_f: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_s: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_r: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_t: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_m: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_g: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_other: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_ship_revenue: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_previous_order: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  netsuite_synced: z.string().optional().nullable(),
  payment_intent_id: z.string().optional().nullable(),
  utm_device: z.string().optional().nullable(),
  utm_placement: z.string().optional().nullable(),
  utm_site: z.string().optional().nullable(),
  order_type: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
}).strict();

export const order_listUncheckedCreateInputSchema: z.ZodType<Prisma.order_listUncheckedCreateInput> = z.object({
  order_guid: z.string(),
  order_sku_list: z.string().optional().nullable(),
  order_user: z.string().optional().nullable(),
  order_billing_address: z.string().optional().nullable(),
  order_qty: z.number().int().optional().nullable(),
  order_total_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_credit_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_tax: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_timestamp: z.string().optional().nullable(),
  order_status: z.string().optional().nullable(),
  order_payment_status: z.string().optional().nullable(),
  order_offer_id: z.string().optional().nullable(),
  order_utm_source: z.string().optional().nullable(),
  order_utm_medium: z.string().optional().nullable(),
  order_utm_campaign: z.string().optional().nullable(),
  order_user_nth: z.number().int().optional().nullable(),
  order_auth_code: z.string().optional().nullable(),
  order_auth_date: z.string().optional().nullable(),
  order_billing_instrument: z.string().optional().nullable(),
  order_transaction_id: z.string().optional().nullable(),
  x_user_email: z.string().optional().nullable(),
  order_unit_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_promo_code: z.string().optional().nullable(),
  x_order_is_authorized_or_captured: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
  cohort_mth: z.string().optional().nullable(),
  order_reveal_date: z.string().optional().nullable(),
  cohort_fp_mth: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  is_test_order: z.string().optional().nullable(),
  order_rejected_dt: z.string().optional().nullable(),
  order_upgraded_value: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_allocated_cogs: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_cohort_fpdate: z.string().optional().nullable(),
  order_cc_fee: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_refund_transaction_id: z.string().optional().nullable(),
  order_original_mf: z.string().optional().nullable(),
  order_yymm_pst: z.string().optional().nullable(),
  order_mc_eid: z.string().optional().nullable(),
  order_mc_cid: z.string().optional().nullable(),
  order_subscription_id: z.string().optional().nullable(),
  order_is_void: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
  order_cash_in: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_c: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_f: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_s: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_r: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_t: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_m: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_g: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_other: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_ship_revenue: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_previous_order: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  netsuite_synced: z.string().optional().nullable(),
  payment_intent_id: z.string().optional().nullable(),
  utm_device: z.string().optional().nullable(),
  utm_placement: z.string().optional().nullable(),
  utm_site: z.string().optional().nullable(),
  order_type: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
}).strict();

export const order_listUpdateInputSchema: z.ZodType<Prisma.order_listUpdateInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_sku_list: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_credit_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_tax: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_payment_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_instrument: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_unit_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_promo_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NullableEnumorder_list_x_order_is_authorized_or_capturedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_mth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_reveal_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_fp_mth: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_rejected_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_upgraded_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_allocated_cogs: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cohort_fpdate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cc_fee: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_refund_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_original_mf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_eid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_cid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_is_void: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NullableEnumorder_list_order_is_voidFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cash_in: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_c: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_f: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_s: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_r: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_t: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_m: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_g: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_other: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_ship_revenue: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_previous_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_intent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NullableEnumorder_list_order_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const order_listUncheckedUpdateInputSchema: z.ZodType<Prisma.order_listUncheckedUpdateInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_sku_list: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_credit_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_tax: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_payment_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_instrument: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_unit_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_promo_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NullableEnumorder_list_x_order_is_authorized_or_capturedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_mth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_reveal_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_fp_mth: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_rejected_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_upgraded_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_allocated_cogs: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cohort_fpdate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cc_fee: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_refund_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_original_mf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_eid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_cid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_is_void: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NullableEnumorder_list_order_is_voidFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cash_in: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_c: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_f: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_s: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_r: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_t: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_m: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_g: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_other: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_ship_revenue: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_previous_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_intent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NullableEnumorder_list_order_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const order_listCreateManyInputSchema: z.ZodType<Prisma.order_listCreateManyInput> = z.object({
  order_guid: z.string(),
  order_sku_list: z.string().optional().nullable(),
  order_user: z.string().optional().nullable(),
  order_billing_address: z.string().optional().nullable(),
  order_qty: z.number().int().optional().nullable(),
  order_total_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_credit_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_tax: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_timestamp: z.string().optional().nullable(),
  order_status: z.string().optional().nullable(),
  order_payment_status: z.string().optional().nullable(),
  order_offer_id: z.string().optional().nullable(),
  order_utm_source: z.string().optional().nullable(),
  order_utm_medium: z.string().optional().nullable(),
  order_utm_campaign: z.string().optional().nullable(),
  order_user_nth: z.number().int().optional().nullable(),
  order_auth_code: z.string().optional().nullable(),
  order_auth_date: z.string().optional().nullable(),
  order_billing_instrument: z.string().optional().nullable(),
  order_transaction_id: z.string().optional().nullable(),
  x_user_email: z.string().optional().nullable(),
  order_unit_price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_promo_code: z.string().optional().nullable(),
  x_order_is_authorized_or_captured: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
  cohort_mth: z.string().optional().nullable(),
  order_reveal_date: z.string().optional().nullable(),
  cohort_fp_mth: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  is_test_order: z.string().optional().nullable(),
  order_rejected_dt: z.string().optional().nullable(),
  order_upgraded_value: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_allocated_cogs: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_cohort_fpdate: z.string().optional().nullable(),
  order_cc_fee: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_refund_transaction_id: z.string().optional().nullable(),
  order_original_mf: z.string().optional().nullable(),
  order_yymm_pst: z.string().optional().nullable(),
  order_mc_eid: z.string().optional().nullable(),
  order_mc_cid: z.string().optional().nullable(),
  order_subscription_id: z.string().optional().nullable(),
  order_is_void: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
  order_cash_in: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_c: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_f: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_s: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_r: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_t: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_m: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_g: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_disc_other: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_ship_revenue: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  order_previous_order: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  netsuite_synced: z.string().optional().nullable(),
  payment_intent_id: z.string().optional().nullable(),
  utm_device: z.string().optional().nullable(),
  utm_placement: z.string().optional().nullable(),
  utm_site: z.string().optional().nullable(),
  order_type: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
}).strict();

export const order_listUpdateManyMutationInputSchema: z.ZodType<Prisma.order_listUpdateManyMutationInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_sku_list: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_credit_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_tax: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_payment_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_instrument: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_unit_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_promo_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NullableEnumorder_list_x_order_is_authorized_or_capturedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_mth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_reveal_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_fp_mth: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_rejected_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_upgraded_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_allocated_cogs: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cohort_fpdate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cc_fee: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_refund_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_original_mf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_eid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_cid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_is_void: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NullableEnumorder_list_order_is_voidFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cash_in: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_c: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_f: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_s: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_r: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_t: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_m: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_g: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_other: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_ship_revenue: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_previous_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_intent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NullableEnumorder_list_order_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const order_listUncheckedUpdateManyInputSchema: z.ZodType<Prisma.order_listUncheckedUpdateManyInput> = z.object({
  order_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_sku_list: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_total_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_credit_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_tax: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_timestamp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_payment_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_offer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_user_nth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_auth_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_billing_instrument: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_unit_price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_promo_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_is_authorized_or_captured: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NullableEnumorder_list_x_order_is_authorized_or_capturedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_mth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_reveal_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cohort_fp_mth: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_test_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_rejected_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_upgraded_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_allocated_cogs: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cohort_fpdate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cc_fee: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_refund_transaction_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_original_mf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_yymm_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_eid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_mc_cid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_subscription_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_is_void: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NullableEnumorder_list_order_is_voidFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_cash_in: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_c: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_f: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_s: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_r: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_t: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_m: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_g: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_disc_other: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_ship_revenue: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_previous_order: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  netsuite_synced: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_intent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_type: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NullableEnumorder_list_order_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const user_listCreateInputSchema: z.ZodType<Prisma.user_listCreateInput> = z.object({
  user_guid: z.string(),
  user_birthday: z.string().optional().nullable(),
  user_default_address: z.string().optional().nullable(),
  user_email: z.string().optional().nullable(),
  user_fname: z.string().optional().nullable(),
  user_lname: z.string().optional().nullable(),
  user_is21: z.string().optional().nullable(),
  user_is_testaccount: z.string().optional().nullable(),
  user_image_url: z.string().optional().nullable(),
  user_url_profile: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
  user_login_dt: z.string().optional().nullable(),
  user_signup_dt: z.string().optional().nullable(),
  user_last_purchase_dt: z.coerce.date().optional().nullable(),
  user_first_purchase_dt: z.coerce.date().optional().nullable(),
  user_referred_by_id: z.string().optional().nullable(),
  user_referral_domain: z.string().optional().nullable(),
  session_utm_source: z.string().optional().nullable(),
  session_utm_campaign: z.string().optional().nullable(),
  session_utm_medium: z.string().optional().nullable(),
  x_life_credit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_total_qty: z.number().int().optional().nullable(),
  x_life_spend: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_life_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_acquisition_cost: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_achievement_points: z.number().int().optional().nullable(),
  user_is_private: z.string().optional().nullable(),
  user_is_red_buyer: z.string().optional().nullable(),
  user_is_white_buyer: z.string().optional().nullable(),
  user_is_largeformat_buyer: z.string().optional().nullable(),
  user_min_price: z.string().optional().nullable(),
  user_max_price: z.string().optional().nullable(),
  user_avg_price: z.string().optional().nullable(),
  user_is_push: z.string().optional().nullable(),
  user_outreach_dt: z.string().optional().nullable(),
  ls_is_student: z.string().optional().nullable(),
  ls_is_personal_email: z.string().optional().nullable(),
  ls_grade: z.string().optional().nullable(),
  ls_company_state_code: z.string().optional().nullable(),
  ls_fname: z.string().optional().nullable(),
  ls_lname: z.string().optional().nullable(),
  ls_location_state: z.string().optional().nullable(),
  ls_company_name: z.string().optional().nullable(),
  ls_company_industry: z.string().optional().nullable(),
  ls_company_country: z.string().optional().nullable(),
  ls_company_emps: z.string().optional().nullable(),
  ls_is_spam: z.string().optional().nullable(),
  ls_customer_fit: z.string().optional().nullable(),
  ls_customer_fit_ext: z.string().optional().nullable(),
  x_order_count: z.number().int().optional().nullable(),
  user_inactive_dt: z.string().optional().nullable(),
  user_email_n: z.string().optional().nullable(),
  user_note: z.string().optional().nullable(),
  user_expiry: z.string().optional().nullable(),
  user_last_ship_date: z.string().optional().nullable(),
  x_cloud_value: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_cloud_count: z.number().int().optional().nullable(),
  user_is_vip: z.string().optional().nullable(),
  user_signup_ym_pst: z.string().optional().nullable(),
  suspended_at: z.string().optional().nullable(),
  last_synced_at: z.string().optional().nullable(),
  is_admin: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  user_password: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  google_id: z.string().optional().nullable(),
  utm_device: z.string().optional().nullable(),
  utm_placement: z.string().optional().nullable(),
  utm_site: z.string().optional().nullable(),
  holdout_num: z.string().optional().nullable(),
}).strict();

export const user_listUncheckedCreateInputSchema: z.ZodType<Prisma.user_listUncheckedCreateInput> = z.object({
  user_guid: z.string(),
  user_birthday: z.string().optional().nullable(),
  user_default_address: z.string().optional().nullable(),
  user_email: z.string().optional().nullable(),
  user_fname: z.string().optional().nullable(),
  user_lname: z.string().optional().nullable(),
  user_is21: z.string().optional().nullable(),
  user_is_testaccount: z.string().optional().nullable(),
  user_image_url: z.string().optional().nullable(),
  user_url_profile: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
  user_login_dt: z.string().optional().nullable(),
  user_signup_dt: z.string().optional().nullable(),
  user_last_purchase_dt: z.coerce.date().optional().nullable(),
  user_first_purchase_dt: z.coerce.date().optional().nullable(),
  user_referred_by_id: z.string().optional().nullable(),
  user_referral_domain: z.string().optional().nullable(),
  session_utm_source: z.string().optional().nullable(),
  session_utm_campaign: z.string().optional().nullable(),
  session_utm_medium: z.string().optional().nullable(),
  x_life_credit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_total_qty: z.number().int().optional().nullable(),
  x_life_spend: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_life_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_acquisition_cost: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_achievement_points: z.number().int().optional().nullable(),
  user_is_private: z.string().optional().nullable(),
  user_is_red_buyer: z.string().optional().nullable(),
  user_is_white_buyer: z.string().optional().nullable(),
  user_is_largeformat_buyer: z.string().optional().nullable(),
  user_min_price: z.string().optional().nullable(),
  user_max_price: z.string().optional().nullable(),
  user_avg_price: z.string().optional().nullable(),
  user_is_push: z.string().optional().nullable(),
  user_outreach_dt: z.string().optional().nullable(),
  ls_is_student: z.string().optional().nullable(),
  ls_is_personal_email: z.string().optional().nullable(),
  ls_grade: z.string().optional().nullable(),
  ls_company_state_code: z.string().optional().nullable(),
  ls_fname: z.string().optional().nullable(),
  ls_lname: z.string().optional().nullable(),
  ls_location_state: z.string().optional().nullable(),
  ls_company_name: z.string().optional().nullable(),
  ls_company_industry: z.string().optional().nullable(),
  ls_company_country: z.string().optional().nullable(),
  ls_company_emps: z.string().optional().nullable(),
  ls_is_spam: z.string().optional().nullable(),
  ls_customer_fit: z.string().optional().nullable(),
  ls_customer_fit_ext: z.string().optional().nullable(),
  x_order_count: z.number().int().optional().nullable(),
  user_inactive_dt: z.string().optional().nullable(),
  user_email_n: z.string().optional().nullable(),
  user_note: z.string().optional().nullable(),
  user_expiry: z.string().optional().nullable(),
  user_last_ship_date: z.string().optional().nullable(),
  x_cloud_value: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_cloud_count: z.number().int().optional().nullable(),
  user_is_vip: z.string().optional().nullable(),
  user_signup_ym_pst: z.string().optional().nullable(),
  suspended_at: z.string().optional().nullable(),
  last_synced_at: z.string().optional().nullable(),
  is_admin: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  user_password: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  google_id: z.string().optional().nullable(),
  utm_device: z.string().optional().nullable(),
  utm_placement: z.string().optional().nullable(),
  utm_site: z.string().optional().nullable(),
  holdout_num: z.string().optional().nullable(),
}).strict();

export const user_listUpdateInputSchema: z.ZodType<Prisma.user_listUpdateInput> = z.object({
  user_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_birthday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_default_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is21: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_testaccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_url_profile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_login_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_first_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referred_by_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referral_domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_credit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_total_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_spend: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_acquisition_cost: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_achievement_points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_private: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_red_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_white_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_largeformat_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_min_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_max_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_avg_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_push: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_outreach_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_student: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_personal_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_grade: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_state_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_location_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_industry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_emps: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_spam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_inactive_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email_n: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_expiry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_ship_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_vip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_ym_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suspended_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_synced_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_admin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  google_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holdout_num: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const user_listUncheckedUpdateInputSchema: z.ZodType<Prisma.user_listUncheckedUpdateInput> = z.object({
  user_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_birthday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_default_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is21: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_testaccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_url_profile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_login_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_first_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referred_by_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referral_domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_credit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_total_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_spend: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_acquisition_cost: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_achievement_points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_private: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_red_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_white_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_largeformat_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_min_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_max_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_avg_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_push: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_outreach_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_student: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_personal_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_grade: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_state_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_location_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_industry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_emps: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_spam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_inactive_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email_n: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_expiry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_ship_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_vip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_ym_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suspended_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_synced_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_admin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  google_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holdout_num: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const user_listCreateManyInputSchema: z.ZodType<Prisma.user_listCreateManyInput> = z.object({
  user_guid: z.string(),
  user_birthday: z.string().optional().nullable(),
  user_default_address: z.string().optional().nullable(),
  user_email: z.string().optional().nullable(),
  user_fname: z.string().optional().nullable(),
  user_lname: z.string().optional().nullable(),
  user_is21: z.string().optional().nullable(),
  user_is_testaccount: z.string().optional().nullable(),
  user_image_url: z.string().optional().nullable(),
  user_url_profile: z.string().optional().nullable(),
  user_name: z.string().optional().nullable(),
  user_login_dt: z.string().optional().nullable(),
  user_signup_dt: z.string().optional().nullable(),
  user_last_purchase_dt: z.coerce.date().optional().nullable(),
  user_first_purchase_dt: z.coerce.date().optional().nullable(),
  user_referred_by_id: z.string().optional().nullable(),
  user_referral_domain: z.string().optional().nullable(),
  session_utm_source: z.string().optional().nullable(),
  session_utm_campaign: z.string().optional().nullable(),
  session_utm_medium: z.string().optional().nullable(),
  x_life_credit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_total_qty: z.number().int().optional().nullable(),
  x_life_spend: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_life_discount: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_acquisition_cost: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_achievement_points: z.number().int().optional().nullable(),
  user_is_private: z.string().optional().nullable(),
  user_is_red_buyer: z.string().optional().nullable(),
  user_is_white_buyer: z.string().optional().nullable(),
  user_is_largeformat_buyer: z.string().optional().nullable(),
  user_min_price: z.string().optional().nullable(),
  user_max_price: z.string().optional().nullable(),
  user_avg_price: z.string().optional().nullable(),
  user_is_push: z.string().optional().nullable(),
  user_outreach_dt: z.string().optional().nullable(),
  ls_is_student: z.string().optional().nullable(),
  ls_is_personal_email: z.string().optional().nullable(),
  ls_grade: z.string().optional().nullable(),
  ls_company_state_code: z.string().optional().nullable(),
  ls_fname: z.string().optional().nullable(),
  ls_lname: z.string().optional().nullable(),
  ls_location_state: z.string().optional().nullable(),
  ls_company_name: z.string().optional().nullable(),
  ls_company_industry: z.string().optional().nullable(),
  ls_company_country: z.string().optional().nullable(),
  ls_company_emps: z.string().optional().nullable(),
  ls_is_spam: z.string().optional().nullable(),
  ls_customer_fit: z.string().optional().nullable(),
  ls_customer_fit_ext: z.string().optional().nullable(),
  x_order_count: z.number().int().optional().nullable(),
  user_inactive_dt: z.string().optional().nullable(),
  user_email_n: z.string().optional().nullable(),
  user_note: z.string().optional().nullable(),
  user_expiry: z.string().optional().nullable(),
  user_last_ship_date: z.string().optional().nullable(),
  x_cloud_value: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  x_cloud_count: z.number().int().optional().nullable(),
  user_is_vip: z.string().optional().nullable(),
  user_signup_ym_pst: z.string().optional().nullable(),
  suspended_at: z.string().optional().nullable(),
  last_synced_at: z.string().optional().nullable(),
  is_admin: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  user_password: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  google_id: z.string().optional().nullable(),
  utm_device: z.string().optional().nullable(),
  utm_placement: z.string().optional().nullable(),
  utm_site: z.string().optional().nullable(),
  holdout_num: z.string().optional().nullable(),
}).strict();

export const user_listUpdateManyMutationInputSchema: z.ZodType<Prisma.user_listUpdateManyMutationInput> = z.object({
  user_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_birthday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_default_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is21: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_testaccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_url_profile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_login_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_first_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referred_by_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referral_domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_credit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_total_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_spend: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_acquisition_cost: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_achievement_points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_private: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_red_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_white_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_largeformat_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_min_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_max_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_avg_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_push: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_outreach_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_student: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_personal_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_grade: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_state_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_location_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_industry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_emps: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_spam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_inactive_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email_n: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_expiry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_ship_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_vip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_ym_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suspended_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_synced_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_admin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  google_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holdout_num: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const user_listUncheckedUpdateManyInputSchema: z.ZodType<Prisma.user_listUncheckedUpdateManyInput> = z.object({
  user_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_birthday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_default_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is21: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_testaccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_url_profile: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_login_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_first_purchase_dt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referred_by_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_referral_domain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_credit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_total_qty: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_spend: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_life_discount: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_acquisition_cost: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_achievement_points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_private: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_red_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_white_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_largeformat_buyer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_min_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_max_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_avg_price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_push: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_outreach_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_student: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_personal_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_grade: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_state_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_fname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_lname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_location_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_industry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_company_emps: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_is_spam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ls_customer_fit_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_inactive_dt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_email_n: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_expiry: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_last_ship_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_value: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x_cloud_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_is_vip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_signup_ym_pst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suspended_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_synced_at: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_admin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  google_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_device: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_placement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_site: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holdout_num: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const usersCreateInputSchema: z.ZodType<Prisma.usersCreateInput> = z.object({
  id: z.bigint().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  salt: z.bigint().optional(),
  alias: z.string().optional().nullable(),
  ax_maxmin: z.boolean().optional(),
  ax_homes: z.boolean().optional().nullable(),
  ax_tax: z.boolean().optional(),
  ax_evdb: z.boolean().optional().nullable(),
  ax_spgp: z.boolean().optional(),
  ax_uc: z.boolean().optional(),
}).strict();

export const usersUncheckedCreateInputSchema: z.ZodType<Prisma.usersUncheckedCreateInput> = z.object({
  id: z.bigint().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  salt: z.bigint().optional(),
  alias: z.string().optional().nullable(),
  ax_maxmin: z.boolean().optional(),
  ax_homes: z.boolean().optional().nullable(),
  ax_tax: z.boolean().optional(),
  ax_evdb: z.boolean().optional().nullable(),
  ax_spgp: z.boolean().optional(),
  ax_uc: z.boolean().optional(),
}).strict();

export const usersUpdateInputSchema: z.ZodType<Prisma.usersUpdateInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  salt: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  alias: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_maxmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_homes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_tax: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_evdb: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_spgp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_uc: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersUncheckedUpdateInputSchema: z.ZodType<Prisma.usersUncheckedUpdateInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  salt: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  alias: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_maxmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_homes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_tax: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_evdb: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_spgp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_uc: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersCreateManyInputSchema: z.ZodType<Prisma.usersCreateManyInput> = z.object({
  id: z.bigint().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  salt: z.bigint().optional(),
  alias: z.string().optional().nullable(),
  ax_maxmin: z.boolean().optional(),
  ax_homes: z.boolean().optional().nullable(),
  ax_tax: z.boolean().optional(),
  ax_evdb: z.boolean().optional().nullable(),
  ax_spgp: z.boolean().optional(),
  ax_uc: z.boolean().optional(),
}).strict();

export const usersUpdateManyMutationInputSchema: z.ZodType<Prisma.usersUpdateManyMutationInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  salt: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  alias: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_maxmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_homes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_tax: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_evdb: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_spgp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_uc: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.usersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  salt: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  alias: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_maxmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_homes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_tax: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_evdb: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ax_spgp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ax_uc: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const order_lockCreateInputSchema: z.ZodType<Prisma.order_lockCreateInput> = z.object({
  order_id: z.string(),
  locked_at: z.coerce.date().optional(),
}).strict();

export const order_lockUncheckedCreateInputSchema: z.ZodType<Prisma.order_lockUncheckedCreateInput> = z.object({
  order_id: z.string(),
  locked_at: z.coerce.date().optional(),
}).strict();

export const order_lockUpdateInputSchema: z.ZodType<Prisma.order_lockUpdateInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locked_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const order_lockUncheckedUpdateInputSchema: z.ZodType<Prisma.order_lockUncheckedUpdateInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locked_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const order_lockCreateManyInputSchema: z.ZodType<Prisma.order_lockCreateManyInput> = z.object({
  order_id: z.string(),
  locked_at: z.coerce.date().optional(),
}).strict();

export const order_lockUpdateManyMutationInputSchema: z.ZodType<Prisma.order_lockUpdateManyMutationInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locked_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const order_lockUncheckedUpdateManyInputSchema: z.ZodType<Prisma.order_lockUncheckedUpdateManyInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locked_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_audit_logCreateInputSchema: z.ZodType<Prisma.v3_audit_logCreateInput> = z.object({
  id: z.bigint().optional(),
  event_ts: z.coerce.date().optional(),
  event_name: z.string(),
  event_ext: z.string().optional().nullable(),
  event_userid: z.bigint().optional().nullable(),
  offer_id: z.number().int().optional().nullable(),
  order_id: z.bigint().optional().nullable(),
  time_taken_ms: z.number().int().optional().nullable(),
}).strict();

export const v3_audit_logUncheckedCreateInputSchema: z.ZodType<Prisma.v3_audit_logUncheckedCreateInput> = z.object({
  id: z.bigint().optional(),
  event_ts: z.coerce.date().optional(),
  event_name: z.string(),
  event_ext: z.string().optional().nullable(),
  event_userid: z.bigint().optional().nullable(),
  offer_id: z.number().int().optional().nullable(),
  order_id: z.bigint().optional().nullable(),
  time_taken_ms: z.number().int().optional().nullable(),
}).strict();

export const v3_audit_logUpdateInputSchema: z.ZodType<Prisma.v3_audit_logUpdateInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  event_ts: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event_userid: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken_ms: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const v3_audit_logUncheckedUpdateInputSchema: z.ZodType<Prisma.v3_audit_logUncheckedUpdateInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  event_ts: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event_userid: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken_ms: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const v3_audit_logCreateManyInputSchema: z.ZodType<Prisma.v3_audit_logCreateManyInput> = z.object({
  id: z.bigint().optional(),
  event_ts: z.coerce.date().optional(),
  event_name: z.string(),
  event_ext: z.string().optional().nullable(),
  event_userid: z.bigint().optional().nullable(),
  offer_id: z.number().int().optional().nullable(),
  order_id: z.bigint().optional().nullable(),
  time_taken_ms: z.number().int().optional().nullable(),
}).strict();

export const v3_audit_logUpdateManyMutationInputSchema: z.ZodType<Prisma.v3_audit_logUpdateManyMutationInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  event_ts: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event_userid: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken_ms: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const v3_audit_logUncheckedUpdateManyInputSchema: z.ZodType<Prisma.v3_audit_logUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  event_ts: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_ext: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event_userid: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order_id: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken_ms: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const v3_offerCreateInputSchema: z.ZodType<Prisma.v3_offerCreateInput> = z.object({
  offer_name: z.string(),
  offer_variant_id: z.string(),
  offer_product_name: z.string().optional(),
}).strict();

export const v3_offerUncheckedCreateInputSchema: z.ZodType<Prisma.v3_offerUncheckedCreateInput> = z.object({
  offer_id: z.number().int().optional(),
  offer_name: z.string(),
  offer_variant_id: z.string(),
  offer_product_name: z.string().optional(),
}).strict();

export const v3_offerUpdateInputSchema: z.ZodType<Prisma.v3_offerUpdateInput> = z.object({
  offer_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_offerUncheckedUpdateInputSchema: z.ZodType<Prisma.v3_offerUncheckedUpdateInput> = z.object({
  offer_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  offer_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_offerCreateManyInputSchema: z.ZodType<Prisma.v3_offerCreateManyInput> = z.object({
  offer_id: z.number().int().optional(),
  offer_name: z.string(),
  offer_variant_id: z.string(),
  offer_product_name: z.string().optional(),
}).strict();

export const v3_offerUpdateManyMutationInputSchema: z.ZodType<Prisma.v3_offerUpdateManyMutationInput> = z.object({
  offer_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_offerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.v3_offerUncheckedUpdateManyInput> = z.object({
  offer_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  offer_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_product_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_offer_manifestCreateInputSchema: z.ZodType<Prisma.v3_offer_manifestCreateInput> = z.object({
  m_id: z.bigint().optional(),
  offer_id: z.bigint(),
  mf_variant: z.string(),
  assignee_id: z.string().optional().nullable(),
  assignment_ordering: z.number(),
}).strict();

export const v3_offer_manifestUncheckedCreateInputSchema: z.ZodType<Prisma.v3_offer_manifestUncheckedCreateInput> = z.object({
  m_id: z.bigint().optional(),
  offer_id: z.bigint(),
  mf_variant: z.string(),
  assignee_id: z.string().optional().nullable(),
  assignment_ordering: z.number(),
}).strict();

export const v3_offer_manifestUpdateInputSchema: z.ZodType<Prisma.v3_offer_manifestUpdateInput> = z.object({
  m_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  mf_variant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignee_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assignment_ordering: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_offer_manifestUncheckedUpdateInputSchema: z.ZodType<Prisma.v3_offer_manifestUncheckedUpdateInput> = z.object({
  m_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  mf_variant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignee_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assignment_ordering: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_offer_manifestCreateManyInputSchema: z.ZodType<Prisma.v3_offer_manifestCreateManyInput> = z.object({
  m_id: z.bigint().optional(),
  offer_id: z.bigint(),
  mf_variant: z.string(),
  assignee_id: z.string().optional().nullable(),
  assignment_ordering: z.number(),
}).strict();

export const v3_offer_manifestUpdateManyMutationInputSchema: z.ZodType<Prisma.v3_offer_manifestUpdateManyMutationInput> = z.object({
  m_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  mf_variant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignee_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assignment_ordering: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_offer_manifestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.v3_offer_manifestUncheckedUpdateManyInput> = z.object({
  m_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  mf_variant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignee_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assignment_ordering: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const v3_order_to_variantCreateInputSchema: z.ZodType<Prisma.v3_order_to_variantCreateInput> = z.object({
  order_id: z.string(),
  variant_id: z.string(),
  offer_id: z.number().int().optional().nullable(),
}).strict();

export const v3_order_to_variantUncheckedCreateInputSchema: z.ZodType<Prisma.v3_order_to_variantUncheckedCreateInput> = z.object({
  order_id: z.string(),
  variant_id: z.string(),
  offer_id: z.number().int().optional().nullable(),
}).strict();

export const v3_order_to_variantUpdateInputSchema: z.ZodType<Prisma.v3_order_to_variantUpdateInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const v3_order_to_variantUncheckedUpdateInputSchema: z.ZodType<Prisma.v3_order_to_variantUncheckedUpdateInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const v3_order_to_variantCreateManyInputSchema: z.ZodType<Prisma.v3_order_to_variantCreateManyInput> = z.object({
  order_id: z.string(),
  variant_id: z.string(),
  offer_id: z.number().int().optional().nullable(),
}).strict();

export const v3_order_to_variantUpdateManyMutationInputSchema: z.ZodType<Prisma.v3_order_to_variantUpdateManyMutationInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const v3_order_to_variantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.v3_order_to_variantUncheckedUpdateManyInput> = z.object({
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  offer_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const inventoryCreateInputSchema: z.ZodType<Prisma.inventoryCreateInput> = z.object({
  sku: z.string(),
  description: z.string().optional().nullable(),
  units_on_hand: z.number().int().optional().nullable(),
  cost_basis_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  srp_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
}).strict();

export const inventoryUncheckedCreateInputSchema: z.ZodType<Prisma.inventoryUncheckedCreateInput> = z.object({
  sku: z.string(),
  description: z.string().optional().nullable(),
  units_on_hand: z.number().int().optional().nullable(),
  cost_basis_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  srp_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
}).strict();

export const inventoryUpdateInputSchema: z.ZodType<Prisma.inventoryUpdateInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  units_on_hand: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cost_basis_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  srp_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const inventoryUncheckedUpdateInputSchema: z.ZodType<Prisma.inventoryUncheckedUpdateInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  units_on_hand: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cost_basis_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  srp_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const inventoryCreateManyInputSchema: z.ZodType<Prisma.inventoryCreateManyInput> = z.object({
  sku: z.string(),
  description: z.string().optional().nullable(),
  units_on_hand: z.number().int().optional().nullable(),
  cost_basis_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  srp_unit: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
}).strict();

export const inventoryUpdateManyMutationInputSchema: z.ZodType<Prisma.inventoryUpdateManyMutationInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  units_on_hand: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cost_basis_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  srp_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const inventoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.inventoryUncheckedUpdateManyInput> = z.object({
  sku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  units_on_hand: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cost_basis_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  srp_unit: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const computed_buyer_varietalsCreateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsCreateInput> = z.object({
  winner_guid: z.string(),
  cola_varietal: z.string(),
  total_paid: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
}).strict();

export const computed_buyer_varietalsUncheckedCreateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  winner_guid: z.string(),
  cola_varietal: z.string(),
  total_paid: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
}).strict();

export const computed_buyer_varietalsUpdateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsUpdateInput> = z.object({
  winner_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_varietal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  total_paid: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const computed_buyer_varietalsUncheckedUpdateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  winner_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_varietal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  total_paid: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const computed_buyer_varietalsCreateManyInputSchema: z.ZodType<Prisma.computed_buyer_varietalsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  winner_guid: z.string(),
  cola_varietal: z.string(),
  total_paid: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
}).strict();

export const computed_buyer_varietalsUpdateManyMutationInputSchema: z.ZodType<Prisma.computed_buyer_varietalsUpdateManyMutationInput> = z.object({
  winner_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_varietal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  total_paid: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const computed_buyer_varietalsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.computed_buyer_varietalsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  winner_guid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cola_varietal: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  total_paid: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const member_list_export_2023_07_06CreateInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06CreateInput> = z.object({
  Email: z.string().optional().nullable(),
  Klaviyo_ID: z.string(),
  First_Name: z.string().optional().nullable(),
  Last_Name: z.string().optional().nullable(),
  Phone_Number: z.string().optional().nullable(),
  Address: z.string().optional().nullable(),
  Address_2: z.string().optional().nullable(),
  City: z.string().optional().nullable(),
  State___Region: z.string().optional().nullable(),
  Country: z.string().optional().nullable(),
  Zip_Code: z.string().optional().nullable(),
}).strict();

export const member_list_export_2023_07_06UncheckedCreateInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06UncheckedCreateInput> = z.object({
  Email: z.string().optional().nullable(),
  Klaviyo_ID: z.string(),
  First_Name: z.string().optional().nullable(),
  Last_Name: z.string().optional().nullable(),
  Phone_Number: z.string().optional().nullable(),
  Address: z.string().optional().nullable(),
  Address_2: z.string().optional().nullable(),
  City: z.string().optional().nullable(),
  State___Region: z.string().optional().nullable(),
  Country: z.string().optional().nullable(),
  Zip_Code: z.string().optional().nullable(),
}).strict();

export const member_list_export_2023_07_06UpdateInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06UpdateInput> = z.object({
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Klaviyo_ID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Phone_Number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  State___Region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Zip_Code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const member_list_export_2023_07_06UncheckedUpdateInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06UncheckedUpdateInput> = z.object({
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Klaviyo_ID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Phone_Number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  State___Region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Zip_Code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const member_list_export_2023_07_06CreateManyInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06CreateManyInput> = z.object({
  Email: z.string().optional().nullable(),
  Klaviyo_ID: z.string(),
  First_Name: z.string().optional().nullable(),
  Last_Name: z.string().optional().nullable(),
  Phone_Number: z.string().optional().nullable(),
  Address: z.string().optional().nullable(),
  Address_2: z.string().optional().nullable(),
  City: z.string().optional().nullable(),
  State___Region: z.string().optional().nullable(),
  Country: z.string().optional().nullable(),
  Zip_Code: z.string().optional().nullable(),
}).strict();

export const member_list_export_2023_07_06UpdateManyMutationInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06UpdateManyMutationInput> = z.object({
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Klaviyo_ID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Phone_Number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  State___Region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Zip_Code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const member_list_export_2023_07_06UncheckedUpdateManyInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06UncheckedUpdateManyInput> = z.object({
  Email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Klaviyo_ID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  First_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Last_Name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Phone_Number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Address_2: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  City: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  State___Region: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Zip_Code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const shopify_product_variantCreateInputSchema: z.ZodType<Prisma.shopify_product_variantCreateInput> = z.object({
  variantId: z.string(),
  productId: z.string(),
  productName: z.string(),
  variantName: z.string(),
  variantPrice: z.string().optional().nullable(),
  variantCompareAtPrice: z.string().optional().nullable(),
  variantInventoryQuantity: z.number().int(),
  variantSku: z.string(),
  variantWeight: z.string().optional().nullable(),
}).strict();

export const shopify_product_variantUncheckedCreateInputSchema: z.ZodType<Prisma.shopify_product_variantUncheckedCreateInput> = z.object({
  variantId: z.string(),
  productId: z.string(),
  productName: z.string(),
  variantName: z.string(),
  variantPrice: z.string().optional().nullable(),
  variantCompareAtPrice: z.string().optional().nullable(),
  variantInventoryQuantity: z.number().int(),
  variantSku: z.string(),
  variantWeight: z.string().optional().nullable(),
}).strict();

export const shopify_product_variantUpdateInputSchema: z.ZodType<Prisma.shopify_product_variantUpdateInput> = z.object({
  variantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantCompareAtPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantInventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  variantSku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantWeight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const shopify_product_variantUncheckedUpdateInputSchema: z.ZodType<Prisma.shopify_product_variantUncheckedUpdateInput> = z.object({
  variantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantCompareAtPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantInventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  variantSku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantWeight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const shopify_product_variantCreateManyInputSchema: z.ZodType<Prisma.shopify_product_variantCreateManyInput> = z.object({
  variantId: z.string(),
  productId: z.string(),
  productName: z.string(),
  variantName: z.string(),
  variantPrice: z.string().optional().nullable(),
  variantCompareAtPrice: z.string().optional().nullable(),
  variantInventoryQuantity: z.number().int(),
  variantSku: z.string(),
  variantWeight: z.string().optional().nullable(),
}).strict();

export const shopify_product_variantUpdateManyMutationInputSchema: z.ZodType<Prisma.shopify_product_variantUpdateManyMutationInput> = z.object({
  variantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantCompareAtPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantInventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  variantSku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantWeight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const shopify_product_variantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.shopify_product_variantUncheckedUpdateManyInput> = z.object({
  variantId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantCompareAtPrice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  variantInventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  variantSku: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variantWeight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DecimalNullableFilterSchema: z.ZodType<Prisma.DecimalNullableFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
}).strict();

export const customer_list_july_2023OrderByRelevanceInputSchema: z.ZodType<Prisma.customer_list_july_2023OrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => customer_list_july_2023OrderByRelevanceFieldEnumSchema), z.lazy(() => customer_list_july_2023OrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const customer_list_july_2023CountOrderByAggregateInputSchema: z.ZodType<Prisma.customer_list_july_2023CountOrderByAggregateInput> = z.object({
  customer_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  orders: z.lazy(() => SortOrderSchema).optional(),
  ltv: z.lazy(() => SortOrderSchema).optional(),
  first_order: z.lazy(() => SortOrderSchema).optional(),
  last_order: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const customer_list_july_2023AvgOrderByAggregateInputSchema: z.ZodType<Prisma.customer_list_july_2023AvgOrderByAggregateInput> = z.object({
  orders: z.lazy(() => SortOrderSchema).optional(),
  ltv: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const customer_list_july_2023MaxOrderByAggregateInputSchema: z.ZodType<Prisma.customer_list_july_2023MaxOrderByAggregateInput> = z.object({
  customer_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  orders: z.lazy(() => SortOrderSchema).optional(),
  ltv: z.lazy(() => SortOrderSchema).optional(),
  first_order: z.lazy(() => SortOrderSchema).optional(),
  last_order: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const customer_list_july_2023MinOrderByAggregateInputSchema: z.ZodType<Prisma.customer_list_july_2023MinOrderByAggregateInput> = z.object({
  customer_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  orders: z.lazy(() => SortOrderSchema).optional(),
  ltv: z.lazy(() => SortOrderSchema).optional(),
  first_order: z.lazy(() => SortOrderSchema).optional(),
  last_order: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const customer_list_july_2023SumOrderByAggregateInputSchema: z.ZodType<Prisma.customer_list_july_2023SumOrderByAggregateInput> = z.object({
  orders: z.lazy(() => SortOrderSchema).optional(),
  ltv: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const DecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalNullableWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const item_detailOrderByRelevanceInputSchema: z.ZodType<Prisma.item_detailOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => item_detailOrderByRelevanceFieldEnumSchema), z.lazy(() => item_detailOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const item_detailCountOrderByAggregateInputSchema: z.ZodType<Prisma.item_detailCountOrderByAggregateInput> = z.object({
  itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_id: z.lazy(() => SortOrderSchema).optional(),
  cola_name: z.lazy(() => SortOrderSchema).optional(),
  cola_region: z.lazy(() => SortOrderSchema).optional(),
  cola_appellation: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  cola_vintage: z.lazy(() => SortOrderSchema).optional(),
  cola_abv: z.lazy(() => SortOrderSchema).optional(),
  about_wine: z.lazy(() => SortOrderSchema).optional(),
  tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  winemaker_notes: z.lazy(() => SortOrderSchema).optional(),
  label_img_url: z.lazy(() => SortOrderSchema).optional(),
  bottle_img_url: z.lazy(() => SortOrderSchema).optional(),
  retail_price: z.lazy(() => SortOrderSchema).optional(),
  winery_id: z.lazy(() => SortOrderSchema).optional(),
  url_key: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  country_code: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  is_wine: z.lazy(() => SortOrderSchema).optional(),
  is_beer: z.lazy(() => SortOrderSchema).optional(),
  is_liquor: z.lazy(() => SortOrderSchema).optional(),
  is_sparkling: z.lazy(() => SortOrderSchema).optional(),
  is_cult: z.lazy(() => SortOrderSchema).optional(),
  is_small_production: z.lazy(() => SortOrderSchema).optional(),
  ct_wine_id: z.lazy(() => SortOrderSchema).optional(),
  ct_producer_id: z.lazy(() => SortOrderSchema).optional(),
  ct_likes: z.lazy(() => SortOrderSchema).optional(),
  ct_tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  ct_review: z.lazy(() => SortOrderSchema).optional(),
  ct_community_score: z.lazy(() => SortOrderSchema).optional(),
  ct_qty: z.lazy(() => SortOrderSchema).optional(),
  wine_vineyard: z.lazy(() => SortOrderSchema).optional(),
  wine_web_url: z.lazy(() => SortOrderSchema).optional(),
  wine_drink_start: z.lazy(() => SortOrderSchema).optional(),
  wine_drink_end: z.lazy(() => SortOrderSchema).optional(),
  wine_producer_uuid: z.lazy(() => SortOrderSchema).optional(),
  redirect_to: z.lazy(() => SortOrderSchema).optional(),
  item_tsv: z.lazy(() => SortOrderSchema).optional(),
  wine_ml: z.lazy(() => SortOrderSchema).optional(),
  cola_fanciful_name: z.lazy(() => SortOrderSchema).optional(),
  wd_varietal: z.lazy(() => SortOrderSchema).optional(),
  wd_region: z.lazy(() => SortOrderSchema).optional(),
  is_blend: z.lazy(() => SortOrderSchema).optional(),
  price_range: z.lazy(() => SortOrderSchema).optional(),
  item_lbs: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  blur_bottle_img: z.lazy(() => SortOrderSchema).optional(),
  blur_label_img: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_detailAvgOrderByAggregateInputSchema: z.ZodType<Prisma.item_detailAvgOrderByAggregateInput> = z.object({
  cola_abv: z.lazy(() => SortOrderSchema).optional(),
  retail_price: z.lazy(() => SortOrderSchema).optional(),
  ct_wine_id: z.lazy(() => SortOrderSchema).optional(),
  ct_producer_id: z.lazy(() => SortOrderSchema).optional(),
  ct_likes: z.lazy(() => SortOrderSchema).optional(),
  ct_tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  ct_review: z.lazy(() => SortOrderSchema).optional(),
  ct_qty: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_detailMaxOrderByAggregateInputSchema: z.ZodType<Prisma.item_detailMaxOrderByAggregateInput> = z.object({
  itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_id: z.lazy(() => SortOrderSchema).optional(),
  cola_name: z.lazy(() => SortOrderSchema).optional(),
  cola_region: z.lazy(() => SortOrderSchema).optional(),
  cola_appellation: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  cola_vintage: z.lazy(() => SortOrderSchema).optional(),
  cola_abv: z.lazy(() => SortOrderSchema).optional(),
  about_wine: z.lazy(() => SortOrderSchema).optional(),
  tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  winemaker_notes: z.lazy(() => SortOrderSchema).optional(),
  label_img_url: z.lazy(() => SortOrderSchema).optional(),
  bottle_img_url: z.lazy(() => SortOrderSchema).optional(),
  retail_price: z.lazy(() => SortOrderSchema).optional(),
  winery_id: z.lazy(() => SortOrderSchema).optional(),
  url_key: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  country_code: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  is_wine: z.lazy(() => SortOrderSchema).optional(),
  is_beer: z.lazy(() => SortOrderSchema).optional(),
  is_liquor: z.lazy(() => SortOrderSchema).optional(),
  is_sparkling: z.lazy(() => SortOrderSchema).optional(),
  is_cult: z.lazy(() => SortOrderSchema).optional(),
  is_small_production: z.lazy(() => SortOrderSchema).optional(),
  ct_wine_id: z.lazy(() => SortOrderSchema).optional(),
  ct_producer_id: z.lazy(() => SortOrderSchema).optional(),
  ct_likes: z.lazy(() => SortOrderSchema).optional(),
  ct_tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  ct_review: z.lazy(() => SortOrderSchema).optional(),
  ct_community_score: z.lazy(() => SortOrderSchema).optional(),
  ct_qty: z.lazy(() => SortOrderSchema).optional(),
  wine_vineyard: z.lazy(() => SortOrderSchema).optional(),
  wine_web_url: z.lazy(() => SortOrderSchema).optional(),
  wine_drink_start: z.lazy(() => SortOrderSchema).optional(),
  wine_drink_end: z.lazy(() => SortOrderSchema).optional(),
  wine_producer_uuid: z.lazy(() => SortOrderSchema).optional(),
  redirect_to: z.lazy(() => SortOrderSchema).optional(),
  item_tsv: z.lazy(() => SortOrderSchema).optional(),
  wine_ml: z.lazy(() => SortOrderSchema).optional(),
  cola_fanciful_name: z.lazy(() => SortOrderSchema).optional(),
  wd_varietal: z.lazy(() => SortOrderSchema).optional(),
  wd_region: z.lazy(() => SortOrderSchema).optional(),
  is_blend: z.lazy(() => SortOrderSchema).optional(),
  price_range: z.lazy(() => SortOrderSchema).optional(),
  item_lbs: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  blur_bottle_img: z.lazy(() => SortOrderSchema).optional(),
  blur_label_img: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_detailMinOrderByAggregateInputSchema: z.ZodType<Prisma.item_detailMinOrderByAggregateInput> = z.object({
  itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_id: z.lazy(() => SortOrderSchema).optional(),
  cola_name: z.lazy(() => SortOrderSchema).optional(),
  cola_region: z.lazy(() => SortOrderSchema).optional(),
  cola_appellation: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  cola_vintage: z.lazy(() => SortOrderSchema).optional(),
  cola_abv: z.lazy(() => SortOrderSchema).optional(),
  about_wine: z.lazy(() => SortOrderSchema).optional(),
  tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  winemaker_notes: z.lazy(() => SortOrderSchema).optional(),
  label_img_url: z.lazy(() => SortOrderSchema).optional(),
  bottle_img_url: z.lazy(() => SortOrderSchema).optional(),
  retail_price: z.lazy(() => SortOrderSchema).optional(),
  winery_id: z.lazy(() => SortOrderSchema).optional(),
  url_key: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  country_code: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  is_wine: z.lazy(() => SortOrderSchema).optional(),
  is_beer: z.lazy(() => SortOrderSchema).optional(),
  is_liquor: z.lazy(() => SortOrderSchema).optional(),
  is_sparkling: z.lazy(() => SortOrderSchema).optional(),
  is_cult: z.lazy(() => SortOrderSchema).optional(),
  is_small_production: z.lazy(() => SortOrderSchema).optional(),
  ct_wine_id: z.lazy(() => SortOrderSchema).optional(),
  ct_producer_id: z.lazy(() => SortOrderSchema).optional(),
  ct_likes: z.lazy(() => SortOrderSchema).optional(),
  ct_tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  ct_review: z.lazy(() => SortOrderSchema).optional(),
  ct_community_score: z.lazy(() => SortOrderSchema).optional(),
  ct_qty: z.lazy(() => SortOrderSchema).optional(),
  wine_vineyard: z.lazy(() => SortOrderSchema).optional(),
  wine_web_url: z.lazy(() => SortOrderSchema).optional(),
  wine_drink_start: z.lazy(() => SortOrderSchema).optional(),
  wine_drink_end: z.lazy(() => SortOrderSchema).optional(),
  wine_producer_uuid: z.lazy(() => SortOrderSchema).optional(),
  redirect_to: z.lazy(() => SortOrderSchema).optional(),
  item_tsv: z.lazy(() => SortOrderSchema).optional(),
  wine_ml: z.lazy(() => SortOrderSchema).optional(),
  cola_fanciful_name: z.lazy(() => SortOrderSchema).optional(),
  wd_varietal: z.lazy(() => SortOrderSchema).optional(),
  wd_region: z.lazy(() => SortOrderSchema).optional(),
  is_blend: z.lazy(() => SortOrderSchema).optional(),
  price_range: z.lazy(() => SortOrderSchema).optional(),
  item_lbs: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  blur_bottle_img: z.lazy(() => SortOrderSchema).optional(),
  blur_label_img: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_detailSumOrderByAggregateInputSchema: z.ZodType<Prisma.item_detailSumOrderByAggregateInput> = z.object({
  cola_abv: z.lazy(() => SortOrderSchema).optional(),
  retail_price: z.lazy(() => SortOrderSchema).optional(),
  ct_wine_id: z.lazy(() => SortOrderSchema).optional(),
  ct_producer_id: z.lazy(() => SortOrderSchema).optional(),
  ct_likes: z.lazy(() => SortOrderSchema).optional(),
  ct_tasting_notes: z.lazy(() => SortOrderSchema).optional(),
  ct_review: z.lazy(() => SortOrderSchema).optional(),
  ct_qty: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const item_skuOrderByRelevanceInputSchema: z.ZodType<Prisma.item_skuOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => item_skuOrderByRelevanceFieldEnumSchema), z.lazy(() => item_skuOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const item_skuCountOrderByAggregateInputSchema: z.ZodType<Prisma.item_skuCountOrderByAggregateInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  srp: z.lazy(() => SortOrderSchema).optional(),
  is_autographed: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_counted_for_shipment: z.lazy(() => SortOrderSchema).optional(),
  drink_by_date: z.lazy(() => SortOrderSchema).optional(),
  sku_itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  last_order_date: z.lazy(() => SortOrderSchema).optional(),
  last_restock: z.lazy(() => SortOrderSchema).optional(),
  last_stock_update: z.lazy(() => SortOrderSchema).optional(),
  last_stock_qty: z.lazy(() => SortOrderSchema).optional(),
  next_delivery_date: z.lazy(() => SortOrderSchema).optional(),
  last_count_owed: z.lazy(() => SortOrderSchema).optional(),
  x_friendly_name: z.lazy(() => SortOrderSchema).optional(),
  scramble_letters: z.lazy(() => SortOrderSchema).optional(),
  scramble_qty_allowed: z.lazy(() => SortOrderSchema).optional(),
  sku_allowed_states: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  sku_tsv: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_unit: z.lazy(() => SortOrderSchema).optional(),
  is_pallet_program: z.lazy(() => SortOrderSchema).optional(),
  is_deprecated: z.lazy(() => SortOrderSchema).optional(),
  sku_varietal: z.lazy(() => SortOrderSchema).optional(),
  sku_region: z.lazy(() => SortOrderSchema).optional(),
  last_count_shipped: z.lazy(() => SortOrderSchema).optional(),
  is_in_wd: z.lazy(() => SortOrderSchema).optional(),
  sku_was_swap: z.lazy(() => SortOrderSchema).optional(),
  sku_sort: z.lazy(() => SortOrderSchema).optional(),
  sku_preswap: z.lazy(() => SortOrderSchema).optional(),
  sku_postswap: z.lazy(() => SortOrderSchema).optional(),
  sku_qty_reserved: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_is_estimated: z.lazy(() => SortOrderSchema).optional(),
  sku_taxset_id: z.lazy(() => SortOrderSchema).optional(),
  qty_offsite: z.lazy(() => SortOrderSchema).optional(),
  sku_external_id: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_lo: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_hi: z.lazy(() => SortOrderSchema).optional(),
  sku_velocity: z.lazy(() => SortOrderSchema).optional(),
  last_vip_qty: z.lazy(() => SortOrderSchema).optional(),
  last_open_xfer_qty: z.lazy(() => SortOrderSchema).optional(),
  sku_is_dropship: z.lazy(() => SortOrderSchema).optional(),
  sku_ship_alone: z.lazy(() => SortOrderSchema).optional(),
  sku_supplier_guid: z.lazy(() => SortOrderSchema).optional(),
  next_stock_update: z.lazy(() => SortOrderSchema).optional(),
  sku_exclude_metrics: z.lazy(() => SortOrderSchema).optional(),
  netsuite_synced: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  country_code: z.lazy(() => SortOrderSchema).optional(),
  unlimited_allocation_until: z.lazy(() => SortOrderSchema).optional(),
  avg_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  last_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  dont_buy_after: z.lazy(() => SortOrderSchema).optional(),
  pack_size: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_skuAvgOrderByAggregateInputSchema: z.ZodType<Prisma.item_skuAvgOrderByAggregateInput> = z.object({
  srp: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  last_stock_qty: z.lazy(() => SortOrderSchema).optional(),
  last_count_owed: z.lazy(() => SortOrderSchema).optional(),
  scramble_qty_allowed: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_unit: z.lazy(() => SortOrderSchema).optional(),
  last_count_shipped: z.lazy(() => SortOrderSchema).optional(),
  sku_sort: z.lazy(() => SortOrderSchema).optional(),
  sku_qty_reserved: z.lazy(() => SortOrderSchema).optional(),
  qty_offsite: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_lo: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_hi: z.lazy(() => SortOrderSchema).optional(),
  sku_velocity: z.lazy(() => SortOrderSchema).optional(),
  last_vip_qty: z.lazy(() => SortOrderSchema).optional(),
  last_open_xfer_qty: z.lazy(() => SortOrderSchema).optional(),
  avg_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  last_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  pack_size: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_skuMaxOrderByAggregateInputSchema: z.ZodType<Prisma.item_skuMaxOrderByAggregateInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  srp: z.lazy(() => SortOrderSchema).optional(),
  is_autographed: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_counted_for_shipment: z.lazy(() => SortOrderSchema).optional(),
  drink_by_date: z.lazy(() => SortOrderSchema).optional(),
  sku_itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  last_order_date: z.lazy(() => SortOrderSchema).optional(),
  last_restock: z.lazy(() => SortOrderSchema).optional(),
  last_stock_update: z.lazy(() => SortOrderSchema).optional(),
  last_stock_qty: z.lazy(() => SortOrderSchema).optional(),
  next_delivery_date: z.lazy(() => SortOrderSchema).optional(),
  last_count_owed: z.lazy(() => SortOrderSchema).optional(),
  x_friendly_name: z.lazy(() => SortOrderSchema).optional(),
  scramble_letters: z.lazy(() => SortOrderSchema).optional(),
  scramble_qty_allowed: z.lazy(() => SortOrderSchema).optional(),
  sku_allowed_states: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  sku_tsv: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_unit: z.lazy(() => SortOrderSchema).optional(),
  is_pallet_program: z.lazy(() => SortOrderSchema).optional(),
  is_deprecated: z.lazy(() => SortOrderSchema).optional(),
  sku_varietal: z.lazy(() => SortOrderSchema).optional(),
  sku_region: z.lazy(() => SortOrderSchema).optional(),
  last_count_shipped: z.lazy(() => SortOrderSchema).optional(),
  is_in_wd: z.lazy(() => SortOrderSchema).optional(),
  sku_was_swap: z.lazy(() => SortOrderSchema).optional(),
  sku_sort: z.lazy(() => SortOrderSchema).optional(),
  sku_preswap: z.lazy(() => SortOrderSchema).optional(),
  sku_postswap: z.lazy(() => SortOrderSchema).optional(),
  sku_qty_reserved: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_is_estimated: z.lazy(() => SortOrderSchema).optional(),
  sku_taxset_id: z.lazy(() => SortOrderSchema).optional(),
  qty_offsite: z.lazy(() => SortOrderSchema).optional(),
  sku_external_id: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_lo: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_hi: z.lazy(() => SortOrderSchema).optional(),
  sku_velocity: z.lazy(() => SortOrderSchema).optional(),
  last_vip_qty: z.lazy(() => SortOrderSchema).optional(),
  last_open_xfer_qty: z.lazy(() => SortOrderSchema).optional(),
  sku_is_dropship: z.lazy(() => SortOrderSchema).optional(),
  sku_ship_alone: z.lazy(() => SortOrderSchema).optional(),
  sku_supplier_guid: z.lazy(() => SortOrderSchema).optional(),
  next_stock_update: z.lazy(() => SortOrderSchema).optional(),
  sku_exclude_metrics: z.lazy(() => SortOrderSchema).optional(),
  netsuite_synced: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  country_code: z.lazy(() => SortOrderSchema).optional(),
  unlimited_allocation_until: z.lazy(() => SortOrderSchema).optional(),
  avg_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  last_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  dont_buy_after: z.lazy(() => SortOrderSchema).optional(),
  pack_size: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_skuMinOrderByAggregateInputSchema: z.ZodType<Prisma.item_skuMinOrderByAggregateInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  srp: z.lazy(() => SortOrderSchema).optional(),
  is_autographed: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_counted_for_shipment: z.lazy(() => SortOrderSchema).optional(),
  drink_by_date: z.lazy(() => SortOrderSchema).optional(),
  sku_itemdetail_guid: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  last_order_date: z.lazy(() => SortOrderSchema).optional(),
  last_restock: z.lazy(() => SortOrderSchema).optional(),
  last_stock_update: z.lazy(() => SortOrderSchema).optional(),
  last_stock_qty: z.lazy(() => SortOrderSchema).optional(),
  next_delivery_date: z.lazy(() => SortOrderSchema).optional(),
  last_count_owed: z.lazy(() => SortOrderSchema).optional(),
  x_friendly_name: z.lazy(() => SortOrderSchema).optional(),
  scramble_letters: z.lazy(() => SortOrderSchema).optional(),
  scramble_qty_allowed: z.lazy(() => SortOrderSchema).optional(),
  sku_allowed_states: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  sku_tsv: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_unit: z.lazy(() => SortOrderSchema).optional(),
  is_pallet_program: z.lazy(() => SortOrderSchema).optional(),
  is_deprecated: z.lazy(() => SortOrderSchema).optional(),
  sku_varietal: z.lazy(() => SortOrderSchema).optional(),
  sku_region: z.lazy(() => SortOrderSchema).optional(),
  last_count_shipped: z.lazy(() => SortOrderSchema).optional(),
  is_in_wd: z.lazy(() => SortOrderSchema).optional(),
  sku_was_swap: z.lazy(() => SortOrderSchema).optional(),
  sku_sort: z.lazy(() => SortOrderSchema).optional(),
  sku_preswap: z.lazy(() => SortOrderSchema).optional(),
  sku_postswap: z.lazy(() => SortOrderSchema).optional(),
  sku_qty_reserved: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_is_estimated: z.lazy(() => SortOrderSchema).optional(),
  sku_taxset_id: z.lazy(() => SortOrderSchema).optional(),
  qty_offsite: z.lazy(() => SortOrderSchema).optional(),
  sku_external_id: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_lo: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_hi: z.lazy(() => SortOrderSchema).optional(),
  sku_velocity: z.lazy(() => SortOrderSchema).optional(),
  last_vip_qty: z.lazy(() => SortOrderSchema).optional(),
  last_open_xfer_qty: z.lazy(() => SortOrderSchema).optional(),
  sku_is_dropship: z.lazy(() => SortOrderSchema).optional(),
  sku_ship_alone: z.lazy(() => SortOrderSchema).optional(),
  sku_supplier_guid: z.lazy(() => SortOrderSchema).optional(),
  next_stock_update: z.lazy(() => SortOrderSchema).optional(),
  sku_exclude_metrics: z.lazy(() => SortOrderSchema).optional(),
  netsuite_synced: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  country_code: z.lazy(() => SortOrderSchema).optional(),
  unlimited_allocation_until: z.lazy(() => SortOrderSchema).optional(),
  avg_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  last_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  dont_buy_after: z.lazy(() => SortOrderSchema).optional(),
  pack_size: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const item_skuSumOrderByAggregateInputSchema: z.ZodType<Prisma.item_skuSumOrderByAggregateInput> = z.object({
  srp: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  last_stock_qty: z.lazy(() => SortOrderSchema).optional(),
  last_count_owed: z.lazy(() => SortOrderSchema).optional(),
  scramble_qty_allowed: z.lazy(() => SortOrderSchema).optional(),
  sku_cogs_unit: z.lazy(() => SortOrderSchema).optional(),
  last_count_shipped: z.lazy(() => SortOrderSchema).optional(),
  sku_sort: z.lazy(() => SortOrderSchema).optional(),
  sku_qty_reserved: z.lazy(() => SortOrderSchema).optional(),
  qty_offsite: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_lo: z.lazy(() => SortOrderSchema).optional(),
  sku_fq_hi: z.lazy(() => SortOrderSchema).optional(),
  sku_velocity: z.lazy(() => SortOrderSchema).optional(),
  last_vip_qty: z.lazy(() => SortOrderSchema).optional(),
  last_open_xfer_qty: z.lazy(() => SortOrderSchema).optional(),
  avg_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  last_purchase_price: z.lazy(() => SortOrderSchema).optional(),
  pack_size: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccOrderByRelevanceInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => new_customer_data_after_bk_from_lccOrderByRelevanceFieldEnumSchema), z.lazy(() => new_customer_data_after_bk_from_lccOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const new_customer_data_after_bk_from_lccCountOrderByAggregateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccCountOrderByAggregateInput> = z.object({
  Customer_ID: z.lazy(() => SortOrderSchema).optional(),
  Customer_Created_At: z.lazy(() => SortOrderSchema).optional(),
  First_Order_Date: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.lazy(() => SortOrderSchema).optional(),
  Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_First_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Company: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Address_1: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Address_2: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_City: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_State: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Postcode: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Country: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Email: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Phone: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_First_Name: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Company: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Address_1: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Address_2: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_City: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_State: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Postcode: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Country: z.lazy(() => SortOrderSchema).optional(),
  Total_Spent: z.lazy(() => SortOrderSchema).optional(),
  Order_Count: z.lazy(() => SortOrderSchema).optional(),
  Item_Count: z.lazy(() => SortOrderSchema).optional(),
  Last_Order_Date: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccAvgOrderByAggregateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccAvgOrderByAggregateInput> = z.object({
  Customer_ID: z.lazy(() => SortOrderSchema).optional(),
  Total_Spent: z.lazy(() => SortOrderSchema).optional(),
  Order_Count: z.lazy(() => SortOrderSchema).optional(),
  Item_Count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccMaxOrderByAggregateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccMaxOrderByAggregateInput> = z.object({
  Customer_ID: z.lazy(() => SortOrderSchema).optional(),
  Customer_Created_At: z.lazy(() => SortOrderSchema).optional(),
  First_Order_Date: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.lazy(() => SortOrderSchema).optional(),
  Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_First_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Company: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Address_1: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Address_2: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_City: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_State: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Postcode: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Country: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Email: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Phone: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_First_Name: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Company: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Address_1: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Address_2: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_City: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_State: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Postcode: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Country: z.lazy(() => SortOrderSchema).optional(),
  Total_Spent: z.lazy(() => SortOrderSchema).optional(),
  Order_Count: z.lazy(() => SortOrderSchema).optional(),
  Item_Count: z.lazy(() => SortOrderSchema).optional(),
  Last_Order_Date: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccMinOrderByAggregateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccMinOrderByAggregateInput> = z.object({
  Customer_ID: z.lazy(() => SortOrderSchema).optional(),
  Customer_Created_At: z.lazy(() => SortOrderSchema).optional(),
  First_Order_Date: z.lazy(() => SortOrderSchema).optional(),
  Email: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.lazy(() => SortOrderSchema).optional(),
  Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_First_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Company: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Address_1: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Address_2: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_City: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_State: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Postcode: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Country: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Email: z.lazy(() => SortOrderSchema).optional(),
  Billing_Address_Phone: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_First_Name: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Company: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Address_1: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Address_2: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_City: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_State: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Postcode: z.lazy(() => SortOrderSchema).optional(),
  Shipping_Address_Country: z.lazy(() => SortOrderSchema).optional(),
  Total_Spent: z.lazy(() => SortOrderSchema).optional(),
  Order_Count: z.lazy(() => SortOrderSchema).optional(),
  Item_Count: z.lazy(() => SortOrderSchema).optional(),
  Last_Order_Date: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccSumOrderByAggregateInputSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccSumOrderByAggregateInput> = z.object({
  Customer_ID: z.lazy(() => SortOrderSchema).optional(),
  Total_Spent: z.lazy(() => SortOrderSchema).optional(),
  Order_Count: z.lazy(() => SortOrderSchema).optional(),
  Item_Count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
}).strict();

export const BigIntNullableFilterSchema: z.ZodType<Prisma.BigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const old_order_data_500k_ordersOrderByRelevanceInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => old_order_data_500k_ordersOrderByRelevanceFieldEnumSchema), z.lazy(() => old_order_data_500k_ordersOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const old_order_data_500k_ordersCountOrderByAggregateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersCountOrderByAggregateInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.lazy(() => SortOrderSchema).optional(),
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_timestamp: z.lazy(() => SortOrderSchema).optional(),
  order_offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_auth_date: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  order_yymm_pst: z.lazy(() => SortOrderSchema).optional(),
  order_type: z.lazy(() => SortOrderSchema).optional(),
  offer_guid: z.lazy(() => SortOrderSchema).optional(),
  offer_title: z.lazy(() => SortOrderSchema).optional(),
  offer_price: z.lazy(() => SortOrderSchema).optional(),
  offer_meta_title: z.lazy(() => SortOrderSchema).optional(),
  offer_subtitle: z.lazy(() => SortOrderSchema).optional(),
  offer_primary_varietal: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const old_order_data_500k_ordersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersAvgOrderByAggregateInput> = z.object({
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const old_order_data_500k_ordersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersMaxOrderByAggregateInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.lazy(() => SortOrderSchema).optional(),
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_timestamp: z.lazy(() => SortOrderSchema).optional(),
  order_offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_auth_date: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  order_yymm_pst: z.lazy(() => SortOrderSchema).optional(),
  order_type: z.lazy(() => SortOrderSchema).optional(),
  offer_guid: z.lazy(() => SortOrderSchema).optional(),
  offer_title: z.lazy(() => SortOrderSchema).optional(),
  offer_price: z.lazy(() => SortOrderSchema).optional(),
  offer_meta_title: z.lazy(() => SortOrderSchema).optional(),
  offer_subtitle: z.lazy(() => SortOrderSchema).optional(),
  offer_primary_varietal: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const old_order_data_500k_ordersMinOrderByAggregateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersMinOrderByAggregateInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.lazy(() => SortOrderSchema).optional(),
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_timestamp: z.lazy(() => SortOrderSchema).optional(),
  order_offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_auth_date: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  order_yymm_pst: z.lazy(() => SortOrderSchema).optional(),
  order_type: z.lazy(() => SortOrderSchema).optional(),
  offer_guid: z.lazy(() => SortOrderSchema).optional(),
  offer_title: z.lazy(() => SortOrderSchema).optional(),
  offer_price: z.lazy(() => SortOrderSchema).optional(),
  offer_meta_title: z.lazy(() => SortOrderSchema).optional(),
  offer_subtitle: z.lazy(() => SortOrderSchema).optional(),
  offer_primary_varietal: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const old_order_data_500k_ordersSumOrderByAggregateInputSchema: z.ZodType<Prisma.old_order_data_500k_ordersSumOrderByAggregateInput> = z.object({
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
}).strict();

export const Enumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema: z.ZodType<Prisma.Enumorder_list_x_order_is_authorized_or_capturedNullableFilter> = z.object({
  equals: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
  in: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumorder_list_order_is_voidNullableFilterSchema: z.ZodType<Prisma.Enumorder_list_order_is_voidNullableFilter> = z.object({
  equals: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NestedEnumorder_list_order_is_voidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumorder_list_order_typeNullableFilterSchema: z.ZodType<Prisma.Enumorder_list_order_typeNullableFilter> = z.object({
  equals: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NestedEnumorder_list_order_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const order_listOrderByRelevanceInputSchema: z.ZodType<Prisma.order_listOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => order_listOrderByRelevanceFieldEnumSchema), z.lazy(() => order_listOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const order_listCountOrderByAggregateInputSchema: z.ZodType<Prisma.order_listCountOrderByAggregateInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_sku_list: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.lazy(() => SortOrderSchema).optional(),
  order_billing_address: z.lazy(() => SortOrderSchema).optional(),
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_discount: z.lazy(() => SortOrderSchema).optional(),
  order_credit_discount: z.lazy(() => SortOrderSchema).optional(),
  order_tax: z.lazy(() => SortOrderSchema).optional(),
  order_timestamp: z.lazy(() => SortOrderSchema).optional(),
  order_status: z.lazy(() => SortOrderSchema).optional(),
  order_payment_status: z.lazy(() => SortOrderSchema).optional(),
  order_offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_utm_source: z.lazy(() => SortOrderSchema).optional(),
  order_utm_medium: z.lazy(() => SortOrderSchema).optional(),
  order_utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_auth_code: z.lazy(() => SortOrderSchema).optional(),
  order_auth_date: z.lazy(() => SortOrderSchema).optional(),
  order_billing_instrument: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  x_user_email: z.lazy(() => SortOrderSchema).optional(),
  order_unit_price: z.lazy(() => SortOrderSchema).optional(),
  order_promo_code: z.lazy(() => SortOrderSchema).optional(),
  x_order_is_authorized_or_captured: z.lazy(() => SortOrderSchema).optional(),
  cohort_mth: z.lazy(() => SortOrderSchema).optional(),
  order_reveal_date: z.lazy(() => SortOrderSchema).optional(),
  cohort_fp_mth: z.lazy(() => SortOrderSchema).optional(),
  is_test_order: z.lazy(() => SortOrderSchema).optional(),
  order_rejected_dt: z.lazy(() => SortOrderSchema).optional(),
  order_upgraded_value: z.lazy(() => SortOrderSchema).optional(),
  order_allocated_cogs: z.lazy(() => SortOrderSchema).optional(),
  order_cohort_fpdate: z.lazy(() => SortOrderSchema).optional(),
  order_cc_fee: z.lazy(() => SortOrderSchema).optional(),
  order_refund_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  order_original_mf: z.lazy(() => SortOrderSchema).optional(),
  order_yymm_pst: z.lazy(() => SortOrderSchema).optional(),
  order_mc_eid: z.lazy(() => SortOrderSchema).optional(),
  order_mc_cid: z.lazy(() => SortOrderSchema).optional(),
  order_subscription_id: z.lazy(() => SortOrderSchema).optional(),
  order_is_void: z.lazy(() => SortOrderSchema).optional(),
  order_cash_in: z.lazy(() => SortOrderSchema).optional(),
  order_disc_c: z.lazy(() => SortOrderSchema).optional(),
  order_disc_f: z.lazy(() => SortOrderSchema).optional(),
  order_disc_s: z.lazy(() => SortOrderSchema).optional(),
  order_disc_r: z.lazy(() => SortOrderSchema).optional(),
  order_disc_t: z.lazy(() => SortOrderSchema).optional(),
  order_disc_m: z.lazy(() => SortOrderSchema).optional(),
  order_disc_g: z.lazy(() => SortOrderSchema).optional(),
  order_disc_other: z.lazy(() => SortOrderSchema).optional(),
  order_ship_revenue: z.lazy(() => SortOrderSchema).optional(),
  order_previous_order: z.lazy(() => SortOrderSchema).optional(),
  utm_content: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  netsuite_synced: z.lazy(() => SortOrderSchema).optional(),
  payment_intent_id: z.lazy(() => SortOrderSchema).optional(),
  utm_device: z.lazy(() => SortOrderSchema).optional(),
  utm_placement: z.lazy(() => SortOrderSchema).optional(),
  utm_site: z.lazy(() => SortOrderSchema).optional(),
  order_type: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const order_listAvgOrderByAggregateInputSchema: z.ZodType<Prisma.order_listAvgOrderByAggregateInput> = z.object({
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_discount: z.lazy(() => SortOrderSchema).optional(),
  order_credit_discount: z.lazy(() => SortOrderSchema).optional(),
  order_tax: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_unit_price: z.lazy(() => SortOrderSchema).optional(),
  cohort_fp_mth: z.lazy(() => SortOrderSchema).optional(),
  order_upgraded_value: z.lazy(() => SortOrderSchema).optional(),
  order_allocated_cogs: z.lazy(() => SortOrderSchema).optional(),
  order_cc_fee: z.lazy(() => SortOrderSchema).optional(),
  order_cash_in: z.lazy(() => SortOrderSchema).optional(),
  order_disc_c: z.lazy(() => SortOrderSchema).optional(),
  order_disc_f: z.lazy(() => SortOrderSchema).optional(),
  order_disc_s: z.lazy(() => SortOrderSchema).optional(),
  order_disc_r: z.lazy(() => SortOrderSchema).optional(),
  order_disc_t: z.lazy(() => SortOrderSchema).optional(),
  order_disc_m: z.lazy(() => SortOrderSchema).optional(),
  order_disc_g: z.lazy(() => SortOrderSchema).optional(),
  order_disc_other: z.lazy(() => SortOrderSchema).optional(),
  order_ship_revenue: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const order_listMaxOrderByAggregateInputSchema: z.ZodType<Prisma.order_listMaxOrderByAggregateInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_sku_list: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.lazy(() => SortOrderSchema).optional(),
  order_billing_address: z.lazy(() => SortOrderSchema).optional(),
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_discount: z.lazy(() => SortOrderSchema).optional(),
  order_credit_discount: z.lazy(() => SortOrderSchema).optional(),
  order_tax: z.lazy(() => SortOrderSchema).optional(),
  order_timestamp: z.lazy(() => SortOrderSchema).optional(),
  order_status: z.lazy(() => SortOrderSchema).optional(),
  order_payment_status: z.lazy(() => SortOrderSchema).optional(),
  order_offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_utm_source: z.lazy(() => SortOrderSchema).optional(),
  order_utm_medium: z.lazy(() => SortOrderSchema).optional(),
  order_utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_auth_code: z.lazy(() => SortOrderSchema).optional(),
  order_auth_date: z.lazy(() => SortOrderSchema).optional(),
  order_billing_instrument: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  x_user_email: z.lazy(() => SortOrderSchema).optional(),
  order_unit_price: z.lazy(() => SortOrderSchema).optional(),
  order_promo_code: z.lazy(() => SortOrderSchema).optional(),
  x_order_is_authorized_or_captured: z.lazy(() => SortOrderSchema).optional(),
  cohort_mth: z.lazy(() => SortOrderSchema).optional(),
  order_reveal_date: z.lazy(() => SortOrderSchema).optional(),
  cohort_fp_mth: z.lazy(() => SortOrderSchema).optional(),
  is_test_order: z.lazy(() => SortOrderSchema).optional(),
  order_rejected_dt: z.lazy(() => SortOrderSchema).optional(),
  order_upgraded_value: z.lazy(() => SortOrderSchema).optional(),
  order_allocated_cogs: z.lazy(() => SortOrderSchema).optional(),
  order_cohort_fpdate: z.lazy(() => SortOrderSchema).optional(),
  order_cc_fee: z.lazy(() => SortOrderSchema).optional(),
  order_refund_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  order_original_mf: z.lazy(() => SortOrderSchema).optional(),
  order_yymm_pst: z.lazy(() => SortOrderSchema).optional(),
  order_mc_eid: z.lazy(() => SortOrderSchema).optional(),
  order_mc_cid: z.lazy(() => SortOrderSchema).optional(),
  order_subscription_id: z.lazy(() => SortOrderSchema).optional(),
  order_is_void: z.lazy(() => SortOrderSchema).optional(),
  order_cash_in: z.lazy(() => SortOrderSchema).optional(),
  order_disc_c: z.lazy(() => SortOrderSchema).optional(),
  order_disc_f: z.lazy(() => SortOrderSchema).optional(),
  order_disc_s: z.lazy(() => SortOrderSchema).optional(),
  order_disc_r: z.lazy(() => SortOrderSchema).optional(),
  order_disc_t: z.lazy(() => SortOrderSchema).optional(),
  order_disc_m: z.lazy(() => SortOrderSchema).optional(),
  order_disc_g: z.lazy(() => SortOrderSchema).optional(),
  order_disc_other: z.lazy(() => SortOrderSchema).optional(),
  order_ship_revenue: z.lazy(() => SortOrderSchema).optional(),
  order_previous_order: z.lazy(() => SortOrderSchema).optional(),
  utm_content: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  netsuite_synced: z.lazy(() => SortOrderSchema).optional(),
  payment_intent_id: z.lazy(() => SortOrderSchema).optional(),
  utm_device: z.lazy(() => SortOrderSchema).optional(),
  utm_placement: z.lazy(() => SortOrderSchema).optional(),
  utm_site: z.lazy(() => SortOrderSchema).optional(),
  order_type: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const order_listMinOrderByAggregateInputSchema: z.ZodType<Prisma.order_listMinOrderByAggregateInput> = z.object({
  order_guid: z.lazy(() => SortOrderSchema).optional(),
  order_sku_list: z.lazy(() => SortOrderSchema).optional(),
  order_user: z.lazy(() => SortOrderSchema).optional(),
  order_billing_address: z.lazy(() => SortOrderSchema).optional(),
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_discount: z.lazy(() => SortOrderSchema).optional(),
  order_credit_discount: z.lazy(() => SortOrderSchema).optional(),
  order_tax: z.lazy(() => SortOrderSchema).optional(),
  order_timestamp: z.lazy(() => SortOrderSchema).optional(),
  order_status: z.lazy(() => SortOrderSchema).optional(),
  order_payment_status: z.lazy(() => SortOrderSchema).optional(),
  order_offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_utm_source: z.lazy(() => SortOrderSchema).optional(),
  order_utm_medium: z.lazy(() => SortOrderSchema).optional(),
  order_utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_auth_code: z.lazy(() => SortOrderSchema).optional(),
  order_auth_date: z.lazy(() => SortOrderSchema).optional(),
  order_billing_instrument: z.lazy(() => SortOrderSchema).optional(),
  order_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  x_user_email: z.lazy(() => SortOrderSchema).optional(),
  order_unit_price: z.lazy(() => SortOrderSchema).optional(),
  order_promo_code: z.lazy(() => SortOrderSchema).optional(),
  x_order_is_authorized_or_captured: z.lazy(() => SortOrderSchema).optional(),
  cohort_mth: z.lazy(() => SortOrderSchema).optional(),
  order_reveal_date: z.lazy(() => SortOrderSchema).optional(),
  cohort_fp_mth: z.lazy(() => SortOrderSchema).optional(),
  is_test_order: z.lazy(() => SortOrderSchema).optional(),
  order_rejected_dt: z.lazy(() => SortOrderSchema).optional(),
  order_upgraded_value: z.lazy(() => SortOrderSchema).optional(),
  order_allocated_cogs: z.lazy(() => SortOrderSchema).optional(),
  order_cohort_fpdate: z.lazy(() => SortOrderSchema).optional(),
  order_cc_fee: z.lazy(() => SortOrderSchema).optional(),
  order_refund_transaction_id: z.lazy(() => SortOrderSchema).optional(),
  order_original_mf: z.lazy(() => SortOrderSchema).optional(),
  order_yymm_pst: z.lazy(() => SortOrderSchema).optional(),
  order_mc_eid: z.lazy(() => SortOrderSchema).optional(),
  order_mc_cid: z.lazy(() => SortOrderSchema).optional(),
  order_subscription_id: z.lazy(() => SortOrderSchema).optional(),
  order_is_void: z.lazy(() => SortOrderSchema).optional(),
  order_cash_in: z.lazy(() => SortOrderSchema).optional(),
  order_disc_c: z.lazy(() => SortOrderSchema).optional(),
  order_disc_f: z.lazy(() => SortOrderSchema).optional(),
  order_disc_s: z.lazy(() => SortOrderSchema).optional(),
  order_disc_r: z.lazy(() => SortOrderSchema).optional(),
  order_disc_t: z.lazy(() => SortOrderSchema).optional(),
  order_disc_m: z.lazy(() => SortOrderSchema).optional(),
  order_disc_g: z.lazy(() => SortOrderSchema).optional(),
  order_disc_other: z.lazy(() => SortOrderSchema).optional(),
  order_ship_revenue: z.lazy(() => SortOrderSchema).optional(),
  order_previous_order: z.lazy(() => SortOrderSchema).optional(),
  utm_content: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  netsuite_synced: z.lazy(() => SortOrderSchema).optional(),
  payment_intent_id: z.lazy(() => SortOrderSchema).optional(),
  utm_device: z.lazy(() => SortOrderSchema).optional(),
  utm_placement: z.lazy(() => SortOrderSchema).optional(),
  utm_site: z.lazy(() => SortOrderSchema).optional(),
  order_type: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const order_listSumOrderByAggregateInputSchema: z.ZodType<Prisma.order_listSumOrderByAggregateInput> = z.object({
  order_qty: z.lazy(() => SortOrderSchema).optional(),
  order_total_price: z.lazy(() => SortOrderSchema).optional(),
  order_discount: z.lazy(() => SortOrderSchema).optional(),
  order_credit_discount: z.lazy(() => SortOrderSchema).optional(),
  order_tax: z.lazy(() => SortOrderSchema).optional(),
  order_user_nth: z.lazy(() => SortOrderSchema).optional(),
  order_unit_price: z.lazy(() => SortOrderSchema).optional(),
  cohort_fp_mth: z.lazy(() => SortOrderSchema).optional(),
  order_upgraded_value: z.lazy(() => SortOrderSchema).optional(),
  order_allocated_cogs: z.lazy(() => SortOrderSchema).optional(),
  order_cc_fee: z.lazy(() => SortOrderSchema).optional(),
  order_cash_in: z.lazy(() => SortOrderSchema).optional(),
  order_disc_c: z.lazy(() => SortOrderSchema).optional(),
  order_disc_f: z.lazy(() => SortOrderSchema).optional(),
  order_disc_s: z.lazy(() => SortOrderSchema).optional(),
  order_disc_r: z.lazy(() => SortOrderSchema).optional(),
  order_disc_t: z.lazy(() => SortOrderSchema).optional(),
  order_disc_m: z.lazy(() => SortOrderSchema).optional(),
  order_disc_g: z.lazy(() => SortOrderSchema).optional(),
  order_disc_other: z.lazy(() => SortOrderSchema).optional(),
  order_ship_revenue: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const Enumorder_list_x_order_is_authorized_or_capturedNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumorder_list_x_order_is_authorized_or_capturedNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
  in: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema).optional(),
}).strict();

export const Enumorder_list_order_is_voidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumorder_list_order_is_voidNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NestedEnumorder_list_order_is_voidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumorder_list_order_is_voidNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumorder_list_order_is_voidNullableFilterSchema).optional(),
}).strict();

export const Enumorder_list_order_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumorder_list_order_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NestedEnumorder_list_order_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumorder_list_order_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumorder_list_order_typeNullableFilterSchema).optional(),
}).strict();

export const user_listOrderByRelevanceInputSchema: z.ZodType<Prisma.user_listOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => user_listOrderByRelevanceFieldEnumSchema), z.lazy(() => user_listOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const user_listCountOrderByAggregateInputSchema: z.ZodType<Prisma.user_listCountOrderByAggregateInput> = z.object({
  user_guid: z.lazy(() => SortOrderSchema).optional(),
  user_birthday: z.lazy(() => SortOrderSchema).optional(),
  user_default_address: z.lazy(() => SortOrderSchema).optional(),
  user_email: z.lazy(() => SortOrderSchema).optional(),
  user_fname: z.lazy(() => SortOrderSchema).optional(),
  user_lname: z.lazy(() => SortOrderSchema).optional(),
  user_is21: z.lazy(() => SortOrderSchema).optional(),
  user_is_testaccount: z.lazy(() => SortOrderSchema).optional(),
  user_image_url: z.lazy(() => SortOrderSchema).optional(),
  user_url_profile: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
  user_login_dt: z.lazy(() => SortOrderSchema).optional(),
  user_signup_dt: z.lazy(() => SortOrderSchema).optional(),
  user_last_purchase_dt: z.lazy(() => SortOrderSchema).optional(),
  user_first_purchase_dt: z.lazy(() => SortOrderSchema).optional(),
  user_referred_by_id: z.lazy(() => SortOrderSchema).optional(),
  user_referral_domain: z.lazy(() => SortOrderSchema).optional(),
  session_utm_source: z.lazy(() => SortOrderSchema).optional(),
  session_utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  session_utm_medium: z.lazy(() => SortOrderSchema).optional(),
  x_life_credit: z.lazy(() => SortOrderSchema).optional(),
  x_total_qty: z.lazy(() => SortOrderSchema).optional(),
  x_life_spend: z.lazy(() => SortOrderSchema).optional(),
  x_life_discount: z.lazy(() => SortOrderSchema).optional(),
  x_acquisition_cost: z.lazy(() => SortOrderSchema).optional(),
  x_achievement_points: z.lazy(() => SortOrderSchema).optional(),
  user_is_private: z.lazy(() => SortOrderSchema).optional(),
  user_is_red_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_is_white_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_is_largeformat_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_min_price: z.lazy(() => SortOrderSchema).optional(),
  user_max_price: z.lazy(() => SortOrderSchema).optional(),
  user_avg_price: z.lazy(() => SortOrderSchema).optional(),
  user_is_push: z.lazy(() => SortOrderSchema).optional(),
  user_outreach_dt: z.lazy(() => SortOrderSchema).optional(),
  ls_is_student: z.lazy(() => SortOrderSchema).optional(),
  ls_is_personal_email: z.lazy(() => SortOrderSchema).optional(),
  ls_grade: z.lazy(() => SortOrderSchema).optional(),
  ls_company_state_code: z.lazy(() => SortOrderSchema).optional(),
  ls_fname: z.lazy(() => SortOrderSchema).optional(),
  ls_lname: z.lazy(() => SortOrderSchema).optional(),
  ls_location_state: z.lazy(() => SortOrderSchema).optional(),
  ls_company_name: z.lazy(() => SortOrderSchema).optional(),
  ls_company_industry: z.lazy(() => SortOrderSchema).optional(),
  ls_company_country: z.lazy(() => SortOrderSchema).optional(),
  ls_company_emps: z.lazy(() => SortOrderSchema).optional(),
  ls_is_spam: z.lazy(() => SortOrderSchema).optional(),
  ls_customer_fit: z.lazy(() => SortOrderSchema).optional(),
  ls_customer_fit_ext: z.lazy(() => SortOrderSchema).optional(),
  x_order_count: z.lazy(() => SortOrderSchema).optional(),
  user_inactive_dt: z.lazy(() => SortOrderSchema).optional(),
  user_email_n: z.lazy(() => SortOrderSchema).optional(),
  user_note: z.lazy(() => SortOrderSchema).optional(),
  user_expiry: z.lazy(() => SortOrderSchema).optional(),
  user_last_ship_date: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_value: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_count: z.lazy(() => SortOrderSchema).optional(),
  user_is_vip: z.lazy(() => SortOrderSchema).optional(),
  user_signup_ym_pst: z.lazy(() => SortOrderSchema).optional(),
  suspended_at: z.lazy(() => SortOrderSchema).optional(),
  last_synced_at: z.lazy(() => SortOrderSchema).optional(),
  is_admin: z.lazy(() => SortOrderSchema).optional(),
  utm_content: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  user_password: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  google_id: z.lazy(() => SortOrderSchema).optional(),
  utm_device: z.lazy(() => SortOrderSchema).optional(),
  utm_placement: z.lazy(() => SortOrderSchema).optional(),
  utm_site: z.lazy(() => SortOrderSchema).optional(),
  holdout_num: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const user_listAvgOrderByAggregateInputSchema: z.ZodType<Prisma.user_listAvgOrderByAggregateInput> = z.object({
  x_life_credit: z.lazy(() => SortOrderSchema).optional(),
  x_total_qty: z.lazy(() => SortOrderSchema).optional(),
  x_life_spend: z.lazy(() => SortOrderSchema).optional(),
  x_life_discount: z.lazy(() => SortOrderSchema).optional(),
  x_acquisition_cost: z.lazy(() => SortOrderSchema).optional(),
  x_achievement_points: z.lazy(() => SortOrderSchema).optional(),
  x_order_count: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_value: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const user_listMaxOrderByAggregateInputSchema: z.ZodType<Prisma.user_listMaxOrderByAggregateInput> = z.object({
  user_guid: z.lazy(() => SortOrderSchema).optional(),
  user_birthday: z.lazy(() => SortOrderSchema).optional(),
  user_default_address: z.lazy(() => SortOrderSchema).optional(),
  user_email: z.lazy(() => SortOrderSchema).optional(),
  user_fname: z.lazy(() => SortOrderSchema).optional(),
  user_lname: z.lazy(() => SortOrderSchema).optional(),
  user_is21: z.lazy(() => SortOrderSchema).optional(),
  user_is_testaccount: z.lazy(() => SortOrderSchema).optional(),
  user_image_url: z.lazy(() => SortOrderSchema).optional(),
  user_url_profile: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
  user_login_dt: z.lazy(() => SortOrderSchema).optional(),
  user_signup_dt: z.lazy(() => SortOrderSchema).optional(),
  user_last_purchase_dt: z.lazy(() => SortOrderSchema).optional(),
  user_first_purchase_dt: z.lazy(() => SortOrderSchema).optional(),
  user_referred_by_id: z.lazy(() => SortOrderSchema).optional(),
  user_referral_domain: z.lazy(() => SortOrderSchema).optional(),
  session_utm_source: z.lazy(() => SortOrderSchema).optional(),
  session_utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  session_utm_medium: z.lazy(() => SortOrderSchema).optional(),
  x_life_credit: z.lazy(() => SortOrderSchema).optional(),
  x_total_qty: z.lazy(() => SortOrderSchema).optional(),
  x_life_spend: z.lazy(() => SortOrderSchema).optional(),
  x_life_discount: z.lazy(() => SortOrderSchema).optional(),
  x_acquisition_cost: z.lazy(() => SortOrderSchema).optional(),
  x_achievement_points: z.lazy(() => SortOrderSchema).optional(),
  user_is_private: z.lazy(() => SortOrderSchema).optional(),
  user_is_red_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_is_white_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_is_largeformat_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_min_price: z.lazy(() => SortOrderSchema).optional(),
  user_max_price: z.lazy(() => SortOrderSchema).optional(),
  user_avg_price: z.lazy(() => SortOrderSchema).optional(),
  user_is_push: z.lazy(() => SortOrderSchema).optional(),
  user_outreach_dt: z.lazy(() => SortOrderSchema).optional(),
  ls_is_student: z.lazy(() => SortOrderSchema).optional(),
  ls_is_personal_email: z.lazy(() => SortOrderSchema).optional(),
  ls_grade: z.lazy(() => SortOrderSchema).optional(),
  ls_company_state_code: z.lazy(() => SortOrderSchema).optional(),
  ls_fname: z.lazy(() => SortOrderSchema).optional(),
  ls_lname: z.lazy(() => SortOrderSchema).optional(),
  ls_location_state: z.lazy(() => SortOrderSchema).optional(),
  ls_company_name: z.lazy(() => SortOrderSchema).optional(),
  ls_company_industry: z.lazy(() => SortOrderSchema).optional(),
  ls_company_country: z.lazy(() => SortOrderSchema).optional(),
  ls_company_emps: z.lazy(() => SortOrderSchema).optional(),
  ls_is_spam: z.lazy(() => SortOrderSchema).optional(),
  ls_customer_fit: z.lazy(() => SortOrderSchema).optional(),
  ls_customer_fit_ext: z.lazy(() => SortOrderSchema).optional(),
  x_order_count: z.lazy(() => SortOrderSchema).optional(),
  user_inactive_dt: z.lazy(() => SortOrderSchema).optional(),
  user_email_n: z.lazy(() => SortOrderSchema).optional(),
  user_note: z.lazy(() => SortOrderSchema).optional(),
  user_expiry: z.lazy(() => SortOrderSchema).optional(),
  user_last_ship_date: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_value: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_count: z.lazy(() => SortOrderSchema).optional(),
  user_is_vip: z.lazy(() => SortOrderSchema).optional(),
  user_signup_ym_pst: z.lazy(() => SortOrderSchema).optional(),
  suspended_at: z.lazy(() => SortOrderSchema).optional(),
  last_synced_at: z.lazy(() => SortOrderSchema).optional(),
  is_admin: z.lazy(() => SortOrderSchema).optional(),
  utm_content: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  user_password: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  google_id: z.lazy(() => SortOrderSchema).optional(),
  utm_device: z.lazy(() => SortOrderSchema).optional(),
  utm_placement: z.lazy(() => SortOrderSchema).optional(),
  utm_site: z.lazy(() => SortOrderSchema).optional(),
  holdout_num: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const user_listMinOrderByAggregateInputSchema: z.ZodType<Prisma.user_listMinOrderByAggregateInput> = z.object({
  user_guid: z.lazy(() => SortOrderSchema).optional(),
  user_birthday: z.lazy(() => SortOrderSchema).optional(),
  user_default_address: z.lazy(() => SortOrderSchema).optional(),
  user_email: z.lazy(() => SortOrderSchema).optional(),
  user_fname: z.lazy(() => SortOrderSchema).optional(),
  user_lname: z.lazy(() => SortOrderSchema).optional(),
  user_is21: z.lazy(() => SortOrderSchema).optional(),
  user_is_testaccount: z.lazy(() => SortOrderSchema).optional(),
  user_image_url: z.lazy(() => SortOrderSchema).optional(),
  user_url_profile: z.lazy(() => SortOrderSchema).optional(),
  user_name: z.lazy(() => SortOrderSchema).optional(),
  user_login_dt: z.lazy(() => SortOrderSchema).optional(),
  user_signup_dt: z.lazy(() => SortOrderSchema).optional(),
  user_last_purchase_dt: z.lazy(() => SortOrderSchema).optional(),
  user_first_purchase_dt: z.lazy(() => SortOrderSchema).optional(),
  user_referred_by_id: z.lazy(() => SortOrderSchema).optional(),
  user_referral_domain: z.lazy(() => SortOrderSchema).optional(),
  session_utm_source: z.lazy(() => SortOrderSchema).optional(),
  session_utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  session_utm_medium: z.lazy(() => SortOrderSchema).optional(),
  x_life_credit: z.lazy(() => SortOrderSchema).optional(),
  x_total_qty: z.lazy(() => SortOrderSchema).optional(),
  x_life_spend: z.lazy(() => SortOrderSchema).optional(),
  x_life_discount: z.lazy(() => SortOrderSchema).optional(),
  x_acquisition_cost: z.lazy(() => SortOrderSchema).optional(),
  x_achievement_points: z.lazy(() => SortOrderSchema).optional(),
  user_is_private: z.lazy(() => SortOrderSchema).optional(),
  user_is_red_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_is_white_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_is_largeformat_buyer: z.lazy(() => SortOrderSchema).optional(),
  user_min_price: z.lazy(() => SortOrderSchema).optional(),
  user_max_price: z.lazy(() => SortOrderSchema).optional(),
  user_avg_price: z.lazy(() => SortOrderSchema).optional(),
  user_is_push: z.lazy(() => SortOrderSchema).optional(),
  user_outreach_dt: z.lazy(() => SortOrderSchema).optional(),
  ls_is_student: z.lazy(() => SortOrderSchema).optional(),
  ls_is_personal_email: z.lazy(() => SortOrderSchema).optional(),
  ls_grade: z.lazy(() => SortOrderSchema).optional(),
  ls_company_state_code: z.lazy(() => SortOrderSchema).optional(),
  ls_fname: z.lazy(() => SortOrderSchema).optional(),
  ls_lname: z.lazy(() => SortOrderSchema).optional(),
  ls_location_state: z.lazy(() => SortOrderSchema).optional(),
  ls_company_name: z.lazy(() => SortOrderSchema).optional(),
  ls_company_industry: z.lazy(() => SortOrderSchema).optional(),
  ls_company_country: z.lazy(() => SortOrderSchema).optional(),
  ls_company_emps: z.lazy(() => SortOrderSchema).optional(),
  ls_is_spam: z.lazy(() => SortOrderSchema).optional(),
  ls_customer_fit: z.lazy(() => SortOrderSchema).optional(),
  ls_customer_fit_ext: z.lazy(() => SortOrderSchema).optional(),
  x_order_count: z.lazy(() => SortOrderSchema).optional(),
  user_inactive_dt: z.lazy(() => SortOrderSchema).optional(),
  user_email_n: z.lazy(() => SortOrderSchema).optional(),
  user_note: z.lazy(() => SortOrderSchema).optional(),
  user_expiry: z.lazy(() => SortOrderSchema).optional(),
  user_last_ship_date: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_value: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_count: z.lazy(() => SortOrderSchema).optional(),
  user_is_vip: z.lazy(() => SortOrderSchema).optional(),
  user_signup_ym_pst: z.lazy(() => SortOrderSchema).optional(),
  suspended_at: z.lazy(() => SortOrderSchema).optional(),
  last_synced_at: z.lazy(() => SortOrderSchema).optional(),
  is_admin: z.lazy(() => SortOrderSchema).optional(),
  utm_content: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  user_password: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  google_id: z.lazy(() => SortOrderSchema).optional(),
  utm_device: z.lazy(() => SortOrderSchema).optional(),
  utm_placement: z.lazy(() => SortOrderSchema).optional(),
  utm_site: z.lazy(() => SortOrderSchema).optional(),
  holdout_num: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const user_listSumOrderByAggregateInputSchema: z.ZodType<Prisma.user_listSumOrderByAggregateInput> = z.object({
  x_life_credit: z.lazy(() => SortOrderSchema).optional(),
  x_total_qty: z.lazy(() => SortOrderSchema).optional(),
  x_life_spend: z.lazy(() => SortOrderSchema).optional(),
  x_life_discount: z.lazy(() => SortOrderSchema).optional(),
  x_acquisition_cost: z.lazy(() => SortOrderSchema).optional(),
  x_achievement_points: z.lazy(() => SortOrderSchema).optional(),
  x_order_count: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_value: z.lazy(() => SortOrderSchema).optional(),
  x_cloud_count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const usersOrderByRelevanceInputSchema: z.ZodType<Prisma.usersOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => usersOrderByRelevanceFieldEnumSchema), z.lazy(() => usersOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const usersCountOrderByAggregateInputSchema: z.ZodType<Prisma.usersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  alias: z.lazy(() => SortOrderSchema).optional(),
  ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
  ax_homes: z.lazy(() => SortOrderSchema).optional(),
  ax_tax: z.lazy(() => SortOrderSchema).optional(),
  ax_evdb: z.lazy(() => SortOrderSchema).optional(),
  ax_spgp: z.lazy(() => SortOrderSchema).optional(),
  ax_uc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const usersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.usersAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const usersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.usersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  alias: z.lazy(() => SortOrderSchema).optional(),
  ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
  ax_homes: z.lazy(() => SortOrderSchema).optional(),
  ax_tax: z.lazy(() => SortOrderSchema).optional(),
  ax_evdb: z.lazy(() => SortOrderSchema).optional(),
  ax_spgp: z.lazy(() => SortOrderSchema).optional(),
  ax_uc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const usersMinOrderByAggregateInputSchema: z.ZodType<Prisma.usersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  alias: z.lazy(() => SortOrderSchema).optional(),
  ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
  ax_homes: z.lazy(() => SortOrderSchema).optional(),
  ax_tax: z.lazy(() => SortOrderSchema).optional(),
  ax_evdb: z.lazy(() => SortOrderSchema).optional(),
  ax_spgp: z.lazy(() => SortOrderSchema).optional(),
  ax_uc: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const usersSumOrderByAggregateInputSchema: z.ZodType<Prisma.usersSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const order_lockOrderByRelevanceInputSchema: z.ZodType<Prisma.order_lockOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => order_lockOrderByRelevanceFieldEnumSchema), z.lazy(() => order_lockOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const order_lockCountOrderByAggregateInputSchema: z.ZodType<Prisma.order_lockCountOrderByAggregateInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  locked_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const order_lockMaxOrderByAggregateInputSchema: z.ZodType<Prisma.order_lockMaxOrderByAggregateInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  locked_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const order_lockMinOrderByAggregateInputSchema: z.ZodType<Prisma.order_lockMinOrderByAggregateInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  locked_at: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const v3_audit_logOrderByRelevanceInputSchema: z.ZodType<Prisma.v3_audit_logOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => v3_audit_logOrderByRelevanceFieldEnumSchema), z.lazy(() => v3_audit_logOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const v3_audit_logCountOrderByAggregateInputSchema: z.ZodType<Prisma.v3_audit_logCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  event_ts: z.lazy(() => SortOrderSchema).optional(),
  event_name: z.lazy(() => SortOrderSchema).optional(),
  event_ext: z.lazy(() => SortOrderSchema).optional(),
  event_userid: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  time_taken_ms: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_audit_logAvgOrderByAggregateInputSchema: z.ZodType<Prisma.v3_audit_logAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  event_userid: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  time_taken_ms: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_audit_logMaxOrderByAggregateInputSchema: z.ZodType<Prisma.v3_audit_logMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  event_ts: z.lazy(() => SortOrderSchema).optional(),
  event_name: z.lazy(() => SortOrderSchema).optional(),
  event_ext: z.lazy(() => SortOrderSchema).optional(),
  event_userid: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  time_taken_ms: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_audit_logMinOrderByAggregateInputSchema: z.ZodType<Prisma.v3_audit_logMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  event_ts: z.lazy(() => SortOrderSchema).optional(),
  event_name: z.lazy(() => SortOrderSchema).optional(),
  event_ext: z.lazy(() => SortOrderSchema).optional(),
  event_userid: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  time_taken_ms: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_audit_logSumOrderByAggregateInputSchema: z.ZodType<Prisma.v3_audit_logSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  event_userid: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  time_taken_ms: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offerOrderByRelevanceInputSchema: z.ZodType<Prisma.v3_offerOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => v3_offerOrderByRelevanceFieldEnumSchema), z.lazy(() => v3_offerOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const v3_offerCountOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offerCountOrderByAggregateInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  offer_name: z.lazy(() => SortOrderSchema).optional(),
  offer_variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_product_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offerAvgOrderByAggregateInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offerMaxOrderByAggregateInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  offer_name: z.lazy(() => SortOrderSchema).optional(),
  offer_variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_product_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offerMinOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offerMinOrderByAggregateInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  offer_name: z.lazy(() => SortOrderSchema).optional(),
  offer_variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_product_name: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offerSumOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offerSumOrderByAggregateInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const v3_offer_manifestOrderByRelevanceInputSchema: z.ZodType<Prisma.v3_offer_manifestOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => v3_offer_manifestOrderByRelevanceFieldEnumSchema), z.lazy(() => v3_offer_manifestOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const v3_offer_manifestCountOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offer_manifestCountOrderByAggregateInput> = z.object({
  m_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  mf_variant: z.lazy(() => SortOrderSchema).optional(),
  assignee_id: z.lazy(() => SortOrderSchema).optional(),
  assignment_ordering: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offer_manifestAvgOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offer_manifestAvgOrderByAggregateInput> = z.object({
  m_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  assignment_ordering: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offer_manifestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offer_manifestMaxOrderByAggregateInput> = z.object({
  m_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  mf_variant: z.lazy(() => SortOrderSchema).optional(),
  assignee_id: z.lazy(() => SortOrderSchema).optional(),
  assignment_ordering: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offer_manifestMinOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offer_manifestMinOrderByAggregateInput> = z.object({
  m_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  mf_variant: z.lazy(() => SortOrderSchema).optional(),
  assignee_id: z.lazy(() => SortOrderSchema).optional(),
  assignment_ordering: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_offer_manifestSumOrderByAggregateInputSchema: z.ZodType<Prisma.v3_offer_manifestSumOrderByAggregateInput> = z.object({
  m_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
  assignment_ordering: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const v3_order_to_variantOrderByRelevanceInputSchema: z.ZodType<Prisma.v3_order_to_variantOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => v3_order_to_variantOrderByRelevanceFieldEnumSchema), z.lazy(() => v3_order_to_variantOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const v3_order_to_variantVariant_idOrder_idCompoundUniqueInputSchema: z.ZodType<Prisma.v3_order_to_variantVariant_idOrder_idCompoundUniqueInput> = z.object({
  variant_id: z.string(),
  order_id: z.string(),
}).strict();

export const v3_order_to_variantCountOrderByAggregateInputSchema: z.ZodType<Prisma.v3_order_to_variantCountOrderByAggregateInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_order_to_variantAvgOrderByAggregateInputSchema: z.ZodType<Prisma.v3_order_to_variantAvgOrderByAggregateInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_order_to_variantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.v3_order_to_variantMaxOrderByAggregateInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_order_to_variantMinOrderByAggregateInputSchema: z.ZodType<Prisma.v3_order_to_variantMinOrderByAggregateInput> = z.object({
  order_id: z.lazy(() => SortOrderSchema).optional(),
  variant_id: z.lazy(() => SortOrderSchema).optional(),
  offer_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const v3_order_to_variantSumOrderByAggregateInputSchema: z.ZodType<Prisma.v3_order_to_variantSumOrderByAggregateInput> = z.object({
  offer_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const inventoryOrderByRelevanceInputSchema: z.ZodType<Prisma.inventoryOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => inventoryOrderByRelevanceFieldEnumSchema), z.lazy(() => inventoryOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const inventoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.inventoryCountOrderByAggregateInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  units_on_hand: z.lazy(() => SortOrderSchema).optional(),
  cost_basis_unit: z.lazy(() => SortOrderSchema).optional(),
  srp_unit: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const inventoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.inventoryAvgOrderByAggregateInput> = z.object({
  units_on_hand: z.lazy(() => SortOrderSchema).optional(),
  cost_basis_unit: z.lazy(() => SortOrderSchema).optional(),
  srp_unit: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const inventoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.inventoryMaxOrderByAggregateInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  units_on_hand: z.lazy(() => SortOrderSchema).optional(),
  cost_basis_unit: z.lazy(() => SortOrderSchema).optional(),
  srp_unit: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const inventoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.inventoryMinOrderByAggregateInput> = z.object({
  sku: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  units_on_hand: z.lazy(() => SortOrderSchema).optional(),
  cost_basis_unit: z.lazy(() => SortOrderSchema).optional(),
  srp_unit: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const inventorySumOrderByAggregateInputSchema: z.ZodType<Prisma.inventorySumOrderByAggregateInput> = z.object({
  units_on_hand: z.lazy(() => SortOrderSchema).optional(),
  cost_basis_unit: z.lazy(() => SortOrderSchema).optional(),
  srp_unit: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const computed_buyer_varietalsOrderByRelevanceInputSchema: z.ZodType<Prisma.computed_buyer_varietalsOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => computed_buyer_varietalsOrderByRelevanceFieldEnumSchema), z.lazy(() => computed_buyer_varietalsOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const computed_buyer_varietalsCountOrderByAggregateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  winner_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  total_paid: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const computed_buyer_varietalsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  total_paid: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const computed_buyer_varietalsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  winner_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  total_paid: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const computed_buyer_varietalsMinOrderByAggregateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  winner_guid: z.lazy(() => SortOrderSchema).optional(),
  cola_varietal: z.lazy(() => SortOrderSchema).optional(),
  total_paid: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const computed_buyer_varietalsSumOrderByAggregateInputSchema: z.ZodType<Prisma.computed_buyer_varietalsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  total_paid: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const member_list_export_2023_07_06OrderByRelevanceInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06OrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => member_list_export_2023_07_06OrderByRelevanceFieldEnumSchema), z.lazy(() => member_list_export_2023_07_06OrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const member_list_export_2023_07_06CountOrderByAggregateInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06CountOrderByAggregateInput> = z.object({
  Email: z.lazy(() => SortOrderSchema).optional(),
  Klaviyo_ID: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.lazy(() => SortOrderSchema).optional(),
  Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Phone_Number: z.lazy(() => SortOrderSchema).optional(),
  Address: z.lazy(() => SortOrderSchema).optional(),
  Address_2: z.lazy(() => SortOrderSchema).optional(),
  City: z.lazy(() => SortOrderSchema).optional(),
  State___Region: z.lazy(() => SortOrderSchema).optional(),
  Country: z.lazy(() => SortOrderSchema).optional(),
  Zip_Code: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const member_list_export_2023_07_06MaxOrderByAggregateInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06MaxOrderByAggregateInput> = z.object({
  Email: z.lazy(() => SortOrderSchema).optional(),
  Klaviyo_ID: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.lazy(() => SortOrderSchema).optional(),
  Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Phone_Number: z.lazy(() => SortOrderSchema).optional(),
  Address: z.lazy(() => SortOrderSchema).optional(),
  Address_2: z.lazy(() => SortOrderSchema).optional(),
  City: z.lazy(() => SortOrderSchema).optional(),
  State___Region: z.lazy(() => SortOrderSchema).optional(),
  Country: z.lazy(() => SortOrderSchema).optional(),
  Zip_Code: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const member_list_export_2023_07_06MinOrderByAggregateInputSchema: z.ZodType<Prisma.member_list_export_2023_07_06MinOrderByAggregateInput> = z.object({
  Email: z.lazy(() => SortOrderSchema).optional(),
  Klaviyo_ID: z.lazy(() => SortOrderSchema).optional(),
  First_Name: z.lazy(() => SortOrderSchema).optional(),
  Last_Name: z.lazy(() => SortOrderSchema).optional(),
  Phone_Number: z.lazy(() => SortOrderSchema).optional(),
  Address: z.lazy(() => SortOrderSchema).optional(),
  Address_2: z.lazy(() => SortOrderSchema).optional(),
  City: z.lazy(() => SortOrderSchema).optional(),
  State___Region: z.lazy(() => SortOrderSchema).optional(),
  Country: z.lazy(() => SortOrderSchema).optional(),
  Zip_Code: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const shopify_product_variantOrderByRelevanceInputSchema: z.ZodType<Prisma.shopify_product_variantOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => shopify_product_variantOrderByRelevanceFieldEnumSchema), z.lazy(() => shopify_product_variantOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string(),
}).strict();

export const shopify_product_variantCountOrderByAggregateInputSchema: z.ZodType<Prisma.shopify_product_variantCountOrderByAggregateInput> = z.object({
  variantId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  productName: z.lazy(() => SortOrderSchema).optional(),
  variantName: z.lazy(() => SortOrderSchema).optional(),
  variantPrice: z.lazy(() => SortOrderSchema).optional(),
  variantCompareAtPrice: z.lazy(() => SortOrderSchema).optional(),
  variantInventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  variantSku: z.lazy(() => SortOrderSchema).optional(),
  variantWeight: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const shopify_product_variantAvgOrderByAggregateInputSchema: z.ZodType<Prisma.shopify_product_variantAvgOrderByAggregateInput> = z.object({
  variantInventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const shopify_product_variantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.shopify_product_variantMaxOrderByAggregateInput> = z.object({
  variantId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  productName: z.lazy(() => SortOrderSchema).optional(),
  variantName: z.lazy(() => SortOrderSchema).optional(),
  variantPrice: z.lazy(() => SortOrderSchema).optional(),
  variantCompareAtPrice: z.lazy(() => SortOrderSchema).optional(),
  variantInventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  variantSku: z.lazy(() => SortOrderSchema).optional(),
  variantWeight: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const shopify_product_variantMinOrderByAggregateInputSchema: z.ZodType<Prisma.shopify_product_variantMinOrderByAggregateInput> = z.object({
  variantId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  productName: z.lazy(() => SortOrderSchema).optional(),
  variantName: z.lazy(() => SortOrderSchema).optional(),
  variantPrice: z.lazy(() => SortOrderSchema).optional(),
  variantCompareAtPrice: z.lazy(() => SortOrderSchema).optional(),
  variantInventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  variantSku: z.lazy(() => SortOrderSchema).optional(),
  variantWeight: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const shopify_product_variantSumOrderByAggregateInputSchema: z.ZodType<Prisma.shopify_product_variantSumOrderByAggregateInput> = z.object({
  variantInventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional(),
}).strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional(),
}).strict();

export const NullableBigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional().nullable(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional(),
}).strict();

export const NullableEnumorder_list_x_order_is_authorized_or_capturedFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumorder_list_x_order_is_authorized_or_capturedFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
}).strict();

export const NullableEnumorder_list_order_is_voidFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumorder_list_order_is_voidFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
}).strict();

export const NullableEnumorder_list_order_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumorder_list_order_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDecimalNullableFilterSchema: z.ZodType<Prisma.NestedDecimalNullableFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
}).strict();

export const NestedBigIntNullableFilterSchema: z.ZodType<Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
}).strict();

export const NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema: z.ZodType<Prisma.NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilter> = z.object({
  equals: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
  in: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumorder_list_order_is_voidNullableFilterSchema: z.ZodType<Prisma.NestedEnumorder_list_order_is_voidNullableFilter> = z.object({
  equals: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NestedEnumorder_list_order_is_voidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumorder_list_order_typeNullableFilterSchema: z.ZodType<Prisma.NestedEnumorder_list_order_typeNullableFilter> = z.object({
  equals: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NestedEnumorder_list_order_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumorder_list_x_order_is_authorized_or_capturedNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumorder_list_x_order_is_authorized_or_capturedNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).optional().nullable(),
  in: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_x_order_is_authorized_or_capturedSchema), z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumorder_list_x_order_is_authorized_or_capturedNullableFilterSchema).optional(),
}).strict();

export const NestedEnumorder_list_order_is_voidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumorder_list_order_is_voidNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => order_list_order_is_voidSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_is_voidSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_is_voidSchema), z.lazy(() => NestedEnumorder_list_order_is_voidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumorder_list_order_is_voidNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumorder_list_order_is_voidNullableFilterSchema).optional(),
}).strict();

export const NestedEnumorder_list_order_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumorder_list_order_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => order_list_order_typeSchema).optional().nullable(),
  in: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => order_list_order_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => order_list_order_typeSchema), z.lazy(() => NestedEnumorder_list_order_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumorder_list_order_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumorder_list_order_typeNullableFilterSchema).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const customer_list_july_2023FindFirstArgsSchema: z.ZodType<Prisma.customer_list_july_2023FindFirstArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  where: customer_list_july_2023WhereInputSchema.optional(), 
  orderBy: z.union([ customer_list_july_2023OrderByWithRelationInputSchema.array(), customer_list_july_2023OrderByWithRelationInputSchema ]).optional(),
  cursor: customer_list_july_2023WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Customer_list_july_2023ScalarFieldEnumSchema, Customer_list_july_2023ScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const customer_list_july_2023FindFirstOrThrowArgsSchema: z.ZodType<Prisma.customer_list_july_2023FindFirstOrThrowArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  where: customer_list_july_2023WhereInputSchema.optional(), 
  orderBy: z.union([ customer_list_july_2023OrderByWithRelationInputSchema.array(), customer_list_july_2023OrderByWithRelationInputSchema ]).optional(),
  cursor: customer_list_july_2023WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Customer_list_july_2023ScalarFieldEnumSchema, Customer_list_july_2023ScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const customer_list_july_2023FindManyArgsSchema: z.ZodType<Prisma.customer_list_july_2023FindManyArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  where: customer_list_july_2023WhereInputSchema.optional(), 
  orderBy: z.union([ customer_list_july_2023OrderByWithRelationInputSchema.array(), customer_list_july_2023OrderByWithRelationInputSchema ]).optional(),
  cursor: customer_list_july_2023WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Customer_list_july_2023ScalarFieldEnumSchema, Customer_list_july_2023ScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const customer_list_july_2023AggregateArgsSchema: z.ZodType<Prisma.customer_list_july_2023AggregateArgs> = z.object({
  where: customer_list_july_2023WhereInputSchema.optional(), 
  orderBy: z.union([ customer_list_july_2023OrderByWithRelationInputSchema.array(), customer_list_july_2023OrderByWithRelationInputSchema ]).optional(),
  cursor: customer_list_july_2023WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const customer_list_july_2023GroupByArgsSchema: z.ZodType<Prisma.customer_list_july_2023GroupByArgs> = z.object({
  where: customer_list_july_2023WhereInputSchema.optional(), 
  orderBy: z.union([ customer_list_july_2023OrderByWithAggregationInputSchema.array(), customer_list_july_2023OrderByWithAggregationInputSchema ]).optional(),
  by: Customer_list_july_2023ScalarFieldEnumSchema.array(), 
  having: customer_list_july_2023ScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const customer_list_july_2023FindUniqueArgsSchema: z.ZodType<Prisma.customer_list_july_2023FindUniqueArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  where: customer_list_july_2023WhereUniqueInputSchema, 
}).strict();

export const customer_list_july_2023FindUniqueOrThrowArgsSchema: z.ZodType<Prisma.customer_list_july_2023FindUniqueOrThrowArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  where: customer_list_july_2023WhereUniqueInputSchema, 
}).strict();

export const item_detailFindFirstArgsSchema: z.ZodType<Prisma.item_detailFindFirstArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  where: item_detailWhereInputSchema.optional(), 
  orderBy: z.union([ item_detailOrderByWithRelationInputSchema.array(), item_detailOrderByWithRelationInputSchema ]).optional(),
  cursor: item_detailWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Item_detailScalarFieldEnumSchema, Item_detailScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const item_detailFindFirstOrThrowArgsSchema: z.ZodType<Prisma.item_detailFindFirstOrThrowArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  where: item_detailWhereInputSchema.optional(), 
  orderBy: z.union([ item_detailOrderByWithRelationInputSchema.array(), item_detailOrderByWithRelationInputSchema ]).optional(),
  cursor: item_detailWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Item_detailScalarFieldEnumSchema, Item_detailScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const item_detailFindManyArgsSchema: z.ZodType<Prisma.item_detailFindManyArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  where: item_detailWhereInputSchema.optional(), 
  orderBy: z.union([ item_detailOrderByWithRelationInputSchema.array(), item_detailOrderByWithRelationInputSchema ]).optional(),
  cursor: item_detailWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Item_detailScalarFieldEnumSchema, Item_detailScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const item_detailAggregateArgsSchema: z.ZodType<Prisma.item_detailAggregateArgs> = z.object({
  where: item_detailWhereInputSchema.optional(), 
  orderBy: z.union([ item_detailOrderByWithRelationInputSchema.array(), item_detailOrderByWithRelationInputSchema ]).optional(),
  cursor: item_detailWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const item_detailGroupByArgsSchema: z.ZodType<Prisma.item_detailGroupByArgs> = z.object({
  where: item_detailWhereInputSchema.optional(), 
  orderBy: z.union([ item_detailOrderByWithAggregationInputSchema.array(), item_detailOrderByWithAggregationInputSchema ]).optional(),
  by: Item_detailScalarFieldEnumSchema.array(), 
  having: item_detailScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const item_detailFindUniqueArgsSchema: z.ZodType<Prisma.item_detailFindUniqueArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  where: item_detailWhereUniqueInputSchema, 
}).strict();

export const item_detailFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.item_detailFindUniqueOrThrowArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  where: item_detailWhereUniqueInputSchema, 
}).strict();

export const item_skuFindFirstArgsSchema: z.ZodType<Prisma.item_skuFindFirstArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  where: item_skuWhereInputSchema.optional(), 
  orderBy: z.union([ item_skuOrderByWithRelationInputSchema.array(), item_skuOrderByWithRelationInputSchema ]).optional(),
  cursor: item_skuWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Item_skuScalarFieldEnumSchema, Item_skuScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const item_skuFindFirstOrThrowArgsSchema: z.ZodType<Prisma.item_skuFindFirstOrThrowArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  where: item_skuWhereInputSchema.optional(), 
  orderBy: z.union([ item_skuOrderByWithRelationInputSchema.array(), item_skuOrderByWithRelationInputSchema ]).optional(),
  cursor: item_skuWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Item_skuScalarFieldEnumSchema, Item_skuScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const item_skuFindManyArgsSchema: z.ZodType<Prisma.item_skuFindManyArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  where: item_skuWhereInputSchema.optional(), 
  orderBy: z.union([ item_skuOrderByWithRelationInputSchema.array(), item_skuOrderByWithRelationInputSchema ]).optional(),
  cursor: item_skuWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Item_skuScalarFieldEnumSchema, Item_skuScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const item_skuAggregateArgsSchema: z.ZodType<Prisma.item_skuAggregateArgs> = z.object({
  where: item_skuWhereInputSchema.optional(), 
  orderBy: z.union([ item_skuOrderByWithRelationInputSchema.array(), item_skuOrderByWithRelationInputSchema ]).optional(),
  cursor: item_skuWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const item_skuGroupByArgsSchema: z.ZodType<Prisma.item_skuGroupByArgs> = z.object({
  where: item_skuWhereInputSchema.optional(), 
  orderBy: z.union([ item_skuOrderByWithAggregationInputSchema.array(), item_skuOrderByWithAggregationInputSchema ]).optional(),
  by: Item_skuScalarFieldEnumSchema.array(), 
  having: item_skuScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const item_skuFindUniqueArgsSchema: z.ZodType<Prisma.item_skuFindUniqueArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  where: item_skuWhereUniqueInputSchema, 
}).strict();

export const item_skuFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.item_skuFindUniqueOrThrowArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  where: item_skuWhereUniqueInputSchema, 
}).strict();

export const new_customer_data_after_bk_from_lccFindFirstArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccFindFirstArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  where: new_customer_data_after_bk_from_lccWhereInputSchema.optional(), 
  orderBy: z.union([ new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema.array(), new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema ]).optional(),
  cursor: new_customer_data_after_bk_from_lccWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ New_customer_data_after_bk_from_lccScalarFieldEnumSchema, New_customer_data_after_bk_from_lccScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccFindFirstOrThrowArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccFindFirstOrThrowArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  where: new_customer_data_after_bk_from_lccWhereInputSchema.optional(), 
  orderBy: z.union([ new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema.array(), new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema ]).optional(),
  cursor: new_customer_data_after_bk_from_lccWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ New_customer_data_after_bk_from_lccScalarFieldEnumSchema, New_customer_data_after_bk_from_lccScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccFindManyArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccFindManyArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  where: new_customer_data_after_bk_from_lccWhereInputSchema.optional(), 
  orderBy: z.union([ new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema.array(), new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema ]).optional(),
  cursor: new_customer_data_after_bk_from_lccWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ New_customer_data_after_bk_from_lccScalarFieldEnumSchema, New_customer_data_after_bk_from_lccScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccAggregateArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccAggregateArgs> = z.object({
  where: new_customer_data_after_bk_from_lccWhereInputSchema.optional(), 
  orderBy: z.union([ new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema.array(), new_customer_data_after_bk_from_lccOrderByWithRelationInputSchema ]).optional(),
  cursor: new_customer_data_after_bk_from_lccWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const new_customer_data_after_bk_from_lccGroupByArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccGroupByArgs> = z.object({
  where: new_customer_data_after_bk_from_lccWhereInputSchema.optional(), 
  orderBy: z.union([ new_customer_data_after_bk_from_lccOrderByWithAggregationInputSchema.array(), new_customer_data_after_bk_from_lccOrderByWithAggregationInputSchema ]).optional(),
  by: New_customer_data_after_bk_from_lccScalarFieldEnumSchema.array(), 
  having: new_customer_data_after_bk_from_lccScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const new_customer_data_after_bk_from_lccFindUniqueArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccFindUniqueArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  where: new_customer_data_after_bk_from_lccWhereUniqueInputSchema, 
}).strict();

export const new_customer_data_after_bk_from_lccFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccFindUniqueOrThrowArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  where: new_customer_data_after_bk_from_lccWhereUniqueInputSchema, 
}).strict();

export const old_order_data_500k_ordersFindFirstArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersFindFirstArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  where: old_order_data_500k_ordersWhereInputSchema.optional(), 
  orderBy: z.union([ old_order_data_500k_ordersOrderByWithRelationInputSchema.array(), old_order_data_500k_ordersOrderByWithRelationInputSchema ]).optional(),
  cursor: old_order_data_500k_ordersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Old_order_data_500k_ordersScalarFieldEnumSchema, Old_order_data_500k_ordersScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const old_order_data_500k_ordersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersFindFirstOrThrowArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  where: old_order_data_500k_ordersWhereInputSchema.optional(), 
  orderBy: z.union([ old_order_data_500k_ordersOrderByWithRelationInputSchema.array(), old_order_data_500k_ordersOrderByWithRelationInputSchema ]).optional(),
  cursor: old_order_data_500k_ordersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Old_order_data_500k_ordersScalarFieldEnumSchema, Old_order_data_500k_ordersScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const old_order_data_500k_ordersFindManyArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersFindManyArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  where: old_order_data_500k_ordersWhereInputSchema.optional(), 
  orderBy: z.union([ old_order_data_500k_ordersOrderByWithRelationInputSchema.array(), old_order_data_500k_ordersOrderByWithRelationInputSchema ]).optional(),
  cursor: old_order_data_500k_ordersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Old_order_data_500k_ordersScalarFieldEnumSchema, Old_order_data_500k_ordersScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const old_order_data_500k_ordersAggregateArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersAggregateArgs> = z.object({
  where: old_order_data_500k_ordersWhereInputSchema.optional(), 
  orderBy: z.union([ old_order_data_500k_ordersOrderByWithRelationInputSchema.array(), old_order_data_500k_ordersOrderByWithRelationInputSchema ]).optional(),
  cursor: old_order_data_500k_ordersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const old_order_data_500k_ordersGroupByArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersGroupByArgs> = z.object({
  where: old_order_data_500k_ordersWhereInputSchema.optional(), 
  orderBy: z.union([ old_order_data_500k_ordersOrderByWithAggregationInputSchema.array(), old_order_data_500k_ordersOrderByWithAggregationInputSchema ]).optional(),
  by: Old_order_data_500k_ordersScalarFieldEnumSchema.array(), 
  having: old_order_data_500k_ordersScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const old_order_data_500k_ordersFindUniqueArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersFindUniqueArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  where: old_order_data_500k_ordersWhereUniqueInputSchema, 
}).strict();

export const old_order_data_500k_ordersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersFindUniqueOrThrowArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  where: old_order_data_500k_ordersWhereUniqueInputSchema, 
}).strict();

export const order_listFindFirstArgsSchema: z.ZodType<Prisma.order_listFindFirstArgs> = z.object({
  select: order_listSelectSchema.optional(),
  where: order_listWhereInputSchema.optional(), 
  orderBy: z.union([ order_listOrderByWithRelationInputSchema.array(), order_listOrderByWithRelationInputSchema ]).optional(),
  cursor: order_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Order_listScalarFieldEnumSchema, Order_listScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const order_listFindFirstOrThrowArgsSchema: z.ZodType<Prisma.order_listFindFirstOrThrowArgs> = z.object({
  select: order_listSelectSchema.optional(),
  where: order_listWhereInputSchema.optional(), 
  orderBy: z.union([ order_listOrderByWithRelationInputSchema.array(), order_listOrderByWithRelationInputSchema ]).optional(),
  cursor: order_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Order_listScalarFieldEnumSchema, Order_listScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const order_listFindManyArgsSchema: z.ZodType<Prisma.order_listFindManyArgs> = z.object({
  select: order_listSelectSchema.optional(),
  where: order_listWhereInputSchema.optional(), 
  orderBy: z.union([ order_listOrderByWithRelationInputSchema.array(), order_listOrderByWithRelationInputSchema ]).optional(),
  cursor: order_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Order_listScalarFieldEnumSchema, Order_listScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const order_listAggregateArgsSchema: z.ZodType<Prisma.order_listAggregateArgs> = z.object({
  where: order_listWhereInputSchema.optional(), 
  orderBy: z.union([ order_listOrderByWithRelationInputSchema.array(), order_listOrderByWithRelationInputSchema ]).optional(),
  cursor: order_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const order_listGroupByArgsSchema: z.ZodType<Prisma.order_listGroupByArgs> = z.object({
  where: order_listWhereInputSchema.optional(), 
  orderBy: z.union([ order_listOrderByWithAggregationInputSchema.array(), order_listOrderByWithAggregationInputSchema ]).optional(),
  by: Order_listScalarFieldEnumSchema.array(), 
  having: order_listScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const order_listFindUniqueArgsSchema: z.ZodType<Prisma.order_listFindUniqueArgs> = z.object({
  select: order_listSelectSchema.optional(),
  where: order_listWhereUniqueInputSchema, 
}).strict();

export const order_listFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.order_listFindUniqueOrThrowArgs> = z.object({
  select: order_listSelectSchema.optional(),
  where: order_listWhereUniqueInputSchema, 
}).strict();

export const user_listFindFirstArgsSchema: z.ZodType<Prisma.user_listFindFirstArgs> = z.object({
  select: user_listSelectSchema.optional(),
  where: user_listWhereInputSchema.optional(), 
  orderBy: z.union([ user_listOrderByWithRelationInputSchema.array(), user_listOrderByWithRelationInputSchema ]).optional(),
  cursor: user_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ User_listScalarFieldEnumSchema, User_listScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const user_listFindFirstOrThrowArgsSchema: z.ZodType<Prisma.user_listFindFirstOrThrowArgs> = z.object({
  select: user_listSelectSchema.optional(),
  where: user_listWhereInputSchema.optional(), 
  orderBy: z.union([ user_listOrderByWithRelationInputSchema.array(), user_listOrderByWithRelationInputSchema ]).optional(),
  cursor: user_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ User_listScalarFieldEnumSchema, User_listScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const user_listFindManyArgsSchema: z.ZodType<Prisma.user_listFindManyArgs> = z.object({
  select: user_listSelectSchema.optional(),
  where: user_listWhereInputSchema.optional(), 
  orderBy: z.union([ user_listOrderByWithRelationInputSchema.array(), user_listOrderByWithRelationInputSchema ]).optional(),
  cursor: user_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ User_listScalarFieldEnumSchema, User_listScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const user_listAggregateArgsSchema: z.ZodType<Prisma.user_listAggregateArgs> = z.object({
  where: user_listWhereInputSchema.optional(), 
  orderBy: z.union([ user_listOrderByWithRelationInputSchema.array(), user_listOrderByWithRelationInputSchema ]).optional(),
  cursor: user_listWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const user_listGroupByArgsSchema: z.ZodType<Prisma.user_listGroupByArgs> = z.object({
  where: user_listWhereInputSchema.optional(), 
  orderBy: z.union([ user_listOrderByWithAggregationInputSchema.array(), user_listOrderByWithAggregationInputSchema ]).optional(),
  by: User_listScalarFieldEnumSchema.array(), 
  having: user_listScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const user_listFindUniqueArgsSchema: z.ZodType<Prisma.user_listFindUniqueArgs> = z.object({
  select: user_listSelectSchema.optional(),
  where: user_listWhereUniqueInputSchema, 
}).strict();

export const user_listFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.user_listFindUniqueOrThrowArgs> = z.object({
  select: user_listSelectSchema.optional(),
  where: user_listWhereUniqueInputSchema, 
}).strict();

export const usersFindFirstArgsSchema: z.ZodType<Prisma.usersFindFirstArgs> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereInputSchema.optional(), 
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(), usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const usersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.usersFindFirstOrThrowArgs> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereInputSchema.optional(), 
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(), usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const usersFindManyArgsSchema: z.ZodType<Prisma.usersFindManyArgs> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereInputSchema.optional(), 
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(), usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema, UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const usersAggregateArgsSchema: z.ZodType<Prisma.usersAggregateArgs> = z.object({
  where: usersWhereInputSchema.optional(), 
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(), usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const usersGroupByArgsSchema: z.ZodType<Prisma.usersGroupByArgs> = z.object({
  where: usersWhereInputSchema.optional(), 
  orderBy: z.union([ usersOrderByWithAggregationInputSchema.array(), usersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(), 
  having: usersScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const usersFindUniqueArgsSchema: z.ZodType<Prisma.usersFindUniqueArgs> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema, 
}).strict();

export const usersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.usersFindUniqueOrThrowArgs> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema, 
}).strict();

export const order_lockFindFirstArgsSchema: z.ZodType<Prisma.order_lockFindFirstArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  where: order_lockWhereInputSchema.optional(), 
  orderBy: z.union([ order_lockOrderByWithRelationInputSchema.array(), order_lockOrderByWithRelationInputSchema ]).optional(),
  cursor: order_lockWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Order_lockScalarFieldEnumSchema, Order_lockScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const order_lockFindFirstOrThrowArgsSchema: z.ZodType<Prisma.order_lockFindFirstOrThrowArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  where: order_lockWhereInputSchema.optional(), 
  orderBy: z.union([ order_lockOrderByWithRelationInputSchema.array(), order_lockOrderByWithRelationInputSchema ]).optional(),
  cursor: order_lockWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Order_lockScalarFieldEnumSchema, Order_lockScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const order_lockFindManyArgsSchema: z.ZodType<Prisma.order_lockFindManyArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  where: order_lockWhereInputSchema.optional(), 
  orderBy: z.union([ order_lockOrderByWithRelationInputSchema.array(), order_lockOrderByWithRelationInputSchema ]).optional(),
  cursor: order_lockWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Order_lockScalarFieldEnumSchema, Order_lockScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const order_lockAggregateArgsSchema: z.ZodType<Prisma.order_lockAggregateArgs> = z.object({
  where: order_lockWhereInputSchema.optional(), 
  orderBy: z.union([ order_lockOrderByWithRelationInputSchema.array(), order_lockOrderByWithRelationInputSchema ]).optional(),
  cursor: order_lockWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const order_lockGroupByArgsSchema: z.ZodType<Prisma.order_lockGroupByArgs> = z.object({
  where: order_lockWhereInputSchema.optional(), 
  orderBy: z.union([ order_lockOrderByWithAggregationInputSchema.array(), order_lockOrderByWithAggregationInputSchema ]).optional(),
  by: Order_lockScalarFieldEnumSchema.array(), 
  having: order_lockScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const order_lockFindUniqueArgsSchema: z.ZodType<Prisma.order_lockFindUniqueArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  where: order_lockWhereUniqueInputSchema, 
}).strict();

export const order_lockFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.order_lockFindUniqueOrThrowArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  where: order_lockWhereUniqueInputSchema, 
}).strict();

export const v3_audit_logFindFirstArgsSchema: z.ZodType<Prisma.v3_audit_logFindFirstArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  where: v3_audit_logWhereInputSchema.optional(), 
  orderBy: z.union([ v3_audit_logOrderByWithRelationInputSchema.array(), v3_audit_logOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_audit_logWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_audit_logScalarFieldEnumSchema, V3_audit_logScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_audit_logFindFirstOrThrowArgsSchema: z.ZodType<Prisma.v3_audit_logFindFirstOrThrowArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  where: v3_audit_logWhereInputSchema.optional(), 
  orderBy: z.union([ v3_audit_logOrderByWithRelationInputSchema.array(), v3_audit_logOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_audit_logWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_audit_logScalarFieldEnumSchema, V3_audit_logScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_audit_logFindManyArgsSchema: z.ZodType<Prisma.v3_audit_logFindManyArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  where: v3_audit_logWhereInputSchema.optional(), 
  orderBy: z.union([ v3_audit_logOrderByWithRelationInputSchema.array(), v3_audit_logOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_audit_logWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_audit_logScalarFieldEnumSchema, V3_audit_logScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_audit_logAggregateArgsSchema: z.ZodType<Prisma.v3_audit_logAggregateArgs> = z.object({
  where: v3_audit_logWhereInputSchema.optional(), 
  orderBy: z.union([ v3_audit_logOrderByWithRelationInputSchema.array(), v3_audit_logOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_audit_logWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_audit_logGroupByArgsSchema: z.ZodType<Prisma.v3_audit_logGroupByArgs> = z.object({
  where: v3_audit_logWhereInputSchema.optional(), 
  orderBy: z.union([ v3_audit_logOrderByWithAggregationInputSchema.array(), v3_audit_logOrderByWithAggregationInputSchema ]).optional(),
  by: V3_audit_logScalarFieldEnumSchema.array(), 
  having: v3_audit_logScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_audit_logFindUniqueArgsSchema: z.ZodType<Prisma.v3_audit_logFindUniqueArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  where: v3_audit_logWhereUniqueInputSchema, 
}).strict();

export const v3_audit_logFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.v3_audit_logFindUniqueOrThrowArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  where: v3_audit_logWhereUniqueInputSchema, 
}).strict();

export const v3_offerFindFirstArgsSchema: z.ZodType<Prisma.v3_offerFindFirstArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  where: v3_offerWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offerOrderByWithRelationInputSchema.array(), v3_offerOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_offerScalarFieldEnumSchema, V3_offerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_offerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.v3_offerFindFirstOrThrowArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  where: v3_offerWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offerOrderByWithRelationInputSchema.array(), v3_offerOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_offerScalarFieldEnumSchema, V3_offerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_offerFindManyArgsSchema: z.ZodType<Prisma.v3_offerFindManyArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  where: v3_offerWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offerOrderByWithRelationInputSchema.array(), v3_offerOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_offerScalarFieldEnumSchema, V3_offerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_offerAggregateArgsSchema: z.ZodType<Prisma.v3_offerAggregateArgs> = z.object({
  where: v3_offerWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offerOrderByWithRelationInputSchema.array(), v3_offerOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_offerGroupByArgsSchema: z.ZodType<Prisma.v3_offerGroupByArgs> = z.object({
  where: v3_offerWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offerOrderByWithAggregationInputSchema.array(), v3_offerOrderByWithAggregationInputSchema ]).optional(),
  by: V3_offerScalarFieldEnumSchema.array(), 
  having: v3_offerScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_offerFindUniqueArgsSchema: z.ZodType<Prisma.v3_offerFindUniqueArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  where: v3_offerWhereUniqueInputSchema, 
}).strict();

export const v3_offerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.v3_offerFindUniqueOrThrowArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  where: v3_offerWhereUniqueInputSchema, 
}).strict();

export const v3_offer_manifestFindFirstArgsSchema: z.ZodType<Prisma.v3_offer_manifestFindFirstArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  where: v3_offer_manifestWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offer_manifestOrderByWithRelationInputSchema.array(), v3_offer_manifestOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offer_manifestWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_offer_manifestScalarFieldEnumSchema, V3_offer_manifestScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_offer_manifestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.v3_offer_manifestFindFirstOrThrowArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  where: v3_offer_manifestWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offer_manifestOrderByWithRelationInputSchema.array(), v3_offer_manifestOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offer_manifestWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_offer_manifestScalarFieldEnumSchema, V3_offer_manifestScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_offer_manifestFindManyArgsSchema: z.ZodType<Prisma.v3_offer_manifestFindManyArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  where: v3_offer_manifestWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offer_manifestOrderByWithRelationInputSchema.array(), v3_offer_manifestOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offer_manifestWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_offer_manifestScalarFieldEnumSchema, V3_offer_manifestScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_offer_manifestAggregateArgsSchema: z.ZodType<Prisma.v3_offer_manifestAggregateArgs> = z.object({
  where: v3_offer_manifestWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offer_manifestOrderByWithRelationInputSchema.array(), v3_offer_manifestOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_offer_manifestWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_offer_manifestGroupByArgsSchema: z.ZodType<Prisma.v3_offer_manifestGroupByArgs> = z.object({
  where: v3_offer_manifestWhereInputSchema.optional(), 
  orderBy: z.union([ v3_offer_manifestOrderByWithAggregationInputSchema.array(), v3_offer_manifestOrderByWithAggregationInputSchema ]).optional(),
  by: V3_offer_manifestScalarFieldEnumSchema.array(), 
  having: v3_offer_manifestScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_offer_manifestFindUniqueArgsSchema: z.ZodType<Prisma.v3_offer_manifestFindUniqueArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  where: v3_offer_manifestWhereUniqueInputSchema, 
}).strict();

export const v3_offer_manifestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.v3_offer_manifestFindUniqueOrThrowArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  where: v3_offer_manifestWhereUniqueInputSchema, 
}).strict();

export const v3_order_to_variantFindFirstArgsSchema: z.ZodType<Prisma.v3_order_to_variantFindFirstArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  where: v3_order_to_variantWhereInputSchema.optional(), 
  orderBy: z.union([ v3_order_to_variantOrderByWithRelationInputSchema.array(), v3_order_to_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_order_to_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_order_to_variantScalarFieldEnumSchema, V3_order_to_variantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_order_to_variantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.v3_order_to_variantFindFirstOrThrowArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  where: v3_order_to_variantWhereInputSchema.optional(), 
  orderBy: z.union([ v3_order_to_variantOrderByWithRelationInputSchema.array(), v3_order_to_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_order_to_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_order_to_variantScalarFieldEnumSchema, V3_order_to_variantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_order_to_variantFindManyArgsSchema: z.ZodType<Prisma.v3_order_to_variantFindManyArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  where: v3_order_to_variantWhereInputSchema.optional(), 
  orderBy: z.union([ v3_order_to_variantOrderByWithRelationInputSchema.array(), v3_order_to_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_order_to_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ V3_order_to_variantScalarFieldEnumSchema, V3_order_to_variantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const v3_order_to_variantAggregateArgsSchema: z.ZodType<Prisma.v3_order_to_variantAggregateArgs> = z.object({
  where: v3_order_to_variantWhereInputSchema.optional(), 
  orderBy: z.union([ v3_order_to_variantOrderByWithRelationInputSchema.array(), v3_order_to_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: v3_order_to_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_order_to_variantGroupByArgsSchema: z.ZodType<Prisma.v3_order_to_variantGroupByArgs> = z.object({
  where: v3_order_to_variantWhereInputSchema.optional(), 
  orderBy: z.union([ v3_order_to_variantOrderByWithAggregationInputSchema.array(), v3_order_to_variantOrderByWithAggregationInputSchema ]).optional(),
  by: V3_order_to_variantScalarFieldEnumSchema.array(), 
  having: v3_order_to_variantScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const v3_order_to_variantFindUniqueArgsSchema: z.ZodType<Prisma.v3_order_to_variantFindUniqueArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  where: v3_order_to_variantWhereUniqueInputSchema, 
}).strict();

export const v3_order_to_variantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.v3_order_to_variantFindUniqueOrThrowArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  where: v3_order_to_variantWhereUniqueInputSchema, 
}).strict();

export const inventoryFindFirstArgsSchema: z.ZodType<Prisma.inventoryFindFirstArgs> = z.object({
  select: inventorySelectSchema.optional(),
  where: inventoryWhereInputSchema.optional(), 
  orderBy: z.union([ inventoryOrderByWithRelationInputSchema.array(), inventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: inventoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventoryScalarFieldEnumSchema, InventoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const inventoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.inventoryFindFirstOrThrowArgs> = z.object({
  select: inventorySelectSchema.optional(),
  where: inventoryWhereInputSchema.optional(), 
  orderBy: z.union([ inventoryOrderByWithRelationInputSchema.array(), inventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: inventoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventoryScalarFieldEnumSchema, InventoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const inventoryFindManyArgsSchema: z.ZodType<Prisma.inventoryFindManyArgs> = z.object({
  select: inventorySelectSchema.optional(),
  where: inventoryWhereInputSchema.optional(), 
  orderBy: z.union([ inventoryOrderByWithRelationInputSchema.array(), inventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: inventoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventoryScalarFieldEnumSchema, InventoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const inventoryAggregateArgsSchema: z.ZodType<Prisma.inventoryAggregateArgs> = z.object({
  where: inventoryWhereInputSchema.optional(), 
  orderBy: z.union([ inventoryOrderByWithRelationInputSchema.array(), inventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: inventoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const inventoryGroupByArgsSchema: z.ZodType<Prisma.inventoryGroupByArgs> = z.object({
  where: inventoryWhereInputSchema.optional(), 
  orderBy: z.union([ inventoryOrderByWithAggregationInputSchema.array(), inventoryOrderByWithAggregationInputSchema ]).optional(),
  by: InventoryScalarFieldEnumSchema.array(), 
  having: inventoryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const inventoryFindUniqueArgsSchema: z.ZodType<Prisma.inventoryFindUniqueArgs> = z.object({
  select: inventorySelectSchema.optional(),
  where: inventoryWhereUniqueInputSchema, 
}).strict();

export const inventoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.inventoryFindUniqueOrThrowArgs> = z.object({
  select: inventorySelectSchema.optional(),
  where: inventoryWhereUniqueInputSchema, 
}).strict();

export const computed_buyer_varietalsFindFirstArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsFindFirstArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  where: computed_buyer_varietalsWhereInputSchema.optional(), 
  orderBy: z.union([ computed_buyer_varietalsOrderByWithRelationInputSchema.array(), computed_buyer_varietalsOrderByWithRelationInputSchema ]).optional(),
  cursor: computed_buyer_varietalsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Computed_buyer_varietalsScalarFieldEnumSchema, Computed_buyer_varietalsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const computed_buyer_varietalsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsFindFirstOrThrowArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  where: computed_buyer_varietalsWhereInputSchema.optional(), 
  orderBy: z.union([ computed_buyer_varietalsOrderByWithRelationInputSchema.array(), computed_buyer_varietalsOrderByWithRelationInputSchema ]).optional(),
  cursor: computed_buyer_varietalsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Computed_buyer_varietalsScalarFieldEnumSchema, Computed_buyer_varietalsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const computed_buyer_varietalsFindManyArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsFindManyArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  where: computed_buyer_varietalsWhereInputSchema.optional(), 
  orderBy: z.union([ computed_buyer_varietalsOrderByWithRelationInputSchema.array(), computed_buyer_varietalsOrderByWithRelationInputSchema ]).optional(),
  cursor: computed_buyer_varietalsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Computed_buyer_varietalsScalarFieldEnumSchema, Computed_buyer_varietalsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const computed_buyer_varietalsAggregateArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsAggregateArgs> = z.object({
  where: computed_buyer_varietalsWhereInputSchema.optional(), 
  orderBy: z.union([ computed_buyer_varietalsOrderByWithRelationInputSchema.array(), computed_buyer_varietalsOrderByWithRelationInputSchema ]).optional(),
  cursor: computed_buyer_varietalsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const computed_buyer_varietalsGroupByArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsGroupByArgs> = z.object({
  where: computed_buyer_varietalsWhereInputSchema.optional(), 
  orderBy: z.union([ computed_buyer_varietalsOrderByWithAggregationInputSchema.array(), computed_buyer_varietalsOrderByWithAggregationInputSchema ]).optional(),
  by: Computed_buyer_varietalsScalarFieldEnumSchema.array(), 
  having: computed_buyer_varietalsScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const computed_buyer_varietalsFindUniqueArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsFindUniqueArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  where: computed_buyer_varietalsWhereUniqueInputSchema, 
}).strict();

export const computed_buyer_varietalsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsFindUniqueOrThrowArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  where: computed_buyer_varietalsWhereUniqueInputSchema, 
}).strict();

export const member_list_export_2023_07_06FindFirstArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06FindFirstArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  where: member_list_export_2023_07_06WhereInputSchema.optional(), 
  orderBy: z.union([ member_list_export_2023_07_06OrderByWithRelationInputSchema.array(), member_list_export_2023_07_06OrderByWithRelationInputSchema ]).optional(),
  cursor: member_list_export_2023_07_06WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Member_list_export_2023_07_06ScalarFieldEnumSchema, Member_list_export_2023_07_06ScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const member_list_export_2023_07_06FindFirstOrThrowArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06FindFirstOrThrowArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  where: member_list_export_2023_07_06WhereInputSchema.optional(), 
  orderBy: z.union([ member_list_export_2023_07_06OrderByWithRelationInputSchema.array(), member_list_export_2023_07_06OrderByWithRelationInputSchema ]).optional(),
  cursor: member_list_export_2023_07_06WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Member_list_export_2023_07_06ScalarFieldEnumSchema, Member_list_export_2023_07_06ScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const member_list_export_2023_07_06FindManyArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06FindManyArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  where: member_list_export_2023_07_06WhereInputSchema.optional(), 
  orderBy: z.union([ member_list_export_2023_07_06OrderByWithRelationInputSchema.array(), member_list_export_2023_07_06OrderByWithRelationInputSchema ]).optional(),
  cursor: member_list_export_2023_07_06WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Member_list_export_2023_07_06ScalarFieldEnumSchema, Member_list_export_2023_07_06ScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const member_list_export_2023_07_06AggregateArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06AggregateArgs> = z.object({
  where: member_list_export_2023_07_06WhereInputSchema.optional(), 
  orderBy: z.union([ member_list_export_2023_07_06OrderByWithRelationInputSchema.array(), member_list_export_2023_07_06OrderByWithRelationInputSchema ]).optional(),
  cursor: member_list_export_2023_07_06WhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const member_list_export_2023_07_06GroupByArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06GroupByArgs> = z.object({
  where: member_list_export_2023_07_06WhereInputSchema.optional(), 
  orderBy: z.union([ member_list_export_2023_07_06OrderByWithAggregationInputSchema.array(), member_list_export_2023_07_06OrderByWithAggregationInputSchema ]).optional(),
  by: Member_list_export_2023_07_06ScalarFieldEnumSchema.array(), 
  having: member_list_export_2023_07_06ScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const member_list_export_2023_07_06FindUniqueArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06FindUniqueArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  where: member_list_export_2023_07_06WhereUniqueInputSchema, 
}).strict();

export const member_list_export_2023_07_06FindUniqueOrThrowArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06FindUniqueOrThrowArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  where: member_list_export_2023_07_06WhereUniqueInputSchema, 
}).strict();

export const shopify_product_variantFindFirstArgsSchema: z.ZodType<Prisma.shopify_product_variantFindFirstArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  where: shopify_product_variantWhereInputSchema.optional(), 
  orderBy: z.union([ shopify_product_variantOrderByWithRelationInputSchema.array(), shopify_product_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: shopify_product_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Shopify_product_variantScalarFieldEnumSchema, Shopify_product_variantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const shopify_product_variantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.shopify_product_variantFindFirstOrThrowArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  where: shopify_product_variantWhereInputSchema.optional(), 
  orderBy: z.union([ shopify_product_variantOrderByWithRelationInputSchema.array(), shopify_product_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: shopify_product_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Shopify_product_variantScalarFieldEnumSchema, Shopify_product_variantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const shopify_product_variantFindManyArgsSchema: z.ZodType<Prisma.shopify_product_variantFindManyArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  where: shopify_product_variantWhereInputSchema.optional(), 
  orderBy: z.union([ shopify_product_variantOrderByWithRelationInputSchema.array(), shopify_product_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: shopify_product_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Shopify_product_variantScalarFieldEnumSchema, Shopify_product_variantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const shopify_product_variantAggregateArgsSchema: z.ZodType<Prisma.shopify_product_variantAggregateArgs> = z.object({
  where: shopify_product_variantWhereInputSchema.optional(), 
  orderBy: z.union([ shopify_product_variantOrderByWithRelationInputSchema.array(), shopify_product_variantOrderByWithRelationInputSchema ]).optional(),
  cursor: shopify_product_variantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const shopify_product_variantGroupByArgsSchema: z.ZodType<Prisma.shopify_product_variantGroupByArgs> = z.object({
  where: shopify_product_variantWhereInputSchema.optional(), 
  orderBy: z.union([ shopify_product_variantOrderByWithAggregationInputSchema.array(), shopify_product_variantOrderByWithAggregationInputSchema ]).optional(),
  by: Shopify_product_variantScalarFieldEnumSchema.array(), 
  having: shopify_product_variantScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const shopify_product_variantFindUniqueArgsSchema: z.ZodType<Prisma.shopify_product_variantFindUniqueArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  where: shopify_product_variantWhereUniqueInputSchema, 
}).strict();

export const shopify_product_variantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.shopify_product_variantFindUniqueOrThrowArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  where: shopify_product_variantWhereUniqueInputSchema, 
}).strict();

export const customer_list_july_2023CreateArgsSchema: z.ZodType<Prisma.customer_list_july_2023CreateArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  data: z.union([ customer_list_july_2023CreateInputSchema, customer_list_july_2023UncheckedCreateInputSchema ]),
}).strict();

export const customer_list_july_2023UpsertArgsSchema: z.ZodType<Prisma.customer_list_july_2023UpsertArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  where: customer_list_july_2023WhereUniqueInputSchema, 
  create: z.union([ customer_list_july_2023CreateInputSchema, customer_list_july_2023UncheckedCreateInputSchema ]),
  update: z.union([ customer_list_july_2023UpdateInputSchema, customer_list_july_2023UncheckedUpdateInputSchema ]),
}).strict();

export const customer_list_july_2023CreateManyArgsSchema: z.ZodType<Prisma.customer_list_july_2023CreateManyArgs> = z.object({
  data: z.union([ customer_list_july_2023CreateManyInputSchema, customer_list_july_2023CreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const customer_list_july_2023DeleteArgsSchema: z.ZodType<Prisma.customer_list_july_2023DeleteArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  where: customer_list_july_2023WhereUniqueInputSchema, 
}).strict();

export const customer_list_july_2023UpdateArgsSchema: z.ZodType<Prisma.customer_list_july_2023UpdateArgs> = z.object({
  select: customer_list_july_2023SelectSchema.optional(),
  data: z.union([ customer_list_july_2023UpdateInputSchema, customer_list_july_2023UncheckedUpdateInputSchema ]),
  where: customer_list_july_2023WhereUniqueInputSchema, 
}).strict();

export const customer_list_july_2023UpdateManyArgsSchema: z.ZodType<Prisma.customer_list_july_2023UpdateManyArgs> = z.object({
  data: z.union([ customer_list_july_2023UpdateManyMutationInputSchema, customer_list_july_2023UncheckedUpdateManyInputSchema ]),
  where: customer_list_july_2023WhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const customer_list_july_2023DeleteManyArgsSchema: z.ZodType<Prisma.customer_list_july_2023DeleteManyArgs> = z.object({
  where: customer_list_july_2023WhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const item_detailCreateArgsSchema: z.ZodType<Prisma.item_detailCreateArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  data: z.union([ item_detailCreateInputSchema, item_detailUncheckedCreateInputSchema ]),
}).strict();

export const item_detailUpsertArgsSchema: z.ZodType<Prisma.item_detailUpsertArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  where: item_detailWhereUniqueInputSchema, 
  create: z.union([ item_detailCreateInputSchema, item_detailUncheckedCreateInputSchema ]),
  update: z.union([ item_detailUpdateInputSchema, item_detailUncheckedUpdateInputSchema ]),
}).strict();

export const item_detailCreateManyArgsSchema: z.ZodType<Prisma.item_detailCreateManyArgs> = z.object({
  data: z.union([ item_detailCreateManyInputSchema, item_detailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const item_detailDeleteArgsSchema: z.ZodType<Prisma.item_detailDeleteArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  where: item_detailWhereUniqueInputSchema, 
}).strict();

export const item_detailUpdateArgsSchema: z.ZodType<Prisma.item_detailUpdateArgs> = z.object({
  select: item_detailSelectSchema.optional(),
  data: z.union([ item_detailUpdateInputSchema, item_detailUncheckedUpdateInputSchema ]),
  where: item_detailWhereUniqueInputSchema, 
}).strict();

export const item_detailUpdateManyArgsSchema: z.ZodType<Prisma.item_detailUpdateManyArgs> = z.object({
  data: z.union([ item_detailUpdateManyMutationInputSchema, item_detailUncheckedUpdateManyInputSchema ]),
  where: item_detailWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const item_detailDeleteManyArgsSchema: z.ZodType<Prisma.item_detailDeleteManyArgs> = z.object({
  where: item_detailWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const item_skuCreateArgsSchema: z.ZodType<Prisma.item_skuCreateArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  data: z.union([ item_skuCreateInputSchema, item_skuUncheckedCreateInputSchema ]),
}).strict();

export const item_skuUpsertArgsSchema: z.ZodType<Prisma.item_skuUpsertArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  where: item_skuWhereUniqueInputSchema, 
  create: z.union([ item_skuCreateInputSchema, item_skuUncheckedCreateInputSchema ]),
  update: z.union([ item_skuUpdateInputSchema, item_skuUncheckedUpdateInputSchema ]),
}).strict();

export const item_skuCreateManyArgsSchema: z.ZodType<Prisma.item_skuCreateManyArgs> = z.object({
  data: z.union([ item_skuCreateManyInputSchema, item_skuCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const item_skuDeleteArgsSchema: z.ZodType<Prisma.item_skuDeleteArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  where: item_skuWhereUniqueInputSchema, 
}).strict();

export const item_skuUpdateArgsSchema: z.ZodType<Prisma.item_skuUpdateArgs> = z.object({
  select: item_skuSelectSchema.optional(),
  data: z.union([ item_skuUpdateInputSchema, item_skuUncheckedUpdateInputSchema ]),
  where: item_skuWhereUniqueInputSchema, 
}).strict();

export const item_skuUpdateManyArgsSchema: z.ZodType<Prisma.item_skuUpdateManyArgs> = z.object({
  data: z.union([ item_skuUpdateManyMutationInputSchema, item_skuUncheckedUpdateManyInputSchema ]),
  where: item_skuWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const item_skuDeleteManyArgsSchema: z.ZodType<Prisma.item_skuDeleteManyArgs> = z.object({
  where: item_skuWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const new_customer_data_after_bk_from_lccCreateArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccCreateArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  data: z.union([ new_customer_data_after_bk_from_lccCreateInputSchema, new_customer_data_after_bk_from_lccUncheckedCreateInputSchema ]).optional(),
}).strict();

export const new_customer_data_after_bk_from_lccUpsertArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUpsertArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  where: new_customer_data_after_bk_from_lccWhereUniqueInputSchema, 
  create: z.union([ new_customer_data_after_bk_from_lccCreateInputSchema, new_customer_data_after_bk_from_lccUncheckedCreateInputSchema ]),
  update: z.union([ new_customer_data_after_bk_from_lccUpdateInputSchema, new_customer_data_after_bk_from_lccUncheckedUpdateInputSchema ]),
}).strict();

export const new_customer_data_after_bk_from_lccCreateManyArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccCreateManyArgs> = z.object({
  data: z.union([ new_customer_data_after_bk_from_lccCreateManyInputSchema, new_customer_data_after_bk_from_lccCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const new_customer_data_after_bk_from_lccDeleteArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccDeleteArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  where: new_customer_data_after_bk_from_lccWhereUniqueInputSchema, 
}).strict();

export const new_customer_data_after_bk_from_lccUpdateArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUpdateArgs> = z.object({
  select: new_customer_data_after_bk_from_lccSelectSchema.optional(),
  data: z.union([ new_customer_data_after_bk_from_lccUpdateInputSchema, new_customer_data_after_bk_from_lccUncheckedUpdateInputSchema ]),
  where: new_customer_data_after_bk_from_lccWhereUniqueInputSchema, 
}).strict();

export const new_customer_data_after_bk_from_lccUpdateManyArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccUpdateManyArgs> = z.object({
  data: z.union([ new_customer_data_after_bk_from_lccUpdateManyMutationInputSchema, new_customer_data_after_bk_from_lccUncheckedUpdateManyInputSchema ]),
  where: new_customer_data_after_bk_from_lccWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const new_customer_data_after_bk_from_lccDeleteManyArgsSchema: z.ZodType<Prisma.new_customer_data_after_bk_from_lccDeleteManyArgs> = z.object({
  where: new_customer_data_after_bk_from_lccWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const old_order_data_500k_ordersCreateArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersCreateArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  data: z.union([ old_order_data_500k_ordersCreateInputSchema, old_order_data_500k_ordersUncheckedCreateInputSchema ]),
}).strict();

export const old_order_data_500k_ordersUpsertArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersUpsertArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  where: old_order_data_500k_ordersWhereUniqueInputSchema, 
  create: z.union([ old_order_data_500k_ordersCreateInputSchema, old_order_data_500k_ordersUncheckedCreateInputSchema ]),
  update: z.union([ old_order_data_500k_ordersUpdateInputSchema, old_order_data_500k_ordersUncheckedUpdateInputSchema ]),
}).strict();

export const old_order_data_500k_ordersCreateManyArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersCreateManyArgs> = z.object({
  data: z.union([ old_order_data_500k_ordersCreateManyInputSchema, old_order_data_500k_ordersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const old_order_data_500k_ordersDeleteArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersDeleteArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  where: old_order_data_500k_ordersWhereUniqueInputSchema, 
}).strict();

export const old_order_data_500k_ordersUpdateArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersUpdateArgs> = z.object({
  select: old_order_data_500k_ordersSelectSchema.optional(),
  data: z.union([ old_order_data_500k_ordersUpdateInputSchema, old_order_data_500k_ordersUncheckedUpdateInputSchema ]),
  where: old_order_data_500k_ordersWhereUniqueInputSchema, 
}).strict();

export const old_order_data_500k_ordersUpdateManyArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersUpdateManyArgs> = z.object({
  data: z.union([ old_order_data_500k_ordersUpdateManyMutationInputSchema, old_order_data_500k_ordersUncheckedUpdateManyInputSchema ]),
  where: old_order_data_500k_ordersWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const old_order_data_500k_ordersDeleteManyArgsSchema: z.ZodType<Prisma.old_order_data_500k_ordersDeleteManyArgs> = z.object({
  where: old_order_data_500k_ordersWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const order_listCreateArgsSchema: z.ZodType<Prisma.order_listCreateArgs> = z.object({
  select: order_listSelectSchema.optional(),
  data: z.union([ order_listCreateInputSchema, order_listUncheckedCreateInputSchema ]),
}).strict();

export const order_listUpsertArgsSchema: z.ZodType<Prisma.order_listUpsertArgs> = z.object({
  select: order_listSelectSchema.optional(),
  where: order_listWhereUniqueInputSchema, 
  create: z.union([ order_listCreateInputSchema, order_listUncheckedCreateInputSchema ]),
  update: z.union([ order_listUpdateInputSchema, order_listUncheckedUpdateInputSchema ]),
}).strict();

export const order_listCreateManyArgsSchema: z.ZodType<Prisma.order_listCreateManyArgs> = z.object({
  data: z.union([ order_listCreateManyInputSchema, order_listCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const order_listDeleteArgsSchema: z.ZodType<Prisma.order_listDeleteArgs> = z.object({
  select: order_listSelectSchema.optional(),
  where: order_listWhereUniqueInputSchema, 
}).strict();

export const order_listUpdateArgsSchema: z.ZodType<Prisma.order_listUpdateArgs> = z.object({
  select: order_listSelectSchema.optional(),
  data: z.union([ order_listUpdateInputSchema, order_listUncheckedUpdateInputSchema ]),
  where: order_listWhereUniqueInputSchema, 
}).strict();

export const order_listUpdateManyArgsSchema: z.ZodType<Prisma.order_listUpdateManyArgs> = z.object({
  data: z.union([ order_listUpdateManyMutationInputSchema, order_listUncheckedUpdateManyInputSchema ]),
  where: order_listWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const order_listDeleteManyArgsSchema: z.ZodType<Prisma.order_listDeleteManyArgs> = z.object({
  where: order_listWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const user_listCreateArgsSchema: z.ZodType<Prisma.user_listCreateArgs> = z.object({
  select: user_listSelectSchema.optional(),
  data: z.union([ user_listCreateInputSchema, user_listUncheckedCreateInputSchema ]),
}).strict();

export const user_listUpsertArgsSchema: z.ZodType<Prisma.user_listUpsertArgs> = z.object({
  select: user_listSelectSchema.optional(),
  where: user_listWhereUniqueInputSchema, 
  create: z.union([ user_listCreateInputSchema, user_listUncheckedCreateInputSchema ]),
  update: z.union([ user_listUpdateInputSchema, user_listUncheckedUpdateInputSchema ]),
}).strict();

export const user_listCreateManyArgsSchema: z.ZodType<Prisma.user_listCreateManyArgs> = z.object({
  data: z.union([ user_listCreateManyInputSchema, user_listCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const user_listDeleteArgsSchema: z.ZodType<Prisma.user_listDeleteArgs> = z.object({
  select: user_listSelectSchema.optional(),
  where: user_listWhereUniqueInputSchema, 
}).strict();

export const user_listUpdateArgsSchema: z.ZodType<Prisma.user_listUpdateArgs> = z.object({
  select: user_listSelectSchema.optional(),
  data: z.union([ user_listUpdateInputSchema, user_listUncheckedUpdateInputSchema ]),
  where: user_listWhereUniqueInputSchema, 
}).strict();

export const user_listUpdateManyArgsSchema: z.ZodType<Prisma.user_listUpdateManyArgs> = z.object({
  data: z.union([ user_listUpdateManyMutationInputSchema, user_listUncheckedUpdateManyInputSchema ]),
  where: user_listWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const user_listDeleteManyArgsSchema: z.ZodType<Prisma.user_listDeleteManyArgs> = z.object({
  where: user_listWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const usersCreateArgsSchema: z.ZodType<Prisma.usersCreateArgs> = z.object({
  select: usersSelectSchema.optional(),
  data: z.union([ usersCreateInputSchema, usersUncheckedCreateInputSchema ]),
}).strict();

export const usersUpsertArgsSchema: z.ZodType<Prisma.usersUpsertArgs> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema, 
  create: z.union([ usersCreateInputSchema, usersUncheckedCreateInputSchema ]),
  update: z.union([ usersUpdateInputSchema, usersUncheckedUpdateInputSchema ]),
}).strict();

export const usersCreateManyArgsSchema: z.ZodType<Prisma.usersCreateManyArgs> = z.object({
  data: z.union([ usersCreateManyInputSchema, usersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const usersDeleteArgsSchema: z.ZodType<Prisma.usersDeleteArgs> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema, 
}).strict();

export const usersUpdateArgsSchema: z.ZodType<Prisma.usersUpdateArgs> = z.object({
  select: usersSelectSchema.optional(),
  data: z.union([ usersUpdateInputSchema, usersUncheckedUpdateInputSchema ]),
  where: usersWhereUniqueInputSchema, 
}).strict();

export const usersUpdateManyArgsSchema: z.ZodType<Prisma.usersUpdateManyArgs> = z.object({
  data: z.union([ usersUpdateManyMutationInputSchema, usersUncheckedUpdateManyInputSchema ]),
  where: usersWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const usersDeleteManyArgsSchema: z.ZodType<Prisma.usersDeleteManyArgs> = z.object({
  where: usersWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const order_lockCreateArgsSchema: z.ZodType<Prisma.order_lockCreateArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  data: z.union([ order_lockCreateInputSchema, order_lockUncheckedCreateInputSchema ]),
}).strict();

export const order_lockUpsertArgsSchema: z.ZodType<Prisma.order_lockUpsertArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  where: order_lockWhereUniqueInputSchema, 
  create: z.union([ order_lockCreateInputSchema, order_lockUncheckedCreateInputSchema ]),
  update: z.union([ order_lockUpdateInputSchema, order_lockUncheckedUpdateInputSchema ]),
}).strict();

export const order_lockCreateManyArgsSchema: z.ZodType<Prisma.order_lockCreateManyArgs> = z.object({
  data: z.union([ order_lockCreateManyInputSchema, order_lockCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const order_lockDeleteArgsSchema: z.ZodType<Prisma.order_lockDeleteArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  where: order_lockWhereUniqueInputSchema, 
}).strict();

export const order_lockUpdateArgsSchema: z.ZodType<Prisma.order_lockUpdateArgs> = z.object({
  select: order_lockSelectSchema.optional(),
  data: z.union([ order_lockUpdateInputSchema, order_lockUncheckedUpdateInputSchema ]),
  where: order_lockWhereUniqueInputSchema, 
}).strict();

export const order_lockUpdateManyArgsSchema: z.ZodType<Prisma.order_lockUpdateManyArgs> = z.object({
  data: z.union([ order_lockUpdateManyMutationInputSchema, order_lockUncheckedUpdateManyInputSchema ]),
  where: order_lockWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const order_lockDeleteManyArgsSchema: z.ZodType<Prisma.order_lockDeleteManyArgs> = z.object({
  where: order_lockWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_audit_logCreateArgsSchema: z.ZodType<Prisma.v3_audit_logCreateArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  data: z.union([ v3_audit_logCreateInputSchema, v3_audit_logUncheckedCreateInputSchema ]),
}).strict();

export const v3_audit_logUpsertArgsSchema: z.ZodType<Prisma.v3_audit_logUpsertArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  where: v3_audit_logWhereUniqueInputSchema, 
  create: z.union([ v3_audit_logCreateInputSchema, v3_audit_logUncheckedCreateInputSchema ]),
  update: z.union([ v3_audit_logUpdateInputSchema, v3_audit_logUncheckedUpdateInputSchema ]),
}).strict();

export const v3_audit_logCreateManyArgsSchema: z.ZodType<Prisma.v3_audit_logCreateManyArgs> = z.object({
  data: z.union([ v3_audit_logCreateManyInputSchema, v3_audit_logCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const v3_audit_logDeleteArgsSchema: z.ZodType<Prisma.v3_audit_logDeleteArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  where: v3_audit_logWhereUniqueInputSchema, 
}).strict();

export const v3_audit_logUpdateArgsSchema: z.ZodType<Prisma.v3_audit_logUpdateArgs> = z.object({
  select: v3_audit_logSelectSchema.optional(),
  data: z.union([ v3_audit_logUpdateInputSchema, v3_audit_logUncheckedUpdateInputSchema ]),
  where: v3_audit_logWhereUniqueInputSchema, 
}).strict();

export const v3_audit_logUpdateManyArgsSchema: z.ZodType<Prisma.v3_audit_logUpdateManyArgs> = z.object({
  data: z.union([ v3_audit_logUpdateManyMutationInputSchema, v3_audit_logUncheckedUpdateManyInputSchema ]),
  where: v3_audit_logWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_audit_logDeleteManyArgsSchema: z.ZodType<Prisma.v3_audit_logDeleteManyArgs> = z.object({
  where: v3_audit_logWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_offerCreateArgsSchema: z.ZodType<Prisma.v3_offerCreateArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  data: z.union([ v3_offerCreateInputSchema, v3_offerUncheckedCreateInputSchema ]),
}).strict();

export const v3_offerUpsertArgsSchema: z.ZodType<Prisma.v3_offerUpsertArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  where: v3_offerWhereUniqueInputSchema, 
  create: z.union([ v3_offerCreateInputSchema, v3_offerUncheckedCreateInputSchema ]),
  update: z.union([ v3_offerUpdateInputSchema, v3_offerUncheckedUpdateInputSchema ]),
}).strict();

export const v3_offerCreateManyArgsSchema: z.ZodType<Prisma.v3_offerCreateManyArgs> = z.object({
  data: z.union([ v3_offerCreateManyInputSchema, v3_offerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const v3_offerDeleteArgsSchema: z.ZodType<Prisma.v3_offerDeleteArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  where: v3_offerWhereUniqueInputSchema, 
}).strict();

export const v3_offerUpdateArgsSchema: z.ZodType<Prisma.v3_offerUpdateArgs> = z.object({
  select: v3_offerSelectSchema.optional(),
  data: z.union([ v3_offerUpdateInputSchema, v3_offerUncheckedUpdateInputSchema ]),
  where: v3_offerWhereUniqueInputSchema, 
}).strict();

export const v3_offerUpdateManyArgsSchema: z.ZodType<Prisma.v3_offerUpdateManyArgs> = z.object({
  data: z.union([ v3_offerUpdateManyMutationInputSchema, v3_offerUncheckedUpdateManyInputSchema ]),
  where: v3_offerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_offerDeleteManyArgsSchema: z.ZodType<Prisma.v3_offerDeleteManyArgs> = z.object({
  where: v3_offerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_offer_manifestCreateArgsSchema: z.ZodType<Prisma.v3_offer_manifestCreateArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  data: z.union([ v3_offer_manifestCreateInputSchema, v3_offer_manifestUncheckedCreateInputSchema ]),
}).strict();

export const v3_offer_manifestUpsertArgsSchema: z.ZodType<Prisma.v3_offer_manifestUpsertArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  where: v3_offer_manifestWhereUniqueInputSchema, 
  create: z.union([ v3_offer_manifestCreateInputSchema, v3_offer_manifestUncheckedCreateInputSchema ]),
  update: z.union([ v3_offer_manifestUpdateInputSchema, v3_offer_manifestUncheckedUpdateInputSchema ]),
}).strict();

export const v3_offer_manifestCreateManyArgsSchema: z.ZodType<Prisma.v3_offer_manifestCreateManyArgs> = z.object({
  data: z.union([ v3_offer_manifestCreateManyInputSchema, v3_offer_manifestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const v3_offer_manifestDeleteArgsSchema: z.ZodType<Prisma.v3_offer_manifestDeleteArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  where: v3_offer_manifestWhereUniqueInputSchema, 
}).strict();

export const v3_offer_manifestUpdateArgsSchema: z.ZodType<Prisma.v3_offer_manifestUpdateArgs> = z.object({
  select: v3_offer_manifestSelectSchema.optional(),
  data: z.union([ v3_offer_manifestUpdateInputSchema, v3_offer_manifestUncheckedUpdateInputSchema ]),
  where: v3_offer_manifestWhereUniqueInputSchema, 
}).strict();

export const v3_offer_manifestUpdateManyArgsSchema: z.ZodType<Prisma.v3_offer_manifestUpdateManyArgs> = z.object({
  data: z.union([ v3_offer_manifestUpdateManyMutationInputSchema, v3_offer_manifestUncheckedUpdateManyInputSchema ]),
  where: v3_offer_manifestWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_offer_manifestDeleteManyArgsSchema: z.ZodType<Prisma.v3_offer_manifestDeleteManyArgs> = z.object({
  where: v3_offer_manifestWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_order_to_variantCreateArgsSchema: z.ZodType<Prisma.v3_order_to_variantCreateArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  data: z.union([ v3_order_to_variantCreateInputSchema, v3_order_to_variantUncheckedCreateInputSchema ]),
}).strict();

export const v3_order_to_variantUpsertArgsSchema: z.ZodType<Prisma.v3_order_to_variantUpsertArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  where: v3_order_to_variantWhereUniqueInputSchema, 
  create: z.union([ v3_order_to_variantCreateInputSchema, v3_order_to_variantUncheckedCreateInputSchema ]),
  update: z.union([ v3_order_to_variantUpdateInputSchema, v3_order_to_variantUncheckedUpdateInputSchema ]),
}).strict();

export const v3_order_to_variantCreateManyArgsSchema: z.ZodType<Prisma.v3_order_to_variantCreateManyArgs> = z.object({
  data: z.union([ v3_order_to_variantCreateManyInputSchema, v3_order_to_variantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const v3_order_to_variantDeleteArgsSchema: z.ZodType<Prisma.v3_order_to_variantDeleteArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  where: v3_order_to_variantWhereUniqueInputSchema, 
}).strict();

export const v3_order_to_variantUpdateArgsSchema: z.ZodType<Prisma.v3_order_to_variantUpdateArgs> = z.object({
  select: v3_order_to_variantSelectSchema.optional(),
  data: z.union([ v3_order_to_variantUpdateInputSchema, v3_order_to_variantUncheckedUpdateInputSchema ]),
  where: v3_order_to_variantWhereUniqueInputSchema, 
}).strict();

export const v3_order_to_variantUpdateManyArgsSchema: z.ZodType<Prisma.v3_order_to_variantUpdateManyArgs> = z.object({
  data: z.union([ v3_order_to_variantUpdateManyMutationInputSchema, v3_order_to_variantUncheckedUpdateManyInputSchema ]),
  where: v3_order_to_variantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const v3_order_to_variantDeleteManyArgsSchema: z.ZodType<Prisma.v3_order_to_variantDeleteManyArgs> = z.object({
  where: v3_order_to_variantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const inventoryCreateArgsSchema: z.ZodType<Prisma.inventoryCreateArgs> = z.object({
  select: inventorySelectSchema.optional(),
  data: z.union([ inventoryCreateInputSchema, inventoryUncheckedCreateInputSchema ]),
}).strict();

export const inventoryUpsertArgsSchema: z.ZodType<Prisma.inventoryUpsertArgs> = z.object({
  select: inventorySelectSchema.optional(),
  where: inventoryWhereUniqueInputSchema, 
  create: z.union([ inventoryCreateInputSchema, inventoryUncheckedCreateInputSchema ]),
  update: z.union([ inventoryUpdateInputSchema, inventoryUncheckedUpdateInputSchema ]),
}).strict();

export const inventoryCreateManyArgsSchema: z.ZodType<Prisma.inventoryCreateManyArgs> = z.object({
  data: z.union([ inventoryCreateManyInputSchema, inventoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const inventoryDeleteArgsSchema: z.ZodType<Prisma.inventoryDeleteArgs> = z.object({
  select: inventorySelectSchema.optional(),
  where: inventoryWhereUniqueInputSchema, 
}).strict();

export const inventoryUpdateArgsSchema: z.ZodType<Prisma.inventoryUpdateArgs> = z.object({
  select: inventorySelectSchema.optional(),
  data: z.union([ inventoryUpdateInputSchema, inventoryUncheckedUpdateInputSchema ]),
  where: inventoryWhereUniqueInputSchema, 
}).strict();

export const inventoryUpdateManyArgsSchema: z.ZodType<Prisma.inventoryUpdateManyArgs> = z.object({
  data: z.union([ inventoryUpdateManyMutationInputSchema, inventoryUncheckedUpdateManyInputSchema ]),
  where: inventoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const inventoryDeleteManyArgsSchema: z.ZodType<Prisma.inventoryDeleteManyArgs> = z.object({
  where: inventoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const computed_buyer_varietalsCreateArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsCreateArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  data: z.union([ computed_buyer_varietalsCreateInputSchema, computed_buyer_varietalsUncheckedCreateInputSchema ]),
}).strict();

export const computed_buyer_varietalsUpsertArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsUpsertArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  where: computed_buyer_varietalsWhereUniqueInputSchema, 
  create: z.union([ computed_buyer_varietalsCreateInputSchema, computed_buyer_varietalsUncheckedCreateInputSchema ]),
  update: z.union([ computed_buyer_varietalsUpdateInputSchema, computed_buyer_varietalsUncheckedUpdateInputSchema ]),
}).strict();

export const computed_buyer_varietalsCreateManyArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsCreateManyArgs> = z.object({
  data: z.union([ computed_buyer_varietalsCreateManyInputSchema, computed_buyer_varietalsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const computed_buyer_varietalsDeleteArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsDeleteArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  where: computed_buyer_varietalsWhereUniqueInputSchema, 
}).strict();

export const computed_buyer_varietalsUpdateArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsUpdateArgs> = z.object({
  select: computed_buyer_varietalsSelectSchema.optional(),
  data: z.union([ computed_buyer_varietalsUpdateInputSchema, computed_buyer_varietalsUncheckedUpdateInputSchema ]),
  where: computed_buyer_varietalsWhereUniqueInputSchema, 
}).strict();

export const computed_buyer_varietalsUpdateManyArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsUpdateManyArgs> = z.object({
  data: z.union([ computed_buyer_varietalsUpdateManyMutationInputSchema, computed_buyer_varietalsUncheckedUpdateManyInputSchema ]),
  where: computed_buyer_varietalsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const computed_buyer_varietalsDeleteManyArgsSchema: z.ZodType<Prisma.computed_buyer_varietalsDeleteManyArgs> = z.object({
  where: computed_buyer_varietalsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const member_list_export_2023_07_06CreateArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06CreateArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  data: z.union([ member_list_export_2023_07_06CreateInputSchema, member_list_export_2023_07_06UncheckedCreateInputSchema ]),
}).strict();

export const member_list_export_2023_07_06UpsertArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06UpsertArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  where: member_list_export_2023_07_06WhereUniqueInputSchema, 
  create: z.union([ member_list_export_2023_07_06CreateInputSchema, member_list_export_2023_07_06UncheckedCreateInputSchema ]),
  update: z.union([ member_list_export_2023_07_06UpdateInputSchema, member_list_export_2023_07_06UncheckedUpdateInputSchema ]),
}).strict();

export const member_list_export_2023_07_06CreateManyArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06CreateManyArgs> = z.object({
  data: z.union([ member_list_export_2023_07_06CreateManyInputSchema, member_list_export_2023_07_06CreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const member_list_export_2023_07_06DeleteArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06DeleteArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  where: member_list_export_2023_07_06WhereUniqueInputSchema, 
}).strict();

export const member_list_export_2023_07_06UpdateArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06UpdateArgs> = z.object({
  select: member_list_export_2023_07_06SelectSchema.optional(),
  data: z.union([ member_list_export_2023_07_06UpdateInputSchema, member_list_export_2023_07_06UncheckedUpdateInputSchema ]),
  where: member_list_export_2023_07_06WhereUniqueInputSchema, 
}).strict();

export const member_list_export_2023_07_06UpdateManyArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06UpdateManyArgs> = z.object({
  data: z.union([ member_list_export_2023_07_06UpdateManyMutationInputSchema, member_list_export_2023_07_06UncheckedUpdateManyInputSchema ]),
  where: member_list_export_2023_07_06WhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const member_list_export_2023_07_06DeleteManyArgsSchema: z.ZodType<Prisma.member_list_export_2023_07_06DeleteManyArgs> = z.object({
  where: member_list_export_2023_07_06WhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const shopify_product_variantCreateArgsSchema: z.ZodType<Prisma.shopify_product_variantCreateArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  data: z.union([ shopify_product_variantCreateInputSchema, shopify_product_variantUncheckedCreateInputSchema ]),
}).strict();

export const shopify_product_variantUpsertArgsSchema: z.ZodType<Prisma.shopify_product_variantUpsertArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  where: shopify_product_variantWhereUniqueInputSchema, 
  create: z.union([ shopify_product_variantCreateInputSchema, shopify_product_variantUncheckedCreateInputSchema ]),
  update: z.union([ shopify_product_variantUpdateInputSchema, shopify_product_variantUncheckedUpdateInputSchema ]),
}).strict();

export const shopify_product_variantCreateManyArgsSchema: z.ZodType<Prisma.shopify_product_variantCreateManyArgs> = z.object({
  data: z.union([ shopify_product_variantCreateManyInputSchema, shopify_product_variantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const shopify_product_variantDeleteArgsSchema: z.ZodType<Prisma.shopify_product_variantDeleteArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  where: shopify_product_variantWhereUniqueInputSchema, 
}).strict();

export const shopify_product_variantUpdateArgsSchema: z.ZodType<Prisma.shopify_product_variantUpdateArgs> = z.object({
  select: shopify_product_variantSelectSchema.optional(),
  data: z.union([ shopify_product_variantUpdateInputSchema, shopify_product_variantUncheckedUpdateInputSchema ]),
  where: shopify_product_variantWhereUniqueInputSchema, 
}).strict();

export const shopify_product_variantUpdateManyArgsSchema: z.ZodType<Prisma.shopify_product_variantUpdateManyArgs> = z.object({
  data: z.union([ shopify_product_variantUpdateManyMutationInputSchema, shopify_product_variantUncheckedUpdateManyInputSchema ]),
  where: shopify_product_variantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const shopify_product_variantDeleteManyArgsSchema: z.ZodType<Prisma.shopify_product_variantDeleteManyArgs> = z.object({
  where: shopify_product_variantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();