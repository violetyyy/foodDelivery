export type Food = {
  _id: string;
  foodName: string;
  price: string;
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
  price: string;
  image: string;
  ingredients: string;
  categoryId: string;
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
