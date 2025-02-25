import moment from 'moment';
import { POS_COMMAND_FORMATTER } from '../constants/constants';
import { ICheque } from '../../../shared/types/ICheque';
import { IUsers } from '../../../shared/types/IUsers';

export function generateCheque(items: ICheque, user: IUsers) {
  const maxItemLength = Math.max(...items.productsList.cheque.map(item => item.name.length));
  const maxPriceLength = Math.max(...items.productsList.cheque.map(item => item.price.toString().length));
  const maxCounterLength = Math.max(...items.productsList.cheque.map(item => item.counter.toString().length));

  let receipt: string = POS_COMMAND_FORMATTER.CENTER_ALIGN;
  receipt += POS_COMMAND_FORMATTER.TITLE_TEXT;
  receipt += 'Айда Подымим' + POS_COMMAND_FORMATTER.TRIPLE_LINE_BRAKE;
  receipt += POS_COMMAND_FORMATTER.ORDINARY_TEXT;
  receipt += POS_COMMAND_FORMATTER.LEFT_ALIGN;
  receipt +=
    `Чек создан ${moment(items.createdAt).format('DD-MM-YYYY HH:MM')}` + POS_COMMAND_FORMATTER.DOUBLE_LINE_BRAKE;
  receipt += `Чек напечатан ${moment(Date.now()).format('DD-MM-YYYY HH:MM')}` + POS_COMMAND_FORMATTER.DOUBLE_LINE_BRAKE;
  receipt += `Официант: ${user.name}` + POS_COMMAND_FORMATTER.TRIPLE_LINE_BRAKE;
  const titleName = 'Наименование'.padEnd(maxItemLength, ' ');
  const titleCounter = 'Кол-во'.padEnd(maxCounterLength, ' ');
  const titlePrice = 'Цена'.padEnd(maxPriceLength, ' ');
  const titleSum = 'Итого'.padEnd(maxPriceLength + 1, ' ');
  receipt += POS_COMMAND_FORMATTER.BOLD_TEXT_VARIANT_3;
  receipt +=
    `${titleName}         ${titleCounter}         ${titlePrice}        ${titleSum}` +
    POS_COMMAND_FORMATTER.DOUBLE_LINE_BRAKE;
  receipt += POS_COMMAND_FORMATTER.ORDINARY_TEXT;

  items.productsList.cheque.forEach(item => {
    const name = item.name.padEnd(maxItemLength, ' ');
    const price = item.price.toString().padStart(maxPriceLength, ' ');
    const counter = item.counter.toString().padStart(maxCounterLength, ' ');

    receipt +=
      `${name} ...... ${counter} ....... ${price} .... ${item.counter * item.price}` +
      POS_COMMAND_FORMATTER.DOUBLE_LINE_BRAKE;
  });

  receipt += POS_COMMAND_FORMATTER.BOLD_TEXT_VARIANT_1;
  receipt +=
    '\n' +
    'ИТОГО:'.padEnd(42) +
    items.productsList.totalCost?.toString().padStart(maxPriceLength, ' ') +
    ' рублей' +
    POS_COMMAND_FORMATTER.DOUBLE_LINE_BRAKE;
  receipt += POS_COMMAND_FORMATTER.BOLD_TEXT_VARIANT_2;
  receipt +=
    'К оплате:'.padEnd(29) +
    items.productsList.totalCost?.toString().padStart(maxPriceLength, ' ') +
    ' рублей' +
    POS_COMMAND_FORMATTER.DOUBLE_LINE_BRAKE;

  return receipt;
}
