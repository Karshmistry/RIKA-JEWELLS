const collectionsData = {
  rings: [
    { id: 1, name: "Diamond Ring", price: 45000, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e" },
    { id: 2, name: "Gold Ring", price: 32000, img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d" },
    { id: 3, name: "Solitaire Ring", price: 78000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 4, name: "Platinum Ring", price: 56000, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
    { id: 5, name: "Rose Gold Ring", price: 41000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 6, name: "Antique Ring", price: 52000, img: "https://images.unsplash.com/photo-1600180758890-6b94519b2f06" },
    { id: 7, name: "Engagement Ring", price: 68000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 8, name: "Minimal Ring", price: 28000, img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d" },
    { id: 9, name: "Classic Gold Ring", price: 35000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 10, name: "Royal Diamond Ring", price: 99000, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e" },
  ],

  necklaces: [
    { id: 11, name: "Bridal Necklace", price: 92000, img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
    { id: 12, name: "Temple Necklace", price: 88000, img: "https://images.unsplash.com/photo-1600180758890-6b94519b2f06" },
    { id: 13, name: "Diamond Necklace", price: 145000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 14, name: "Pearl Necklace", price: 54000, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
    { id: 15, name: "Choker Necklace", price: 67000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 16, name: "Kundan Necklace", price: 112000, img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d" },
    { id: 17, name: "Antique Necklace", price: 76000, img: "https://images.unsplash.com/photo-1600180758890-6b94519b2f06" },
    { id: 18, name: "Gold Chain", price: 39000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 19, name: "Layered Necklace", price: 82000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 20, name: "Royal Bridal Set", price: 165000, img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
  ],

  earrings: [
    { id: 21, name: "Diamond Earrings", price: 38000, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
    { id: 22, name: "Gold Studs", price: 18000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 23, name: "Jhumka Earrings", price: 26000, img: "https://images.unsplash.com/photo-1600180758890-6b94519b2f06" },
    { id: 24, name: "Pearl Earrings", price: 22000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 25, name: "Chandbali Earrings", price: 34000, img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d" },
    { id: 26, name: "Drop Earrings", price: 29000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 27, name: "Hoop Earrings", price: 21000, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
    { id: 28, name: "Antique Earrings", price: 37000, img: "https://images.unsplash.com/photo-1600180758890-6b94519b2f06" },
    { id: 29, name: "Luxury Diamond Earrings", price: 82000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 30, name: "Minimal Gold Earrings", price: 16000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
  ],

  bracelets: [
    { id: 31, name: "Gold Bracelet", price: 27000, img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d" },
    { id: 32, name: "Diamond Bracelet", price: 68000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 33, name: "Charm Bracelet", price: 21000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 34, name: "Cuff Bracelet", price: 35000, img: "https://images.unsplash.com/photo-1600180758890-6b94519b2f06" },
    { id: 35, name: "Antique Bracelet", price: 42000, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
    { id: 36, name: "Minimal Gold Bracelet", price: 19000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
    { id: 37, name: "Platinum Bracelet", price: 74000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716f" },
    { id: 38, name: "Designer Bracelet", price: 56000, img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d" },
    { id: 39, name: "Wedding Bracelet", price: 61000, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
    { id: 40, name: "Luxury Gold Bracelet", price: 88000, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
  ],
};

export default collectionsData;
