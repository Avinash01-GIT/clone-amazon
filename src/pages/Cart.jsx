import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import {
  deleteItem,
  resetCart,
  increamentQuantity,
  decreamentQuantity,
} from "../redux/amazonSlice";
import { emptyCart } from "../assets/images";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    let Total = 0;
    products.map(
      (item) => {
        Total += item.price * item.quantity;
        return setTotalPrice(Total.toFixed(2));
      },
      [products]
    );
  });
  return (
    <div className="w-full bg-gray-200 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-5 gap-8 ">
          <div className="w-full h-full bg-white px-4 col-span-4">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 py-3 font-titleFont">
              <h2 className="text-3xl font-medium">Shopping Cart</h2>
              <h4 className="text-xl font-medium">Subtotal</h4>
            </div>
            {/* Products starts here */}
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6"
                >
                  <div className="w-full flex items-center gap-6">
                    <div className="w-1/5">
                      <img
                        className="w-full h-44 object-contain"
                        src={item.image}
                        alt="ProductImg"
                      />
                    </div>
                    <div className="w-4/5">
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="text-sm">
                        {item.description.substring(0, 180)}
                      </p>
                      <p className="text-base">
                        Unit Price
                        <span className="font-semibold ">${item.price}</span>
                      </p>
                      <div className="flex justify-center items-center gap-2 w-24 py-1 text-center bg-[#F0F2F2] drop-shadow-lg rounded-md">
                        <p>Qty:</p>
                        <p
                          onClick={() => dispatch(decreamentQuantity(item.id))}
                          className="bg-gray-200 px-1 cursor-pointer rounded-md hover:bg-gray-400 duration-300"
                        >
                          -
                        </p>
                        <p>{item.quantity}</p>
                        <p
                          onClick={() => dispatch(increamentQuantity(item.id))}
                          className="bg-gray-200 px-1 cursor-pointer rounded-md hover:bg-gray-400 duration-300"
                        >
                          +
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(deleteItem(item.id))}
                        className="bg-gray-200 px-1 cursor-pointer rounded-md hover:bg-yellow-400 duration-300"
                      >
                        Delete Item
                      </button>
                    </div>
                    <div>
                      <p className="text-lg font-titleFont font-semibold">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Products Ends here */}
            <div onClick={() => dispatch(resetCart())} className="w-full py-2">
              <button className="px-5 py-1 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide ">
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full h-52 bg-white col-span-1 flex flex-col justify-center items-center p-4">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span>
                  <CheckCircleIcon className="bg-white text-green-400 rounded-full" />
                </span>
                Your order is eligible for FREE Delivery. Select this option at
                checkout. Details
              </p>
            </div>
            <div>
              <p className="font-semibold py-1 px-10 flex items-center gap-2 justify-between">
                Total: <span className="text-lg font-bold">${totalPrice}</span>
              </p>
            </div>
            <button className="to mt-3 w-full rounded-md border border-yellow-500 bg-gradient-to-tr from-yellow-400 to-yellow-200 py-1.5 font-titleFont text-base font-medium duration-200 hover:border-yellow-700 hover:from-yellow-300 hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500">
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center items-center gap-4 py-4"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="EmptyCartImg"
            />
          </div>
          <div className="w-96 p-4 flex flex-col items-center hover:bg-white rounded-md duration-500">
            <h1>Your Amazon Cart is empty</h1>
            <Link to="/">
            <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer
           hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titlefont font-semibold
           text-lg">
              Continue Shopping
            </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;


