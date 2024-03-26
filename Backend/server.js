
import connectDB from './db/connect.js';
import app from './config.js';
import authRouter from './routes/client/authRoutes.js';
import tourRouter from './routes/client/tourRoutes.js';
import userRouter from './routes/client/userRoutes.js'
import payRouter from './routes/client/payRoutes.js';
import authAdminRoutes from './routes/admin/authAdminRoutes.js';
import tourAdminRoutes from './routes/admin/tourAdminRoutes.js';
import bookingRouter from './routes/client/bookingRoutes.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error-handler.js';
import bookingAdminRoutes from './routes/admin/bookingAdminRoutes.js';
import userAdminRoutes from './routes/admin/userAdminRoutes.js';


app.get('/', (req, res) => {
    throw new Error('Error');
    res.status(200).render('base', { title: 'Home' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tour', tourRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/pay', payRouter);
app.use('/api/v1/user', userRouter);
app.use('/admin', tourAdminRoutes);
app.use('/admin', authAdminRoutes);
app.use('/admin', bookingAdminRoutes);
app.use('/admin', userAdminRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
