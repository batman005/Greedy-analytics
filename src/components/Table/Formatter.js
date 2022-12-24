export const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    year: "numeric",
    month: "long",
});

export const RevenueFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

export const sepFormatter = new Intl.NumberFormat('en-US');