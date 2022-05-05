export const invoiceReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_INVOICE_SUCCESS":
      return {
        ...state,
        invoices: [...state.invoices, payload],
        newInvoice: payload,
      };
    case "UPDATE_PREPAID_SUCCESS":
      return state;

    case "GET_INVOICES_UNPAID_SUCCESS":
      return {
        ...state,
        invoices: payload,
      };
    case "GET_INVOICES_PAID_SUCCESS":
      return {
        ...state,
        invoices: payload,
      };
    case "FIND_INVOICE_SUCCESS":
      return {
        ...state,
        invoice: payload,
      };
    case "GET_INVOICES_SUCCESS":
      return {
        ...state,
        invoices: payload,
      };
    default:
      return state;
  }
};
