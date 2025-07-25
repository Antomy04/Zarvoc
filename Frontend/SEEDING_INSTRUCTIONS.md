# Database Seeding Instructions

## How to seed products data into MongoDB

### Prerequisites:
1. Make sure MongoDB is running on your system
2. Navigate to the backend directory
3. Install dependencies if not already done

### Steps:

1. **Start MongoDB** (if not already running):
   ```bash
   mongod
   ```

2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies** (if not done):
   ```bash
   npm install
   ```

4. **Run the seed script**:
   ```bash
   npm run seed
   ```

### What the seed script does:
- Connects to MongoDB (localhost:27017/ecommerceDB)
- Clears existing products from the database
- Imports all products from Data.js file
- Organizes products by categories
- Shows a summary of inserted products

### Expected Output:
```
Connected to MongoDB
Processing cosmeticProducts: X items
Processing electronic: Y items
...
✅ Successfully inserted Z products into MongoDB!

📊 Products by category:
  cosmetic: X products
  electronic: Y products
  ...
📝 Disconnected from MongoDB
```

### Categories included:
- cosmetic (cosmeticProducts)
- electronic (electronicProducts)
- furniture (furnitureProducts)
- kitchen (kitchenProducts)
- children toys (childrenToysProducts)
- sports (sportsProducts)
- fashion (fashionProducts)

### Database Structure:
Each product will have:
- id: Unique identifier
- name: Product name
- description: Product description
- price: Product price in INR
- image: Product image URL
- rating: Product rating (1-5)
- category: Product category

### Troubleshooting:
- Make sure MongoDB is running
- Check if the database name matches in your server.js
- Verify the Data.js file exists in the parent directory
- Check console for specific error messages
