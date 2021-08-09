import IResponse from '@/@universal/interfaces/response.interface';
import UniversalService from '@/@universal/service/universal.service';
import { ITransfer } from './payment.interface';
import mongoose from 'mongoose';
import customerModel from '@/customer/customer.model';
import paymentModel from './payment.model';
import { ICustomer } from '@/@universal/interfaces/customer.interface';

class PaymentService extends UniversalService {
  private payment = paymentModel;

  public processTransactionHistory = async (accountNumber, query) => {
    let { limit, page } = query;
    limit = Number(limit) || 10;
    page = Number(page) || 1;
    const transactions = await this.payment.aggregate([
      { $match: { $or: [{ creditAccount: accountNumber }, { debitAccount: accountNumber }] } },
      { $addFields: { isDebit: { $cond: { if: { $eq: ['$debitAccount', accountNumber] }, then: true, else: false } } } },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $sort: { createdAt: -1 } }, { $skip: page }, { $limit: limit }],
        },
      },
      {
        $project: {
          data: 1,
          // Get total from the first element of the metadata array
          total: { $arrayElemAt: ['$metadata.total', 0] },
        },
      },
    ]);
    return this.successResponse(transactions);
  };
}

export default PaymentService;
