// 中国餐厅数据 - 每个菜品都有配置选项
const restaurants = [
    {
        id: 1,
        name: "老重庆火锅",
        cuisine: "火锅",
        rating: 4.8,
        reviews: 3256,
        deliveryTime: "30~45min",
        deliveryFee: 3,
        minOrder: 20,
        emoji: "",
        tag: "热门",
        menu: [
            { name: "麻辣牛油锅底", desc: "正宗重庆老火锅，辣而不燥", calories: 850, price: 68, emoji: "🌶️", options: [
                { type: "辣度", choices: ["微辣", "中辣", "特辣", "变态辣"], default: 1 },
                { type: "锅底", choices: ["红汤", "鸳鸯锅(+5元)", "番茄锅(+5元)"], default: 0 }
            ]},
            { name: "鲜切牛肉", desc: "每日新鲜现切，嫩滑可口", calories: 320, price: 48, emoji: "🥩", options: [
                { type: "份量", choices: ["一份", "双份(+20元)"], default: 0 }
            ]},
            { name: "毛肚", desc: "七上八下，脆嫩爽口", calories: 180, price: 38, emoji: "", options: [] },
            { name: "鸭肠", desc: "新鲜鸭肠，爽脆弹牙", calories: 150, price: 32, emoji: "", options: [] },
            { name: "红糖糍粑", desc: "外酥里糯，甜蜜解辣", calories: 280, price: 18, emoji: "🍡", options: [
                { type: "数量", choices: ["1份", "2份(+10元)"], default: 0 }
            ]}
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
        minOrder: 15,
        emoji: "🍢",
        tag: "热门",
        menu: [
            { name: "羊肉串(10串)", desc: "新疆羊肉，肥瘦相间", calories: 450, price: 35, emoji: "🍖", options: [
                { type: "口味", choices: ["原味", "孜然", "微辣", "重辣"], default: 1 }
            ]},
            { name: "烤韭菜", desc: "蒜蓉烤制，香气扑鼻", calories: 120, price: 12, emoji: "🥬", options: [
                { type: "加料", choices: ["原味", "加蒜蓉(+2元)", "加芝士(+3元)"], default: 0 }
            ]},
            { name: "烤茄子", desc: "整只烤制，蒜香浓郁", calories: 180, price: 15, emoji: "🍆", options: [
                { type: "口味", choices: ["蒜蓉", "香辣", "酱香"], default: 0 }
            ]},
            { name: "烤生蚝(6只)", desc: "新鲜生蚝，蒜蓉粉丝", calories: 220, price: 48, emoji: "🦪", options: [
                { type: "做法", choices: ["蒜蓉", "原味", "芝士焗(+5元)"], default: 0 }
            ]},
            { name: "冰啤酒", desc: "清爽解腻，烧烤必备", calories: 150, price: 8, emoji: "🍺", options: [
                { type: "品牌", choices: ["雪花", "青岛", "哈尔滨"], default: 0 }
            ]}
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
        minOrder: 15,
        emoji: "🧋",
        tag: "推荐",
        menu: [
            { name: "多肉葡萄", desc: "新鲜葡萄果肉，清爽解渴", calories: 280, price: 28, emoji: "🍇", options: [
                { type: "甜度", choices: ["正常糖", "七分糖", "半糖", "三分糖", "不加糖"], default: 1 },
                { type: "冰量", choices: ["正常冰", "少冰", "去冰", "温热"], default: 0 },
                { type: "加料", choices: ["无", "加椰果(+3元)", "加珍珠(+3元)", "加芦荟(+3元)"], default: 0 }
            ]},
            { name: "芝芝莓莓", desc: "草莓芝士奶盖，酸甜可口", calories: 320, price: 30, emoji: "🍓", options: [
                { type: "甜度", choices: ["正常糖", "七分糖", "半糖", "三分糖"], default: 1 },
                { type: "冰量", choices: ["正常冰", "少冰", "去冰"], default: 0 }
            ]},
            { name: "烤黑糖波波牛乳", desc: "黑糖珍珠，浓郁奶香", calories: 380, price: 26, emoji: "🥛", options: [
                { type: "甜度", choices: ["正常糖", "半糖", "三分糖"], default: 0 },
                { type: "温度", choices: ["冰", "热"], default: 0 }
            ]},
            { name: "杨枝甘露", desc: "芒果西柚，经典港式甜品", calories: 260, price: 25, emoji: "🥭", options: [
                { type: "甜度", choices: ["正常糖", "半糖", "不加糖"], default: 0 }
            ]}
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
        minOrder: 12,
        emoji: "",
        tag: "热门",
        menu: [
            { name: "经典螺蛳粉", desc: "正宗柳州风味，酸辣鲜爽", calories: 520, price: 18, emoji: "🍜", options: [
                { type: "辣度", choices: ["不辣", "微辣", "中辣", "特辣"], default: 2 },
                { type: "加料", choices: ["标准", "加腐竹(+3元)", "加卤蛋(+3元)", "加腐竹+卤蛋(+5元)"], default: 0 },
                { type: "酸笋", choices: ["正常酸笋", "多加酸笋", "不要酸笋"], default: 0 }
            ]},
            { name: "加辣加臭螺蛳粉", desc: "双倍酸笋，臭味加倍", calories: 550, price: 20, emoji: "🌶️", options: [
                { type: "臭度", choices: ["正常臭", "加臭", "变态臭"], default: 1 }
            ]},
            { name: "炸蛋螺蛳粉", desc: "加个炸蛋，满足感翻倍", calories: 680, price: 25, emoji: "🍳", options: [
                { type: "辣度", choices: ["微辣", "中辣", "特辣"], default: 1 }
            ]},
            { name: "木薯羹", desc: "清甜解辣，螺蛳粉好搭档", calories: 180, price: 8, emoji: "🍮", options: [] }
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
        minOrder: 0,
        emoji: "🍔",
        tag: "连锁",
        menu: [
            { name: "巨无霸套餐", desc: "经典双层牛肉堡+薯条+可乐", calories: 980, price: 35, emoji: "🍔", options: [
                { type: "薯条", choices: ["中薯", "大薯(+3元)"], default: 0 },
                { type: "饮料", choices: ["中可乐", "大可乐(+2元)", "雪碧", "芬达"], default: 0 },
                { type: "酱料", choices: ["番茄酱", "烧烤酱", "甜酸酱"], default: 0 }
            ]},
            { name: "麦辣鸡腿堡", desc: "香辣鸡腿，外酥里嫩", calories: 720, price: 22, emoji: "🍗", options: [
                { type: "辣度", choices: ["不辣", "微辣", "正常辣"], default: 2 },
                { type: "加料", choices: ["标准", "加芝士(+3元)", "加培根(+5元)"], default: 0 }
            ]},
            { name: "麦乐鸡(10块)", desc: "金黄酥脆，蘸酱更美味", calories: 450, price: 25, emoji: "🍗", options: [
                { type: "蘸酱", choices: ["番茄酱", "甜酸酱", "烧烤酱", "蜂蜜芥末"], default: 0 },
                { type: "份量", choices: ["10块", "20块(+20元)"], default: 0 }
            ]},
            { name: "薯条(大)", desc: "金黄酥脆，经典配菜", calories: 380, price: 15, emoji: "🍟", options: [
                { type: "酱料", choices: ["番茄酱", "不蘸酱"], default: 0 }
            ]},
            { name: "可乐(大)", desc: "冰爽解渴，气泡十足", calories: 180, price: 12, emoji: "🥤", options: [
                { type: "温度", choices: ["加冰", "去冰"], default: 0 }
            ]}
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
        minOrder: 15,
        emoji: "🥘",
        tag: "连锁",
        menu: [
            { name: "经典麻辣烫", desc: "自选菜品，麻辣鲜香", calories: 480, price: 25, emoji: "🥘", options: [
                { type: "辣度", choices: ["不辣", "微辣", "中辣", "特辣"], default: 2 },
                { type: "汤底", choices: ["麻辣", "骨汤", "番茄", "酸辣"], default: 0 }
            ]},
            { name: "骨汤麻辣烫", desc: "浓郁骨汤，不辣也美味", calories: 450, price: 28, emoji: "🍲", options: [
                { type: "加料", choices: ["标准", "加方便面(+5元)", "加宽粉(+3元)"], default: 0 }
            ]},
            { name: "番茄麻辣烫", desc: "酸甜番茄，开胃解腻", calories: 420, price: 26, emoji: "🍅", options: [] },
            { name: "加方便面", desc: "Q弹爽滑，吸满汤汁", calories: 350, price: 5, emoji: "🍜", options: [] }
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
        minOrder: 30,
        emoji: "🍣",
        tag: "推荐",
        menu: [
            { name: "三文鱼刺身(6片)", desc: "新鲜三文鱼，入口即化", calories: 280, price: 48, emoji: "", options: [
                { type: "酱料", choices: ["酱油+芥末", "酱油", "柠檬汁"], default: 0 }
            ]},
            { name: "鳗鱼寿司(2贯)", desc: "蒲烧鳗鱼，甜咸适中", calories: 220, price: 32, emoji: "🍣", options: [] },
            { name: "豚骨拉面", desc: "浓郁猪骨汤，叉烧入味", calories: 650, price: 38, emoji: "🍜", options: [
                { type: "面条硬度", choices: ["软", "普通", "偏硬", "极硬"], default: 1 },
                { type: "加料", choices: ["标准", "加叉烧(+8元)", "加溏心蛋(+5元)", "加海苔(+3元)"], default: 0 }
            ]},
            { name: "天妇罗拼盘", desc: "虾+蔬菜，酥脆不腻", calories: 380, price: 35, emoji: "🍤", options: [
                { type: "蘸酱", choices: ["天妇罗汁", "抹茶盐", "柠檬汁"], default: 0 }
            ]},
            { name: "抹茶冰淇淋", desc: "清新抹茶，微苦回甘", calories: 180, price: 15, emoji: "🍦", options: [
                { type: "份量", choices: ["单球", "双球(+8元)"], default: 0 }
            ]}
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
        minOrder: 25,
        emoji: "🍗",
        tag: "热门",
        menu: [
            { name: "原味炸鸡(半只)", desc: "外酥里嫩，经典口味", calories: 850, price: 45, emoji: "", options: [
                { type: "份量", choices: ["半只", "一只(+30元)"], default: 0 },
                { type: "蘸酱", choices: ["无", "甜辣酱", "蒜香酱", "芝士酱"], default: 0 }
            ]},
            { name: "甜辣炸鸡(半只)", desc: "韩式甜辣酱，甜中带辣", calories: 920, price: 48, emoji: "🌶️", options: [
                { type: "辣度", choices: ["微辣", "正常辣", "特辣"], default: 1 }
            ]},
            { name: "芝士炸鸡(半只)", desc: "浓郁芝士，拉丝满足", calories: 980, price: 52, emoji: "🧀", options: [] },
            { name: "年糕", desc: "韩式辣炒年糕，软糯Q弹", calories: 320, price: 18, emoji: "🍡", options: [
                { type: "辣度", choices: ["微辣", "中辣"], default: 0 }
            ]},
            { name: "泡菜汤", desc: "酸辣开胃，暖胃首选", calories: 180, price: 15, emoji: "🥣", options: [
                { type: "加料", choices: ["标准", "加豆腐(+3元)", "加拉面(+5元)"], default: 0 }
            ]}
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
        minOrder: 30,
        emoji: "",
        tag: "连锁",
        menu: [
            { name: "超级至尊披萨(12寸)", desc: "火腿+香肠+青椒+蘑菇", calories: 1200, price: 88, emoji: "🍕", options: [
                { type: "饼底", choices: ["经典手拍", "薄脆(+5元)", "芝心(+8元)"], default: 0 },
                { type: "尺寸", choices: ["9寸(-20元)", "12寸", "15寸(+20元)"], default: 1 }
            ]},
            { name: "夏威夷披萨(12寸)", desc: "火腿+菠萝，甜咸搭配", calories: 1050, price: 78, emoji: "🍍", options: [
                { type: "饼底", choices: ["经典手拍", "薄脆(+5元)", "芝心(+8元)"], default: 0 }
            ]},
            { name: "鸡翅(6块)", desc: "奥尔良烤翅，外焦里嫩", calories: 420, price: 32, emoji: "🍗", options: [
                { type: "口味", choices: ["奥尔良", "蜜汁", "香辣"], default: 0 }
            ]},
            { name: "意面", desc: "经典肉酱意面，浓郁可口", calories: 580, price: 35, emoji: "🍝", options: [
                { type: "口味", choices: ["肉酱", "奶油培根", "番茄"], default: 0 }
            ]}
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
        minOrder: 0,
        emoji: "🍜",
        tag: "连锁",
        menu: [
            { name: "牛肉拉面", desc: "手工拉面，汤清肉烂", calories: 580, price: 22, emoji: "🍜", options: [
                { type: "面型", choices: ["细面", "二细", "三细", "韭叶", "大宽"], default: 0 },
                { type: "加肉", choices: ["标准", "加一份牛肉(+10元)"], default: 0 }
            ]},
            { name: "炒拉面", desc: "大火翻炒，锅气十足", calories: 650, price: 25, emoji: "🍝", options: [
                { type: "辣度", choices: ["不辣", "微辣", "中辣"], default: 1 }
            ]},
            { name: "牛肉盖饭", desc: "大片牛肉，米饭管够", calories: 720, price: 28, emoji: "🍚", options: [
                { type: "米饭", choices: ["一碗", "加量(+3元)"], default: 0 }
            ]},
            { name: "凉菜拼盘", desc: "黄瓜+木耳+腐竹，清爽解腻", calories: 180, price: 15, emoji: "🥗", options: [] }
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
        minOrder: 0,
        emoji: "🥟",
        tag: "连锁",
        menu: [
            { name: "拌面+扁肉", desc: "经典套餐，花生酱香浓", calories: 520, price: 15, emoji: "🍜", options: [
                { type: "拌面", choices: ["花生酱", "葱油"], default: 0 }
            ]},
            { name: "蒸饺(10个)", desc: "皮薄馅大，鲜美多汁", calories: 380, price: 12, emoji: "🥟", options: [] },
            { name: "炖罐汤", desc: "乌鸡/排骨/鸽子，滋补养生", calories: 220, price: 18, emoji: "🍲", options: [
                { type: "口味", choices: ["乌鸡汤", "排骨汤", "鸽子汤"], default: 0 }
            ]},
            { name: "卤蛋", desc: "入味卤制，蛋白Q弹", calories: 80, price: 3, emoji: "🥚", options: [] }
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
        minOrder: 0,
        emoji: "",
        tag: "连锁",
        menu: [
            { name: "拿铁(大杯)", desc: "浓缩咖啡+奶泡，经典之选", calories: 180, price: 35, emoji: "☕", options: [
                { type: "温度", choices: ["冰", "热"], default: 1 },
                { type: "奶类", choices: ["全脂奶", "脱脂奶", "燕麦奶(+5元)", "豆奶(+5元)"], default: 0 },
                { type: "浓度", choices: ["标准", "加一份浓缩(+5元)"], default: 0 }
            ]},
            { name: "卡布奇诺(大杯)", desc: "浓郁咖啡+绵密奶泡", calories: 160, price: 35, emoji: "☕", options: [
                { type: "温度", choices: ["冰", "热"], default: 1 }
            ]},
            { name: "星冰乐(大杯)", desc: "冰沙+咖啡，夏日必备", calories: 280, price: 38, emoji: "🧊", options: [
                { type: "口味", choices: ["摩卡", "焦糖", "香草"], default: 0 },
                { type: "加料", choices: ["无", "加浓缩(+5元)", "加奶油(+3元)"], default: 0 }
            ]},
            { name: "可颂", desc: "酥脆黄油香，咖啡好搭档", calories: 320, price: 18, emoji: "🥐", options: [] }
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
        minOrder: 0,
        emoji: "🍗",
        tag: "连锁",
        menu: [
            { name: "经典黄焖鸡", desc: "鲜嫩鸡肉+土豆+青椒", calories: 680, price: 22, emoji: "🍗", options: [
                { type: "辣度", choices: ["不辣", "微辣", "中辣"], default: 1 },
                { type: "加料", choices: ["标准", "加金针菇(+5元)", "加豆腐皮(+5元)", "加土豆(+3元)"], default: 0 }
            ]},
            { name: "加米饭", desc: "东北大米，粒粒分明", calories: 280, price: 3, emoji: "🍚", options: [] },
            { name: "加金针菇", desc: "爽滑金针菇，吸满汤汁", calories: 80, price: 5, emoji: "🍄", options: [] },
            { name: "加豆腐皮", desc: "豆制品，营养丰富", calories: 120, price: 5, emoji: "", options: [] }
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
        minOrder: 50,
        emoji: "🐟",
        tag: "热门",
        menu: [
            { name: "麻辣烤鱼(清江鱼)", desc: "外焦里嫩，麻辣鲜香", calories: 850, price: 68, emoji: "🐟", options: [
                { type: "口味", choices: ["麻辣", "蒜香", "豆豉", "番茄"], default: 0 },
                { type: "配菜", choices: ["标准", "加土豆(+5元)", "加藕片(+5元)", "加豆皮(+3元)"], default: 0 }
            ]},
            { name: "蒜香烤鱼", desc: "蒜香浓郁，不辣也美味", calories: 820, price: 68, emoji: "🧄", options: [
                { type: "鱼种", choices: ["清江鱼", "鲈鱼(+10元)", "草鱼(-10元)"], default: 0 }
            ]},
            { name: "烤鱼配菜", desc: "土豆+藕片+豆皮+金针菇", calories: 320, price: 25, emoji: "🥬", options: [] },
            { name: "冰粉", desc: "清凉解辣，夏日必备", calories: 120, price: 10, emoji: "🍮", options: [
                { type: "口味", choices: ["红糖", "玫瑰", "水果"], default: 0 }
            ]}
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
        minOrder: 0,
        emoji: "🏪",
        tag: "连锁",
        menu: [
            { name: "便当(宫保鸡丁)", desc: "微波加热即食，方便快捷", calories: 580, price: 18, emoji: "🍱", options: [] },
            { name: "饭团(金枪鱼)", desc: "海苔包裹，鲜美可口", calories: 220, price: 8, emoji: "🍙", options: [
                { type: "口味", choices: ["金枪鱼", "三文鱼", "梅子", "鳗鱼"], default: 0 }
            ]},
            { name: "关东煮(3串)", desc: "萝卜+魔芋丝+鱼丸", calories: 150, price: 12, emoji: "🍢", options: [
                { type: "串数", choices: ["3串", "5串(+6元)", "8串(+12元)"], default: 0 }
            ]},
            { name: "矿泉水", desc: "550ml，解渴必备", calories: 0, price: 3, emoji: "💧", options: [] }
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
        minOrder: 20,
        emoji: "🍰",
        tag: "推荐",
        menu: [
            { name: "草莓蛋糕", desc: "新鲜草莓+奶油，甜蜜满足", calories: 420, price: 35, emoji: "", options: [
                { type: "尺寸", choices: ["6寸", "8寸(+20元)"], default: 0 }
            ]},
            { name: "提拉米苏", desc: "经典意式甜品，咖啡酒香", calories: 380, price: 32, emoji: "🍰", options: [] },
            { name: "芒果班戟", desc: "新鲜芒果+奶油，港式经典", calories: 350, price: 28, emoji: "🥭", options: [
                { type: "数量", choices: ["1个", "2个(+20元)", "3个(+28元)"], default: 0 }
            ]},
            { name: "双皮奶", desc: "顺德传统甜品，奶香浓郁", calories: 220, price: 18, emoji: "🍮", options: [
                { type: "口味", choices: ["原味", "红豆", "芒果"], default: 0 }
            ]}
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
        minOrder: 30,
        emoji: "🍗",
        tag: "特色",
        menu: [
            { name: "大盘鸡(中份)", desc: "鸡肉+土豆+皮带面，分量十足", calories: 980, price: 58, emoji: "🍗", options: [
                { type: "份量", choices: ["小份(-15元)", "中份", "大份(+20元)"], default: 1 },
                { type: "辣度", choices: ["微辣", "中辣", "特辣"], default: 1 }
            ]},
            { name: "烤包子(2个)", desc: "羊肉馅，外酥里嫩", calories: 380, price: 15, emoji: "🥟", options: [] },
            { name: "手抓饭", desc: "羊肉+胡萝卜+葡萄干", calories: 720, price: 32, emoji: "🍚", options: [] },
            { name: "酸奶", desc: "新疆特色酸奶，酸甜可口", calories: 120, price: 8, emoji: "🥛", options: [] }
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
        minOrder: 30,
        emoji: "🐟",
        tag: "热门",
        menu: [
            { name: "经典酸菜鱼", desc: "鲜嫩鱼片+酸菜，酸辣开胃", calories: 620, price: 48, emoji: "🐟", options: [
                { type: "辣度", choices: ["微辣", "中辣", "特辣"], default: 1 },
                { type: "加料", choices: ["标准", "加豆腐(+5元)", "加宽粉(+5元)"], default: 0 }
            ]},
            { name: "金汤酸菜鱼", desc: "南瓜汤底，色泽金黄", calories: 580, price: 52, emoji: "🎃", options: [
                { type: "鱼种", choices: ["巴沙鱼", "黑鱼(+10元)"], default: 0 }
            ]},
            { name: "加米饭", desc: "东北大米，粒粒分明", calories: 280, price: 3, emoji: "🍚", options: [] },
            { name: "小酥肉", desc: "外酥里嫩，蘸干碟更香", calories: 420, price: 22, emoji: "🍖", options: [
                { type: "份量", choices: ["一份", "双份(+15元)"], default: 0 }
            ]}
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
        minOrder: 0,
        emoji: "🥞",
        tag: "早餐",
        menu: [
            { name: "经典煎饼果子", desc: "绿豆面+鸡蛋+薄脆+葱花", calories: 380, price: 8, emoji: "🥞", options: [
                { type: "加蛋", choices: ["1个蛋", "2个蛋(+2元)"], default: 0 },
                { type: "加料", choices: ["标准", "加肠(+4元)", "加肉松(+3元)", "加鸡柳(+5元)"], default: 0 }
            ]},
            { name: "加肠煎饼", desc: "加根火腿肠，满足感翻倍", calories: 450, price: 12, emoji: "🌭", options: [
                { type: "酱料", choices: ["甜面酱", "辣酱", "两种都要"], default: 2 }
            ]},
            { name: "加蛋煎饼", desc: "双蛋煎饼，营养加倍", calories: 420, price: 10, emoji: "", options: [] },
            { name: "豆浆", desc: "现磨豆浆，香浓顺滑", calories: 120, price: 4, emoji: "🥛", options: [
                { type: "甜度", choices: ["甜", "咸", "无糖"], default: 0 }
            ]}
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
        minOrder: 10,
        emoji: "🍖",
        tag: "夜宵",
        menu: [
            { name: "卤鸭脖(5根)", desc: "麻辣入味，啃得过瘾", calories: 280, price: 18, emoji: "", options: [
                { type: "辣度", choices: ["微辣", "中辣", "特辣"], default: 1 }
            ]},
            { name: "卤鸡翅(4个)", desc: "酱香浓郁，肉质鲜嫩", calories: 320, price: 22, emoji: "", options: [] },
            { name: "卤藕片", desc: "爽脆藕片，卤香十足", calories: 150, price: 12, emoji: "🥬", options: [] },
            { name: "卤豆干", desc: "豆制品，嚼劲十足", calories: 180, price: 10, emoji: "🫘", options: [
                { type: "口味", choices: ["五香", "香辣"], default: 0 }
            ]}
        ]
    }
];

// 骑手名字
const riderNames = ["张师傅", "李师傅", "王师傅", "刘师傅", "陈师傅", "杨师傅", "赵师傅", "黄师傅"];

// 订单状态流程
const orderStatuses = [
    { key: "ordered", label: "订单已提交", icon: "📋", desc: "等待商家接单" },
    { key: "paid", label: "支付成功", icon: "💰", desc: "已支付，等待商家确认" },
    { key: "accepted", label: "商家已接单", icon: "🏪", desc: "商家正在准备您的订单" },
    { key: "rider_assigned", label: "骑手已接单", icon: "🛵", desc: "骑手正在赶来取餐" },
    { key: "rider_arrived", label: "骑手已到店", icon: "📍", desc: "骑手已到达商家" },
    { key: "preparing", label: "商家出餐中", icon: "👨‍🍳", desc: "美食正在制作中" },
    { key: "picked_up", label: "骑手已取餐", icon: "🎒", desc: "骑手正在向您飞奔而来" },
    { key: "delivered", label: "商品已送达", icon: "📦", desc: "祝您用餐愉快！" },
    { key: "completed", label: "订单完成", icon: "✅", desc: "感谢您的假装消费！" }
];

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
