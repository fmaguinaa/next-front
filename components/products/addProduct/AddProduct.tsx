import { Button, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import styled from "styled-components";

export const AddProduct = ({
  createProduct,
  updateProduct,
  isUpdating,
  product,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isUpdating) {
      updateProduct({
        id: product.id,
        name,
        description,
        quantity,
      });
    } else {
      createProduct({
        name,
        description,
        quantity,
      });
    }

    cleanForm();
  };

  const cleanForm = () => {
    setName("");
    setDescription("");
    setQuantity(0);
  };

  useEffect(() => {
    setName(product?.name || "");
    setDescription(product?.description || "");
    setQuantity(product?.quantity || 0);
  }, [product]);

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        id="product-name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="nope"
      />
      <TextField
        id="product-description"
        label="Description"
        value={description}
        multiline
        autoComplete="nope"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="product-quantity"
        label="Quantity"
        type="number"
        autoComplete="nope"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        startIcon={<SaveIcon />}
      >
        {isUpdating ? "Update" : "Create"} Product
      </Button>
    </form>
  );
};

const AddProductContainer = styled.div``;
