import { Box, Button, Divider, IconButton, Snackbar, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { productsRequest } from '../../../../shared/api/productsRequest/productsRequest';
import useProductCounter from '../../hooks/useSaleCreating';
import { usersRequest } from '../../../../shared/api/usersRequest/UsersRequest';
import { useTotalCost } from '../../hooks/useTotalCost';
import { PayForm } from '../../../../features/payForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../shared/model/store';
import { addProduct, resetProduct } from '../../../../shared/productSlice/productSlice';
import { SaleProductList } from '../saleProductList/saleProductList';
import { SaleGridHeader } from '../saleGridHeader/saleGridHeader';
import { ResProductList } from '../resProductList/resProductList';
import { useDeleteSaleProduct } from '../../hooks/useDeleteSaleProduct';
import { useFindOpenCheques } from '../../../../shared/hooks/useFindOpenCheques';
import { usePostCheque } from '../../hooks/usePostCheque';
import { usePatchCheque } from '../../hooks/usePatchCheque';
import { useFindTableNumberCheques } from '../../hooks/useFindTableNumberCheques';
import { ISaleCreatingProps } from '../../types/ISaleCreatingProps';
import { ICheque } from '../../../../shared/types/ICheque';
import { usePatchChequeStatus } from '../../hooks/usePatchChequeStatus';
import { usePatchProductQuantity } from '../../hooks/usePatchProductQuantity';
import { ITableQuantity } from '../../../../shared/types/ITableQuantity';
import { IProducts } from '../../../../shared/types/IProducts';
import { ProductsState } from '../../../../shared/productSlice/type/productsState';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { generateCheque, printCheque } from '../../../../features/printCheque';
import { IUsers } from '../../../../shared/types/IUsers';
import { SnackbarAlert } from '../../../../shared/snackbarAlert/snackbarAlert';

export const SaleCreating: FC<ISaleCreatingProps> = ({ isTableOpen, setIsTableOpen, tableNumber, setTableNumber }) => {
  const { data: resProduct } = productsRequest.useGetProductsQuery();
  const { data: user } = usersRequest.useGetUserInfoQuery();
  const [PostCheque] = productsRequest.usePostChequeMutation();
  const [PatchCheque] = productsRequest.usePatchChequeMutation();
  const [PatchChequeStatus] = productsRequest.usePatchChequeStatusMutation();
  const [PatchProductQuantity] = productsRequest.usePatchProductQuantityMutation();
  const { data: cheques } = productsRequest.useGetChequesQuery();

  const [tableQuantity, setTableQuantity] = useState<ITableQuantity[]>([]);
  const [isPayModalOpen, setIsPayModalOpen] = useState<boolean>(false);
  const [tableNumberCheques, setTableNumberCheques] = useState<ICheque | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarAlertMessage, setSnackbarAlertMessage] = useState<string | null>(null);
  const [snackbarAlertStatus, setSnackbarAlertStatus] = useState<'success' | 'error' | 'info'>('info');

  const dispatch = useDispatch();
  const prevStateProductsQuantity: ProductsState = useSelector((state: RootState) => state.productReducer);
  const [products, handleCounter, setProducts] = useProductCounter();
  const totalCost = useTotalCost(products);
  const handleDeleteProduct = useDeleteSaleProduct(products, setProducts);
  const [openCheques, findOpenCheques] = useFindOpenCheques();
  const postNewCheque = usePostCheque();
  const patchNewCheque = usePatchCheque();
  const patchNewChequeStatus = usePatchChequeStatus();
  const findTableNumberCheques = useFindTableNumberCheques(tableNumber, tableQuantity, setTableNumberCheques);
  const handlePatchProductQuantity = usePatchProductQuantity();

  useEffect(() => {
    if (localStorage.getItem('TableQuantity')) {
      setTableQuantity(JSON.parse(localStorage.getItem('TableQuantity') || '[]'));
    }
  }, []);

  useEffect(() => {
    findOpenCheques(cheques || []);
  }, [cheques]);

  useEffect(() => {
    findTableNumberCheques(openCheques || []);
  }, [isTableOpen, cheques]);

  async function getOpenTable() {
    if (tableNumberCheques) {
      try {
        const res = await tableNumberCheques;
        const openTable = await tableNumber;
        if (res.tableNumber === openTable) {
          setProducts([...res.productsList.cheque]);
        } else {
          setProducts([]);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  }
  useEffect(() => {
    getOpenTable();
  }, [tableNumber, tableNumberCheques, isTableOpen]);

  async function handlePostCheque() {
    try {
      if (tableNumber && !tableNumberCheques) {
        await postNewCheque(PostCheque, tableNumber, products, totalCost, user);
      }
      if (tableNumber && tableNumberCheques) {
        await patchNewCheque(PatchCheque, tableNumberCheques, products, totalCost, user);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setTimeout(() => {
      setIsTableOpen(false);
    }, 50);
  }

  useEffect(() => {
    dispatch(resetProduct({}));
    setTimeout(() => {
      resProduct?.forEach((item: IProducts) => {
        dispatch(addProduct({ productId: item._id, productData: { quantity: item.quantity } }));
      });
    }, 10);
  }, [resProduct]);

  async function handlePayCheque(cash: number, card: number) {
    await handlePostCheque();
    if (tableNumber && tableNumberCheques) {
      await patchNewChequeStatus(PatchChequeStatus, tableNumberCheques, products, totalCost, cash, card);
      await handlePatchProductQuantity(products, PatchProductQuantity, prevStateProductsQuantity);
    }

    await setTableNumber(null);
    await setTableNumberCheques(null);
    await setProducts([]);

    setTimeout(() => {
      setIsTableOpen(false);
    }, 50);
  }

  async function handlePrintCheque(cheque: ICheque | null, user: IUsers | undefined) {
    try {
      if (cheque && user) {
        setSnackbarAlertStatus('info');
        setSnackbarAlertMessage('Чек печатается...');
        setIsSnackbarOpen(true);
        const message = generateCheque(cheque, user);
        const res = await printCheque(message);
        if (res.success) {
          await setSnackbarAlertStatus('success');
          await setIsSnackbarOpen(true);
          await setSnackbarAlertMessage(res.message);
        } else {
          await setSnackbarAlertStatus('error');
          await setIsSnackbarOpen(true);
          await setSnackbarAlertMessage(res.message);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return (
    <>
      {isTableOpen && (
        <Box
          sx={{ flexGrow: 1, mt: 10 }}
          display="flex"
          flexDirection="row"
        >
          <Box
            sx={{ width: '40%', height: '88vh', overflow: 'auto' }}
            position="relative"
          >
            <SaleGridHeader />
            <Divider />
            <SaleProductList
              products={products}
              handleDeleteProduct={handleDeleteProduct}
            />
            <Box
              position="absolute"
              bottom="10px"
              width="100%"
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Итого</Typography>
                {totalCost && <Typography>{totalCost} Рублей</Typography>}
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  sx={{ mt: 1, width: '80%' }}
                  onClick={handlePostCheque}
                >
                  Зарегистрировать чек
                </Button>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mt: 1, ml: 1, width: '15%' }}
                  disabled={tableNumberCheques === undefined || tableNumberCheques === null}
                  onClick={() => handlePrintCheque(tableNumberCheques, user)}
                >
                  <LocalPrintshopIcon />
                </IconButton>
              </Box>
              <Button
                fullWidth
                variant="contained"
                disabled={tableNumberCheques === undefined || tableNumberCheques === null}
                sx={{ mt: 1 }}
                onClick={() => setIsPayModalOpen(true)}
              >
                Оплатить
              </Button>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ flexGrow: 0.1 }}
            variant="middle"
            color="secondary"
          />
          <ResProductList handleCounter={handleCounter} />
          <IconButton
            sx={{ width: '40px', height: '40px' }}
            onClick={() => setIsTableOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Snackbar
            autoHideDuration={4000}
            open={isSnackbarOpen}
            onClose={() => setIsSnackbarOpen(state => !state)}
          >
            <SnackbarAlert
              severity={snackbarAlertStatus}
              onClose={() => setIsSnackbarOpen(state => !state)}
            >
              {snackbarAlertMessage}
            </SnackbarAlert>
          </Snackbar>
        </Box>
      )}
      <PayForm
        isPayModalOpen={isPayModalOpen}
        setIsPayModalOpen={setIsPayModalOpen}
        totalCost={totalCost}
        handlePayCheque={handlePayCheque}
      />
    </>
  );
};
