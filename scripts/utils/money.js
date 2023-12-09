
export function formatCurrency(priceCents) {
     var priceDollar = (priceCents / 100).toFixed(2);
     return priceDollar;
}
