// 应用状态
const state = {
    currentPage: 'home',
    cart: [],
    currentRestaurant: null,
    deliveryType: 'rabbit',
    orders: [],
    stats: {
        orders: 0,
        savedMoney: 0,
        savedCalories: 0,
        lateNightOrders: 0,
        uniqueRestaurants: new Set()
    },
    theme: 'orange'
};

// 从 localStorage 加载数据
function loadData() {
    const saved = localStorage.getItem('fakeDeliveryData');
    if (saved) {
        const data = JSON.parse(saved);
        state.orders = data.orders || [];
        state.stats = {
            orders: data.stats?.orders || 0,
            savedMoney: data.stats?.savedMoney || 0,
            savedCalories: data.stats?.savedCalories || 0,
            lateNightOrders: data.stats?.lateNightOrders || 0,
            uniqueRestaurants: new Set(data.stats?.uniqueRestaurants || [])
        };
        state.theme = data.theme || 'orange';
        applyTheme(state.theme);
    }
}

// 保存到 localStorage
function saveData() {
    const data = {
        orders: state.orders,
        stats: {
            orders: state.stats.orders,
            savedMoney: state.stats.savedMoney,
            savedCalories: state.stats.savedCalories,
            lateNightOrders: state.stats.lateNightOrders,
            uniqueRestaurants: Array.from(state.stats.uniqueRestaurants)
        },
        theme: state.theme
    };
    localStorage.setItem('fakeDeliveryData', JSON.stringify(data));
}

// 应用主题
function applyTheme(theme) {
    document.body.className = '';
    if (theme !== 'orange') {
        document.body.classList.add(`theme-${theme}`);
    }
}

// 页面切换
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId + 'Page').classList.add('active');
    state.currentPage = pageId;
    window.scrollTo(0, 0);
}

// 渲染餐厅列表
function renderRestaurants(filter = '') {
    const list = document.getElementById('restaurantList');
    const filtered = restaurants.filter(r => 
        r.name.includes(filter) || 
        r.cuisine.includes(filter) ||
        r.menu.some(m => m.name.includes(filter))
    );
    
    list.innerHTML = filtered.map(r => `
        <div class="restaurant-card" onclick="showRestaurant(${r.id})">
            <div class="restaurant-header">
                <div>
                    <div class="restaurant-name">${r.emoji} ${r.name}</div>
                    <div class="restaurant-cuisine">${r.cuisine} ${r.tag ? '· ' + r.tag : ''}</div>
                </div>
                <div class="restaurant-rating">
                    <span class="rating-stars">★</span>
                    <span class="rating-score">${r.rating}</span>
                    <span class="rating-count">(${r.reviews})</span>
                </div>
            </div>
            <div class="restaurant-meta">
                <span>⏱ ${r.deliveryTime}</span>
                <span> ¥${r.deliveryFee}</span>
            </div>
            <div class="menu-preview">
                ${r.menu.slice(0, 3).map(m => `
                    <div class="menu-item-preview">
                        <div class="menu-item-img">${m.emoji}</div>
                        <div class="menu-item-name">${m.name}</div>
                        <div class="menu-item-desc">${m.desc}</div>
                        <div class="menu-item-calories">🔥 ${m.calories}kcal</div>
                        <div class="menu-item-footer">
                            <span class="menu-item-price">¥${m.price}</span>
                            <button class="add-btn" onclick="event.stopPropagation(); addToCart(${r.id}, '${m.name}')">+</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 显示餐厅详情
function showRestaurant(id) {
    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) return;
    
    state.currentRestaurant = restaurant;
    document.getElementById('restaurantName').textContent = restaurant.name;
    document.getElementById('restaurantInfo').innerHTML = `
        <div class="info-row">
            <span class="info-label">菜系</span>
            <span class="info-value">${restaurant.cuisine}</span>
        </div>
        <div class="info-row">
            <span class="info-label">评分</span>
            <span class="info-value">★ ${restaurant.rating} (${restaurant.reviews}条评价)</span>
        </div>
        <div class="info-row">
            <span class="info-label">配送时间</span>
            <span class="info-value">${restaurant.deliveryTime}</span>
        </div>
        <div class="info-row">
            <span class="info-label">配送费</span>
            <span class="info-value">¥${restaurant.deliveryFee}</span>
        </div>
    `;
    
    document.getElementById('menuList').innerHTML = restaurant.menu.map(m => `
        <div class="menu-card">
            <div class="menu-card-img">${m.emoji}</div>
            <div class="menu-card-content">
                <div class="menu-card-name">${m.name}</div>
                <div class="menu-card-desc">${m.desc}</div>
                <div class="menu-card-calories">🔥 ${m.calories}kcal</div>
                <div class="menu-card-footer">
                    <span class="menu-card-price">¥${m.price}</span>
                    <button class="add-btn" onclick="addToCart(${restaurant.id}, '${m.name}')">+</button>
                </div>
            </div>
        </div>
    `).join('');
    
    showPage('restaurant');
}

// 添加到购物车
function addToCart(restaurantId, itemName) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const item = restaurant.menu.find(m => m.name === itemName);
    
    state.cart.push({
        restaurantId,
        restaurantName: restaurant.name,
        itemName: item.name,
        price: item.price,
        calories: item.calories,
        emoji: item.emoji
    });
    
    updateCartFab();
    
    // 显示提示
    showToast(`已添加 ${item.name}`);
}

// 更新购物车悬浮按钮
function updateCartFab() {
    const fab = document.getElementById('cartFab');
    const count = document.getElementById('cartCount');
    
    if (state.cart.length > 0) {
        fab.style.display = 'flex';
        count.textContent = state.cart.length;
    } else {
        fab.style.display = 'none';
    }
}

// 渲染购物车
function renderCart() {
    const items = document.getElementById('cartItems');
    
    if (state.cart.length === 0) {
        items.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">购物车是空的</p>';
        document.getElementById('cartSummary').style.display = 'none';
        document.getElementById('checkoutBtn').style.display = 'none';
        return;
    }
    
    items.innerHTML = state.cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.itemName}</div>
                <div class="cart-item-restaurant">${item.restaurantName}</div>
            </div>
            <div class="cart-item-price">¥${item.price}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
        </div>
    `).join('');
    
    const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = state.deliveryType === 'rabbit' ? 3 : 5;
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = `¥${subtotal}`;
    document.getElementById('deliveryFee').textContent = `¥${deliveryFee}`;
    document.getElementById('totalPrice').textContent = `¥${total}`;
    document.getElementById('cartSummary').style.display = 'block';
    document.getElementById('checkoutBtn').style.display = 'block';
}

// 从购物车移除
function removeFromCart(index) {
    state.cart.splice(index, 1);
    renderCart();
    updateCartFab();
}

// 开始配送追踪
function startTracking() {
    showPage('tracking');
    
    const rider = document.getElementById('rider');
    const status = document.getElementById('trackingStatus');
    const eta = document.getElementById('etaTime');
    const distance = document.getElementById('distance');
    const riderName = document.getElementById('riderName');
    const messages = document.getElementById('mindfulMessages');
    
    riderName.textContent = riderNames[Math.floor(Math.random() * riderNames.length)];
    
    const duration = state.deliveryType === 'rabbit' ? 8000 : 15000;
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    // 随机生成距离和时间
    const totalDistance = (Math.random() * 3 + 1).toFixed(1);
    const totalMinutes = state.deliveryType === 'rabbit' ? 15 : 25;
    
    distance.textContent = `${totalDistance}km`;
    eta.textContent = `${totalMinutes}分钟`;
    
    // 显示正念提示
    messages.innerHTML = '';
    const messageInterval = setInterval(() => {
        if (currentStep < steps) {
            const msg = mindfulMessages[Math.floor(Math.random() * mindfulMessages.length)];
            const div = document.createElement('div');
            div.className = 'mindful-message';
            div.textContent = msg;
            messages.appendChild(div);
            
            // 只保留最近3条
            while (messages.children.length > 3) {
                messages.removeChild(messages.firstChild);
            }
        }
    }, 3000);
    
    // 骑手移动动画
    const moveInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        rider.style.left = `${10 + progress * 80}%`;
        
        // 更新状态
        if (progress < 0.3) {
            status.textContent = '骑手已接单，正在取餐';
        } else if (progress < 0.7) {
            status.textContent = '骑手正在配送中';
        } else if (progress < 0.9) {
            status.textContent = '骑手即将到达';
        } else {
            status.textContent = '配送完成！';
        }
        
        // 更新 ETA 和距离
        const remainingMinutes = Math.ceil(totalMinutes * (1 - progress));
        const remainingDistance = (totalDistance * (1 - progress)).toFixed(1);
        eta.textContent = `${remainingMinutes}分钟`;
        distance.textContent = `${remainingDistance}km`;
        
        if (currentStep >= steps) {
            clearInterval(moveInterval);
            clearInterval(messageInterval);
            setTimeout(showCompletion, 1000);
        }
    }, stepDuration);
}

// 显示完成弹窗
function showCompletion() {
    const modal = document.getElementById('completionModal');
    const totalCost = state.cart.reduce((sum, item) => sum + item.price, 0);
    const totalCalories = state.cart.reduce((sum, item) => sum + item.calories, 0);
    
    // 更新统计
    state.stats.orders++;
    state.stats.savedMoney += totalCost;
    state.stats.savedCalories += totalCalories;
    state.stats.uniqueRestaurants.add(state.currentRestaurant?.id);
    
    // 检查是否是深夜订单
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
        state.stats.lateNightOrders++;
    }
    
    // 保存订单历史
    const order = {
        id: Date.now(),
        restaurant: state.currentRestaurant?.name,
        items: state.cart.map(i => i.itemName),
        total: totalCost,
        calories: totalCalories,
        time: new Date().toLocaleString('zh-CN')
    };
    state.orders.unshift(order);
    if (state.orders.length > 50) state.orders.pop();
    
    saveData();
    
    // 显示统计
    document.getElementById('savedMoney').textContent = `¥${totalCost}`;
    document.getElementById('savedCalories').textContent = totalCalories;
    document.getElementById('orderCount').textContent = state.stats.orders;
    
    modal.classList.add('active');
    
    // 清空购物车
    state.cart = [];
    updateCartFab();
}

// 渲染订单历史
function renderHistory() {
    document.getElementById('totalOrders').textContent = state.stats.orders;
    document.getElementById('totalSaved').textContent = `¥${state.stats.savedMoney}`;
    document.getElementById('totalCalories').textContent = state.stats.savedCalories;
    
    // 渲染成就
    const achievementList = document.getElementById('achievementList');
    achievementList.innerHTML = achievements.map(a => {
        const unlocked = a.condition(state.stats);
        return `
            <div class="achievement-badge ${unlocked ? '' : 'locked'}">
                ${a.icon} ${a.name}
            </div>
        `;
    }).join('');
    
    // 渲染订单列表
    const orderList = document.getElementById('orderList');
    if (state.orders.length === 0) {
        orderList.innerHTML = '<p style="color: #999; text-align: center;">暂无订单</p>';
    } else {
        orderList.innerHTML = state.orders.slice(0, 10).map(o => `
            <div class="order-item">
                <div class="order-item-header">
                    <span class="order-item-restaurant">${o.restaurant}</span>
                    <span class="order-item-time">${o.time}</span>
                </div>
                <div class="order-item-items">${o.items.join('、')}</div>
                <div class="order-item-savings">省了 ¥${o.total} · ${o.calories}kcal</div>
            </div>
        `).join('');
    }
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        font-size: 14px;
        z-index: 300;
        animation: fadeIn 0.3s;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// 初始化
function init() {
    loadData();
    renderRestaurants();
    
    // 搜索
    document.getElementById('searchInput').addEventListener('input', (e) => {
        renderRestaurants(e.target.value);
    });
    
    // 配送类型切换
    document.querySelectorAll('.delivery-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.delivery-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.deliveryType = btn.dataset.type;
        });
    });
    
    // 主题切换
    const themes = ['orange', 'purple', 'blue', 'green'];
    let currentThemeIndex = 0;
    document.getElementById('themeBtn').addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        state.theme = themes[currentThemeIndex];
        applyTheme(state.theme);
        saveData();
    });
    
    // 购物车
    document.getElementById('cartFab').addEventListener('click', () => {
        renderCart();
        showPage('cart');
    });
    
    document.getElementById('backToHome').addEventListener('click', () => showPage('home'));
    document.getElementById('backToRestaurant').addEventListener('click', () => showPage('restaurant'));
    document.getElementById('backToCart').addEventListener('click', () => showPage('cart'));
    
    document.getElementById('checkoutBtn').addEventListener('click', () => showPage('checkout'));
    
    document.getElementById('confirmOrderBtn').addEventListener('click', () => {
        const name = document.getElementById('receiverName').value;
        const phone = document.getElementById('receiverPhone').value;
        const address = document.getElementById('receiverAddress').value;
        
        if (!name || !phone || !address) {
            showToast('请填写完整信息');
            return;
        }
        
        startTracking();
    });
    
    document.getElementById('modalCloseBtn').addEventListener('click', () => {
        document.getElementById('completionModal').classList.remove('active');
        showPage('home');
    });
    
    // 历史
    document.getElementById('historyBtn').addEventListener('click', () => {
        renderHistory();
        document.getElementById('historyModal').classList.add('active');
    });
    
    document.getElementById('closeHistoryBtn').addEventListener('click', () => {
        document.getElementById('historyModal').classList.remove('active');
    });
    
    // 关于
    document.getElementById('infoBtn').addEventListener('click', () => {
        document.getElementById('infoModal').classList.add('active');
    });
    
    document.getElementById('closeInfoBtn').addEventListener('click', () => {
        document.getElementById('infoModal').classList.remove('active');
    });
    
    // 重置
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('确定要重置所有数据吗？')) {
            localStorage.removeItem('fakeDeliveryData');
            state.orders = [];
            state.stats = {
                orders: 0,
                savedMoney: 0,
                savedCalories: 0,
                lateNightOrders: 0,
                uniqueRestaurants: new Set()
            };
            state.cart = [];
            updateCartFab();
            showToast('数据已重置');
        }
    });
    
    // 点击弹窗外部关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// 启动
init();
