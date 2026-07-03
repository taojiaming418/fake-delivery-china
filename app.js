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
    theme: 'orange',
    currentConfigItem: null,
    currentConfigOptions: {}
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

// 显示商品配置弹窗
function showItemConfig(restaurantId, itemName) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const item = restaurant.menu.find(m => m.name === itemName);
    
    if (!item) return;
    
    state.currentConfigItem = { ...item, restaurantId, restaurantName: restaurant.name };
    state.currentConfigOptions = {};
    
    // 初始化默认选项
    if (item.options && item.options.length > 0) {
        item.options.forEach(opt => {
            state.currentConfigOptions[opt.type] = opt.choices[opt.default];
        });
    }
    
    // 更新弹窗内容
    document.getElementById('configItemName').textContent = item.name;
    document.getElementById('configItemImg').textContent = item.emoji || '🍽️';
    document.getElementById('configItemDesc').textContent = item.desc;
    document.getElementById('configItemCalories').textContent = `🔥 ${item.calories}kcal`;
    
    // 生成选项
    const optionsContainer = document.getElementById('configOptions');
    if (item.options && item.options.length > 0) {
        optionsContainer.innerHTML = item.options.map(opt => `
            <div class="config-option-group">
                <div class="config-option-label">${opt.type}</div>
                <div class="config-option-choices">
                    ${opt.choices.map(choice => `
                        <button class="config-option-btn ${choice === state.currentConfigOptions[opt.type] ? 'active' : ''}" 
                                onclick="selectConfigOption('${opt.type}', '${choice}')">
                            ${choice}
                        </button>
                    `).join('')}
                </div>
            </div>
        `).join('');
    } else {
        optionsContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">该商品无可配置选项</p>';
    }
    
    updateConfigPrice();
    document.getElementById('itemConfigModal').classList.add('active');
}

// 选择配置选项
function selectConfigOption(type, choice) {
    state.currentConfigOptions[type] = choice;
    
    // 更新按钮状态
    const buttons = document.querySelectorAll(`.config-option-btn`);
    buttons.forEach(btn => {
        if (btn.textContent.trim() === choice) {
            btn.classList.add('active');
        } else {
            const parent = btn.closest('.config-option-group');
            const label = parent.querySelector('.config-option-label').textContent;
            if (label === type) {
                btn.classList.remove('active');
            }
        }
    });
    
    updateConfigPrice();
}

// 更新配置价格
function updateConfigPrice() {
    let price = state.currentConfigItem.price;
    
    // 计算额外费用
    Object.values(state.currentConfigOptions).forEach(choice => {
        const match = choice.match(/\+(\d+)元/);
        if (match) {
            price += parseInt(match[1]);
        }
    });
    
    document.getElementById('configPrice').textContent = price.toFixed(2);
}

// 添加配置后的商品到购物车
function addConfiguredItemToCart() {
    let price = state.currentConfigItem.price;
    let extraCalories = 0;
    
    // 计算额外费用
    Object.values(state.currentConfigOptions).forEach(choice => {
        const match = choice.match(/\+(\d+)元/);
        if (match) {
            price += parseInt(match[1]);
        }
    });
    
    const configText = Object.entries(state.currentConfigOptions)
        .map(([type, choice]) => `${type}:${choice}`)
        .join(', ');
    
    state.cart.push({
        restaurantId: state.currentConfigItem.restaurantId,
        restaurantName: state.currentConfigItem.restaurantName,
        itemName: state.currentConfigItem.name,
        price: price,
        calories: state.currentConfigItem.calories + extraCalories,
        emoji: state.currentConfigItem.emoji || '🍽️',
        config: configText
    });
    
    updateCartFab();
    document.getElementById('itemConfigModal').classList.remove('active');
    showToast(`已添加 ${state.currentConfigItem.name}`);
}

// 添加到购物车（检查是否有配置选项）
function addToCart(restaurantId, itemName) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const item = restaurant.menu.find(m => m.name === itemName);
    
    if (!item) return;
    
    // 如果有配置选项，显示配置弹窗
    if (item.options && item.options.length > 0) {
        showItemConfig(restaurantId, itemName);
    } else {
        // 直接添加到购物车
        state.cart.push({
            restaurantId,
            restaurantName: restaurant.name,
            itemName: item.name,
            price: item.price,
            calories: item.calories,
            emoji: item.emoji || '🍽️',
            config: ''
        });
        
        updateCartFab();
        showToast(`已添加 ${item.name}`);
    }
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
                ${item.config ? `<div class="cart-item-config">${item.config}</div>` : ''}
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

// 显示支付弹窗
function showPaymentModal(amount) {
    document.getElementById('paymentAmount').textContent = amount.toFixed(2);
    document.getElementById('paymentModal').classList.add('active');
}

// 开始配送追踪 - 完整订单流程
function startTracking() {
    showPage('tracking');
    
    const rider = document.getElementById('rider');
    const riderEmoji = document.getElementById('riderEmoji');
    const riderBubble = document.getElementById('riderBubble');
    const courierAvatar = document.getElementById('courierAvatar');
    const courierCard = document.getElementById('courierCard');
    const status = document.getElementById('trackingStatus');
    const statusText = document.getElementById('statusText');
    const eta = document.getElementById('etaTime');
    const riderName = document.getElementById('riderName');
    const riderRating = document.getElementById('riderRating');
    const messages = document.getElementById('mindfulMessages');
    const trackingTitle = document.getElementById('trackingTitle');
    const deliveryTypeBadge = document.getElementById('deliveryTypeBadge');
    const timelineSteps = document.getElementById('timelineSteps');
    const deliveryTimeLabel = document.querySelector('.delivery-time-label');
    
    // 根据配送类型设置
    const isRabbit = state.deliveryType === 'rabbit';
    const emoji = isRabbit ? '🐇' : '🐢';
    const typeName = isRabbit ? '闪电' : '慢享';
    const typeLabel = isRabbit ? 'Express' : 'Standard';
    
    riderEmoji.textContent = emoji;
    trackingTitle.textContent = `${emoji} ${typeName}配送追踪`;
    deliveryTypeBadge.textContent = typeLabel;
    
    const selectedRider = riderNames[Math.floor(Math.random() * riderNames.length)];
    const rating = (4.5 + Math.random() * 0.5).toFixed(1);
    
    // 选择配送类型决定每个步骤的时间（毫秒）
    const stepDurations = isRabbit ? [
        { key: 'ordered', wait: 500 },
        { key: 'paid', wait: 800 },
        { key: 'accepted', wait: 1200 },
        { key: 'rider_assigned', wait: 1500 },
        { key: 'rider_arrived', wait: 2000 },
        { key: 'preparing', wait: 2500 },
        { key: 'picked_up', wait: 1500 },
        { key: 'delivering', wait: 3000 },
        { key: 'delivered', wait: 1200 },
        { key: 'completed', wait: 0 }
    ] : [
        { key: 'ordered', wait: 1000 },
        { key: 'paid', wait: 1500 },
        { key: 'accepted', wait: 2000 },
        { key: 'rider_assigned', wait: 2500 },
        { key: 'rider_arrived', wait: 3000 },
        { key: 'preparing', wait: 4000 },
        { key: 'picked_up', wait: 2500 },
        { key: 'delivering', wait: 5000 },
        { key: 'delivered', wait: 2000 },
        { key: 'completed', wait: 0 }
    ];
    
    // 生成时间线
    function renderTimeline(currentStep) {
        timelineSteps.innerHTML = orderStatuses.map((os, index) => {
            let cls = 'timeline-item';
            if (index < currentStep) cls += ' completed';
            else if (index === currentStep) cls += ' current';
            else cls += ' pending';
            return `
                <div class="${cls}">
                    <div class="timeline-icon">${index < currentStep ? '✅' : os.icon}</div>
                    <div class="timeline-content">
                        <div class="timeline-label">${os.label}</div>
                        <div class="timeline-desc">${os.desc}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        // 滚动到当前步骤
        const currentEl = timelineSteps.querySelector('.current');
        if (currentEl) {
            currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // 初始渲染时间线
    renderTimeline(0);
    status.textContent = '订单已提交';
    statusText.textContent = '等待支付确认...';
    eta.textContent = '--';
    deliveryTimeLabel.textContent = '订单处理中...';
    rider.style.display = 'none';
    document.getElementById('map').style.background = '#f0f0f0';
    
    // 正念提示
    messages.innerHTML = '';
    const messageInterval = setInterval(() => {
        const msg = mindfulMessages[Math.floor(Math.random() * mindfulMessages.length)];
        const div = document.createElement('div');
        div.className = 'mindful-message';
        div.textContent = msg;
        messages.appendChild(div);
        while (messages.children.length > 3) {
            messages.removeChild(messages.firstChild);
        }
    }, 4000);
    
    let totalTime = 0;
    stepDurations.forEach(s => totalTime += s.wait);
    let elapsedTime = 0;
    
    // 执行每个步骤
    function executeStep(index) {
        if (index >= stepDurations.length) return;
        
        const step = stepDurations[index];
        const statusInfo = orderStatuses[index];
        
        setTimeout(() => {
            elapsedTime += step.wait;
            const progress = Math.min(elapsedTime / totalTime, 1);
            
            renderTimeline(index + 1);
            status.textContent = statusInfo.label;
            statusText.textContent = statusInfo.desc;
            
            // 更新 UI 根据当前步骤
            switch (step.key) {
                case 'ordered':
                    deliveryTimeLabel.textContent = '等待支付...';
                    eta.textContent = '--';
                    break;
                    
                case 'paid':
                    deliveryTimeLabel.textContent = '等待商家接单...';
                    eta.textContent = '⌛';
                    break;
                    
                case 'accepted':
                    deliveryTimeLabel.textContent = '商家已接单，正在准备';
                    const totalMinutes = isRabbit ? 15 : 25;
                    eta.textContent = `${totalMinutes}min`;
                    break;
                    
                case 'rider_assigned':
                    // 显示骑手信息
                    courierAvatar.textContent = emoji;
                    riderName.textContent = selectedRider;
                    riderRating.textContent = `${typeLabel} · ★ ${rating} · 正在赶来`;
                    courierCard.style.display = 'block';
                    deliveryTimeLabel.textContent = '骑手正在赶往商家';
                    break;
                    
                case 'rider_arrived':
                    // 骑手到店，显示在商家位置
                    rider.style.display = 'flex';
                    rider.style.left = '10%';
                    riderBubble.textContent = '已到店，等待取餐';
                    deliveryTimeLabel.textContent = '骑手已到店';
                    break;
                    
                case 'preparing':
                    riderBubble.textContent = '等待出餐中...';
                    deliveryTimeLabel.textContent = '商家正在出餐';
                    break;
                    
                case 'picked_up':
                    riderBubble.textContent = '已取餐，准备出发！';
                    deliveryTimeLabel.textContent = '骑手已取餐，即将配送';
                    // 骑手在商家位置略微移动
                    rider.style.left = '12%';
                    break;
                    
                case 'delivering':
                    // 骑手开始移动！配送动画
                    deliveryTimeLabel.textContent = '骑手正在配送中';
                    const remainingTotal = isRabbit ? 5 : 15;
                    const minutesPerStep = remainingTotal / 10;
                    let moveSteps = 0;
                    const moveInterval = setInterval(() => {
                        moveSteps++;
                        const moveProgress = moveSteps / 10;
                        rider.style.left = `${15 + moveProgress * 70}%`;
                        
                        const remMin = Math.ceil(remainingTotal * (1 - moveProgress));
                        eta.textContent = `${remMin}min`;
                        riderBubble.textContent = `配送中 · ${remMin}分钟`;
                        
                        if (moveSteps >= 10) {
                            clearInterval(moveInterval);
                        }
                        if (moveSteps >= 8) {
                            status.textContent = '骑手即将到达';
                            statusText.textContent = '商品马上送达！';
                            deliveryTimeLabel.textContent = '即将送达！';
                        }
                    }, isRabbit ? 250 : 400);
                    break;
                    
                case 'delivered':
                    status.textContent = '商品已送达';
                    statusText.textContent = '祝您用餐愉快！';
                    deliveryTimeLabel.textContent = '已送达！';
                    riderBubble.textContent = '已送达 📬';
                    eta.textContent = '0min';
                    break;
                    
                case 'completed':
                    // 配送完成
                    clearInterval(messageInterval);
                    setTimeout(() => showCompletion(), 500);
                    break;
            }
            
            // 执行下一步
            executeStep(index + 1);
            
        }, step.wait);
    }
    
    // 开始订单流程
    executeStep(0);
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
        
        // 显示支付弹窗
        const total = state.cart.reduce((sum, item) => sum + item.price, 0) + (state.deliveryType === 'rabbit' ? 3 : 5);
        showPaymentModal(total);
    });
    
    // 支付弹窗关闭后开始追踪
    document.getElementById('paymentCloseBtn').addEventListener('click', () => {
        document.getElementById('paymentModal').classList.remove('active');
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
    
    // 商品配置弹窗
    document.getElementById('closeConfigBtn').addEventListener('click', () => {
        document.getElementById('itemConfigModal').classList.remove('active');
    });
    
    document.getElementById('configAddBtn').addEventListener('click', () => {
        addConfiguredItemToCart();
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
