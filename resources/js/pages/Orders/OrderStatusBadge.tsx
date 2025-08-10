import { useOrders } from "@/hooks/use-orders";

export function OrderStatusBadge({ status }: { status: string }) {
    const {
        getOrderStatusInfo
    } = useOrders();
  const { bg, text, icon: Icon } = getOrderStatusInfo(status);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg}`}
    >
      <Icon className="w-4 h-4" />
      {text}
    </span>
  );
}
