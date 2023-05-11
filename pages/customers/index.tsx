import { useEffect, useState } from "react";
import styled from "styled-components";

import { AddCustomer, CustomerList } from "../../components/customer";
import { useCustomers } from "../../components/hooks";
import Link from "next/link";
import { Customer } from "../../interfaces";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const column = [
  {
    id: "firstname",
    name: "First Name",
  },
  {
    id: "lastname",
    name: "Last Name",
  },
  {
    id: "age",
    name: "Age",
  },
];

const CustomerPage = () => {
  const {
    customerList,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const newColumn = {
    id: "actions",
    name: "Actions",
    render: (row: Customer, item: any) => (
      <>
        {/* <Link href={'/products/:id'} as={`/products/${row.id}`}><VisibilityIcon/></Link> */}
        <IconButton
          onClick={() => router.push(`/customer/${row.id}`)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => setCustomer(row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDeleteCustomer(row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  };

  useEffect(() => {
    setIsUpdating(Boolean(customer));
  }, [customer]);

  const onCreateCustomer = (customer) => {
    console.log(customer);
    createCustomer(customer);
  };

  const onUpdateCustomer = (customer) => {
    console.log(customer);
    updateCustomer(customer);
  };

  const onDeleteCustomer = (id) => {
    deleteCustomer(id);
  };

  return (
    <>
      <Typography>Products</Typography>
      <AddCustomer
        createCustomer={onCreateCustomer}
        updateCustomer={onUpdateCustomer}
        isUpdating={isUpdating}
        customer={customer}
      />
      <CustomerList column={[...column, newColumn]} customers={customerList} />
    </>
  );
};

export default CustomerPage;
