import { useEffect, useState } from "react";
import styled from "styled-components";

import { AddProduct, ProductList } from "../../components/products";
import { useProducts } from "../../components/hooks";
import { Product } from "../../interfaces";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const column = [
  {
    id: "name",
    name: "Name",
  },
  {
    id: "description",
    name: "Description",
  },
  {
    id: "quantity",
    name: "Quantity",
  },
];

const ProductsPage = () => {
  const {
    productList,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const newColumn = {
    id: "actions",
    name: "Actions",
    render: (row: Product, item: any) => (
      <>
        {/* <Link href={'/products/:id'} as={`/products/${row.id}`}><VisibilityIcon/></Link> */}
        <IconButton
          onClick={() => {
            router.push(`/products/${row.id}`);
          }}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => setProduct(row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDeleteProduct(row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  };

  useEffect(() => {
    setIsUpdating(Boolean(product));
  }, [product]);

  const onCreateProduct = (product) => {
    console.log(product);
    createProduct(product);
  };

  const onUpdateProduct = (product) => {
    console.log(product);
    updateProduct(product);
  };

  const onDeleteProduct = (id) => {
    deleteProduct(id);
  };

  return (
    <>
      <Typography>Products</Typography>
      <AddProduct
        createProduct={onCreateProduct}
        updateProduct={onUpdateProduct}
        isUpdating={isUpdating}
        product={product}
      />
      <ProductList column={[...column, newColumn]} products={productList} />
    </>
  );
};

export default ProductsPage;
