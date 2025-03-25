import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-300 ease-in-out rounded-lg shadow-md bg-white dark:bg-gray-900 
      ${
        selectedId?._id === addressInfo?._id
          ? "border-4 border-blue-600"
          : "border border-gray-300"
      } hover:shadow-lg`}
    >
      <CardContent className="grid p-6 gap-4">
        <Label className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Address:</span> {addressInfo?.address}
        </Label>
        <Label className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">City:</span> {addressInfo?.city}
        </Label>
        <Label className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Pincode:</span> {addressInfo?.pincode}
        </Label>
        <Label className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Phone:</span> {addressInfo?.phone}
        </Label>
        <Label className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Notes:</span> {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
