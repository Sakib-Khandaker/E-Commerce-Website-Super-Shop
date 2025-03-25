import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white rounded-lg shadow-lg p-6">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="text-xl font-semibold text-blue-400">Order Summary</div>
          <Separator className="bg-gray-700" />
          <div className="grid gap-3">
            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Order ID:</p>
              <Label className="text-white">{orderDetails?._id}</Label>
            </div>
            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Order Date:</p>
              <Label className="text-white">{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Order Price:</p>
              <Label className="text-white">BDT {orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Payment Method:</p>
              <Label className="text-white">{orderDetails?.paymentMethod}</Label>
            </div>
            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Payment Status:</p>
              <Label className="text-white">{orderDetails?.paymentStatus}</Label>
            </div>
            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Order Status:</p>
              <Badge
                className={`py-1 px-3 text-white rounded-full text-sm font-semibold ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-gray-600"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>
        </div>
        <Separator className="bg-gray-700" />
        <div className="grid gap-4">
          <div className="text-lg font-semibold text-blue-400">Order Details</div>
          <ul className="grid gap-3 bg-gray-800 p-4 rounded-lg">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
              orderDetails?.cartItems.map((item, index) => (
                <li key={index} className="flex justify-between text-gray-300">
                  <span>Title: {item.title}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>Price: BDT {item.price}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No items in this order.</p>
            )}
          </ul>
        </div>
        <Separator className="bg-gray-700" />
        <div className="grid gap-4">
          <div className="text-lg font-semibold text-blue-400">Shipping Info</div>
          <div className="grid gap-1 bg-gray-800 p-4 rounded-lg text-gray-300">
            <span className="text-white font-medium">{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span className="italic text-gray-400">{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;