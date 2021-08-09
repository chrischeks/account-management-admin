import { NextFunction, Response, Request } from 'express';
import CustomerService from './customer.service';
import UniversalController from '@/@universal/controller/universal.controller';
import { ICustomer } from '@/@universal/interfaces/customer.interface';

class CustomerController extends UniversalController {
  public customerService = new CustomerService();

  public getCustomer = async (req: Request & { customer: ICustomer }, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      const response = await this.customerService.processGetCustomer(query);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };
}

export default CustomerController;
