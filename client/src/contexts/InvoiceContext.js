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
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  const getInvoicesPaid = async () => {
    try {
      const response = await axios.get(`${apiUrl}/invoice/paid`);
      invoiceDispatch({
        type: "GET_INVOICES_PAID_SUCCESS",
        payload: response.data.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getInvoicesUnpaid = async () => {
    try {
      const response = await axios.get(`${apiUrl}/invoice/unpaid`);
      invoiceDispatch({
        type: "GET_INVOICES_UNPAID_SUCCESS",
        payload: response.data.data,
      });

      console.log(response.data.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const findInvoice = (ticket) => {
    const selectedInvoice = invoiceState.invoices.find(
      (invoice) => invoice.ticket._id === ticket._id
    );
    invoiceDispatch({
      type: "FIND_INVOICE_SUCCESS",
      payload: selectedInvoice,
    });
  };

  const paymentInvoice = async (invoice) => {
    try {
      const response = await axios.put(`${apiUrl}/invoice/payment`, invoice);
      invoiceDispatch({
        type: "PAYMENT_INVOICE_SUCCESS",
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
    getInvoicesPaid,
    getInvoicesUnpaid,
    showPaymentModal,
    setShowPaymentModal,
    findInvoice,
    paymentInvoice,
  };

  return (
    <InvoiceContext.Provider value={InvoiceContextValue}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContextProvider;
