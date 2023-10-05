import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export const ServeurTableBody = (props) => {
  const { data = [] } = props;
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          <TableCell>Hôte</TableCell>
          <TableCell>Etat</TableCell>
          <TableCell>Add Ip</TableCell>
          <TableCell>Date Modif</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Compteur Uplink</TableCell>
          <TableCell>Etat admin dispo</TableCell>
          <TableCell>Etat admin dispo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((serveur) => {
          let uid = Math.floor(Math.random() * 1000) + 1;

          return (
            <TableRow key={uid}>
              <TableCell>{serveur.compVh.attributes.name}</TableCell>
              <TableCell>{serveur.compVh.attributes.state}</TableCell>
              <TableCell>{serveur.compVh.attributes.mgmtIp}</TableCell>
              <TableCell>{serveur.compVh.attributes.modTs}</TableCell>
              <TableCell>{serveur.compVh.attributes.type}</TableCell>
              <TableCell>{serveur.compVh.attributes.countUplink}</TableCell>
              <TableCell>{serveur.compVh.attributes.availAdminSt}</TableCell>
              <TableCell>{serveur.compVh.attributes.availOperSt}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
