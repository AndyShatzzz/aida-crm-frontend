import { Avatar, Box, Button, Divider, Grid, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { productsRequest } from '../../shared/api/productsRequest/productsRequest';
import useProductCounter from './hooks/useSaleCreating';
import { usersRequest } from '../../shared/api/usersRequest/UsersRequest';
import { useTotalCost } from './hooks/useTotalCost';
import { PayForm } from '../../features/payForm/ui/payForm';

interface ISaleCreatingProps {
  isTableOpen: boolean;
  setIsTableOpen: (params: boolean) => void;
  tableNumber: number | null;
  setTableNumber: (params: number | null) => void;
}

export const SaleCreating: FC<ISaleCreatingProps> = ({ isTableOpen, setIsTableOpen, tableNumber, setTableNumber }) => {
  const { data: resProduct } = productsRequest.useGetProductsQuery();
  const { data: user } = usersRequest.useGetUserInfoQuery();
  const [products, handleCounter, setProducts] = useProductCounter();
  const [PostCheque] = productsRequest.usePostChequeMutation();
  const [PatchCheque] = productsRequest.usePatchChequeMutation();
  const [PatchChequeStatus] = productsRequest.usePatchChequeStatusMutation();
  // eslint-disable-next-line no-console
  // console.log(products);

  const { data: cheques } = productsRequest.useGetChequesQuery();
  // eslint-disable-next-line no-console
  // console.log(cheques);

  const [openCheques, setOpenCheques] = useState<null | any>([]);

  const [tableQuantity, setTableQuantity] = useState<any>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('TableQuantity')) {
      setTableQuantity(JSON.parse(localStorage.getItem('TableQuantity') || '[]'));
    }
  }, []);
  // eslint-disable-next-line no-console
  // console.log(tableQuantity);

  const findOpenCheques = () => {
    if (cheques) {
      const openCheques = cheques.filter((item: any) => {
        if (item.status === true) {
          return item;
        }
      });
      setOpenCheques(openCheques);
    }
  };

  useEffect(() => {
    findOpenCheques();
  }, [cheques]);

  const [tableNumberCheques, setTableNumberCheques] = useState<any | null>(null);

  const findTableNumberCheques = (openCheques: any) => {
    if (tableNumber) {
      const tableNumberCheques = openCheques.find((item: any) => item.tableNumber === tableNumber);
      openCheques.find((item: any) => {
        tableQuantity.find((table: any) => {
          if (table.counter === item.tableNumber) {
            table.open = true;
          }
        });
      });
      setTableNumberCheques(tableNumberCheques);
      // eslint-disable-next-line no-console
      // console.log(tableQuantity);
      localStorage.setItem('TableQuantity', JSON.stringify(tableQuantity));
    }
  };

  useEffect(() => {
    findTableNumberCheques(openCheques);
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

  const totalCost = useTotalCost(products);

  async function handlePostCheque() {
    try {
      if (tableNumber && !tableNumberCheques) {
        const res = await PostCheque({
          tableNumber: tableNumber,
          status: true,
          productsList: {
            cheque: products,
            totalCost: totalCost
          },
          owner: user?._id,
          prevState: [
            {
              cheque: products,
              totalCost: totalCost,
              prevOwner: user?._id
            }
          ]
        });
      }
      if (tableNumber && tableNumberCheques) {
        await PatchCheque({
          _id: tableNumberCheques._id,
          productsList: {
            cheque: products,
            totalCost: totalCost
          },
          prevState: [
            {
              cheque: products,
              totalCost: totalCost,
              prevOwner: user?._id
            }
          ]
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setIsTableOpen(false);
  }

  const handlePayCheque = (cash: number, card: number) => {
    handlePostCheque();
    if (tableNumber && tableNumberCheques) {
      PatchChequeStatus({
        _id: tableNumberCheques._id,
        status: false,
        productsList: {
          cheque: products,
          totalCost: totalCost,
          cash: cash,
          card: card
        }
      });
    }
    setIsTableOpen(false);
    setTableNumber(null);
    setTableNumberCheques(null);
    setProducts([]);
  };

  const handleDeleteProduct = (prod: any) => {
    const newProductsList = products.filter((item: any) => item.productId !== prod.productId);
    setProducts(newProductsList);
  };

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
            <Grid
              container
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid
                item
                xs={4}
                md={4}
              >
                Наименование
              </Grid>
              <Grid
                item
                xs={3}
                md={3}
                sx={{ textAlign: 'center' }}
              >
                Количество
              </Grid>
              <Grid
                item
                xs={3}
                md={3}
                sx={{ textAlign: 'center' }}
              >
                Цена
              </Grid>
              <Grid
                item
                xs={2}
                md={2}
                sx={{ textAlign: 'center' }}
              >
                Действия
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              sx={{
                maxHeight: '67vh',
                overflow: 'auto',
                mt: 2
              }}
            >
              {products &&
                products.map((item: { name: string; counter: number; cost: number; productId: string }) => (
                  <Grid
                    container
                    key={item.productId}
                    sx={{ width: '100%', height: '40px' }}
                  >
                    <Grid
                      item
                      xs={4}
                      md={4}
                      sx={{ height: '40px' }}
                    >
                      {item.name}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      md={3}
                      sx={{ height: '40px', textAlign: 'center' }}
                    >
                      {item.counter}
                    </Grid>

                    <Grid
                      item
                      xs={3}
                      md={3}
                      sx={{ height: '40px', textAlign: 'center' }}
                    >
                      {item.cost}
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      md={2}
                      sx={{ height: '40px', textAlign: 'center' }}
                    >
                      <IconButton
                        sx={{
                          width: '18px',
                          height: '18px',
                          mt: 'auto',
                          mb: 'auto',
                          ml: 1,
                          mr: 2
                        }}
                        onClick={() => handleDeleteProduct(item)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
            <Box
              position="absolute"
              bottom="10px"
              width="100%"
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Итого</Typography>
                {totalCost && <Typography>{totalCost} Рублей</Typography>}
              </Box>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={handlePostCheque}
              >
                Зарегистрировать чек
              </Button>
              <Button
                fullWidth
                variant="contained"
                disabled={tableNumberCheques === undefined}
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
          <Box
            sx={{ width: '55%', height: '88vh', overflow: 'auto' }}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            bgcolor="#f8f8f8"
          >
            {resProduct &&
              resProduct.map(item => (
                <Box key={item._id}>
                  <Box
                    sx={{ width: '170px', height: '170px', mb: 2, ml: 2 }}
                    onClick={() =>
                      handleCounter({
                        productId: item._id,
                        name: item.name,
                        cost: item.price,
                        price: item.price,
                        counter: 1
                      })
                    }
                  >
                    <Avatar
                      variant="square"
                      src={item.image}
                      sx={{ width: '170px', height: '155px' }}
                    />
                    <Box
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography variant="body2">{item.name}</Typography>
                      <Typography variant="body2">{item.price}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
          <IconButton
            sx={{ width: '40px', height: '40px' }}
            onClick={() => setIsTableOpen(false)}
          >
            <CloseIcon />
          </IconButton>
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
