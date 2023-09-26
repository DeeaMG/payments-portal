import React, { useEffect, useState, SetStateAction } from "react";
import { ErrorType, IPayment, IProduct } from "../../assets/interfaces";
import { getPayments, editPayments } from "../Payments/Payments.api";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { isEqual } from "lodash";
import { GridCellEditStartParams } from "@mui/x-data-grid";
import { useError } from "../../context/errorContext";

function Payments() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const { error, setError } = useError();

  const handleApiErrorComponent = (error: SetStateAction<ErrorType | null>) => {
    const err: ErrorType = error as Error;
    setError(err);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPayments((error) => handleApiErrorComponent(error));
        setPayments(data);
      } catch (error) {
        const err: ErrorType = error as Error;
        handleApiErrorComponent(err);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "VAT",
      headerName: "VAT",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "products",
      headerName: "Products",
      sortable: false,
      width: 300,
      valueGetter: (params: GridValueGetterParams) => {
        const products = params.row.products || [];
        const productNames = products.map(
          (product: IProduct) => `${product.name}: $${product.totalPrice}`
        );
        return productNames.join(", ");
      },
    },
  ];

  const handleCellEdit = async (params: GridCellEditStartParams) => {
    const { id, field, value } = params;

    const paymentToUpdate: IPayment | undefined = payments.find((payment) => payment.id === id);

    const handleApiErrorComponent = (error: SetStateAction<ErrorType | null>) => {
      const err: ErrorType = error as Error;
      setError(err);
    };

    let newId = parseInt(id.toString());
    if (!isEqual(paymentToUpdate, payments[newId])) {
      try {
        (paymentToUpdate as any)[field] = value;
        setPayments([...payments]);
        await editPayments(newId, paymentToUpdate, (error) => handleApiErrorComponent(error));
      } catch (error) {
        const err: ErrorType = error as Error;
        handleApiErrorComponent(err);
      }
    } else return;
  };

  return (
    <div>
      <h1>Payments</h1>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={payments}
          columns={columns}
          onCellEditStart={handleCellEdit}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default Payments;
