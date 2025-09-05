export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
  category: {
    categoryName: string;
    _id: string;
  };
};

export type NewFood = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
  category: string;
};

export type Category = {
  _id: string;
  categoryName: string;
};

export type Order = {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  user: User;
  foodOrderItems: foodOrderItem[];
};

export type User = {
  _id: string;
  email: string;
  address: string;
  phoneNumber: number;
  password: string;
  role: string;
};

export type foodOrderItem = {
  _id: string;
  food: Food;
  quantity: number;
};

export type FoodOrder = {
  _id: string;
  user: string; // User ID
  totalPrice: number;
  foodOrderItems: {
    food: string; // Food ID
    quantity: number;
  }[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CartItem = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
  category: {
    categoryName: string;
    _id: string;
  };
};
