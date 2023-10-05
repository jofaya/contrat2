import { Paper, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
export const FvtenantTablehead = (props) => {
  const { data = [] } = props;
  const [searched, setSearched] = useState("");
  var i = 0;
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          <TableCell>Fvtenant</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>IcOwn</TableCell>
          <TableCell>ModeTs</TableCell>
          <TableCell>MonPolDn</TableCell>
          <TableCell>DN</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((fvtenant) => {
          // let uid = Math.floor(Math.random() * 1000) + 1;
          i++;

          return (
            <TableRow key={i}>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>{fvtenant.fvTenant.attributes.uid}</TableCell>
              <TableCell>{fvtenant.fvTenant.attributes.name}</TableCell>
              <TableCell>{fvtenant.fvTenant.attributes.icOwn}</TableCell>
              <TableCell>{fvtenant.fvTenant.attributes.modeTs}</TableCell>
              <TableCell>{fvtenant.fvTenant.attributes.monPolDn}</TableCell>
              <TableCell>{fvtenant.fvTenant.attributes.dn}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
