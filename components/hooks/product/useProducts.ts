import { useState, useEffect, useCallback } from "react";

import { Product } from "../../../interfaces";

import { UrlEndpoint } from "../../variables";

export default function useProducts() {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [refetch, setRefetch] = useState(false);

  const refetchProductList = async () => {
    try {
      const response = await fetch(`${UrlEndpoint}/product/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setProductList(result);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    refetchProductList();
  }, []);

  useEffect(() => {
    if (refetch) {
      refetchProductList();
      setRefetch(false);
    }
  }, [refetch]);

  const getProduct = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${UrlEndpoint}/product/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const result = await response.json();
      console.log("Success:", result);
      setCurrentProduct(result[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const createProduct = useCallback(async (product: Product) => {
    console.log(product);
    try {
      const response = await fetch(`${UrlEndpoint}/product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const result = await response.json();
      console.log("Success:", result);
      setRefetch(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const updateProduct = useCallback(async (product: Product) => {
    try {
      const response = await fetch(`${UrlEndpoint}/product/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const result = await response.json();
      console.log("Success:", result);
      setRefetch(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${UrlEndpoint}/product/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const result = await response.json();
      console.log("Success:", result);
      setRefetch(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  return {
    currentProduct,
    productList,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
