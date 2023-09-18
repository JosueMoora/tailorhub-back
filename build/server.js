"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const restaurants_1 = __importDefault(require("./routes/restaurants"));
const users_1 = __importDefault(require("./routes/users"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept'
    ],
    credentials: true,
    origin: [
        'http://localhost:3000',
        'https://tailorhub-2b8f3ad8d-josuemoora.vercel.app/'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
// Lectura y parseo del body
app.use(express_1.default.json({ limit: '1024mb' }));
// It parses incoming requests with URL-encoded payloads
app.use(express_1.default.urlencoded({ limit: '1024mb', extended: true }));
// Public dir
app.use(express_1.default.static('public'));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
app.use((0, morgan_1.default)('dev'));
app.use('/api/restaurants', restaurants_1.default);
app.use('/api', users_1.default);
app.use('/api/favorites', favorites_1.default);
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
});
