import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usersRequest } from '../../../shared/api/usersRequest/UsersRequest';
import { FC, useState } from 'react';
import moment from 'moment';
import css from './cheque.module.scss';

interface IChequeProps {
  filteredCheques: any;
}

export const Cheque: FC<IChequeProps> = ({ filteredCheques }) => {
  const { data: users } = usersRequest.useGetUsersQuery();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [userName, setUserName] = useState('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const findUser = (id: any) => {
    users?.find((user: any) => {
      if (user._id === id) {
        setUserName(user.name);
      }
    });
  };

  return (
    <>
      {filteredCheques &&
        filteredCheques.map((item: any) => (
          <Accordion
            className={item.status ? css.myAccordionOpen : css.myAccordionClose}
            key={item._id}
            expanded={expanded === item._id}
            onChange={handleChange(item._id)}
            sx={{ width: '100%' }}
            onClick={() => findUser(item.owner)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container>
                <Grid
                  item
                  sx={{ width: '30%', flexShrink: 0 }}
                >
                  {item.tableNumber} стол
                </Grid>
                <Grid
                  item
                  sx={{ width: '30%', flexShrink: 0, color: 'text.secondary' }}
                >
                  {item.productsList.totalCost}
                </Grid>
                <Grid
                  item
                  sx={{ width: '30%', flexShrink: 0, color: 'text.secondary' }}
                >
                  {`${moment(item.createdAt).format('DD-MM-YYYY')} ${moment(item.createdAt).format('HH:MM:SS')}`}
                </Grid>
              </Grid>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Grid
                container
                sx={{ width: '100%', mb: 2 }}
              >
                <Grid
                  item
                  sx={{ width: '33%' }}
                >
                  Наименование продукта
                </Grid>
                <Grid
                  item
                  sx={{ width: '33%' }}
                >
                  Количество
                </Grid>
                <Grid
                  item
                  sx={{ width: '33%' }}
                >
                  Сумма
                </Grid>
              </Grid>
              {item.productsList.cheque.map((prod: any) => (
                <Grid
                  container
                  key={prod._id}
                  sx={{ width: '100%' }}
                >
                  <Grid
                    item
                    sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}
                  >
                    {prod.name}
                  </Grid>
                  <Typography sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}>{prod.counter}</Typography>
                  <Typography sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}>{prod.cost}</Typography>
                </Grid>
              ))}
              <Divider />
              <Typography sx={{ ml: '80%', mb: 1, mt: 1 }}>Официант: {userName}</Typography>
              <Typography sx={{ ml: '80%', mb: 0.5, mt: 1 }}>Итого: {item.productsList.totalCost} рублей</Typography>
              <Typography
                variant="body2"
                sx={{ ml: '81%', mb: 0.5, mt: 0.5 }}
              >
                Наличные: {item.productsList.cash} рублей
              </Typography>
              <Typography
                variant="body2"
                sx={{ ml: '81%', mb: 0.5, mt: 0.5 }}
              >
                Безналичные: {item.productsList.card} рублей
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};
