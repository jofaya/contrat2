import { Box, Card, Table, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";
import { FvtenantTablehead } from "./fvtenant-table-head";
import { HostTablehead } from "./host-table-head";
import { ServeurTablehead } from "./serveur-table-head";
import MaterialTable from "material-table";

export const DataTable = (props) => {
  const { data = [], label } = props;
  const [tablehead, setTableHead] = useState([]);
  const [searched, setSearched] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlepageChange = (event, value) => {
    setPage(value);
  };

  const requestSearch = (search) => {
    const filteredRows = data.filter((row) => {
      return row;
    });
  };

  const cancelSearch = () => {
    setSearched("");
  };

  const handleRowsPerPageChange = (event, value) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const handlepageChange = useCallback((event, value) => {
  //   setPage(value);
  // }, []);

  // const handleRowsPerPageChange = useCallback((event, value) => {
  //   setRowsPerPage(event.target.value);
  // }, []);

  useEffect(() => {
    switch (label) {
      case "fvtenant":
        setTableHead(<FvtenantTablehead data={props.data} page={page} rowsPerPage={rowsPerPage} />);
        break;
      case "serveur":
        setTableHead(<ServeurTablehead data={props.data} page={page} rowsPerPage={rowsPerPage} />);
        break;
      case "host":
        setTableHead(<HostTablehead data={props.data} page={page} rowsPerPage={rowsPerPage} />);
        break;
      default:
        break;
    }
  }, [props.data, page, rowsPerPage]);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            {/* <TableHead>
              <TableRow>{tablehead}</TableRow>
            </TableHead>
            <TableBody>{tableBody}</TableBody> */}
            {tablehead}
            {/* <TableBody>
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
            </TableBody> */}
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={data.length}
        onPageChange={handlepageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* {<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />} */}
    </Card>
  );
};
