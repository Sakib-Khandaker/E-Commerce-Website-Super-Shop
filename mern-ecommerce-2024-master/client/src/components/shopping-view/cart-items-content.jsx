import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item updated successfully" });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item deleted successfully" });
      }
    });
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 flex items-center space-x-6 border border-gray-300 dark:border-gray-700">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-24 h-24 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{cartItem?.title}</h3>
        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="outline"
            className="h-9 w-9 rounded-full border-gray-400 dark:border-gray-600"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </Button>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-9 w-9 rounded-full border-gray-400 dark:border-gray-600"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
          BDT {(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity}
        </p>
        <Button
          variant="ghost"
          className="mt-2 hover:text-red-600"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
