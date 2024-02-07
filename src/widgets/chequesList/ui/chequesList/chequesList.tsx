import { Box, Divider } from '@mui/material';
import { productsRequest } from '../../../../shared/api/productsRequest/productsRequest';
import { FilterDatePicker } from '../../../../features/filterDatePicker';
import { useEffect, useState } from 'react';
import { ChangeCheque } from '../../../../features/changeCheque/ui/changeCheque';
import { useDailyCost } from '../../hooks/useDailyCost';
import { ICheque } from '../../../../shared/types/ICheque';
import { ChequeListToggleState } from '../chequeListToggleState/chequeListToggleState';
import { DailyCost } from '../dailyCost/dailyCost';

export const ChequesList = () => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const [filteredCheques, setFilteredCheques] = useState<ICheque[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const [dailyCost, dailyCash, dailyCard, sumResult] = useDailyCost();

  useEffect(() => {
    sumResult(filteredCheques);
  }, [filteredCheques]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <FilterDatePicker
        cheques={cheques}
        setFilteredCheques={setFilteredCheques}
      />
      <Divider variant="fullWidth" />
      <ChequeListToggleState filteredCheques={filteredCheques} />
      {filteredCheques &&
        filteredCheques.map((item: ICheque) => (
          <ChangeCheque
            chequeProps={item}
            expanded={expanded}
            setExpanded={setExpanded}
            key={item._id}
          />
        ))}

      {dailyCost && (
        <DailyCost
          dailyCost={dailyCost}
          dailyCash={dailyCash}
          dailyCard={dailyCard}
        />
      )}
    </Box>
  );
};
