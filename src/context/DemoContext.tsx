import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Order, OrderItem, OrderStatus, TableInfo, DemoView, DashboardTab } from '../types';

const INITIAL_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Pistachio Oat Milk Latte',
    description: 'Double shot Ethiopian espresso, house pistachio cream, steamed organic oat milk.',
    price: 189,
    category: 'Drinks',
    isVeg: true,
    available: true,
    image: '/food/latte_art.jpg',
    customizations: {
      size: [
        { name: 'Regular 12oz', price: 0 },
        { name: 'Large 16oz', price: 40 }
      ],
      extras: [
        { name: 'Extra Shot Espresso', price: 40 },
        { name: 'Vanilla Bean Syrup', price: 30 }
      ]
    }
  },
  {
    id: 'm2',
    name: 'Avocado Sourdough Toast',
    description: 'Smashing Hass avocado, heirloom cherry tomatoes, soft poached egg, toasted sourdough.',
    price: 289,
    category: 'Starters',
    isVeg: true,
    available: true,
    image: '/food/avocado_toast.jpg',
    customizations: {
      extras: [
        { name: 'Extra Poached Egg', price: 35 },
        { name: 'Feta Cheese Crumbles', price: 45 }
      ]
    }
  },
  {
    id: 'm3',
    name: 'Smokey Chicken Panini',
    description: 'Free-range charred chicken, house truffle mayo, aged cheddar, toasted ciabatta.',
    price: 349,
    category: 'Burgers',
    isVeg: false,
    available: true,
    image: '/food/chicken_panini.jpg'
  },
  {
    id: 'm4',
    name: 'Truffle Parmesan Fries',
    description: 'Triple-cooked hand-cut potatoes, white truffle oil, grated parmesan, smoked paprika dip.',
    price: 179,
    category: 'Starters',
    isVeg: true,
    available: true,
    image: '/food/truffle_fries.jpg'
  },
  {
    id: 'm5',
    name: 'Nitro Iced Cold Brew',
    description: 'Single-origin beans infused with nitrogen for a velvet creamy cascade.',
    price: 159,
    category: 'Drinks',
    isVeg: true,
    available: true,
    image: '/food/cold_brew.jpg'
  },
  {
    id: 'm6',
    name: 'Flaky Almond Croissant',
    description: 'French butter croissant filled with almond frangipane, toasted flaked almonds.',
    price: 149,
    category: 'Desserts',
    isVeg: true,
    available: true,
    image: '/food/almond_croissant.jpg'
  }
];

const INITIAL_TABLES: TableInfo[] = Array.from({ length: 20 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    tableNumber: `Table ${num}`,
    qrCodeId: `QR-${100 + i + 1}`,
    isActive: i === 6 || i === 3 || i === 11,
    currentOrderId: i === 6 ? 1042 : i === 3 ? 1041 : undefined,
    seats: (i % 3 === 0) ? 6 : (i % 2 === 0) ? 4 : 2
  };
});

const INITIAL_ORDERS: Order[] = [
  {
    id: 1041,
    tableNumber: 'Table 04',
    items: [
      { id: 'item-1', menuItem: INITIAL_MENU[0], quantity: 2, itemPrice: 378 },
      { id: 'item-2', menuItem: INITIAL_MENU[5], quantity: 1, itemPrice: 149 }
    ],
    totalAmount: 527,
    status: 'READY',
    createdAt: '10 mins ago',
    estimatedMinutes: 0
  },
  {
    id: 1042,
    tableNumber: 'Table 07',
    items: [
      { id: 'item-3', menuItem: INITIAL_MENU[2], quantity: 2, itemPrice: 698 },
      { id: 'item-4', menuItem: INITIAL_MENU[3], quantity: 1, itemPrice: 179 },
      { id: 'item-5', menuItem: INITIAL_MENU[0], quantity: 2, itemPrice: 378 }
    ],
    totalAmount: 1255,
    status: 'PREPARING',
    createdAt: '4 mins ago',
    customerNote: 'Extra oat milk in latte please',
    estimatedMinutes: 6
  }
];

interface DemoContextType {
  menu: MenuItem[];
  toggleMenuItemAvailability: (id: string) => void;
  tables: TableInfo[];
  selectedTable: string;
  setSelectedTable: (tableNum: string) => void;
  cart: OrderItem[];
  addToCart: (menuItem: MenuItem, size?: any, extras?: any[]) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: (note?: string) => void;
  advanceOrderStatus: (orderId: number) => void;
  activeDemoView: DemoView;
  setActiveDemoView: (view: DemoView) => void;
  activeDashTab: DashboardTab;
  setActiveDashTab: (tab: DashboardTab) => void;
  notificationMessage: string | null;
  playNotificationSound: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [tables, setTables] = useState<TableInfo[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<string>('Table 07');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeDemoView, setActiveDemoView] = useState<DemoView>('customer');
  const [activeDashTab, setActiveDashTab] = useState<DashboardTab>('overview');
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const playNotificationSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch (e) {
      // Audio context standard fallback
    }
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenu(prev =>
      prev.map(item => (item.id === id ? { ...item, available: !item.available } : item))
    );
  };

  const addToCart = (menuItem: MenuItem, size?: any, extras?: any[]) => {
    let extraTotal = 0;
    if (size) extraTotal += size.price;
    if (extras) extras.forEach(e => extraTotal += e.price);
    const unitPrice = menuItem.price + extraTotal;

    setCart(prev => {
      const existingIx = prev.findIndex(
        i => i.menuItem.id === menuItem.id && i.selectedSize?.name === size?.name
      );
      if (existingIx > -1) {
        const copy = [...prev];
        copy[existingIx].quantity += 1;
        return copy;
      }
      return [
        ...prev,
        {
          id: 'cart-' + Date.now() + '-' + Math.random(),
          menuItem,
          quantity: 1,
          selectedSize: size,
          selectedExtras: extras,
          itemPrice: unitPrice
        }
      ];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (note?: string) => {
    if (cart.length === 0) return;

    const newId = 1040 + orders.length + 3;
    const totalAmount = cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);

    const newOrder: Order = {
      id: newId,
      tableNumber: selectedTable,
      items: [...cart],
      totalAmount,
      status: 'NEW',
      createdAt: 'Just now',
      customerNote: note,
      estimatedMinutes: 12
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);

    setTables(prev =>
      prev.map(t => (t.tableNumber === selectedTable ? { ...t, isActive: true, currentOrderId: newId } : t))
    );

    playNotificationSound();
    setNotificationMessage(`Order #${newId} sent to barista & kitchen!`);
    setTimeout(() => setNotificationMessage(null), 4500);
  };

  const advanceOrderStatus = (orderId: number) => {
    const statuses: OrderStatus[] = ['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'SERVED'];
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const currentIx = statuses.indexOf(order.status);
          const nextStatus = statuses[Math.min(currentIx + 1, statuses.length - 1)];
          playNotificationSound();
          setNotificationMessage(`Order #${orderId} updated to ${nextStatus}`);
          setTimeout(() => setNotificationMessage(null), 4000);
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  const activeOrder = orders.find(o => o.tableNumber === selectedTable && o.status !== 'SERVED') || orders[0] || null;

  return (
    <DemoContext.Provider
      value={{
        menu,
        toggleMenuItemAvailability,
        tables,
        selectedTable,
        setSelectedTable,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orders,
        activeOrder,
        placeOrder,
        advanceOrderStatus,
        activeDemoView,
        setActiveDemoView,
        activeDashTab,
        setActiveDashTab,
        notificationMessage,
        playNotificationSound
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
