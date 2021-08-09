import { Router } from 'express';
import Route from '@/@universal/interfaces/route.interface';
import CustomerController from '@/customer/customer.controller';
import validationMiddleware from '@/@universal/middlewares/validation.middleware';
import { GetCustomerDTO } from './customer.dto';

class CustomerRoute implements Route {
  public path = '/customer';

  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, validationMiddleware(GetCustomerDTO, 'query'), this.customerController.getCustomer);
  }
}

export default CustomerRoute;
