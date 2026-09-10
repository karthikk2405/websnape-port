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
    <section id="lab" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 relative">
      {/* Toast Notification Banner */}
      {notificationMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#121212] text-[#F7F5EF] font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#C87A4B] animate-bounce">
          <Sparkles className="w-4 h-4 text-[#C87A4B]" />
          <span>{notificationMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C87A4B] mb-2 block">
            INTERCONNECTED LIVE CAFÉ DEMO LABORATORY
          </span>
          <h2 className="rynd-title text-4xl sm:text-6xl text-[#121212]">
            See the order <span className="gradient-text-coffee">move live.</span>
          </h2>
        </div>
        <p className="text-[#55544E] max-w-md text-base leading-relaxed font-medium">
          Test the complete WebSnape engine. Place an order in the Customer App and watch it instantly chime on the Kitchen Screen and update Admin Analytics!
        </p>
      </div>

      {/* View Switcher Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-black/10 shadow-sm">
        <button
          onClick={() => setActiveDemoView('customer')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'customer'
              ? 'bg-[#121212] text-[#F7F5EF] shadow-md'
              : 'text-[#666560] hover:text-[#121212] hover:bg-[#ECEAE2]'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>1. Customer QR App</span>
        </button>

        <button
          onClick={() => setActiveDemoView('kitchen')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'kitchen'
              ? 'bg-[#C87A4B] text-white shadow-md'
              : 'text-[#666560] hover:text-[#121212] hover:bg-[#ECEAE2]'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>2. Barista & Kitchen Screen ({orders.filter(o => o.status !== 'SERVED').length})</span>
        </button>

        <button
          onClick={() => setActiveDemoView('tracker')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'tracker'
              ? 'bg-[#4A6B5D] text-white shadow-md'
              : 'text-[#666560] hover:text-[#121212] hover:bg-[#ECEAE2]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>3. Guest Status Tracker</span>
        </button>

        <button
          onClick={() => setActiveDemoView('dashboard')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'dashboard'
              ? 'bg-[#D46A43] text-white shadow-md'
              : 'text-[#666560] hover:text-[#121212] hover:bg-[#ECEAE2]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>4. Admin Dashboard</span>
        </button>

        <button
          onClick={() => setActiveDemoView('tables')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
            activeDemoView === 'tables'
              ? 'bg-[#121212] text-[#F7F5EF] shadow-md'
              : 'text-[#666560] hover:text-[#121212] hover:bg-[#ECEAE2]'
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
              <div className="glass-panel p-6 bg-white border-black/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                  <div>
                    <span className="text-xs font-mono text-[#C87A4B] font-bold">DIGITAL CAFÉ MENU PREVIEW</span>
                    <h3 className="text-xl font-extrabold text-[#121212] flex items-center gap-2 mt-0.5">
                      <span>Ordering for</span>
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="bg-[#ECEAE2] text-[#121212] font-bold border border-black/20 rounded-lg px-3 py-1 focus:outline-none"
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
                            ? 'bg-[#121212] text-[#F7F5EF]'
                            : 'bg-[#ECEAE2] text-[#666560] hover:text-[#121212]'
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
                          ? 'bg-[#F7F5EF] border-black/10 hover:border-[#C87A4B]/40'
                          : 'bg-black/5 border-black/5 opacity-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-3 h-3 rounded-sm flex items-center justify-center border ${
                                item.isVeg ? 'border-green-600' : 'border-red-600'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                                }`}
                              />
                            </span>
                            <h4 className="font-bold text-[#121212] text-base">{item.name}</h4>
                          </div>
                          <span className="font-extrabold text-[#C87A4B] text-sm">₹{item.price}</span>
                        </div>
                        <p className="text-xs text-[#55544E] line-clamp-2 mb-4 font-medium">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-black/5">
                        <span className="text-[11px] text-[#666560] font-semibold">{item.category}</span>
                        {item.available ? (
                          <button
                            onClick={() => handleQuickAdd(item)}
                            className="bg-[#121212] text-[#F7F5EF] font-bold text-xs px-3.5 py-1.5 rounded-lg hover:bg-[#C87A4B] transition-colors flex items-center gap-1 shadow-sm"
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
              <div className="glass-panel p-6 sticky top-28 bg-white border-black/10">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#C87A4B]" />
                    <h3 className="font-bold text-[#121212] text-lg">Your Order</h3>
                  </div>
                  <span className="text-xs text-[#666560] font-bold">{cart.length} item(s)</span>
                </div>

                {/* Cart Items List */}
                <div className="py-4 space-y-3 max-h-[300px] overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-[#666560]">
                      <UtensilsCrossed className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#C87A4B]" />
                      <p className="text-xs font-bold text-[#121212]">Your order is empty.</p>
                      <p className="text-[11px] text-[#666560] mt-1">Select coffee & pastries to test ordering.</p>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <div
                        key={item.id}
                        className="bg-[#F7F5EF] p-3 rounded-lg border border-black/10 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-[#121212] text-xs">{item.menuItem.name}</p>
                          {item.selectedSize && (
                            <span className="text-[10px] text-[#C87A4B] block font-bold">{item.selectedSize.name}</span>
                          )}
                          {item.selectedExtras && item.selectedExtras.length > 0 && (
                            <span className="text-[10px] text-[#666560] block font-medium">
                              +{item.selectedExtras.map((e) => e.name).join(', ')}
                            </span>
                          )}
                          <span className="text-xs font-extrabold text-[#121212] mt-1 block">
                            ₹{item.itemPrice} × {item.quantity}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Customer Note */}
                <div className="pt-3 border-t border-black/10 mb-4">
                  <label className="text-xs font-bold text-[#55544E] block mb-1">Barista Note (Optional):</label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="e.g. Oat milk / extra hot..."
                    className="w-full bg-[#ECEAE2] border border-black/15 rounded-lg px-3 py-1.5 text-xs text-[#121212] placeholder-black/40 focus:outline-none focus:border-[#C87A4B]"
                  />
                </div>

                {/* Cart Total & Order Button */}
                <div className="pt-3 border-t border-black/10 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#55544E] font-medium">Subtotal ({selectedTable}):</span>
                    <span className="font-extrabold text-[#121212] text-lg">₹{totalCartPrice}</span>
                  </div>

                  <button
                    onClick={() => {
                      placeOrder(customerNote);
                      setCustomerNote('');
                    }}
                    disabled={cart.length === 0}
                    className="w-full bg-[#121212] text-[#F7F5EF] font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-[#C87A4B] disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
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
            <div className="glass-panel p-8 bg-white border-black/10">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#C87A4B] animate-ping" />
                  <div>
                    <h3 className="font-extrabold text-[#121212] text-2xl">Barista & Kitchen Display</h3>
                    <p className="text-xs text-[#55544E] font-medium">Live incoming digital tickets from QR tables</p>
                  </div>
                </div>
                <button
                  onClick={playNotificationSound}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#C87A4B] bg-[#ECEAE2] border border-black/10 px-3 py-1.5 rounded-lg hover:bg-[#E0DDD2]"
                >
                  <Volume2 className="w-4 h-4" />
                  Test Sound Chime
                </button>
              </div>

              {/* Kitchen Tickets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-[#666560]">
                    <ChefHat className="w-12 h-12 mx-auto mb-2 opacity-40 text-[#C87A4B]" />
                    <p className="text-base font-bold text-[#121212]">No active café orders</p>
                    <p className="text-xs mt-1">Switch to Customer QR App tab and place a test order!</p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const statusColors: Record<OrderStatus, string> = {
                      NEW: 'border-red-500/60 bg-red-50 text-red-700',
                      ACCEPTED: 'border-[#C87A4B]/60 bg-[#C87A4B]/10 text-[#C87A4B]',
                      PREPARING: 'border-[#D46A43]/60 bg-[#D46A43]/10 text-[#D46A43]',
                      READY: 'border-green-600/60 bg-green-50 text-green-700',
                      SERVED: 'border-black/10 bg-black/5 text-[#666560]'
                    };

                    return (
                      <div
                        key={order.id}
                        className={`p-6 rounded-2xl border ${statusColors[order.status]} transition-all flex flex-col justify-between min-h-[300px]`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
                            <div>
                              <span className="text-xs font-mono font-bold text-[#666560]">ORDER #{order.id}</span>
                              <h4 className="text-xl font-extrabold text-[#121212]">{order.tableNumber}</h4>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-extrabold border uppercase">
                              {order.status}
                            </span>
                          </div>

                          {/* Items List */}
                          <div className="space-y-2 mb-4">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs text-[#121212]">
                                <span>
                                  <strong>{it.quantity}×</strong> {it.menuItem.name}
                                </span>
                                <span className="font-mono font-bold">₹{it.itemPrice * it.quantity}</span>
                              </div>
                            ))}
                          </div>

                          {order.customerNote && (
                            <div className="p-2.5 rounded-lg bg-[#ECEAE2] border border-black/10 text-xs text-[#C87A4B] font-bold mb-4">
                              <strong>Note:</strong> {order.customerNote}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs text-[#666560] mb-3 pt-3 border-t border-black/10">
                            <span>Placed: {order.createdAt}</span>
                            <span className="font-extrabold text-[#121212]">Total: ₹{order.totalAmount}</span>
                          </div>

                          {order.status !== 'SERVED' ? (
                            <button
                              onClick={() => advanceOrderStatus(order.id)}
                              className="w-full bg-[#121212] text-[#F7F5EF] font-bold py-2.5 rounded-xl hover:bg-[#C87A4B] transition-colors text-xs flex items-center justify-center gap-1.5 shadow-md"
                            >
                              <span>Advance Status →</span>
                            </button>
                          ) : (
                            <span className="block text-center text-xs font-bold text-[#666560]">
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
            <div className="glass-panel p-8 max-w-3xl mx-auto bg-white border-black/10">
              <div className="text-center mb-8">
                <span className="text-xs font-mono font-bold text-[#C87A4B] uppercase">
                  LIVE CAFÉ GUEST PROGRESS TRACKER
                </span>
                <h3 className="rynd-title text-3xl font-extrabold text-[#121212] mt-1">
                  Status for {selectedTable}
                </h3>
                <p className="text-xs text-[#55544E] mt-1 font-medium">
                  Updates in real-time as barista staff press buttons!
                </p>
              </div>

              {activeOrder ? (
                <div className="bg-[#F7F5EF] border border-black/10 p-8 rounded-2xl space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#666560] font-bold">ACTIVE ORDER</span>
                      <h4 className="text-2xl font-extrabold text-[#121212]">Order #{activeOrder.id}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#666560] font-bold">CURRENT STATUS</span>
                      <p className="text-lg font-extrabold text-[#C87A4B]">{activeOrder.status}</p>
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
                      <div className={activeOrder.status === 'NEW' ? 'text-[#C87A4B]' : 'text-[#666560]'}>
                        1. Sent
                      </div>
                      <div className={activeOrder.status === 'ACCEPTED' ? 'text-[#C87A4B]' : 'text-[#666560]'}>
                        2. Accepted
                      </div>
                      <div className={activeOrder.status === 'PREPARING' ? 'text-[#D46A43]' : 'text-[#666560]'}>
                        3. Brewing
                      </div>
                      <div className={activeOrder.status === 'READY' ? 'text-[#4A6B5D]' : 'text-[#666560]'}>
                        4. Ready
                      </div>
                      <div className={activeOrder.status === 'SERVED' ? 'text-[#121212]' : 'text-[#666560]'}>
                        5. Served
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#55544E]">
                    <span>Items: {activeOrder.items.map(i => i.menuItem.name).join(', ')}</span>
                    <span className="font-extrabold text-[#121212]">₹{activeOrder.totalAmount}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#666560]">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#C87A4B]" />
                  <p className="text-base text-[#121212] font-bold">No active order for {selectedTable}</p>
                  <p className="text-xs mt-1">Place an order in Customer QR App view to test real-time tracking.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 4: ADMIN DASHBOARD */}
        {activeDemoView === 'dashboard' && (
          <div className="lg:col-span-12">
            <div className="glass-panel p-8 bg-white border-black/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10">
                <div>
                  <h3 className="font-extrabold text-[#121212] text-2xl">Café Operating System</h3>
                  <p className="text-xs text-[#55544E] font-medium">Real-time management dashboard</p>
                </div>

                {/* Dashboard Sub-tabs */}
                <div className="flex items-center gap-2 bg-[#ECEAE2] p-1 rounded-xl border border-black/10">
                  {(['overview', 'tables', 'menu', 'analytics', 'settings'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveDashTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        activeDashTab === tab ? 'bg-[#121212] text-[#F7F5EF]' : 'text-[#666560] hover:text-[#121212]'
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
                    <div className="p-5 rounded-xl bg-[#F7F5EF] border border-black/10">
                      <span className="text-xs text-[#666560] block font-bold">Today's Orders</span>
                      <strong className="text-3xl font-extrabold text-[#121212] mt-1 block">
                        {124 + orders.length}
                      </strong>
                      <span className="text-[11px] text-[#4A6B5D] font-bold mt-2 block">+14% vs yesterday</span>
                    </div>

                    <div className="p-5 rounded-xl bg-[#F7F5EF] border border-black/10">
                      <span className="text-xs text-[#666560] block font-bold">Total Sales</span>
                      <strong className="text-3xl font-extrabold text-[#C87A4B] mt-1 block">
                        ₹{48620 + orders.reduce((sum, o) => sum + o.totalAmount, 0)}
                      </strong>
                      <span className="text-[11px] text-[#4A6B5D] font-bold mt-2 block">Live QR revenue</span>
                    </div>

                    <div className="p-5 rounded-xl bg-[#F7F5EF] border border-black/10">
                      <span className="text-xs text-[#666560] block font-bold">Active Occupied Tables</span>
                      <strong className="text-3xl font-extrabold text-[#D46A43] mt-1 block">
                        {tables.filter(t => t.isActive).length} / 20
                      </strong>
                      <span className="text-[11px] text-[#666560] mt-2 block font-medium">Real-time floor state</span>
                    </div>

                    <div className="p-5 rounded-xl bg-[#F7F5EF] border border-black/10">
                      <span className="text-xs text-[#666560] block font-bold">Average Order Value</span>
                      <strong className="text-3xl font-extrabold text-[#121212] mt-1 block">₹412</strong>
                      <span className="text-[11px] text-[#4A6B5D] font-bold mt-2 block">+₹20 vs last month</span>
                    </div>
                  </div>

                  {/* Revenue Bar Chart */}
                  <div className="p-6 rounded-xl bg-[#F7F5EF] border border-black/10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-[#121212] uppercase tracking-wider">Peak Café Hours</span>
                      <span className="text-xs text-[#666560] font-medium">Peak brunch time: 10:00 - 13:00</span>
                    </div>
                    <div className="h-40 flex items-end gap-3 pt-4">
                      {[45, 60, 35, 80, 65, 95, 88, 72, 90, 100, 60].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-[#C87A4B] rounded-t hover:opacity-80 transition-opacity"
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[10px] text-[#666560] font-bold">{8 + i}:00</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MENU MANAGEMENT TAB */}
              {activeDashTab === 'menu' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2 text-xs text-[#666560] font-bold">
                    <span>MENU ITEM AVAILABILITY CONTROL</span>
                    <span>Toggle live stock status</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menu.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-[#F7F5EF] border border-black/10 flex items-center justify-between"
                      >
                        <div>
                          <strong className="text-[#121212] text-sm block">{item.name}</strong>
                          <span className="text-xs font-mono text-[#C87A4B] font-bold">₹{item.price} · {item.category}</span>
                        </div>
                        <button
                          onClick={() => toggleMenuItemAvailability(item.id)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            item.available
                              ? 'bg-green-100 text-green-700 border border-green-300'
                              : 'bg-red-100 text-red-700 border border-red-300'
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
            <div className="glass-panel p-8 bg-white border-black/10">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/10">
                <div>
                  <h3 className="font-extrabold text-[#121212] text-2xl">Café Table QR Floorplan</h3>
                  <p className="text-xs text-[#55544E] font-medium">Select a table to inspect QR destination & active state</p>
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
                        ? 'bg-[#C87A4B]/15 border-[#C87A4B] shadow-md'
                        : t.isActive
                        ? 'bg-green-50 border-green-300 text-[#121212]'
                        : 'bg-[#F7F5EF] border-black/10 text-[#666560] hover:border-black/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center mx-auto mb-2 font-bold text-[#F7F5EF]">
                      {t.tableNumber.replace('Table ', '')}
                    </div>
                    <strong className="text-sm text-[#121212] block">{t.tableNumber}</strong>
                    <span className="text-[11px] font-mono text-[#C87A4B] font-bold block mt-0.5">{t.qrCodeId}</span>
                    <span
                      className={`text-[10px] font-bold mt-2 inline-block px-2 py-0.5 rounded-full ${
                        t.isActive ? 'bg-green-100 text-green-700' : 'bg-black/5 text-[#666560]'
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-md w-full bg-white border-black/20">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h3 className="font-extrabold text-[#121212] text-lg">{customizingItem.name}</h3>
              <button onClick={() => setCustomizingItem(null)} className="text-[#666560] hover:text-[#121212]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {customizingItem.customizations?.size && (
                <div>
                  <label className="text-xs font-bold text-[#121212] block mb-2">Select Portion / Size:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {customizingItem.customizations.size.map((sz, idx) => (
                      <button
                        key={sz.name}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                          selectedSizeIndex === idx
                            ? 'bg-[#121212] text-[#F7F5EF] border-[#121212]'
                            : 'bg-[#F7F5EF] border-black/10 text-[#121212]'
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
                  <label className="text-xs font-bold text-[#121212] block mb-2">Extra Add-ons:</label>
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
                            ? 'bg-[#C87A4B]/20 border-[#C87A4B] text-[#121212]'
                            : 'bg-[#F7F5EF] border-black/10 text-[#666560]'
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

            <div className="pt-4 border-t border-black/10">
              <button
                onClick={handleConfirmAddToCart}
                className="w-full bg-[#121212] text-[#F7F5EF] font-extrabold py-3 rounded-xl hover:bg-[#C87A4B] transition-all text-sm shadow-md"
              >
                Confirm & Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE QR CODE MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-8 max-w-sm w-full text-center bg-white border-black/20">
            <h3 className="font-extrabold text-[#121212] text-xl mb-1">{showQrModal}</h3>
            <p className="text-xs text-[#666560] mb-4">Printable Café Table QR Code</p>

            <div className="bg-white p-6 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center border-4 border-[#C87A4B] shadow-lg mb-6">
              <QrCode className="w-32 h-32 text-black" />
              <span className="text-[10px] font-mono text-black font-bold mt-1">ryndcafe.com/{showQrModal.toLowerCase().replace(' ', '')}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert(`Printing QR Code label for ${showQrModal}...`);
                  setShowQrModal(null);
                }}
                className="flex-1 bg-[#121212] text-[#F7F5EF] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Print Label
              </button>
              <button
                onClick={() => setShowQrModal(null)}
                className="px-4 py-2.5 rounded-xl border border-black/20 text-xs font-bold text-[#121212] hover:bg-black/5"
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
