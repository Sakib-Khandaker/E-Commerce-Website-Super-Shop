import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShirtIcon,
  CloudLightning,
  BabyIcon,
  WatchIcon,
  UmbrellaIcon,
  WashingMachine,
  ShoppingBasket,
  Airplay,
  Images,
  Heater,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon, color: "bg-blue-500" },
  { id: "women", label: "Women", icon: CloudLightning, color: "bg-pink-500" },
  { id: "kids", label: "Kids", icon: BabyIcon, color: "bg-yellow-500" },
  { id: "accessories", label: "Accessories", icon: WatchIcon, color: "bg-green-500" },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon, color: "bg-purple-500" },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: ShirtIcon, color: "bg-red-500" },
  { id: "adidas", label: "Adidas", icon: WashingMachine, color: "bg-indigo-500" },
  { id: "puma", label: "Puma", icon: ShoppingBasket, color: "bg-teal-500" },
  { id: "levi", label: "Levi's", icon: Airplay, color: "bg-orange-500" },
  { id: "zara", label: "Zara", icon: Images, color: "bg-cyan-500" },
  { id: "h&m", label: "H&M", icon: Heater, color: "bg-pink-400" },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList?.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((category) => (
              <Card key={category.id} className={`${category.color} text-white shadow-lg hover:shadow-xl cursor-pointer`}
                    onClick={() => navigate(`/shop/listing`)}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-14 h-14 mb-4" />
                  <span className="font-semibold text-lg">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brand) => (
              <Card key={brand.id} className={`${brand.color} text-white shadow-lg hover:shadow-xl cursor-pointer`}
                    onClick={() => navigate(`/shop/listing`)}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brand.icon className="w-14 h-14 mb-4" />
                  <span className="font-semibold text-lg">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-green-600">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList?.map((product) => (
              <ShoppingProductTile key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
