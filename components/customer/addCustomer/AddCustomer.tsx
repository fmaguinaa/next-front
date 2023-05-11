import { Button, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import styled from "styled-components";

export const AddCustomer = ({
  createCustomer,
  updateCustomer,
  isUpdating,
  customer,
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isUpdating) {
      updateCustomer({
        id: customer.id,
        firstname,
        lastname,
        age,
      });
    } else {
      createCustomer({
        firstname,
        lastname,
        age,
      });
    }
    cleanForm();
  };

  const cleanForm = () => {
    setFirstname("");
    setLastname("");
    setAge(0);
  };

  useEffect(() => {
    setFirstname(customer?.firstname || "");
    setLastname(customer?.lastname || "");
    setAge(customer?.age || 0);
  }, [customer]);

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        id="customer-firstname"
        label="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        autoComplete="nope"
      />
      <TextField
        id="customer-lastname"
        label="Last Name"
        value={lastname}
        autoComplete="nope"
        onChange={(e) => setLastname(e.target.value)}
      />
      <TextField
        id="customer-age"
        label="Age"
        type="number"
        autoComplete="nope"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        startIcon={<SaveIcon />}
      >
        {isUpdating ? "Update" : "Create"} Customer
      </Button>
    </form>
  );
};

const AddCustomerContainer = styled.div``;
