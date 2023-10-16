import React, { useEffect, useState, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorType, IPayment, IProduct } from "../../assets/interfaces";
import { getPayments, editPayments } from "../Payments/Payments.api";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { isEqual, set } from "lodash";
import { GridCellEditStartParams } from "@mui/x-data-grid";
import { useError } from "../../context/errorContext";
import CustomDrawer from "../CustomDrawer/CustomDrawer";

function Payments() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isDrawer, setIsDrawer] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<IPayment | null>(null);
  const { error, setError } = useError();
  const navigate = useNavigate();

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

  const handleSetIsDrawer = (rowData: any) => {
    setSelectedRowData(rowData);
    setIsDrawer(!isDrawer);

    if (rowData.id) {
      navigate(`/payments/${rowData.id}`);
    }
  };

  return (
    <div>
      <h1>Payments</h1>
      <Box sx={{ height: 400, padding: "0 1rem" }}>
        <DataGrid
          rows={payments}
          columns={columns}
          onRowClick={(params) => handleSetIsDrawer(params.row)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      <CustomDrawer isOpen={isDrawer} setIsOpen={handleSetIsDrawer} rowData={selectedRowData} />
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default Payments;
