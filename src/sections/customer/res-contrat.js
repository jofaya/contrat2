import * as React from "react";
import { styled } from "@mui/material";
import { TablePagination, tablePaginationClasses as classes } from "@mui/material";

let storedProps;
export default function TableUnstyled(props) {
  storedProps = props;

  console.log(storedProps);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = [];

  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function createData(name, calories) {
    return { name, calories };
  }

  const provData = props.prov;

  const consoleData = props.consum;

  const maxLength = Math.max(provData.length, consoleData.length);

  for (let i = 0; i < maxLength; i++) {
    const provElement = provData[i] || ""; // Si provData est terminé, utilisez une chaîne vide
    const consoleElement = consoleData[i] || ""; // Si consoleData est terminé, utilisez une chaîne vide
    console.log(`provData: ${provElement}\tconsoleData: ${consoleElement}`);

    rows.push(createData(provElement, consoleElement));
  }

  const grey = {
    200: "#d0d7de",
    800: "#32383f",
    900: "#24292f",
  };

  const Root = styled("div")(
    ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
      text-align: left;
      padding: 8px;
    }
  
    th {
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    }
    `
  );

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Root sx={{ maxWidth: "100%", width: "100%", mt: 5 }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th style={{ width: " 200px" }}>Provider </th>
            <th style={{ width: "200px" }}>Consumer</th>
          </tr>
        </thead>
        <tbody>
          {rows.length !== 0 ? (
            (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td style={{ width: 160 }} align="right">
                  {row.calories}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Aucune Adresse
              </td>
            </tr>
          )}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              // slotProps={{
              slotprops={{
                select: {
                  "aria-label": "rows per page",
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
    </Root>
  );
}

// function createData(name, calories) {
//   return { name, calories };
// }

// const rows = [];

// const provData = [
//   "192.168.98.122",
//   "192.168.98.123",
//   "192.168.98.124",
//   "192.168.98.125",
//   "192.168.98.243",
//   "192.168.98.242",
// ];

// const consoleData = [
//   "192.168.92.160",
//   "192.168.92.4",
//   "192.168.92.1",
//   "192.168.92.22",
//   "192.168.92.7",
//   "192.168.92.5",
//   "192.168.92.8",
//   "192.168.92.19",
//   "192.168.92.3",
//   "192.168.92.15",
//   "192.168.92.16",
//   "192.168.92.11",
//   "192.168.92.17",
//   "192.168.92.14",
//   "192.168.92.13",
//   "192.168.92.2",
//   "192.168.92.9",
// ];

// const maxLength = Math.max(provData.length, consoleData.length);

// for (let i = 0; i < maxLength; i++) {
//   const provElement = provData[i] || ""; // Si provData est terminé, utilisez une chaîne vide
//   const consoleElement = consoleData[i] || ""; // Si consoleData est terminé, utilisez une chaîne vide
//   console.log(`provData: ${provElement}\tconsoleData: ${consoleElement}`);

//   rows.push(createData(provElement, consoleElement));
// }

// const grey = {
//   200: "#d0d7de",
//   800: "#32383f",
//   900: "#24292f",
// };

// const Root = styled("div")(
//   ({ theme }) => `
//   table {
//     font-family: IBM Plex Sans, sans-serif;
//     font-size: 0.875rem;
//     border-collapse: collapse;
//     width: 100%;
//   }

//   td,
//   th {
//     border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
//     text-align: left;
//     padding: 8px;
//   }

//   th {
//     background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   }
//   `
// );

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
