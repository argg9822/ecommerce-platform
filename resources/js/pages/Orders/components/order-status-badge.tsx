import { useOrders } from "@/hooks/use-orders";

export function OrderStatusBadge({ status, paymentType }: { status: string, paymentType: string }) {
  const {
      getOrderStatusInfo,
      getPaymentTypeInfo
  } = useOrders();
  const { bg, text, icon: Icon } = getOrderStatusInfo(status);
  const { paymentText, PaymentIcon } = getPaymentTypeInfo(paymentType);

  return (
    <div className="flex flex-col">
      <span className={`inline-flex items-center gap-1 py-1 font-medium ${bg}`}>
        <Icon className="w-4 h-4" />
        {text}
      </span>

      <span className="inline-flex items-center gap-1 py-1 text-xs font-medium text-gray-500">
        <PaymentIcon className="w-4 h-4 ml-2" />
        {paymentText}
      </span>
    </div>
  );
}
