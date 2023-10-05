import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MoreVert from "@material-ui/icons/MoreVert";
import { useEffect, useState } from "react";

export const ResultOfSearch = (props) => {
  const { bdDn, contract, epg, host, ip, serveur } = props;
  const [openCellIp, setOpenCellIp] = useState(false);
  const [openCellEpg, setOpenCellEpg] = useState(false);
  const [openCellHost, setOpenCellHost] = useState(false);
  const [openCellContrat, setOpenCellContrat] = useState(false);
  const [openCellServeur, setOpenCellServeur] = useState(false);
  const [showMoreVert, setShowMoreVert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [contratState, setContratState] = useState(contract);
  const [showConsumer, setShowConsumer] = useState(false);
  const [showProvider, setShowProvider] = useState(false);

  const open = Boolean(anchorEl);

  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuContrat = () => {
    setAnchorEl(null);
  };

  const handleSwitch1Change = () => {
    setShowConsumer(!showConsumer);
  };

  const handleSwitch2Change = () => {
    setShowProvider(!showProvider);
  };

  useEffect(() => {
    filterData();
  }, [showConsumer, showProvider, contract]);

  const filterProviderAndCustomer = (contractRelationships) => {
    const contractRefTracker = {};

    contractRelationships.forEach((relationship) => {
      if (!contractRefTracker[relationship.contractRef]) {
        contractRefTracker[relationship.contractRef] = [];
      }
      contractRefTracker[relationship.contractRef].push(relationship.relationshipType);
    });

    const filteredResults = [];

    for (const contractRef in contractRefTracker) {
      if (
        contractRefTracker[contractRef].includes("consumer") &&
        contractRefTracker[contractRef].includes("provider")
      ) {
        contractRefTracker[contractRef].forEach((relationshipType) => {
          filteredResults.push({
            contractRef: contractRef,
            relationshipType: relationshipType,
          });
        });
      }
    }
    return filteredResults;
  };

  const filterData = () => {
    let res;
    if (contract.contractRelationships.length === 0) {
      setContratState(contract);
      return;
    }
    if (showConsumer && showProvider) {
      res = filterProviderAndCustomer(contract.contractRelationships[0]);
    } else {
      res = contract.contractRelationships[0].filter((item) => {
        if (showConsumer && item.relationshipType === "consumer") {
          return item.relationshipType === "consumer";
        } else if (showProvider && item.relationshipType === "provider") {
          return item.relationshipType === "provider";
        } else if (!showConsumer && !showProvider) {
          return item;
        }
      });
    }

    const newContrat = {
      ...contratState,
      contractRelationships: [res],
    };

    setContratState(newContrat);
  };

  const formatDate = (dateArg) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return new Date(dateArg).toLocaleDateString("fr-FR", options);
  };

  let contractName;

  const handleClick = (tablecell) => {
    switch (tablecell) {
      case "addIp":
        setOpenCellIp(!openCellIp);
        break;
      case "epg":
        setOpenCellEpg(!openCellEpg);
        break;
      case "contract":
        setOpenCellContrat(!openCellContrat);
        break;
      case "host":
        setOpenCellHost(!openCellHost);
        break;

      case "serveur":
        setOpenCellServeur(!openCellServeur);
        break;
      default:
        break;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Adresse Ip</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>EPG</strong>
            </TableCell>
            <TableCell
              sx={{ textAlign: "center", height: "10vh" }}
              onMouseEnter={() => setShowMoreVert(!showMoreVert)}
              onMouseLeave={() => setShowMoreVert(!showMoreVert)}
            >
              <strong>Contrat</strong>
              <span>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? true : undefined}
                  onClick={handleClickMoreVert}
                >
                  <MoreVert style={{ fontSize: 18 }} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleCloseMenuContrat}
                  sx={{ width: 320 }}
                >
                  <List>
                    <List sx={{ width: "100%", maxWidth: 360 }}>
                      <ListItem>
                        <ListItemText primary="Consumer" />
                        <Switch defaultChecked={showConsumer} onChange={handleSwitch1Change} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Provider" />
                        <Switch defaultChecked={showProvider} onChange={handleSwitch2Change} />
                      </ListItem>
                    </List>
                  </List>
                </Menu>
              </span>
            </TableCell>

            <TableCell sx={{ textAlign: "center" }}>
              <strong>Serveur</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Host</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Nom ndo</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <ChevronRightIcon />
            </TableCell>
            <TableCell>
              <List component="nav">
                <ListItemButton onClick={() => handleClick("addIp")}>
                  <ListItemText primary={ip.addr} />
                  {openCellIp ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCellIp} timeout="auto" unmountOnExit>
                  <TableRow>
                    <TableCell>
                      <strong> créer: &nbsp;</strong>
                      le {formatDate(ip.createTs)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong> Modif: &nbsp;</strong>
                      le {formatDate(ip.modTs)}
                    </TableCell>
                  </TableRow>
                </Collapse>
              </List>
            </TableCell>
            <TableCell>
              <List component="nav" aria-aria-labelledby="nested-list">
                <ListItemButton onClick={() => handleClick("epg")}>
                  <ListItemText primary={epg.name} />
                  {openCellEpg ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCellEpg} timeout="auto">
                  <TableRow>
                    <TableCell>
                      <strong>annotation: </strong> {epg.annotation}
                    </TableCell>
                  </TableRow>
                </Collapse>
              </List>
            </TableCell>
            <TableCell>
              <List component="nav" aria-aria-labelledby="nested-list">
                <ListItemButton onClick={() => handleClick("contract")}>
                  <ListItemText primary={epg.name} />

                  {openCellContrat ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCellContrat} timeout="auto">
                  {contratState.contractRelationships.map((contract, key1) => (
                    <TableRow key={key1}>
                      {contract.map((contract1, key2) => {
                        contractName = contract1.contractRef;
                        return (
                          <TableRow key={key2}>
                            <TableCell>
                              {contractName.slice(contractName.lastIndexOf("/") + 1)}
                            </TableCell>
                            <TableCell>{contract1.relationshipType}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableRow>
                  ))}
                </Collapse>
              </List>
            </TableCell>
            <TableCell>
              {serveur === undefined ? (
                "Aucun serveur"
              ) : (
                <List component="nav" aria-aria-labelledby="nested-list">
                  <ListItemButton onClick={() => handleClick("serveur")}>
                    <ListItemText primary={serveur.serveur.name} />
                    {openCellServeur ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCellServeur} timeout="auto" unmountOnExit>
                    <TableRow>
                      <TableCell>
                        <strong>Etat: </strong>
                        {serveur.serveur.state}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>OID: </strong>
                        {serveur.serveur.oid}
                      </TableCell>
                    </TableRow>
                  </Collapse>
                </List>
              )}
            </TableCell>
            <TableCell>
              <List component="nav" aria-aria-labelledby="nested-list">
                <ListItemButton onClick={() => handleClick("host")}>
                  <ListItemText primary={host.host.name} />
                  {openCellHost ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCellHost} timeout="auto" unmountOnExit>
                  <TableRow>
                    <TableCell>
                      <strong>contName: </strong>
                      {host.host.contName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>encap: </strong>
                      {host.host.encap}
                    </TableCell>
                  </TableRow>
                </Collapse>
              </List>
            </TableCell>
            <TableCell>{contract.name}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
