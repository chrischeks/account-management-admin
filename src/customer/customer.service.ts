import { ICustomer } from '@/@universal/interfaces/customer.interface';
import UniversalService from '@/@universal/service/universal.service';
import { GetCustomerDTO } from './customer.dto';
import customerModel from './customer.model';

class CustomerService extends UniversalService {
  public customer = customerModel;

  public processGetCustomer = async queryParams => {
    let { email } = queryParams;
    const query = email ? { email: email?.toLowerCase() } : {};
    let { limit, page } = queryParams;
    limit = Number(limit) || 10;
    page = Number(page - 1) || 0;
    const transactions: ICustomer[] = await this.customer.aggregate([
      { $match: query },
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

export default CustomerService;
