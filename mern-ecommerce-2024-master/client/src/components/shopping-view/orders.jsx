import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return (
    <Card className="bg-gray-900 text-white shadow-lg rounded-lg">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-blue-400 text-xl font-semibold">Order History</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Table className="w-full text-white">
          <TableHeader className="bg-gray-800 text-gray-300">
            <TableRow>
              <TableHead className="px-4 py-2">Order ID</TableHead>
              <TableHead className="px-4 py-2">Order Date</TableHead>
              <TableHead className="px-4 py-2">Order Status</TableHead>
              <TableHead className="px-4 py-2">Order Price</TableHead>
              <TableHead className="px-4 py-2">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow className="border-b border-gray-700 hover:bg-gray-800">
                    <TableCell className="px-4 py-2">{orderItem?._id}</TableCell>
                    <TableCell className="px-4 py-2">{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell className="px-4 py-2">
                      <Badge
                        className={`py-1 px-3 rounded-full text-white font-medium ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-2">BDT {orderItem?.totalAmount}</TableCell>
                    <TableCell className="px-4 py-2">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : <TableRow><TableCell colSpan="5" className="text-center py-4">No orders found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
