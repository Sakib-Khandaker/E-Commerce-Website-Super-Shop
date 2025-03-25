import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <SheetHeader>
        <SheetTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-6 space-y-4 divide-y divide-gray-300 dark:divide-gray-700">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">Your cart is empty.</p>
        )}
      </div>
      <div className="mt-6 py-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>BDT {totalCartAmount.toFixed(2)}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
