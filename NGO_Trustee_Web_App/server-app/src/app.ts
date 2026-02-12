import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morganMiddleware from './middleware/morgan';
import errorHandler from './middleware/error';

const app: Express = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: '*', // Allow all origins for now (or specific client URL)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting (Global)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Logging
app.use(morganMiddleware);

// Static Files - Serve uploads
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});
// Root endpoint for simple checks
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('API is running');
});

// Routes
import routes from './routes';
app.use('/api/v1', routes);

// Error Handling
app.use(errorHandler);

export default app;
