import { NextFunction, Response, Request } from 'express';
import PaymentService from './payment.service';
import UniversalController from '@/@universal/controller/universal.controller';
import { ICustomer } from '@/@universal/interfaces/customer.interface';

class PaymentController extends UniversalController {
  paymentService = new PaymentService();

  public transactionHistory = async (req: Request & { customer: ICustomer }, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { params, query } = req;
      const userData: string = params.accountNumber;
      const response = await this.paymentService.processTransactionHistory(userData, query);
      await this.controllerResponseHandler(response, req, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error);
    }
  };
}

export default PaymentController;
