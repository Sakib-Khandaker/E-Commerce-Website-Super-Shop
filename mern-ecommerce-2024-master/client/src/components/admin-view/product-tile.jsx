import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg transition-all duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold text-white mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-500" : "text-white"
              } text-lg font-semibold`}
            >
              BDT {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold text-green-400">BDT {product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-gray-700 rounded-b-lg">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
