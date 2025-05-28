import {
  BarChart3,
  LayoutGrid,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export const orderStatusData = [
  { status: "PENDING", count: 12 },
  { status: "PAID", count: 30 },
  { status: "SHIPPED", count: 22 },
  { status: "CANCELLED", count: 5 },
  { status: "COMPLETED", count: 40 },
];

export const monthlySalesData = [
  { month: "Jan", revenue: 1500 },
  { month: "Feb", revenue: 2200 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 3100 },
];

export const topProductsData = [
  { productName: "iPhone 14", quantitySold: 120 },
  { productName: "Samsung Galaxy S22", quantitySold: 90 },
  { productName: "Dell XPS 13", quantitySold: 75 },
];

export const categoryRevenueData = [
  { categoryName: "Smartphones", revenue: 8000 },
  { categoryName: "Laptops", revenue: 5600 },
  { categoryName: "Accessories", revenue: 2100 },
];

export const newUsersData = [
  { month: "Jan", users: 12 },
  { month: "Feb", users: 18 },
  { month: "Mar", users: 24 },
];

export const pieColors = [
  "#FF6B35",
  "#2E3A59",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
];
export const barColor = "#FF6B35";

export const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products", label: "Products", icon: Package },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];
