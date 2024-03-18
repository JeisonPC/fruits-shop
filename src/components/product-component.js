"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function ProductComponent() {
  const [errorFruits, setErrorFruits] = useState(null);
  const [errorProductDetails, setErrorProductDetails] = useState(null);
  const [fruits, setFruits] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadFruits = async () => {
      console.log("Fetching fruits...");
      try {
        const response = await fetch(
          "https://fruitshop2-predic8.azurewebsites.net/shop/v2/products?start=1&limit=10&sort=id&order=asc"
        );
        const data = await response.json();
        console.log("Este es data.products", data.products);
        setFruits(data.products); // Accediendo correctamente al arreglo
      } catch (error) {
        setErrorFruits(error);
      }
    };

    loadFruits();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `https://fruitshop2-predic8.azurewebsites.net/shop/v2/products/${productId}`
      );
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      setErrorProductDetails(error);
    }
  };

  useEffect(() => {
    if (selectedId) {
      fetchProductDetails(selectedId.id);
    } else {
      setSelectedProduct(null); // Clear product details when modal closes
    }
  }, [selectedId]);

  return (
    <div className="flex flex-wrap justify-center">
      {fruits
        ? fruits.map((fruit) => (
            <motion.div
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4"
              key={fruit.id}
              layoutId={fruit.id}
            >
              <motion.button>
                <Image
                  className="p-8 rounded-t-lg"
                  src={`https://fruitshop2-predic8.azurewebsites.net/shop/v2/products/${fruit.id}/image`}
                  alt="product image"
                  width={300}
                  height={300}
                />
              </motion.button>
              <motion.div className="px-5 pb-5">
                <motion.h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {fruit.name}
                </motion.h2>
                <motion.div className="flex items-center justify-between">
                  <motion.button
                    onClick={() => setSelectedId(fruit)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full	"
                  >
                    Mostrar más detalles
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))
        : errorFruits && <p>Error al cargar las frutas: {errorFruits}</p>}

      <AnimatePresence>
        {selectedId ? (
          <motion.div
            layoutId={selectedId}
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
            id="default-modal"
            aria-hidden="true"
            style={{ background: "rgba(0, 0, 0, .5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="relative p-4 w-full max-w-2xl max-h-full">
            <motion.div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {selectedProduct ? ( <><motion.div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <motion.h5>{selectedProduct.name}</motion.h5>
                  <motion.button
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setSelectedId(null)}
                  >
                    X
                  </motion.button>
                </motion.div><motion.div className="p-4 md:p-5">
                    <motion.div className="flex flex-col items-start">
                      <motion.h6 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">
                        Precio:
                      </motion.h6>
                      <motion.p className="text-sm text-gray-500 dark:text-gray-400">
                        ${selectedProduct.price}
                      </motion.p>
                    </motion.div>
                    <motion.div className="mt-4">
                      <motion.h6 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">
                        Descripción:
                      </motion.h6>
                      <motion.p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedProduct.vendors[0].name}
                      </motion.p>
                    </motion.div>
                  </motion.div></>) : (
                <p>Cargando detalles del producto...</p>
              )}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          errorProductDetails && (
            <p>
              Error al cargar los detalles del producto:{" "}
              {errorProductDetails.message}
            </p>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductComponent;
