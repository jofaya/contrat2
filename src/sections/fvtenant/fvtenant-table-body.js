import { TableCell, TableRow } from "@mui/material";

export const FvtenantTableBody = (props) => {
  const { data = [] } = props;
  return (
    <>
      {data.map((fvtenant) => {
        let uid = Math.floor(Math.random() * 1000) + 1;

        return (
          <TableRow key={uid}>
            <TableCell>{fvtenant.fvTenant.attributes.uid}</TableCell>
            <TableCell>{fvtenant.fvTenant.attributes.name}</TableCell>
            <TableCell>{fvtenant.fvTenant.attributes.icOwn}</TableCell>
            <TableCell>{fvtenant.fvTenant.attributes.modeTs}</TableCell>
            <TableCell>{fvtenant.fvTenant.attributes.monPolDn}</TableCell>
            <TableCell>{fvtenant.fvTenant.attributes.dn}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
