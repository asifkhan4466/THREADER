export const deliverySteps = [
  {
    id: 'order-placed',
    step: 1,
    title: 'Order Placed',
    shortDescription: 'Your order has been received.',
    fullDescription: 'Your selected products, sizes, colours, delivery details, and payment method have been received successfully.',
    icon: 'ShoppingBag',
  },
  {
    id: 'processing',
    step: 2,
    title: 'Processing',
    shortDescription: 'Your order details are being verified.',
    fullDescription: 'Our team verifies your selected products, sizes, colours, payment details, and availability before carefully preparing your order.',
    icon: 'PackageCheck',
  },
  {
    id: 'shipped',
    step: 3,
    title: 'Shipped',
    shortDescription: 'Your parcel is on its way.',
    fullDescription: 'Your order has been securely packed and handed to our delivery partner for safe transportation to your provided address.',
    icon: 'Truck',
  },
  {
    id: 'delivered',
    step: 4,
    title: 'Delivered',
    shortDescription: 'Your THREADER order has arrived.',
    fullDescription: 'Your order reaches your provided address. Please inspect the package and contact customer support if you require assistance.',
    icon: 'BadgeCheck',
  },
]
