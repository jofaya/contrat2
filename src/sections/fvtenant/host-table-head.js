import { Paper, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
export const HostTablehead = (props) => {
  const { data = [], page, rowsPerPage } = props;
  const [searched, setSearched] = useState("");

  
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          <TableCell>DN</TableCell>
          <TableCell>Mac</TableCell>
          <TableCell>Encap</TableCell>
          <TableCell>FabricPathDn</TableCell>
          <TableCell>Date Modif</TableCell>
          <TableCell>DN VRF</TableCell>
          <TableCell>Status Apprenti</TableCell>
          <TableCell>Proprietaire Local</TableCell>
          <TableCell>Source VMM</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((host, key) => {
          return (
            <TableRow key={key}>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>{host.fvCEp.attributes.dn}</TableCell>
              <TableCell>{host.fvCEp.attributes.mac}</TableCell>
              <TableCell>{host.fvCEp.attributes.encap}</TableCell>
              <TableCell>{host.fvCEp.attributes.fabricPathDn}</TableCell>
              <TableCell>{host.fvCEp.attributes.modTs}</TableCell>
              <TableCell>{host.fvCEp.attributes.vrfDn}</TableCell>
              <TableCell>{host.fvCEp.attributes.lcC}</TableCell>
              <TableCell>{host.fvCEp.attributes.lcOwn}</TableCell>
              <TableCell>{host.fvCEp.attributes.vmmSrc}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
