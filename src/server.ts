import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'dotenv/config';
import App from '@/app';
import CustomerRoute from './customer/customer.route';
import PaymentRoute from './payment/payment.route';

const app = new App([new CustomerRoute(), new PaymentRoute()]);
app.listen();
