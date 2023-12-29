// eslint-disable-next-line no-console

{product &&
product.map((item: { name: string; price: number; \_id: string }, i: number) => (
<TableRow
key={item.\_id}
sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }} >
<TableCell>
<TextField
size="small"
variant="outlined"
sx={{ width: '100px', padding: '0' }}
autoComplete="off"
type="text"
defaultValue={item.name}
// value={watch(`quantity.${i}.number`) _ item.price}
{...register(`product.${i}.name` as const, {
// disabled: true
})}
/>
</TableCell>
<TableCell>
<TextField
size="small"
sx={{ width: '56px', padding: '0' }}
autoComplete="off"
type="number"
defaultValue={1}
{...register(`product.${i}.quantity` as const, {
valueAsNumber: true,
min: 1
})}
/>
</TableCell>
<TableCell>
<TextField
size="small"
variant="outlined"
sx={{ width: '100px', padding: '0' }}
autoComplete="off"
type="number"
defaultValue={item.price}
// value={watch(`quantity.${i}.number`) _ item.price}
{...register(`product.${i}.price` as const, {
valueAsNumber: true,
min: 1
// disabled: true
})}
/>
</TableCell>
</TableRow>
))}

const counts: any = {};
const sampleArray = product;

const handleChange = () => {
// eslint-disable-next-line no-console
// console.log(
// product.filter((value: any, index: any, self: any) => index === self.findIndex((t: any) => t.\_id === value.\_id))
// );
// setCount(product);

    // product.forEach(function (x: any) {
    //   // eslint-disable-next-line no-console
    //   console.log(x);
    //   setCount([
    //     ...count,
    //     {
    //       image: x.image,
    //       name: x.name,
    //       price: x.price,
    //       _id: x._id,
    //       quantity: (counts[x._id] = (counts[x._id] || 0) + 1)
    //     }
    //   ]);
    //   // (counts[x._id] = (counts[x._id] || 0) + 1);
    //   // eslint-disable-next-line no-console
    //   console.log(counts[x._id]);
    // });
    const result: any = {};

    product.forEach(function (a: any) {
      if (result[a._id] != undefined) ++result[a._id];
      else result[a._id] = 1;
    });
    // eslint-disable-next-line no-console
    console.log(result);

};
