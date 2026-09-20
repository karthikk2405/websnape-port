import React, { useState } from 'react';
import { 
  Smartphone, 
  ChefHat, 
  LayoutDashboard, 
  QrCode, 
  Clock, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Sparkles, 
  X, 
  Volume2, 
  Printer, 
  UtensilsCrossed 
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { MenuItem, OrderStatus } from '../../types';

export const DemoLaboratorySection: React.FC = () => {
  const {
    menu,
    toggleMenuItemAvailability,
    tables,
    selectedTable,
    setSelectedTable,
    cart,
    addToCart,
    removeFromCart,
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
  } = useDemo();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customerNote, setCustomerNote] = useState('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<boolean[]>([]);
  const [showQrModal, setShowQrModal] = useState<string | null>(null);

  const categories: string[] = ['All', 'Drinks', 'Starters', 'Burgers', 'Desserts'];

  const filteredMenu = selectedCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === selectedCategory);

  const handleOpenCustomization = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedSizeIndex(0);
    setSelectedExtras(item.customizations?.extras ? new Array(item.customizations.extras.length).fill(false) : []);
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;
    const sizeObj = customizingItem.customizations?.size?.[selectedSizeIndex];
    const extrasObj = customizingItem.customizations?.extras?.filter((_, i) => selectedExtras[i]);
    addToCart(customizingItem, sizeObj, extrasObj);
    setCustomizingItem(null);
  };

  const handleQuickAdd = (item: MenuItem) => {
    if (item.customizations) {
      handleOpenCustomization(item);
    } else {
      addToCart(item);
    }
  };

  const totalCartPrice = cart.reduce((sum, i) => sum + i.itemPrice * i.quantity, 0);

  return (
    <section id="lab" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative">
      {/* Toast Notification Banner */}
      {notificationMessage && (
        <div className="fixed top-24 right-6 z-50 bg-white text-[#0A0A0C] font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#00F0FF] animate-bounce">
          <Sparkles className="w-4 h-4 text-[#00F0FF]" />
          <span>{notificationMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00F0FF] mb-2 block">
            INTERCONNECTED LIVE CAFÉ DEMO LABORATORY
          </span>
          <h2 className="rynd-title text-4xl sm:text-6xl text-white">
            See the order <span className="gradient-text">move live.</span>
          </h2>
        </div>
        <p className="text-[#8A8D93] max-w-md text-base leading-relaxed font-medium">
          Test the complete WebSnape engine. Place an order in the Customer App and watch it instantly chime on the Kitchen Screen and update Admin Analytics!
        </p>
      </div>

      {/* View Switcher Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#111114] p-2 rounded-2xl border border-white/10 shadow-sm">
        <button
          onClick={() => setActiveDemoView('customer')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'customer'
              ? 'bg-white text-[#0A0A0C] shadow-md'
              : 'text-[#A9B1BD] hover:text-white hover:bg-[#0A0A0C]'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>1. Customer QR App</span>
        </button>

        <button
          onClick={() => setActiveDemoView('kitchen')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'kitchen'
              ? 'bg-[#00F0FF] text-white shadow-md'
              : 'text-[#A9B1BD] hover:text-white hover:bg-[#0A0A0C]'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>2. Barista & Kitchen Screen ({orders.filter(o => o.status !== 'SERVED').length})</span>
        </button>

        <button
          onClick={() => setActiveDemoView('tracker')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'tracker'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-[#A9B1BD] hover:text-white hover:bg-[#0A0A0C]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>3. Guest Status Tracker</span>
        </button>

        <button
          onClick={() => setActiveDemoView('dashboard')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'dashboard'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-[#A9B1BD] hover:text-white hover:bg-[#0A0A0C]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>4. Admin Dashboard</span>
        </button>

        <button
          onClick={() => setActiveDemoView('tables')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'tables'
              ? 'bg-white text-[#0A0A0C] shadow-md'
              : 'text-[#A9B1BD] hover:text-white hover:bg-[#0A0A0C]'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>5. Table Floorplan</span>
        </button>
      </div>

      {/* DEMO VIEW CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* VIEW 1: CUSTOMER QR APP */}
        {activeDemoView === 'customer' && (
          <>
            {/* Left Menu Section */}
            <div className="lg:col-span-8 space-y-6">
              <div className="glass-panel p-6 bg-[#111114] border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[#00F0FF] font-bold">DIGITAL CAFÉ MENU PREVIEW</span>
                    <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                      <span>Ordering for</span>
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="bg-[#0A0A0C] text-white font-bold border border-white/10 rounded-lg px-3 py-1 focus:outline-none"
                      >
                        {tables.map((t) => (
                          <option key={t.tableNumber} value={t.tableNumber}>
                            {t.tableNumber} ({t.seats} seats)
                          </option>
                        ))}
                      </select>
                    </h3>
                  </div>

                  {/* Category Pill Filters */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                          selectedCategory === cat
                            ? 'bg-white text-[#0A0A0C]'
                            : 'bg-[#0A0A0C] text-[#A9B1BD] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu Item Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {filteredMenu.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        item.available
                          ? 'bg-white/5 border-white/10 hover:border-[#00F0FF]/40'
                          : 'bg-black/5 border-white/5 opacity-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-3 h-3 rounded-sm flex items-center justify-center border ${
                                item.isVeg ? 'border-emerald-500/50' : 'border-rose-500/50'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                                }`}
                              />
                            </span>
                            <h4 className="font-bold text-white text-base">{item.name}</h4>
                          </div>
                          <span className="font-extrabold text-[#00F0FF] text-sm">₹{item.price}</span>
                        </div>
                        <p className="text-xs text-[#8A8D93] line-clamp-2 mb-4 font-medium">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[11px] text-[#A9B1BD] font-semibold">{item.category}</span>
                        {item.available ? (
                          <button
                            onClick={() => handleQuickAdd(item)}
                            className="bg-white text-[#0A0A0C] font-bold text-xs px-3.5 py-1.5 rounded-lg hover:bg-[#00F0FF] transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            {item.customizations ? 'Customize' : 'Add'}
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-red-500">Sold Out</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Cart Section */}
            <div className="lg:col-span-4">
              <div className="glass-panel p-6 sticky top-28 bg-[#111114] border-white/10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#00F0FF]" />
                    <h3 className="font-bold text-white text-lg">Your Order</h3>
                  </div>
                  <span className="text-xs text-[#A9B1BD] font-bold">{cart.length} item(s)</span>
                </div>

                {/* Cart Items List */}
                <div className="py-4 space-y-3 max-h-[300px] overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-[#A9B1BD]">
                      <UtensilsCrossed className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#00F0FF]" />
                      <p className="text-xs font-bold text-white">Your order is empty.</p>
                      <p className="text-[11px] text-[#A9B1BD] mt-1">Select coffee & pastries to test ordering.</p>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <div
                        key={item.id}
                        className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-white text-xs">{item.menuItem.name}</p>
                          {item.selectedSize && (
                            <span className="text-[10px] text-[#00F0FF] block font-bold">{item.selectedSize.name}</span>
                          )}
                          {item.selectedExtras && item.selectedExtras.length > 0 && (
                            <span className="text-[10px] text-[#A9B1BD] block font-medium">
                              +{item.selectedExtras.map((e) => e.name).join(', ')}
                            </span>
                          )}
                          <span className="text-xs font-extrabold text-white mt-1 block">
                            ₹{item.itemPrice} × {item.quantity}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-rose-400 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Customer Note */}
                <div className="pt-3 border-t border-white/10 mb-4">
                  <label className="text-xs font-bold text-[#8A8D93] block mb-1">Barista Note (Optional):</label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="e.g. Oat milk / extra hot..."
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-black/40 focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                {/* Cart Total & Order Button */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8A8D93] font-medium">Subtotal ({selectedTable}):</span>
                    <span className="font-extrabold text-white text-lg">₹{totalCartPrice}</span>
                  </div>

                  <button
                    onClick={() => {
                      placeOrder(customerNote);
                      setCustomerNote('');
                    }}
                    disabled={cart.length === 0}
                    className="w-full bg-white text-[#0A0A0C] font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-[#00F0FF] disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                  >
                    <span>Place Order to Barista</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* VIEW 2: KITCHEN / BARISTA DISPLAY SCREEN */}
        {activeDemoView === 'kitchen' && (
          <div className="lg:col-span-12">
            <div className="glass-panel p-8 bg-[#111114] border-white/10">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#00F0FF] animate-ping" />
                  <div>
                    <h3 className="font-extrabold text-white text-2xl">Barista & Kitchen Display</h3>
                    <p className="text-xs text-[#8A8D93] font-medium">Live incoming digital tickets from QR tables</p>
                  </div>
                </div>
                <button
                  onClick={playNotificationSound}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#00F0FF] bg-[#0A0A0C] border border-white/10 px-3 py-1.5 rounded-lg hover:bg-[#E0DDD2]"
                >
                  <Volume2 className="w-4 h-4" />
                  Test Sound Chime
                </button>
              </div>

              {/* Kitchen Tickets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-[#A9B1BD]">
                    <ChefHat className="w-12 h-12 mx-auto mb-2 opacity-40 text-[#00F0FF]" />
                    <p className="text-base font-bold text-white">No active café orders</p>
                    <p className="text-xs mt-1">Switch to Customer QR App tab and place a test order!</p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const statusColors: Record<OrderStatus, string> = {
                      NEW: 'border-red-500/60 bg-rose-500/10 text-rose-400',
                      ACCEPTED: 'border-[#00F0FF]/60 bg-[#00F0FF]/10 text-[#00F0FF]',
                      PREPARING: 'border-[#D46A43]/60 bg-purple-500/10 text-purple-400',
                      READY: 'border-emerald-500/50/60 bg-emerald-500/10 text-emerald-400',
                      SERVED: 'border-white/10 bg-black/5 text-[#A9B1BD]'
                    };

                    return (
                      <div
                        key={order.id}
                        className={`p-6 rounded-2xl border ${statusColors[order.status]} transition-all flex flex-col justify-between min-h-[300px]`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                            <div>
                              <span className="text-xs font-mono font-bold text-[#A9B1BD]">ORDER #{order.id}</span>
                              <h4 className="text-xl font-extrabold text-white">{order.tableNumber}</h4>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold border uppercase">
                              {order.status}
                            </span>
                          </div>

                          {/* Items List */}
                          <div className="space-y-2 mb-4">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs text-white">
                                <span>
                                  <strong>{it.quantity}×</strong> {it.menuItem.name}
                                </span>
                                <span className="font-mono font-bold">₹{it.itemPrice * it.quantity}</span>
                              </div>
                            ))}
                          </div>

                          {order.customerNote && (
                            <div className="p-2.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-xs text-[#00F0FF] font-bold mb-4">
                              <strong>Note:</strong> {order.customerNote}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs text-[#A9B1BD] mb-3 pt-3 border-t border-white/10">
                            <span>Placed: {order.createdAt}</span>
                            <span className="font-extrabold text-white">Total: ₹{order.totalAmount}</span>
                          </div>

                          {order.status !== 'SERVED' ? (
                            <button
                              onClick={() => advanceOrderStatus(order.id)}
                              className="w-full bg-white text-[#0A0A0C] font-bold py-2.5 rounded-xl hover:bg-[#00F0FF] transition-colors text-xs flex items-center justify-center gap-1.5 shadow-md"
                            >
                              <span>Advance Status →</span>
                            </button>
                          ) : (
                            <span className="block text-center text-xs font-bold text-[#A9B1BD]">
                              Order Fully Served ✓
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: GUEST ORDER STATUS TRACKER */}
        {activeDemoView === 'tracker' && (
          <div className="lg:col-span-12">
            <div className="glass-panel p-8 max-w-3xl mx-auto bg-[#111114] border-white/10">
              <div className="text-center mb-8">
                <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase">
                  LIVE CAFÉ GUEST PROGRESS TRACKER
                </span>
                <h3 className="rynd-title text-3xl font-extrabold text-white mt-1">
                  Status for {selectedTable}
                </h3>
                <p className="text-xs text-[#8A8D93] mt-1 font-medium">
                  Updates in real-time as barista staff press buttons!
                </p>
              </div>

              {activeOrder ? (
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#A9B1BD] font-bold">ACTIVE ORDER</span>
                      <h4 className="text-2xl font-extrabold text-white">Order #{activeOrder.id}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#A9B1BD] font-bold">CURRENT STATUS</span>
                      <p className="text-lg font-extrabold text-[#00F0FF]">{activeOrder.status}</p>
                    </div>
                  </div>

                  {/* Progress Timeline Bar */}
                  <div className="relative pt-6">
                    <div className="h-2 bg.black/10 rounded-full overflow-hidden mb-8 bg-black/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#C87A4B] via-[#D46A43] to-[#4A6B5D] transition-all duration-500"
                        style={{
                          width:
                            activeOrder.status === 'NEW'
                              ? '20%'
                              : activeOrder.status === 'ACCEPTED'
                              ? '40%'
                              : activeOrder.status === 'PREPARING'
                              ? '65%'
                              : activeOrder.status === 'READY'
                              ? '88%'
                              : '100%'
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
                      <div className={activeOrder.status === 'NEW' ? 'text-[#00F0FF]' : 'text-[#A9B1BD]'}>
                        1. Sent
                      </div>
                      <div className={activeOrder.status === 'ACCEPTED' ? 'text-[#00F0FF]' : 'text-[#A9B1BD]'}>
                        2. Accepted
                      </div>
                      <div className={activeOrder.status === 'PREPARING' ? 'text-purple-400' : 'text-[#A9B1BD]'}>
                        3. Brewing
                      </div>
                      <div className={activeOrder.status === 'READY' ? 'text-emerald-500' : 'text-[#A9B1BD]'}>
                        4. Ready
                      </div>
                      <div className={activeOrder.status === 'SERVED' ? 'text-white' : 'text-[#A9B1BD]'}>
                        5. Served
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A8D93]">
                    <span>Items: {activeOrder.items.map(i => i.menuItem.name).join(', ')}</span>
                    <span className="font-extrabold text-white">₹{activeOrder.totalAmount}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#A9B1BD]">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#00F0FF]" />
                  <p className="text-base text-white font-bold">No active order for {selectedTable}</p>
                  <p className="text-xs mt-1">Place an order in Customer QR App view to test real-time tracking.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 4: ADMIN DASHBOARD */}
        {activeDemoView === 'dashboard' && (
          <div className="lg:col-span-12">
            <div className="glass-panel p-8 bg-[#111114] border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div>
                  <h3 className="font-extrabold text-white text-2xl">Café Operating System</h3>
                  <p className="text-xs text-[#8A8D93] font-medium">Real-time management dashboard</p>
                </div>

                {/* Dashboard Sub-tabs */}
                <div className="flex items-center gap-2 bg-[#0A0A0C] p-1 rounded-xl border border-white/10">
                  {(['overview', 'tables', 'menu', 'analytics', 'settings'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveDashTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        activeDashTab === tab ? 'bg-white text-[#0A0A0C]' : 'text-[#A9B1BD] hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* OVERVIEW TAB */}
              {activeDashTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-[#A9B1BD] block font-bold">Today's Orders</span>
                      <strong className="text-3xl font-extrabold text-white mt-1 block">
                        {124 + orders.length}
                      </strong>
                      <span className="text-[11px] text-emerald-500 font-bold mt-2 block">+14% vs yesterday</span>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-[#A9B1BD] block font-bold">Total Sales</span>
                      <strong className="text-3xl font-extrabold text-[#00F0FF] mt-1 block">
                        ₹{48620 + orders.reduce((sum, o) => sum + o.totalAmount, 0)}
                      </strong>
                      <span className="text-[11px] text-emerald-500 font-bold mt-2 block">Live QR revenue</span>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-[#A9B1BD] block font-bold">Active Occupied Tables</span>
                      <strong className="text-3xl font-extrabold text-purple-400 mt-1 block">
                        {tables.filter(t => t.isActive).length} / 20
                      </strong>
                      <span className="text-[11px] text-[#A9B1BD] mt-2 block font-medium">Real-time floor state</span>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-[#A9B1BD] block font-bold">Average Order Value</span>
                      <strong className="text-3xl font-extrabold text-white mt-1 block">₹412</strong>
                      <span className="text-[11px] text-emerald-500 font-bold mt-2 block">+₹20 vs last month</span>
                    </div>
                  </div>

                  {/* Revenue Bar Chart */}
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Peak Café Hours</span>
                      <span className="text-xs text-[#A9B1BD] font-medium">Peak brunch time: 10:00 - 13:00</span>
                    </div>
                    <div className="h-40 flex items-end gap-3 pt-4">
                      {[45, 60, 35, 80, 65, 95, 88, 72, 90, 100, 60].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-[#00F0FF] rounded-t hover:opacity-80 transition-opacity"
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[10px] text-[#A9B1BD] font-bold">{8 + i}:00</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MENU MANAGEMENT TAB */}
              {activeDashTab === 'menu' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2 text-xs text-[#A9B1BD] font-bold">
                    <span>MENU ITEM AVAILABILITY CONTROL</span>
                    <span>Toggle live stock status</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menu.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                      >
                        <div>
                          <strong className="text-white text-sm block">{item.name}</strong>
                          <span className="text-xs font-mono text-[#00F0FF] font-bold">₹{item.price} · {item.category}</span>
                        </div>
                        <button
                          onClick={() => toggleMenuItemAvailability(item.id)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            item.available
                              ? 'bg-green-100 text-emerald-400 border border-emerald-500/50'
                              : 'bg-red-100 text-rose-400 border border-rose-500/50'
                          }`}
                        >
                          {item.available ? 'Available ●' : 'Sold Out ○'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 5: TABLE FLOORPLAN */}
        {activeDemoView === 'tables' && (
          <div className="lg:col-span-12">
            <div className="glass-panel p-8 bg-[#111114] border-white/10">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div>
                  <h3 className="font-extrabold text-white text-2xl">Café Table QR Floorplan</h3>
                  <p className="text-xs text-[#8A8D93] font-medium">Select a table to inspect QR destination & active state</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                {tables.map((t) => (
                  <div
                    key={t.tableNumber}
                    onClick={() => {
                      setSelectedTable(t.tableNumber);
                      setShowQrModal(t.tableNumber);
                    }}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-center ${
                      t.tableNumber === selectedTable
                        ? 'bg-[#00F0FF]/15 border-[#00F0FF] shadow-md'
                        : t.isActive
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-[#A9B1BD] hover:border-black/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-2 font-bold text-[#0A0A0C]">
                      {t.tableNumber.replace('Table ', '')}
                    </div>
                    <strong className="text-sm text-white block">{t.tableNumber}</strong>
                    <span className="text-[11px] font-mono text-[#00F0FF] font-bold block mt-0.5">{t.qrCodeId}</span>
                    <span
                      className={`text-[10px] font-bold mt-2 inline-block px-2 py-0.5 rounded-full ${
                        t.isActive ? 'bg-green-100 text-emerald-400' : 'bg-black/5 text-[#A9B1BD]'
                      }`}
                    >
                      {t.isActive ? 'Order Active' : 'Available'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CUSTOMIZATION MODAL */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-md w-full bg-[#111114] border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-extrabold text-white text-lg">{customizingItem.name}</h3>
              <button onClick={() => setCustomizingItem(null)} className="text-[#A9B1BD] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {customizingItem.customizations?.size && (
                <div>
                  <label className="text-xs font-bold text-white block mb-2">Select Portion / Size:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {customizingItem.customizations.size.map((sz, idx) => (
                      <button
                        key={sz.name}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                          selectedSizeIndex === idx
                            ? 'bg-white text-[#0A0A0C] border-[#121212]'
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                      >
                        {sz.name} {sz.price > 0 && `(+₹${sz.price})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {customizingItem.customizations?.extras && (
                <div>
                  <label className="text-xs font-bold text-white block mb-2">Extra Add-ons:</label>
                  <div className="space-y-2">
                    {customizingItem.customizations.extras.map((ex, idx) => (
                      <button
                        key={ex.name}
                        onClick={() => {
                          const copy = [...selectedExtras];
                          copy[idx] = !copy[idx];
                          setSelectedExtras(copy);
                        }}
                        className={`w-full p-3 rounded-lg border text-xs font-bold flex items-center justify-between transition-all ${
                          selectedExtras[idx]
                            ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-white'
                            : 'bg-white/5 border-white/10 text-[#A9B1BD]'
                        }`}
                      >
                        <span>{ex.name}</span>
                        <span>+₹{ex.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleConfirmAddToCart}
                className="w-full bg-white text-[#0A0A0C] font-extrabold py-3 rounded-xl hover:bg-[#00F0FF] transition-all text-sm shadow-md"
              >
                Confirm & Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE QR CODE MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-8 max-w-sm w-full text-center bg-[#111114] border-white/10">
            <h3 className="font-extrabold text-white text-xl mb-1">{showQrModal}</h3>
            <p className="text-xs text-[#A9B1BD] mb-4">Printable Café Table QR Code</p>

            <div className="bg-[#111114] p-6 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center border-4 border-[#00F0FF] shadow-lg mb-6">
              <QrCode className="w-32 h-32 text-black" />
              <span className="text-[10px] font-mono text-black font-bold mt-1">ryndcafe.com/{showQrModal.toLowerCase().replace(' ', '')}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert(`Printing QR Code label for ${showQrModal}...`);
                  setShowQrModal(null);
                }}
                className="flex-1 bg-white text-[#0A0A0C] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Print Label
              </button>
              <button
                onClick={() => setShowQrModal(null)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white hover:bg-black/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

