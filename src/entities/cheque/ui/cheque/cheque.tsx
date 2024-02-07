import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usersRequest } from '../../../../shared/api/usersRequest/UsersRequest';
import { FC } from 'react';
import css from './cheque.module.scss';
import { useFindUser } from '../../hook/useFindUser';
import { useSetColor } from '../../hook/useSetColor';
import { ChequeInfo } from '../chequeInfo/chequeInfo';
import { ChequePayInfo } from '../chequePayInfo/chequePayInfo';
import { IChequeProps } from '../../types/IChequeProps';
import { useDateFormat } from '../../hook/useDateFormat';
import { IProductsListsCheque } from '../../../../shared/types/IProductsListsCheque';

export const Cheque: FC<IChequeProps> = ({ chequeProps, children, expanded, setExpanded }) => {
  const { data: users } = usersRequest.useGetUsersQuery();
  const { cheque } = chequeProps.productsList;
  const [userName, findUser] = useFindUser(users || []);
  const cssClassStatus = useSetColor(chequeProps, css.myAccordionOpen, css.myAccordionClose, css.myAccordionDeleted);
  const formattingDate = useDateFormat(chequeProps);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        className={cssClassStatus}
        key={chequeProps._id}
        expanded={expanded === chequeProps._id}
        onChange={handleChange(chequeProps._id || '')}
        sx={{ width: '100%' }}
        onClick={() => findUser(chequeProps.owner)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid
              item
              sx={{ width: '33%', flexShrink: 0 }}
            >
              {chequeProps.tableNumber} стол
            </Grid>
            <Grid
              item
              sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}
            >
              {chequeProps.productsList.totalCost}
            </Grid>
            <Grid
              item
              sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}
            >
              {formattingDate}
            </Grid>
            <Grid
              item
              sx={{ width: '25%', flexShrink: 0, color: 'text.secondary' }}
            ></Grid>
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
          {cheque.map((prod: IProductsListsCheque) => (
            <ChequeInfo
              key={prod._id}
              prod={prod}
            />
          ))}
          <Divider />
          {children}
          <ChequePayInfo
            chequeProps={chequeProps}
            userName={userName}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
