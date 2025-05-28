import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  LayoutGrid,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  Settings,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  UserPlus,
  Activity,
} from "lucide-react";

const NordcomAdminDashboard = () => {
  const [activeRoute, setActiveRoute] = useState("analytics");

  // Sample data
  const orderStatusData = [
    { status: "PENDING", count: 12 },
    { status: "PAID", count: 30 },
    { status: "SHIPPED", count: 22 },
    { status: "CANCELLED", count: 5 },
    { status: "COMPLETED", count: 40 },
  ];

  const monthlySalesData = [
    { month: "Jan", revenue: 1500 },
    { month: "Feb", revenue: 2200 },
    { month: "Mar", revenue: 1800 },
    { month: "Apr", revenue: 3100 },
  ];

  const topProductsData = [
    { productName: "iPhone 14", quantitySold: 120 },
    { productName: "Samsung Galaxy S22", quantitySold: 90 },
    { productName: "Dell XPS 13", quantitySold: 75 },
  ];

  const categoryRevenueData = [
    { categoryName: "Smartphones", revenue: 8000 },
    { categoryName: "Laptops", revenue: 5600 },
    { categoryName: "Accessories", revenue: 2100 },
  ];

  const newUsersData = [
    { month: "Jan", users: 12 },
    { month: "Feb", users: 18 },
    { month: "Mar", users: 24 },
  ];

  const pieColors = ["#FF6B35", "#2E3A59", "#4ECDC4", "#45B7D1", "#96CEB4"];
  const barColor = "#FF6B35";

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "products", label: "Products", icon: Package },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm ${
                change.includes("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {change} from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const AnalyticsPage = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="109"
          icon={ShoppingCart}
          color="bg-blue-500"
          change="+12%"
        />
        <StatCard
          title="Total Revenue"
          value="$15,700"
          icon={DollarSign}
          color="bg-green-500"
          change="+8.2%"
        />
        <StatCard
          title="Products Sold"
          value="285"
          icon={ShoppingBag}
          color="bg-orange-500"
          change="+15%"
        />
        <StatCard
          title="New Users"
          value="54"
          icon={UserPlus}
          color="bg-purple-500"
          change="+33%"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Orders by Status
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) =>
                    `${status} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Sales Revenue */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Sales Revenue
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Bar dataKey="revenue" fill={barColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Selling Products
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Product Name
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Quantity Sold
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProductsData.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900">
                      {product.productName}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 font-medium">
                      {product.quantitySold}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue by Category
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryRevenueData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="categoryName" type="category" width={100} />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Bar dataKey="revenue" fill={barColor} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* New Users Over Time */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          New Users Over Time
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={newUsersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, "New Users"]} />
              <Line
                type="monotone"
                dataKey="users"
                stroke={barColor}
                strokeWidth={3}
                dot={{ fill: barColor, strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-900">
                <span className="text-orange-500">Nord</span>com
              </div>
              <span className="text-sm text-gray-500">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Welcome, Admin</div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 min-h-screen">
          <nav className="mt-8">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveRoute(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    activeRoute === item.id
                      ? "bg-orange-500 text-white border-r-4 border-orange-600"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {activeRoute}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeRoute === "analytics"
                ? "View your business analytics and insights"
                : `Manage your ${activeRoute}`}
            </p>
          </div>

          {activeRoute === "analytics" ? (
            <AnalyticsPage />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p>The {activeRoute} section is under development.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NordcomAdminDashboard;
