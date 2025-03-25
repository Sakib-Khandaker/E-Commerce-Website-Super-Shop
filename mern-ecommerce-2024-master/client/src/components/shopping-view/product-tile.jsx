import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-gray-900 text-white shadow-lg rounded-xl overflow-hidden">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-xl"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white font-semibold">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white font-semibold">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white font-semibold">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-3 text-white">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-3 text-gray-400">
            <span className="text-lg">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-lg">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-red-400" : "text-green-400"
              } text-xl font-semibold`}
            >
              BDT {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-xl font-semibold text-green-500">
                BDT {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="bg-gray-800 p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-gray-600 text-white cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
