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

    default:
      return state;
  }
};
