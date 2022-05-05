import { createContext, useReducer, useState } from "react";
import { invoiceReducer } from "../reducers/invoiceReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const InvoiceContext = createContext();

const InvoiceContextProvider = ({ children }) => {
  const [invoiceState, invoiceDispatch] = useReducer(invoiceReducer, {
    invoice: null,
    invoices: [],
    newInvoice: null,
  });

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // add invoice
  const addInvoice = async (invoice) => {
    try {
      const response = await axios.post(`${apiUrl}/invoice`, invoice);
      invoiceDispatch({
        type: "ADD_INVOICE_SUCCESS",
        payload: response.data.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateInvoice = async (invoice) => {
    try {
      const response = await axios.put(`${apiUrl}/invoice`, invoice);
      invoiceDispatch({
        type: "UPDATE_INVOICE_SUCCESS",
        payload: response.data.data,
      });
      console.log(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updatePrepaid = async (invoice) => {
    try {
      const response = await axios.put(`${apiUrl}/invoice`, invoice);
      invoiceDispatch({
        type: "UPDATE_PREPAID_SUCCESS",
        payload: response.data.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const InvoiceContextValue = {
    invoiceState,
    invoiceDispatch,
    showInvoiceModal,
    setShowInvoiceModal,
    addInvoice,
    updateInvoice,
    updatePrepaid,
  };

  return (
    <InvoiceContext.Provider value={InvoiceContextValue}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContextProvider;
