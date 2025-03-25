import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[700px] p-8 bg-gray-900 text-white rounded-lg shadow-xl">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium text-lg">Order ID</p>
            <Label className="text-gray-300">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-lg">Order Date</p>
            <Label className="text-gray-300">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-lg">Order Price</p>
            <Label className="text-gray-300">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-lg">Payment Method</p>
            <Label className="text-gray-300">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-lg">Payment Status</p>
            <Label className="text-gray-300">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-lg">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 rounded-md text-white ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-gray-600"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator className="my-4 border-gray-700" />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-lg">Order Details</div>
            <ul className="grid gap-3 text-gray-300">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>{item.title}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        <Separator className="my-4 border-gray-700" />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-lg">Shipping Info</div>
            <div className="grid gap-0.5 text-gray-300">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 transition-all duration-200"
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
