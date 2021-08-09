import { NextFunction, Response } from 'express';
import { RequestWithCustomer } from '@/@universal/interfaces/request.interface';
import PaymentService from './payment.service';
import UniversalController from '@/@universal/controller/universal.controller';

class PaymentController extends UniversalController {
  paymentService = new PaymentService();

  public transactionHistory = async (req: RequestWithCustomer, res: Response, next: NextFunction): Promise<void> => {
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
