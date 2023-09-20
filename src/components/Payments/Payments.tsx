import React, { useEffect, useState } from "react";
import { IPayment } from "../../assets/interfaces";
import { getPayments, editPayments } from "../Payments/Payments.api";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { isEqual } from "lodash";

function Payments() {
  const [payments, setPayments] = useState<IPayment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (error) {
        console.error(error);
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
          (product: any) => `${product.name}: $${product.totalPrice}`
        );
        return productNames.join(", ");
      },
    },
  ];

  const handleCellEdit = async (params: any) => {
    const { id, field, value } = params;

    const paymentToUpdate: IPayment | undefined = payments.find((payment) => payment.id === id);

    if (!isEqual(paymentToUpdate, payments[id])) {
      try {
        (paymentToUpdate as any)[field] = value;
        setPayments([...payments]);
        await editPayments(id, paymentToUpdate);
      } catch (error) {
        console.error(error);
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
    </div>
  );
}

export default Payments;
