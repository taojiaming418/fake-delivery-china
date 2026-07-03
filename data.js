// 中国餐厅数据
const restaurants = [
    {
        id: 1,
        name: "老重庆火锅",
        cuisine: "火锅",
        rating: 4.8,
        reviews: 3256,
        deliveryTime: "30~45min",
        deliveryFee: 3,
        emoji: "",
        tag: "热门",
        menu: [
            { name: "麻辣牛油锅底", desc: "正宗重庆老火锅，辣而不燥", calories: 850, price: 68, emoji: "🌶️" },
            { name: "鲜切牛肉", desc: "每日新鲜现切，嫩滑可口", calories: 320, price: 48, emoji: "🥩" },
            { name: "毛肚", desc: "七上八下，脆嫩爽口", calories: 180, price: 38, emoji: "" },
            { name: "鸭肠", desc: "新鲜鸭肠，爽脆弹牙", calories: 150, price: 32, emoji: "" },
            { name: "红糖糍粑", desc: "外酥里糯，甜蜜解辣", calories: 280, price: 18, emoji: "🍡" }
        ]
    },
    {
        id: 2,
        name: "串门子烧烤",
        cuisine: "烧烤",
        rating: 4.7,
        reviews: 2891,
        deliveryTime: "25~40min",
        deliveryFee: 4,
        emoji: "🍢",
        tag: "热门",
        menu: [
            { name: "羊肉串(10串)", desc: "新疆羊肉，肥瘦相间", calories: 450, price: 35, emoji: "🍖" },
            { name: "烤韭菜", desc: "蒜蓉烤制，香气扑鼻", calories: 120, price: 12, emoji: "🥬" },
            { name: "烤茄子", desc: "整只烤制，蒜香浓郁", calories: 180, price: 15, emoji: "🍆" },
            { name: "烤生蚝(6只)", desc: "新鲜生蚝，蒜蓉粉丝", calories: 220, price: 48, emoji: "🦪" },
            { name: "冰啤酒", desc: "清爽解腻，烧烤必备", calories: 150, price: 8, emoji: "🍺" }
        ]
    },
    {
        id: 3,
        name: "喜茶 HEYTEA",
        cuisine: "奶茶",
        rating: 4.9,
        reviews: 5678,
        deliveryTime: "15~25min",
        deliveryFee: 2,
        emoji: "🧋",
        tag: "推荐",
        menu: [
            { name: "多肉葡萄", desc: "新鲜葡萄果肉，清爽解渴", calories: 280, price: 28, emoji: "🍇" },
            { name: "芝芝莓莓", desc: "草莓芝士奶盖，酸甜可口", calories: 320, price: 30, emoji: "🍓" },
            { name: "烤黑糖波波牛乳", desc: "黑糖珍珠，浓郁奶香", calories: 380, price: 26, emoji: "🥛" },
            { name: "杨枝甘露", desc: "芒果西柚，经典港式甜品", calories: 260, price: 25, emoji: "🥭" }
        ]
    },
    {
        id: 4,
        name: "螺蛳粉之家",
        cuisine: "小吃",
        rating: 4.6,
        reviews: 4123,
        deliveryTime: "20~35min",
        deliveryFee: 3,
        emoji: "",
        tag: "热门",
        menu: [
            { name: "经典螺粉", desc: "正宗柳州风味，酸辣鲜爽", calories: 520, price: 18, emoji: "🍜" },
            { name: "加辣加臭螺蛳粉", desc: "双倍酸笋，臭味加倍", calories: 550, price: 20, emoji: "🌶️" },
            { name: "炸蛋螺蛳粉", desc: "加个炸蛋，满足感翻倍", calories: 680, price: 25, emoji: "🍳" },
            { name: "木薯羹", desc: "清甜解辣，螺蛳粉好搭档", calories: 180, price: 8, emoji: "🍮" }
        ]
    },
    {
        id: 5,
        name: "麦当劳 McDonald's",
        cuisine: "快餐",
        rating: 4.5,
        reviews: 8901,
        deliveryTime: "20~30min",
        deliveryFee: 5,
        emoji: "🍔",
        tag: "连锁",
        menu: [
            { name: "巨无霸套餐", desc: "经典双层牛肉堡+薯条+可乐", calories: 980, price: 35, emoji: "🍔" },
            { name: "麦辣鸡腿堡", desc: "香辣鸡腿，外酥里嫩", calories: 720, price: 22, emoji: "🍗" },
            { name: "麦乐鸡(10块)", desc: "金黄酥脆，蘸酱更美味", calories: 450, price: 25, emoji: "🍗" },
            { name: "薯条(大)", desc: "金黄酥脆，经典配菜", calories: 380, price: 15, emoji: "🍟" },
            { name: "可乐(大)", desc: "冰爽解渴，气泡十足", calories: 180, price: 12, emoji: "🥤" }
        ]
    },
    {
        id: 6,
        name: "张亮麻辣烫",
        cuisine: "麻辣烫",
        rating: 4.4,
        reviews: 3567,
        deliveryTime: "25~35min",
        deliveryFee: 3,
        emoji: "🥘",
        tag: "连锁",
        menu: [
            { name: "经典麻辣烫", desc: "自选菜品，麻辣鲜香", calories: 480, price: 25, emoji: "🥘" },
            { name: "骨汤麻辣烫", desc: "浓郁骨汤，不辣也美味", calories: 450, price: 28, emoji: "🍲" },
            { name: "番茄麻辣烫", desc: "酸甜番茄，开胃解腻", calories: 420, price: 26, emoji: "🍅" },
            { name: "加方便面", desc: "Q弹爽滑，吸满汤汁", calories: 350, price: 5, emoji: "🍜" }
        ]
    },
    {
        id: 7,
        name: "日料寿司郎",
        cuisine: "日料",
        rating: 4.8,
        reviews: 2345,
        deliveryTime: "30~45min",
        deliveryFee: 6,
        emoji: "🍣",
        tag: "推荐",
        menu: [
            { name: "三文鱼刺身(6片)", desc: "新鲜三文鱼，入口即化", calories: 280, price: 48, emoji: "" },
            { name: "鳗鱼寿司(2贯)", desc: "蒲烧鳗鱼，甜咸适中", calories: 220, price: 32, emoji: "🍣" },
            { name: "豚骨拉面", desc: "浓郁猪骨汤，叉烧入味", calories: 650, price: 38, emoji: "🍜" },
            { name: "天妇罗拼盘", desc: "虾+蔬菜，酥脆不腻", calories: 380, price: 35, emoji: "🍤" },
            { name: "抹茶冰淇淋", desc: "清新抹茶，微苦回甘", calories: 180, price: 15, emoji: "🍦" }
        ]
    },
    {
        id: 8,
        name: "韩式炸鸡店",
        cuisine: "韩餐",
        rating: 4.7,
        reviews: 1987,
        deliveryTime: "25~40min",
        deliveryFee: 4,
        emoji: "🍗",
        tag: "热门",
        menu: [
            { name: "原味炸鸡(半只)", desc: "外酥里嫩，经典口味", calories: 850, price: 45, emoji: "" },
            { name: "甜辣炸鸡(半只)", desc: "韩式甜辣酱，甜中带辣", calories: 920, price: 48, emoji: "🌶️" },
            { name: "芝士炸鸡(半只)", desc: "浓郁芝士，拉丝满足", calories: 980, price: 52, emoji: "🧀" },
            { name: "年糕", desc: "韩式辣炒年糕，软糯Q弹", calories: 320, price: 18, emoji: "🍡" },
            { name: "泡菜汤", desc: "酸辣开胃，暖胃首选", calories: 180, price: 15, emoji: "🥣" }
        ]
    },
    {
        id: 9,
        name: "披萨必胜客",
        cuisine: "披萨",
        rating: 4.6,
        reviews: 3456,
        deliveryTime: "30~45min",
        deliveryFee: 5,
        emoji: "",
        tag: "连锁",
        menu: [
            { name: "超级至尊披萨(12寸)", desc: "火腿+香肠+青椒+蘑菇", calories: 1200, price: 88, emoji: "🍕" },
            { name: "夏威夷披萨(12寸)", desc: "火腿+菠萝，甜咸搭配", calories: 1050, price: 78, emoji: "🍍" },
            { name: "鸡翅(6块)", desc: "奥尔良烤翅，外焦里嫩", calories: 420, price: 32, emoji: "🍗" },
            { name: "意面", desc: "经典肉酱意面，浓郁可口", calories: 580, price: 35, emoji: "🍝" }
        ]
    },
    {
        id: 10,
        name: "兰州拉面",
        cuisine: "面食",
        rating: 4.5,
        reviews: 2678,
        deliveryTime: "20~30min",
        deliveryFee: 3,
        emoji: "🍜",
        tag: "连锁",
        menu: [
            { name: "牛肉拉面", desc: "手工拉面，汤清肉烂", calories: 580, price: 22, emoji: "🍜" },
            { name: "炒拉面", desc: "大火翻炒，锅气十足", calories: 650, price: 25, emoji: "🍝" },
            { name: "牛肉盖饭", desc: "大片牛肉，米饭管够", calories: 720, price: 28, emoji: "🍚" },
            { name: "凉菜拼盘", desc: "黄瓜+木耳+腐竹，清爽解腻", calories: 180, price: 15, emoji: "🥗" }
        ]
    },
    {
        id: 11,
        name: "沙县小吃",
        cuisine: "小吃",
        rating: 4.3,
        reviews: 4567,
        deliveryTime: "15~25min",
        deliveryFee: 2,
        emoji: "🥟",
        tag: "连锁",
        menu: [
            { name: "拌面+扁肉", desc: "经典套餐，花生酱香浓", calories: 520, price: 15, emoji: "🍜" },
            { name: "蒸饺(10个)", desc: "皮薄馅大，鲜美多汁", calories: 380, price: 12, emoji: "🥟" },
            { name: "炖罐汤", desc: "乌鸡/排骨/鸽子，滋补养生", calories: 220, price: 18, emoji: "🍲" },
            { name: "卤蛋", desc: "入味卤制，蛋白Q弹", calories: 80, price: 3, emoji: "🥚" }
        ]
    },
    {
        id: 12,
        name: "星巴克 Starbucks",
        cuisine: "咖啡",
        rating: 4.7,
        reviews: 6789,
        deliveryTime: "15~25min",
        deliveryFee: 4,
        emoji: "",
        tag: "连锁",
        menu: [
            { name: "拿铁(大杯)", desc: "浓缩咖啡+奶泡，经典之选", calories: 180, price: 35, emoji: "☕" },
            { name: "卡布奇诺(大杯)", desc: "浓郁咖啡+绵密奶泡", calories: 160, price: 35, emoji: "☕" },
            { name: "星冰乐(大杯)", desc: "冰沙+咖啡，夏日必备", calories: 280, price: 38, emoji: "🧊" },
            { name: "可颂", desc: "酥脆黄油香，咖啡好搭档", calories: 320, price: 18, emoji: "🥐" }
        ]
    },
    {
        id: 13,
        name: "黄焖鸡米饭",
        cuisine: "快餐",
        rating: 4.4,
        reviews: 3890,
        deliveryTime: "20~30min",
        deliveryFee: 3,
        emoji: "🍗",
        tag: "连锁",
        menu: [
            { name: "经典黄焖鸡", desc: "鲜嫩鸡肉+土豆+青椒", calories: 680, price: 22, emoji: "🍗" },
            { name: "加米饭", desc: "东北大米，粒粒分明", calories: 280, price: 3, emoji: "🍚" },
            { name: "加金针菇", desc: "爽滑金针菇，吸满汤汁", calories: 80, price: 5, emoji: "🍄" },
            { name: "加豆腐皮", desc: "豆制品，营养丰富", calories: 120, price: 5, emoji: "" }
        ]
    },
    {
        id: 14,
        name: "烤鱼店",
        cuisine: "烤鱼",
        rating: 4.6,
        reviews: 2134,
        deliveryTime: "35~50min",
        deliveryFee: 5,
        emoji: "🐟",
        tag: "热门",
        menu: [
            { name: "麻辣烤鱼(清江鱼)", desc: "外焦里嫩，麻辣鲜香", calories: 850, price: 68, emoji: "🐟" },
            { name: "蒜香烤鱼", desc: "蒜香浓郁，不辣也美味", calories: 820, price: 68, emoji: "🧄" },
            { name: "烤鱼配菜", desc: "土豆+藕片+豆皮+金针菇", calories: 320, price: 25, emoji: "🥬" },
            { name: "冰粉", desc: "清凉解辣，夏日必备", calories: 120, price: 10, emoji: "🍮" }
        ]
    },
    {
        id: 15,
        name: "便利店 7-11",
        cuisine: "便利店",
        rating: 4.2,
        reviews: 9876,
        deliveryTime: "15~20min",
        deliveryFee: 2,
        emoji: "🏪",
        tag: "连锁",
        menu: [
            { name: "便当(宫保鸡丁)", desc: "微波加热即食，方便快捷", calories: 580, price: 18, emoji: "🍱" },
            { name: "饭团(金枪鱼)", desc: "海苔包裹，鲜美可口", calories: 220, price: 8, emoji: "🍙" },
            { name: "关东煮(3串)", desc: "萝卜+魔芋丝+鱼丸", calories: 150, price: 12, emoji: "🍢" },
            { name: "矿泉水", desc: "550ml，解渴必备", calories: 0, price: 3, emoji: "💧" }
        ]
    },
    {
        id: 16,
        name: "甜品屋",
        cuisine: "甜品",
        rating: 4.8,
        reviews: 1567,
        deliveryTime: "20~30min",
        deliveryFee: 4,
        emoji: "🍰",
        tag: "推荐",
        menu: [
            { name: "草莓蛋糕", desc: "新鲜草莓+奶油，甜蜜满足", calories: 420, price: 35, emoji: "" },
            { name: "提拉米苏", desc: "经典意式甜品，咖啡酒香", calories: 380, price: 32, emoji: "🍰" },
            { name: "芒果班戟", desc: "新鲜芒果+奶油，港式经典", calories: 350, price: 28, emoji: "🥭" },
            { name: "双皮奶", desc: "顺德传统甜品，奶香浓郁", calories: 220, price: 18, emoji: "🍮" }
        ]
    },
    {
        id: 17,
        name: "新疆大盘鸡",
        cuisine: "新疆菜",
        rating: 4.7,
        reviews: 1890,
        deliveryTime: "30~45min",
        deliveryFee: 4,
        emoji: "🍗",
        tag: "特色",
        menu: [
            { name: "大盘鸡(中份)", desc: "鸡肉+土豆+皮带面，分量十足", calories: 980, price: 58, emoji: "🍗" },
            { name: "烤包子(2个)", desc: "羊肉馅，外酥里嫩", calories: 380, price: 15, emoji: "🥟" },
            { name: "手抓饭", desc: "羊肉+胡萝卜+葡萄干", calories: 720, price: 32, emoji: "🍚" },
            { name: "酸奶", desc: "新疆特色酸奶，酸甜可口", calories: 120, price: 8, emoji: "🥛" }
        ]
    },
    {
        id: 18,
        name: "酸菜鱼",
        cuisine: "川菜",
        rating: 4.6,
        reviews: 2456,
        deliveryTime: "30~40min",
        deliveryFee: 4,
        emoji: "🐟",
        tag: "热门",
        menu: [
            { name: "经典酸菜鱼", desc: "鲜嫩鱼片+酸菜，酸辣开胃", calories: 620, price: 48, emoji: "🐟" },
            { name: "金汤酸菜鱼", desc: "南瓜汤底，色泽金黄", calories: 580, price: 52, emoji: "🎃" },
            { name: "加米饭", desc: "东北大米，粒粒分明", calories: 280, price: 3, emoji: "🍚" },
            { name: "小酥肉", desc: "外酥里嫩，蘸干碟更香", calories: 420, price: 22, emoji: "🍖" }
        ]
    },
    {
        id: 19,
        name: "煎饼果子",
        cuisine: "早餐",
        rating: 4.5,
        reviews: 3210,
        deliveryTime: "10~20min",
        deliveryFee: 2,
        emoji: "🥞",
        tag: "早餐",
        menu: [
            { name: "经典煎饼果子", desc: "绿豆面+鸡蛋+薄脆+葱花", calories: 380, price: 8, emoji: "🥞" },
            { name: "加肠煎饼", desc: "加根火腿肠，满足感翻倍", calories: 450, price: 12, emoji: "🌭" },
            { name: "加蛋煎饼", desc: "双蛋煎饼，营养加倍", calories: 420, price: 10, emoji: "" },
            { name: "豆浆", desc: "现磨豆浆，香浓顺滑", calories: 120, price: 4, emoji: "🥛" }
        ]
    },
    {
        id: 20,
        name: "卤味店",
        cuisine: "卤味",
        rating: 4.4,
        reviews: 2789,
        deliveryTime: "15~25min",
        deliveryFee: 3,
        emoji: "🍖",
        tag: "夜宵",
        menu: [
            { name: "卤鸭脖(5根)", desc: "麻辣入味，啃得过瘾", calories: 280, price: 18, emoji: "" },
            { name: "卤鸡翅(4个)", desc: "酱香浓郁，肉质鲜嫩", calories: 320, price: 22, emoji: "" },
            { name: "卤藕片", desc: "爽脆藕片，卤香十足", calories: 150, price: 12, emoji: "🥬" },
            { name: "卤豆干", desc: "豆制品，嚼劲十足", calories: 180, price: 10, emoji: "🫘" }
        ]
    }
];

// 骑手名字
const riderNames = ["张师傅", "李师傅", "王师傅", "刘师傅", "陈师傅", "杨师傅", "赵师傅", "黄师傅"];

// 正念提示语
const mindfulMessages = [
    "深呼吸，感受这一刻的平静 🧘",
    " cravings 就像海浪，会来也会走 🌊",
    "你已经做出了健康的选择 💪",
    "省下的钱可以买更需要的东西 💰",
    "你的身体会感谢你的决定 🙏",
    "每一次克制都是对自己的投资 📈",
    "想想明天的自己，会感谢现在的你 ⭐",
    "你比你的 cravings 更强大 "
];

// 成就列表
const achievements = [
    { id: "first_order", name: "初次体验", desc: "完成第一笔假装订单", icon: "🎉", condition: (stats) => stats.orders >= 1 },
    { id: "save_100", name: "省钱小能手", desc: "累计省下100元", icon: "💰", condition: (stats) => stats.savedMoney >= 100 },
    { id: "save_500", name: "理财达人", desc: "累计省下500元", icon: "💎", condition: (stats) => stats.savedMoney >= 500 },
    { id: "save_1000", name: "万元户", desc: "累计省下1000元", icon: "", condition: (stats) => stats.savedMoney >= 1000 },
    { id: "calories_1000", name: "健康卫士", desc: "累计省下1000卡路里", icon: "💪", condition: (stats) => stats.savedCalories >= 1000 },
    { id: "calories_5000", name: "健身达人", desc: "累计省下5000卡路里", icon: "🏆", condition: (stats) => stats.savedCalories >= 5000 },
    { id: "orders_10", name: "常客", desc: "完成10笔订单", icon: "⭐", condition: (stats) => stats.orders >= 10 },
    { id: "orders_50", name: "忠实用户", desc: "完成50笔订单", icon: "🌟", condition: (stats) => stats.orders >= 50 },
    { id: "late_night", name: "夜猫子", desc: "深夜(22:00-6:00)下单", icon: "🌙", condition: (stats) => stats.lateNightOrders >= 1 },
    { id: "variety_5", name: "美食家", desc: "尝试5家不同餐厅", icon: "️", condition: (stats) => stats.uniqueRestaurants >= 5 }
];
