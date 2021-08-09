import { NextFunction, Response } from 'express';
import { GetCustomerDTO } from './customer.dto';
import { RequestWithCustomer } from '@/@universal/interfaces/request.interface';
import CustomerService from './customer.service';
import UniversalController from '@/@universal/controller/universal.controller';

class CustomerController extends UniversalController {
  public customerService = new CustomerService();

  public getCustomer = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
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
