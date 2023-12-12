
export function formatCurrency(priceCents) {
     var priceDollar = (priceCents /*/ 100*/).toFixed(0);
     return priceDollar;
}
