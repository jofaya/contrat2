import {
  Card,
  CardContent,
  Grid,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const ResultatContrat = (props) => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // function createData(name, calories, fat) {
  //   return { name, calories, fat };
  // }

  // const rows = [
  //   createData("Cupcake", 305, 3.7),
  //   createData("Donut", 452, 25.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Gingerbread", 356, 16.0),
  //   createData("Honeycomb", 408, 3.2),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Jelly Bean", 375, 0.0),
  //   createData("KitKat", 518, 26.0),
  //   createData("Lollipop", 392, 0.2),
  //   createData("Marshmallow", 318, 0),
  //   createData("Nougat", 360, 19.0),
  //   createData("Oreo", 437, 18.0),
  // ];

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsPerPage.length) : 0;

  // const handleChangepage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const { consum, prov } = props;
  console.log(props);

  // const CustomTablePagination = styled(TablePagination)`
  //   & .${classes.toolbar} {
  //     display: flex;
  //     flex-direction: column;
  //     align-items: flex-start;
  //     gap: 10px;

  //     @media (min-width: 768px) {
  //       flex-direction: row;
  //       align-items: center;
  //     }
  //   }

  //   & .${classes.selectLabel} {
  //     margin: 0;
  //   }

  //   & .${classes.displayedRows} {
  //     margin: 0;

  //     @media (min-width: 768px) {
  //       margin-left: auto;
  //     }
  //   }

  //   & .${classes.spacer} {
  //     display: none;
  //   }

  //   & .${classes.actions} {
  //     display: flex;
  //     gap: 0.25rem;
  //   }
  // `;

  // const Root = styled("div")(
  //   ({ theme }) => `
  // table {
  //   font-family: IBM Plex Sans, sans-serif;
  //   font-size: 0.875rem;
  //   border-collapse: collapse;
  //   width: 100%;
  // }

  // td,
  // th {
  //   border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  //   text-align: left;
  //   padding: 8px;
  // }

  // th {
  //   background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  // }
  // `
  // );

  // const grey = {
  //   200: "#d0d7de",
  //   800: "#32383f",
  //   900: "#24292f",
  // };

  useEffect(() => {}, []);
  return (
    <>
      <TableContainer sx={{ mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Consumer To</TableCell>
              <TableCell>Provider To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {consum !== undefined
                  ? consum.map((item, key) => (
                      <List key={key}>
                        <ListItem>
                          <ListItemText primary={item}></ListItemText>
                        </ListItem>
                      </List>
                    ))
                  : ""}
              </TableCell>
              <TableCell>
                {prov !== undefined
                  ? prov.map((item, key) => (
                      <List key={key}>
                        <ListItem>
                          <ListItemText primary={item}></ListItemText>
                        </ListItem>
                      </List>
                    ))
                  : ""}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Root sx={{ maxwidth: "100%", width: 500}}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Consumer</th>
              <th>Provider</th>
            </tr>
          </thead>
          <tbody>
            {
              rowsPerPage >0 ? rows.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
                <tr key={row.name}>
                  <td> {row.name}</td>
                  <td style={{width: 160}} align="right"> {row.calories}</td>
                  <td style={{width: 160}} align="right"> {row.fat}</td>
                </tr>
              ))}
              {emptyRows > 0 && (
                <tr style={{height: 41 * emptyRows}}> <td colSpan={3}></td></tr>
              )}
          </tbody>
          <tfoot>
            <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </tr>
          </tfoot>
        </table>

      </Root> */}
    </>
  );
};

export default ResultatContrat;
