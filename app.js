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
    updateCartFab();
}

const cuisineEmojis = {
    '火锅': '',
    '烧烤': '🍢',
    '奶茶': '🧋',
    '小吃': '🍜',
    '川菜': '🌶️',
    '粤菜': '🥟',
    '日料': '🍣',
    '西餐': '🥩',
    '快餐': '🍔',
    '粥粉面': '🍜',
    '炸鸡': '🍗',
    '咖啡': '☕',
    '烘焙': '🥐',
    '水果': '🍉',
    '夜宵': '🍺',
};

function bannerEmoji(r) {
    if (r.emoji) return r.emoji;
    if (r.menu && r.menu.length > 0 && r.menu[0].emoji) return r.menu[0].emoji;
    return cuisineEmojis[r.cuisine] || '🍽️';
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
            <div class="restaurant-banner" style="background: ${r.bannerColor}">
                <span class="restaurant-banner-emoji">${bannerEmoji(r)}</span>
                <span class="restaurant-banner-tag">${r.tag}</span>
            </div>
            <div class="restaurant-body">
                <div class="restaurant-header">
                    <div>
                        <div class="restaurant-name">${r.name}</div>
                        <div class="restaurant-cuisine">${r.cuisine}</div>
                    </div>
                    <div class="restaurant-rating">
                        <span class="rating-stars">★</span>
                        <span class="rating-score">${r.rating}</span>
                    </div>
                </div>
                <div class="restaurant-meta">
                    <span>⏱ ${r.deliveryTime}</span>
                    <span> ¥${r.deliveryFee}</span>
                    <span>月售${(r.reviews / 10).toFixed(0)}</span>
                </div>
                <div class="menu-preview">
                    ${r.menu.slice(0, 3).map(m => `
                        <div class="menu-item-preview">
                            <span class="menu-item-emoji">${m.emoji || '🍽️'}</span>
                            <span class="menu-item-name">${m.name}</span>
                            <span class="menu-item-preview-price">¥${m.price}</span>
                        </div>
                    `).join('')}
                </div>
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
    
    // Banner
    const banner = restaurant.reviewList?.[0]?.content || restaurant.name;
    document.getElementById('restaurantInfo').innerHTML = `
        <div class="restaurant-banner-detail" style="background: ${restaurant.bannerColor || '#FF6B35'}">
            <div class="banner-emoji">${bannerEmoji(restaurant)}</div>
            <div class="banner-info">
                <div class="banner-name">${restaurant.name}</div>
                <div class="banner-stats">
                    <span>★ ${restaurant.rating}</span>
                    <span>月售${(restaurant.reviews / 10).toFixed(0)}</span>
                    <span>⏱ ${restaurant.deliveryTime}</span>
                </div>
            </div>
        </div>
        <div class="restaurant-detail-meta">
            <div class="meta-item">
                <span class="meta-label">起送</span>
                <span class="meta-value">¥${restaurant.minOrder}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">配送</span>
                <span class="meta-value">¥${restaurant.deliveryFee}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">评分</span>
                <span class="meta-value">★ ${restaurant.rating}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">评价</span>
                <span class="meta-value">${restaurant.reviews}条</span>
            </div>
        </div>
    `;
    
    // 菜单
    document.getElementById('menuList').innerHTML = restaurant.menu.map(m => `
        <div class="menu-card">
            <div class="menu-card-img">${m.emoji}</div>
            <div class="menu-card-content">
                <div class="menu-card-name">${m.name}</div>
                <div class="menu-card-desc">${m.desc}</div>
                <div class="menu-card-footer">
                    <span class="menu-card-price">¥${m.price}</span>
                    <span class="menu-card-calories">🔥 ${m.calories}kcal</span>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart(${restaurant.id}, '${m.name}')">＋</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // 评论
    const reviewSection = document.getElementById('reviewSection');
    if (reviewSection && restaurant.reviewList) {
        const totalScore = restaurant.reviewList.reduce((s, r) => s + r.score, 0);
        const avgScore = (totalScore / restaurant.reviewList.length).toFixed(1);
        const distribution = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
        restaurant.reviewList.forEach(r => {
            const key = Math.floor(r.score);
            distribution[key] = (distribution[key] || 0) + 1;
        });
        
        reviewSection.innerHTML = `
            <div class="review-header">
                <div class="review-summary">
                    <div class="review-score">★ ${avgScore}</div>
                    <div class="review-count">${restaurant.reviewList.length}条评价</div>
                </div>
                <div class="review-bars">
                    ${[5, 4, 3, 2, 1].map(n => {
                        const pct = (distribution[n] / restaurant.reviewList.length * 100).toFixed(0);
                        return `<div class="review-bar-row"><span>${n}分</span><div class="review-bar-bg"><div class="review-bar-fill" style="width:${pct}%"></div></div><span>${pct}%</span></div>`;
                    }).join('')}
                </div>
            </div>
            <div class="review-tabs">
                <button class="review-tab active" onclick="filterReviews('all')">全部</button>
                <button class="review-tab" onclick="filterReviews('good')">好评</button>
                <button class="review-tab" onclick="filterReviews('bad')">差评</button>
                <button class="review-tab" onclick="filterReviews('image')">有图</button>
            </div>
            <div id="reviewList" class="review-list"></div>
        `;
        window._currentReviews = restaurant.reviewList;
        filterReviews('all');
    }
    
    showPage('restaurant');
}

// 评论筛选
function filterReviews(type) {
    const list = document.getElementById('reviewList');
    const reviews = window._currentReviews || [];
    
    document.querySelectorAll('.review-tab').forEach(t => t.classList.remove('active'));
    event?.target?.classList?.add('active');
    
    let filtered = reviews;
    if (type === 'good') filtered = reviews.filter(r => r.score >= 4.5);
    if (type === 'bad') filtered = reviews.filter(r => r.score < 4);
    if (type === 'image') filtered = reviews.filter(r => Math.random() > 0.7); // 随机显示"有图"
    
    list.innerHTML = filtered.slice(0, 10).map(r => `
        <div class="review-item">
            <div class="review-item-header">
                <span class="review-item-name">${r.name}</span>
                <span class="review-item-score">${'★'.repeat(Math.floor(r.score))}${'☆'.repeat(5 - Math.floor(r.score))}</span>
                <span class="review-item-time">${r.time}</span>
            </div>
            <div class="review-item-content">${r.content}</div>
        </div>
    `).join('');
    
    if (filtered.length === 0) {
        list.innerHTML = '<p style="color:#999;text-align:center;padding:20px">暂无评价</p>';
    }
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
    const hiddenPages = ['cart', 'checkout', 'tracking'];
    
    if (state.cart.length > 0 && !hiddenPages.includes(state.currentPage)) {
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

// 生成随机位置（围绕上海中心 2-4km 范围）
function randomLocation() {
    // 上海人民广场附近
    const centers = [
        [31.2304, 121.4737], // 人民广场
        [31.2122, 121.4510], // 徐家汇
        [31.2492, 121.5020], // 陆家嘴
        [31.2755, 121.4588], // 静安寺
    ];
    const center = centers[Math.floor(Math.random() * centers.length)];
    const latOffset = (Math.random() - 0.5) * 0.025;
    const lngOffset = (Math.random() - 0.5) * 0.03;
    return [center[0] + latOffset, center[1] + lngOffset];
}

// 开始配送追踪 - 动态订单流程 + OSM真实道路路径
function startTracking() {
    showPage('tracking');
    
    const statusIcon = document.getElementById('statusHeroIcon');
    const statusText = document.getElementById('statusHeroText');
    const statusDesc = document.getElementById('statusHeroDesc');
    const progressFill = document.getElementById('statusProgressFill');
    const eta = document.getElementById('etaTime');
    const deliveryTimeLabel = document.getElementById('deliveryTimeLabel');
    const courierAvatar = document.getElementById('courierAvatar');
    const courierCard = document.getElementById('courierCard');
    const riderName = document.getElementById('riderName');
    const riderRating = document.getElementById('riderRating');
    const messages = document.getElementById('mindfulMessages');
    const trackingTitle = document.getElementById('trackingTitle');
    const deliveryTypeBadge = document.getElementById('deliveryTypeBadge');
    
    const isRabbit = state.deliveryType === 'rabbit';
    const emoji = isRabbit ? '🐇' : '🐢';
    const typeName = isRabbit ? '闪电' : '慢享';
    const typeLabel = isRabbit ? 'Express' : 'Standard';
    
    trackingTitle.textContent = `${emoji} ${typeName}配送追踪`;
    deliveryTypeBadge.textContent = typeLabel;
    courierAvatar.textContent = emoji;
    courierCard.style.display = 'none';
    
    const selectedRider = riderNames[Math.floor(Math.random() * riderNames.length)];
    riderName.textContent = selectedRider;
    riderRating.textContent = `${typeLabel} · ★ ${(4.5+Math.random()*0.5).toFixed(1)}`;
    
    // 生成商店和家的位置
    const storePos = randomLocation();
    const homePos = randomLocation();
    
    // === 初始化地图（修复 display:none 后地图白屏/灰屏）===
    if (window._trackingMap) window._trackingMap.remove();
    
    const mapEl = document.getElementById('realMap');
    const map = L.map('realMap', {
        zoomControl: false,
        attributionControl: false
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    // 强制使地图适配容器尺寸（因为页面刚 display:block，Leaflet可能算不准）
    function resizeMap() {
        try { map.invalidateSize(); } catch(e) {}
    }
    // 多次调用确保尺寸正确
    resizeMap();
    setTimeout(resizeMap, 100);
    setTimeout(resizeMap, 400);
    setTimeout(resizeMap, 800);
    
    // 商店图标
    const storeIcon = L.divIcon({
        html: '<div style="font-size:30px;background:#fff;border-radius:50%;padding:4px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🏪</div>',
        className: '', iconSize: [44, 44], iconAnchor: [22, 22]
    });
    const storeMarker = L.marker(storePos, { icon: storeIcon }).addTo(map);
    storeMarker.bindPopup(`<b>${state.currentRestaurant?.name || '商家'}</b>`);
    
    // 家图标
    const homeIcon = L.divIcon({
        html: '<div style="font-size:30px;background:#fff;border-radius:50%;padding:4px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🏠</div>',
        className: '', iconSize: [44, 44], iconAnchor: [22, 22]
    });
    const homeMarker = L.marker(homePos, { icon: homeIcon }).addTo(map);
    homeMarker.bindPopup('<b>你的收货地址</b>');
    
    // 骑手初始位置（商店附近随机偏移）
    const riderSpawn = [
        storePos[0] + (Math.random() - 0.5) * 0.012,
        storePos[1] + (Math.random() - 0.5) * 0.016
    ];
    
    const riderIcon = L.divIcon({
        html: `<div style="font-size:34px;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3))">${emoji}</div>`,
        className: '', iconSize: [48, 48], iconAnchor: [24, 24]
    });
    const riderMarker = L.marker(riderSpawn, { icon: riderIcon, zIndexOffset: 1000 }).addTo(map);
    riderMarker.bindPopup(`<b>${selectedRider}</b>`);
    
    // 先用三点让三者同时显示
    const allPoints = [storePos, homePos, riderSpawn];
    map.fitBounds(L.latLngBounds(allPoints), { padding: [50, 50], maxZoom: 15 });
    
    window._trackingMap = map;
    
    // ===== 从OSRM获取道路路径 =====
    let roadCoords = null;
    let roadLine = null;
    
    function fetchRoute(start, end) {
        const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
        return fetch(url)
            .then(r => r.json())
            .then(data => {
                if (data.code === 'Ok' && data.routes.length > 0) {
                    const coords = data.routes[0].geometry.coordinates;
                    return coords.map(c => [c[1], c[0]]);
                }
                return null;
            })
            .catch(() => null);
    }
    
    // 沿坐标数组做平滑动画
    function animateAlongPath(coords, duration, callback) {
        if (!coords || coords.length < 2) {
            if (callback) callback();
            return;
        }
        const startTime = Date.now();
        function frame() {
            const elapsed = Date.now() - startTime;
            const p = Math.min(elapsed / duration, 1);
            const total = coords.length - 1;
            const pos = p * total;
            const idx = Math.min(Math.floor(pos), total - 1);
            const frac = pos - idx;
            const lat = coords[idx][0] + (coords[idx + 1][0] - coords[idx][0]) * frac;
            const lng = coords[idx][1] + (coords[idx + 1][1] - coords[idx][1]) * frac;
            riderMarker.setLatLng([lat, lng]);
            if (p < 1) {
                requestAnimationFrame(frame);
            } else {
                riderMarker.setLatLng(coords[coords.length - 1]);
                if (callback) callback();
            }
        }
        requestAnimationFrame(frame);
    }
    
    // ===== 配送步骤执行 =====
    // 为了让动画有足够时间，步骤间隔拉长
    const stepDurations = isRabbit ? [500, 800, 1200, 2000, 1500, 2500, 1500, 5000, 5000, 0] : [800, 1200, 2000, 3000, 2000, 4000, 2000, 6500, 6500, 0];
    
    function updateStatus(index, statusInfo) {
        statusIcon.textContent = statusInfo.icon;
        statusText.textContent = statusInfo.label;
        statusDesc.textContent = statusInfo.desc;
        progressFill.style.width = `${Math.min((index + 1) / orderStatuses.length * 100, 100)}%`;
    }
    
    updateStatus(0, orderStatuses[0]);
    
    // 正念提示
    messages.innerHTML = '';
    const messageInterval = setInterval(() => {
        const msg = mindfulMessages[Math.floor(Math.random() * mindfulMessages.length)];
        const div = document.createElement('div');
        div.className = 'mindful-message';
        div.textContent = msg;
        messages.appendChild(div);
        while (messages.children.length > 3) messages.removeChild(messages.firstChild);
    }, 5000);
    
    // 先获取道路路径再开始执行步骤
    fetchRoute(storePos, homePos).then(routeCoords => {
        roadCoords = routeCoords;
        
        // 绘制路线
        if (roadCoords && roadCoords.length >= 5) {
            roadLine = L.polyline(roadCoords, {
                color: '#FF6B35', weight: 4, opacity: 0.7
            }).addTo(map);
        } else {
            // 降级：生成弯曲多段线模拟道路（至少10个点让动画平滑）
            const segments = 10;
            const coords = [];
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const lat = storePos[0] + (homePos[0] - storePos[0]) * t + Math.sin(t * Math.PI * 3) * 0.004;
                const lng = storePos[1] + (homePos[1] - storePos[1]) * t + Math.cos(t * Math.PI * 2) * 0.005;
                coords.push([lat, lng]);
            }
            roadCoords = coords;
            roadLine = L.polyline(roadCoords, {
                color: '#FF6B35', weight: 4, opacity: 0.7
            }).addTo(map);
        }
        
        executeStep(0);
    }).catch(() => {
        // 降级：同样生成弯曲路径
        const segments = 10;
        const coords = [];
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const lat = storePos[0] + (homePos[0] - storePos[0]) * t + Math.sin(t * Math.PI * 3) * 0.004;
            const lng = storePos[1] + (homePos[1] - storePos[1]) * t + Math.cos(t * Math.PI * 2) * 0.005;
            coords.push([lat, lng]);
        }
        roadCoords = coords;
        roadLine = L.polyline(roadCoords, {
            color: '#FF6B35', weight: 4, opacity: 0.7
        }).addTo(map);
        executeStep(0);
    });
    
    let riderAtStore = false;
    
    function executeStep(index) {
        if (index >= stepDurations.length) return;
        const wait = stepDurations[index];
        const statusInfo = orderStatuses[index];
        
        setTimeout(() => {
            updateStatus(index + 1, statusInfo);
            deliveryTimeLabel.textContent = statusInfo.desc;
            
            switch (statusInfo.key) {
                case 'ordered':
                    eta.textContent = '--';
                    break;
                case 'paid':
                    eta.textContent = '⌛';
                    break;
                case 'accepted':
                    eta.textContent = `${isRabbit ? 15 : 25}min`;
                    break;
                case 'rider_assigned':
                    courierCard.style.display = 'block';
                    riderMarker.setPopupContent(`<b>${selectedRider}</b><br>📍 正赶往商家`);
                    // 骑手从 spawn 滑到商店（不依赖roadCoords）
                    const spawnLine = L.polyline([riderSpawn, storePos], {
                        color: '#FF6B35', weight: 3, opacity: 0.4, dashArray: '6 4'
                    }).addTo(map);
                    animateAlongPath([riderSpawn, storePos], isRabbit ? 1800 : 3000, () => {
                        try { map.removeLayer(spawnLine); } catch(e) {}
                        riderAtStore = true;
                        riderMarker.setPopupContent(`<b>${selectedRider}</b><br>📍 已到店`);
                    });
                    break;
                case 'rider_arrived':
                    // 如果动画还没完成（极少情况），强制移到商店
                    if (!riderAtStore) {
                        riderMarker.setLatLng(storePos);
                    }
                    riderAtStore = true;
                    riderMarker.setPopupContent(`<b>${selectedRider}</b><br>📍 已到店`);
                    break;
                case 'preparing':
                    riderMarker.setPopupContent(`<b>${selectedRider}</b><br>👨‍🍳 等待出餐`);
                    break;
                case 'picked_up':
                    if (roadLine) roadLine.setStyle({ opacity: 0.9, weight: 4 });
                    riderMarker.setPopupContent(`<b>${selectedRider}</b><br>🎒 已取餐`);
                    break;
                case 'delivering':
                    const dur = stepDurations[index];
                    riderMarker.setPopupContent(`<b>${selectedRider}</b><br>🛵 配送中`);
                    animateAlongPath(roadCoords, dur, () => {
                        riderMarker.setPopupContent(`<b>${selectedRider}</b><br>📬 已送达`);
                    });
                    break;
                case 'delivered':
                    riderMarker.setLatLng(homePos);
                    riderMarker.setPopupContent(`<b>${selectedRider}</b><br>📬 已送达！`);
                    eta.textContent = '0min';
                    break;
                case 'completed':
                    clearInterval(messageInterval);
                    setTimeout(() => showCompletion(), 600);
                    break;
            }
            
            executeStep(index + 1);
        }, wait);
    }
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
    
    // 深色模式 - 从保存的用户偏好读取
    const savedDark = localStorage.getItem('fakeDeliveryDarkMode');
    if (savedDark === 'true') {
        document.body.classList.add('dark-mode');
    }
    document.getElementById('darkModeBtn').textContent = savedDark === 'true' ? '☀️' : '🌙';
    
    // 深色模式切换
    document.getElementById('darkModeBtn').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('fakeDeliveryDarkMode', isDark.toString());
        document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
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
    
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        // 显示已保存地址
        const saved = localStorage.getItem('fakeDeliveryAddress');
        const savedCard = document.getElementById('savedAddressCard');
        const savedInfo = document.getElementById('savedAddressInfo');
        
        if (saved) {
            try {
                const addr = JSON.parse(saved);
                savedInfo.innerHTML = `
                    <div class="addr-name">${addr.name}</div>
                    <div>📞 ${addr.phone}</div>
                    <div>📍 ${addr.address}</div>
                `;
                savedCard.style.display = 'block';
            } catch(e) {
                savedCard.style.display = 'none';
            }
        } else {
            savedCard.style.display = 'none';
        }
        
        showPage('checkout');
    });
    
    // 使用已保存地址
    document.getElementById('useSavedAddrBtn').addEventListener('click', () => {
        const saved = localStorage.getItem('fakeDeliveryAddress');
        if (saved) {
            const addr = JSON.parse(saved);
            document.getElementById('receiverName').value = addr.name;
            document.getElementById('receiverPhone').value = addr.phone;
            document.getElementById('receiverAddress').value = addr.address;
            document.getElementById('savedAddressCard').style.display = 'none';
            showToast('已填入上次地址 ✅');
        }
    });
    
    document.getElementById('confirmOrderBtn').addEventListener('click', () => {
        const name = document.getElementById('receiverName').value.trim();
        const phone = document.getElementById('receiverPhone').value.trim();
        const address = document.getElementById('receiverAddress').value.trim();
        
        if (!name || !phone || !address) {
            showToast('请填写完整信息');
            return;
        }
        
        // 保存地址到本地
        const addrData = { name, phone, address };
        localStorage.setItem('fakeDeliveryAddress', JSON.stringify(addrData));
        
        // 显示支付弹窗
        const total = state.cart.reduce((sum, item) => sum + item.price, 0) + (state.deliveryType === 'rabbit' ? 3 : 5);
        showPaymentModal(total);
    });
    
    // 自动填充已保存的地址
    (function loadSavedAddress() {
        const saved = localStorage.getItem('fakeDeliveryAddress');
        if (saved) {
            try {
                const addr = JSON.parse(saved);
                document.getElementById('receiverName').value = addr.name || '';
                document.getElementById('receiverPhone').value = addr.phone || '';
                document.getElementById('receiverAddress').value = addr.address || '';
            } catch(e) {}
        }
    })();
    
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
