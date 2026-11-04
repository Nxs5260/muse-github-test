const PRODUCTS = [
  { id: 1, name: "240W Braided Fast Charging Cable", price: 19.99, category: "digital", rating: 4.8, emoji: "🔌", desc: "编织线身，支持大功率快充，日常耐弯折。" },
  { id: 2, name: "USB-C to USB-C Data Cable 2m", price: 12.99, category: "digital", rating: 4.7, emoji: "🔗", desc: "2 米长线，充电传数据两用，桌面床头都够长。" },
  { id: 3, name: "Portable Power Bank 10000mAh", price: 29.99, category: "digital", rating: 4.6, emoji: "🔋", desc: "轻便随身，出门一天电量够用。" },
  { id: 4, name: "Wireless Earbuds with Case", price: 35.99, category: "digital", rating: 4.5, emoji: "🎧", desc: "带充电盒，通勤运动都方便收纳。" },
  { id: 5, name: "Snorkel Mask + Dry Snorkel Set", price: 39.99, category: "outdoor", rating: 4.6, emoji: "🤿", desc: "全景视野面镜 + 干式呼吸管，浮潜入门套装。" },
  { id: 6, name: "Anti-Fog Diving Mask", price: 27.99, category: "outdoor", rating: 4.7, emoji: "🥽", desc: "防雾处理镜片，视野清晰，贴合多脸型。" },
  { id: 7, name: "Waterproof Dry Bag 20L", price: 16.99, category: "outdoor", rating: 4.8, emoji: "🎒", desc: "20L 防水袋，海边、漂流时保护随身物品。" },
  { id: 8, name: "Quick-Dry Beach Towel", price: 14.99, category: "outdoor", rating: 4.5, emoji: "🏖️", desc: "快干轻便，沙滩、泳池、健身都能用。" },
  { id: 9, name: "Foam Cleaner with Brush 118ml", price: 13.99, category: "home", rating: 4.7, emoji: "🧽", desc: "一体刷泡沫清洁剂，挤压出泡、刷洗、擦净三步搞定。" },
  { id: 10, name: "Suede & Nubuck Foam Cleaner", price: 15.99, category: "home", rating: 4.6, emoji: "👟", desc: "针对麂皮、翻毛皮，顺同一方向刷洗更干净。" },
  { id: 11, name: "Sneaker Cleaning Kit", price: 21.99, category: "home", rating: 4.8, emoji: "🧴", desc: "刷子 + 泡沫 + 毛巾一套，适合小白鞋、帆布鞋日常打理。" },
  { id: 12, name: "Microfiber Cleaning Cloths 6-Pack", price: 9.99, category: "home", rating: 4.9, emoji: "🧺", desc: "6 条装超细纤维布，擦鞋、擦家具、擦车都能用。" }
];

const CATEGORIES = {
  all: "全部",
  digital: "数码配件",
  outdoor: "户外运动",
  home: "居家清洁"
};
