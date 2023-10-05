import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
export const ServeurTablehead = (props) => {
  const { data = [], page, rowsPerPage } = props;

  // const rows = [
  //   { field: "hote", headername: "Hôte" },
  //   { field: "etat", headername: "Etat" },
  //   { field: "addip", headername: "Add Ip" },
  //   { field: "datemodif", headername: "Hôte" },
  //   { field: "type", headername: "Hôte" },
  //   { field: "uplink", headername: "Hôte" },
  //   { field: "etat", headername: "Hôte" },
  //   { field: "etat", headername: "Hôte" },
  // ];

  var i = 0;
  return (
    <>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      /> */}
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
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((serveur, key) => {
          i++;
          return (
            <TableRow key={key}>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>{serveur.compHv.attributes.name}</TableCell>
              <TableCell>{serveur.compHv.attributes.state}</TableCell>
              <TableCell>{serveur.compHv.attributes.mgmtIp}</TableCell>
              <TableCell>{serveur.compHv.attributes.modTs}</TableCell>
              <TableCell>{serveur.compHv.attributes.type}</TableCell>
              <TableCell>{serveur.compHv.attributes.countUplink}</TableCell>
              <TableCell>{serveur.compHv.attributes.availAdminSt}</TableCell>
              <TableCell>{serveur.compHv.attributes.availOperSt}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
