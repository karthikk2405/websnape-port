export type Category = 'Starters' | 'Main Course' | 'Burgers' | 'Pizza' | 'Drinks' | 'Desserts';

export interface CustomizationOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isVeg: boolean;
  available: boolean;
  image: string;
  customizations?: {
    size?: CustomizationOption[];
    extras?: CustomizationOption[];
  };
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: CustomizationOption;
  selectedExtras?: CustomizationOption[];
  itemPrice: number;
}

export type OrderStatus = 'NEW' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'SERVED';

export interface Order {
  id: number;
  tableNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  customerNote?: string;
  estimatedMinutes?: number;
}

export interface TableInfo {
  tableNumber: string;
  qrCodeId: string;
  isActive: boolean;
  currentOrderId?: number;
  guestCount?: number;
  seats: number;
}

export type DemoView = 'customer' | 'kitchen' | 'tracker' | 'dashboard' | 'tables';
export type DashboardTab = 'overview' | 'tables' | 'menu' | 'analytics' | 'settings';
