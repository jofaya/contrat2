import { Paper, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
export const BridgeTablehead = (props) => {
  const { data = [], page, rowsPerPage } = props;

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          <TableCell>Nom</TableCell>
          <TableCell>BandeWidth</TableCell>
          <TableCell>DN</TableCell>
          <TableCell>arpFlood</TableCell>
          <TableCell>IpLearning</TableCell>
          <TableCell>MultiDstPktAct</TableCell>
          <TableCell>unicastRoute</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bridge, key) => {
          return (
            <TableRow key={key}>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>{bridge.fvBD.attributes.name}</TableCell>
              <TableCell>{bridge.fvBD.attributes.OptimizeWanBandwidth}</TableCell>
              <TableCell>{bridge.fvBD.attributes.dn}</TableCell>
              <TableCell>{bridge.fvBD.attributes.arpFlood}</TableCell>
              <TableCell>{bridge.fvBD.attributes.ipLearning}</TableCell>
              <TableCell>{bridge.fvBD.attributes.multiDstPktAct}</TableCell>
              <TableCell>{bridge.fvBD.attributes.lcC}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
