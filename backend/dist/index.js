"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const food_route_1 = __importDefault(require("./routes/food.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const foodOrder_route_1 = __importDefault(require("./routes/foodOrder.route"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI);
const server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
server.use(express_1.default.json());
server.use("/food", food_route_1.default);
server.use("/users", user_route_1.default);
server.use("/food-order", foodOrder_route_1.default);
server.use("/categories", category_route_1.default);
server.get("/", (_req, res) => {
    res.send("Hello Dashka");
});
const port = process.env.PORT || 8000;
server.listen(port, () => console.log("server aslaa port:", port));
//# sourceMappingURL=index.js.map