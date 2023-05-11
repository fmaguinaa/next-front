import { useState, useEffect, useCallback } from "react";

import { Customer } from "../../../interfaces";

import { UrlEndpoint } from "../../variables";

export default function useCustomers() {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customerList, setCustomerList] = useState<Array<Customer>>([]);
  const [refetch, setRefetch] = useState(false);

  const refetchCustomerList = async () => {
    try {
      const response = await fetch(`${UrlEndpoint}/customer/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setCustomerList(result);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    refetchCustomerList()
  }, []);

  useEffect(() => {
    if(refetch){
      refetchCustomerList()
      setRefetch(false)
    }
  }, [refetch])

  const getCustomer = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${UrlEndpoint}/customer/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const result = await response.json();
      console.log("Success:", result);
      setCurrentCustomer(result[0])
      // setRefetch(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const createCustomer = useCallback(async (customer: Customer) => {
    console.log(customer);
    try {
      const response = await fetch(`${UrlEndpoint}/customer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      const result = await response.json();
      console.log("Success:", result);
      setRefetch(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const updateCustomer = useCallback(async (customer: Customer) => {
    try {
      const response = await fetch(`${UrlEndpoint}/customer/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      const result = await response.json();
      console.log("Success:", result);
      setRefetch(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const deleteCustomer = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${UrlEndpoint}/customer/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const result = await response.json();
      console.log("Success:", result);
      setRefetch(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  return {
    currentCustomer,
    customerList,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
