import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">{productDetails?.title}</h1>
          <p className="text-gray-400 text-lg">{productDetails?.description}</p>

          {/* Price */}
          <div className="flex items-center gap-4">
            <p className={`text-3xl font-bold text-yellow-400 ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
              BDT {productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-green-400">BDT {productDetails?.salePrice}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-gray-400">({averageReview.toFixed(2)})</span>
          </div>

          {/* Add to Cart Button */}
          <div>
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full bg-red-500 opacity-60 cursor-not-allowed">Out of Stock</Button>
            ) : (
              <Button className="w-full bg-blue-600 hover:bg-blue-700 transition" onClick={() => dispatch(addToCart({ userId: user?.id, productId: productDetails?._id, quantity: 1 }))}>
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="bg-gray-700" />

          {/* Reviews Section */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
            <h2 className="text-xl font-bold">Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((reviewItem, index) => (
                <div key={index} className="flex gap-4 items-start bg-gray-800 p-4 rounded-lg">
                  <Avatar className="w-10 h-10 border border-gray-700">
                    <AvatarFallback className="bg-gray-700 text-white">
                      {reviewItem?.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-white">{reviewItem?.userName}</h3>
                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                    <p className="text-gray-400">{reviewItem.reviewMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          {/* Add Review Section */}
          <div className="space-y-2">
            <Label className="text-white">Write a review</Label>
            <StarRatingComponent rating={rating} handleRatingChange={setRating} />
            <Input
              className="bg-gray-800 text-white border border-gray-700"
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Write a review..."
            />
            <Button className="bg-green-600 hover:bg-green-700 transition" onClick={() => dispatch(addReview({ productId: productDetails?._id, userId: user?.id, userName: user?.userName, reviewMessage: reviewMsg, reviewValue: rating }))} disabled={!reviewMsg.trim()}>
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;