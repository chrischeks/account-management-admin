import UniversalService from '@/@universal/service/universal.service';
import paymentModel from './payment.model';

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
          result: [{ $sort: { createdAt: -1 } }, { $skip: page }, { $limit: limit }],
        },
      },
      {
        $project: {
          result: 1,
          // Get total from the first element of the metadata array
          total: { $arrayElemAt: ['$metadata.total', 0] },
        },
      },
    ]);
    return this.successResponse(transactions);
  };
}

export default PaymentService;
