import { Router } from 'express';
import Route from '@/@universal/interfaces/route.interface';
import validationMiddleware from '@/@universal/middlewares/validation.middleware';
import PaymentController from './payment.controller';
import { TransferDTO } from './payment.dto';
import { AccountNumberDTO } from '@/@universal/dto/account.dto';

class PaymentRoute implements Route {
  public paymentPath = '/payment';

  public router = Router();
  public paymentController = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.paymentPath}/transactions/:accountNumber`,
      validationMiddleware(AccountNumberDTO, 'params'),
      this.paymentController.transactionHistory,
    );
  }
}

export default PaymentRoute;
