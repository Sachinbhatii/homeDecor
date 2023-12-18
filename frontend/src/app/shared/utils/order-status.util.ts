import {OrderStatusType} from "../../../types/order-status.type";

export class OrderStatusUtil {

  static getStatusAndColor(status: OrderStatusType | undefined | null): { name: string, color: string } {


    let name = 'New';
    let color = '#456F49';

    switch (status) {
      case OrderStatusType.delivery:
        name = 'Delivery';
        break;
      case OrderStatusType.cancelled:
        name = 'Cancelled';
        color = '#FF7575';
        break;
      case OrderStatusType.pending:
        name = 'Treatment';
        break;

      case OrderStatusType.success:
        name = 'Completed';
        color = '#B6D5B9';
        break;
    }

    return {name, color};

  }


}
