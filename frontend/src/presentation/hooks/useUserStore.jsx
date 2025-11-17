import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create()(
  persist(
    (set) => ({
      user: {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        membershipLevel: "Gold",
        joinDate: "2023-06-15",
        totalSpent: 1250.50,
        totalOrders: 12,
        loyaltyPoints: 3500,
      },

      addresses: [
        {
          id: "addr-1",
          type: "shipping",
          name: "Home",
          fullName: "John Doe",
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
          isDefault: true,
        },
        {
          id: "addr-2",
          type: "billing",
          name: "Office",
          fullName: "John Doe",
          street: "456 Business Ave",
          city: "New York",
          state: "NY",
          zipCode: "10002",
          country: "United States",
          isDefault: false,
        },
      ],

      paymentMethods: [
        {
          id: "card-1",
          type: "credit_card",
          cardBrand: "Visa",
          last4: "4242",
          expiryMonth: 12,
          expiryYear: 2025,
          holderName: "John Doe",
          isDefault: true,
        },
        {
          id: "card-2",
          type: "credit_card",
          cardBrand: "Mastercard",
          last4: "5555",
          expiryMonth: 6,
          expiryYear: 2026,
          holderName: "John Doe",
          isDefault: false,
        },
      ],

      orders: [
        {
          id: "order-001",
          orderNumber: "ORD-2024-001",
          date: "2024-11-01",
          status: "delivered",
          total: 149.99,
          items: [
            { id: "1", name: "Premium Whey Protein", quantity: 2, price: 49.99 },
            { id: "2", name: "BCAA Energy Boost", quantity: 1, price: 34.99 },
          ],
          trackingNumber: "1Z999AA10123456784",
          estimatedDelivery: "2024-11-05",
        },
        {
          id: "order-002",
          orderNumber: "ORD-2024-002",
          date: "2024-10-28",
          status: "delivered",
          total: 89.97,
          items: [
            { id: "3", name: "Pre-Workout Formula", quantity: 2, price: 39.99 },
          ],
          trackingNumber: "1Z999AA10123456785",
          estimatedDelivery: "2024-11-01",
        },
        {
          id: "order-003",
          orderNumber: "ORD-2024-003",
          date: "2024-10-15",
          status: "processing",
          total: 199.95,
          items: [
            { id: "1", name: "Premium Whey Protein", quantity: 4, price: 49.99 },
          ],
          trackingNumber: null,
          estimatedDelivery: "2024-11-08",
        },
      ],

      subscriptions: [
        {
          id: "sub-1",
          name: "Monthly Protein Bundle",
          status: "active",
          billingCycle: "monthly",
          nextBillingDate: "2024-12-01",
          amount: 79.99,
          items: [
            { id: "1", name: "Premium Whey Protein", quantity: 2 },
            { id: "2", name: "BCAA Energy Boost", quantity: 1 },
          ],
        },
      ],

      notifications: {
        orderUpdates: true,
        promotions: true,
        newsletter: true,
        sms: false,
        emailNotifications: true,
      },

      updateProfile: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),

      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            { ...address, id: `addr-${Date.now()}` },
          ],
        })),

      updateAddress: (id, updates) =>
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...updates } : addr
          ),
        })),

      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        })),

      addPaymentMethod: (method) =>
        set((state) => ({
          paymentMethods: [
            ...state.paymentMethods,
            { ...method, id: `card-${Date.now()}` },
          ],
        })),

      deletePaymentMethod: (id) =>
        set((state) => ({
          paymentMethods: state.paymentMethods.filter((card) => card.id !== id),
        })),

      setDefaultPaymentMethod: (id) =>
        set((state) => ({
          paymentMethods: state.paymentMethods.map((card) => ({
            ...card,
            isDefault: card.id === id,
          })),
        })),

      updateNotifications: (updates) =>
        set((state) => ({
          notifications: { ...state.notifications, ...updates },
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
