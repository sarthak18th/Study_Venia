import gql from "graphql-tag";
export const GET_CUPONS=gql`query GetCoupons($pageSize:Int=100$currentPage:Int=1)
{getCouponCodes(pageSize:$pageSize currentPage:$currentPage)
{total_count total_pages coupons
{coupon_name coupon_code description __typename}
__typename}
}
`