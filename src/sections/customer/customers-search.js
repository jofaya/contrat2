import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import bD from "../../pages/FileJson/APIC/bridgeDomain.json";
import epg from "../../pages/FileJson/APIC/Epg.json";
import hostFile from "../../pages/FileJson/APIC/host.json";
import adresseIP from "../../pages/FileJson/APIC/IP.json";
import serveurFile from "../../pages/FileJson/APIC/serveurs.json";
import baseNetworkFile from "../../pages/FileJson/NDO/base-network.json";
import dmzFile from "../../pages/FileJson/NDO/dmz.json";
import globalNetworkFile from "../../pages/FileJson/NDO/global-network.json";
import telmaPPNetworkFile from "../../pages/FileJson/NDO/telma-PP01-Network.json";
import telmaProdNetworkFile from "../../pages/FileJson/NDO/telmap-prod01-network.json";
import axios from "axios";
import { ResultOfSearch } from "./tree";
import apiService from "src/services/api-service";

const CustomersSearch = () => {
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [adresseIp, setAdresseIp] = useState([]);
  const [epgs, setEpgs] = useState([]);
  const [bridgeDomain, setBridgeDomain] = useState([]);
  const [host, setHost] = useState([]);
  const [serveur, setServeur] = useState([]);
  const [dmz, setDmz] = useState([]);
  const [baseNetwork, setBaseNetwork] = useState("");
  const [globalNetwork, setGlobalNetwork] = useState();
  const [telmaPPNetwork, setTelmaPPNetwork] = useState();
  const [telmaProdNetwork, setTelmaProdNetwork] = useState();

  const inputRef = useRef();

  useEffect(() => {
    (async function () {
      setAdresseIp(await JSON.parse(JSON.stringify(adresseIP)));
      setEpgs(await JSON.parse(JSON.stringify(epg)));
      setBridgeDomain(await JSON.parse(JSON.stringify(bD)));
      setHost(JSON.parse(await JSON.stringify(hostFile)));
      setServeur(JSON.parse(await JSON.stringify(serveurFile)));
      setDmz(JSON.parse(await JSON.stringify(dmzFile)));
      setBaseNetwork(JSON.parse(await JSON.stringify(baseNetworkFile)));
      setGlobalNetwork(JSON.parse(await JSON.stringify(globalNetworkFile)));
      setTelmaPPNetwork(JSON.parse(await JSON.stringify(telmaPPNetworkFile)));
      setTelmaProdNetwork(JSON.parse(await JSON.stringify(telmaProdNetworkFile)));
      // apiService.getDmz().then((res) => {
      //   setDmz(res);
      // });
      // apiService.getEpgs().then((res) => {
      //   setEpgs(res);
      // });
      // apiService.getBridgeDomains().then((res) => {
      //   setBridgeDomain(res);
      // });
      // apiService.getHosts().then((res) => {
      //   setHost(res);
      // });
      // apiService.getServeurs().then((res) => {
      //   setServeur(res);
      // });
      // apiService.getBaseNetwork().then((res) => {
      //   setBaseNetwork(res);
      // });
      // apiService.getGlobalNetwork().then((res) => {
      //   setGlobalNetwork(res);
      // });
      // apiService.getPpNetwork().then((res) => {
      //   setTelmaPPNetwork(res);
      // });
      // apiService.getProdNetwork().then((res) => {
      //   setTelmaProdNetwork(res);
      // });
    })();
  }, []);

  //get data using axios

  const formik = useFormik({
    initialValues: {
      ipAdress: "",
    },
    validationSchema: Yup.object({
      ipAdress: Yup.string().matches(
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        "Adresse Ip invalid"
      ),
    }),

    onSubmit: (values, helpers) => {
      findInfoForIpAddress();
    },
  });

  const fvCEp = adresseIp.imdata;
  const fvAEPg = epgs.imdata;
  const fvBd = bridgeDomain.imdata;
  const hostFvCEp = host.imdata;
  const compHv = serveur.imdata;

  const dataJson = {
    fvCEp,
    fvAEPg,
    fvBd,
    hostFvCEp,
    compHv,
    dmz,
    baseNetwork,
    globalNetwork,
    telmaPPNetwork,
    telmaProdNetwork,
  };

  const findAssociatedContractInDmz = (dataJson, epgName) => {
    let find = false;
    const contractRelationships = [];
    const templates = dataJson.dmz.templates;

    for (const key in templates) {
      for (const key1 in templates[key].anps) {
        if ("epgs" in templates[key].anps[key1]) {
          for (const key2 in templates[key].anps[key1].epgs) {
            if (
              templates[key].anps[key1].epgs[key2].name === epgName &&
              "contractRelationships" in templates[key].anps[key1].epgs[key2]
            ) {
              find = true;
              contractRelationships.push(
                templates[key].anps[key1].epgs[key2].contractRelationships
              );

              return {
                find,
                contractRelationships,
                name: "DMZ",
              };
            }
          }
        }
      }
    }
    if (!find) {
      const findInBasenetwork = findAssociatedContractInBaseNetWork(dataJson, epgName);
      if (findInBasenetwork.find) {
        return {
          find: findInBasenetwork.find,
          contractRelationships: findInBasenetwork.contractRelationships,
          name: "TELMA BASE NETWORK",
        };
      } else {
        const findInGlobalnetWork = findAssociatedContractInGlobalNetwork(dataJson, epgName);
        if (findInGlobalnetWork.find) {
          return {
            find: findInGlobalnetWork.find,
            contractRelationships: findInGlobalnetWork.contractRelationships,
            name: "TELMA GLOBAL NETWORK",
          };
        } else {
          const findInTelmaPPNetwork = findAssociatedContractInTelmaPPNetwork(dataJson, epgName);
          if (findInTelmaPPNetwork.find) {
            return {
              find: findInTelmaPPNetwork.find,
              contractRelationships: findInTelmaPPNetwork.contractRelationships,
              name: "TELMA PP01 NETWORK",
            };
          } else {
            const findInTelmaProdNetwork = findAssociatedContractInTelmaProdetwork(
              dataJson,
              epgName
            );
            if (findInTelmaProdNetwork.find) {
              return {
                find: findInTelmaProdNetwork.find,
                contractRelationships: findInTelmaProdNetwork.contractRelationships,
                name: "TELMA PROD 01 NETWORK",
              };
            }
          }
        }
      }
    }
    return {
      find,
      contractRelationships,
      name: "none",
    };
  };

  const findAssociatedContractInBaseNetWork = (dataJson, epgName) => {
    let find = false;
    const contractRelationships = [];
    const templates = dataJson.baseNetwork.templates;

    for (const key in templates) {
      for (const key1 in templates[key].anps) {
        if ("epgs" in templates[key].anps[key1]) {
          for (const key2 in templates[key].anps[key1].epgs) {
            if (
              templates[key].anps[key1].epgs[key2].name === epgName &&
              "contractRelationships" in templates[key].anps[key1].epgs[key2]
            ) {
              find = true;
              contractRelationships.push(
                templates[key].anps[key1].epgs[key2].contractRelationships
              );

              return {
                find,
                contractRelationships,
              };
            }
          }
        }
      }
    }
    return {
      find,
      contractRelationships,
    };
  };

  const findAssociatedContractInGlobalNetwork = (dataJson, epgName) => {
    let find = false;
    const contractRelationships = [];
    const templates = dataJson.globalNetwork.templates;

    for (const key in templates) {
      for (const key1 in templates[key].anps) {
        if ("epgs" in templates[key].anps[key1]) {
          for (const key2 in templates[key].anps[key1].epgs) {
            if (
              templates[key].anps[key1].epgs[key2].name === epgName &&
              "contractRelationships" in templates[key].anps[key1].epgs[key2]
            ) {
              find = true;
              contractRelationships.push(
                templates[key].anps[key1].epgs[key2].contractRelationships
              );

              return {
                find,
                contractRelationships,
              };
            }
          }
        }
      }
    }
    return {
      find,
      contractRelationships,
    };
  };

  const findAssociatedContractInTelmaPPNetwork = (dataJson, epgName) => {
    let find = false;
    const contractRelationships = [];
    const templates = dataJson.telmaPPNetwork.templates;

    for (const key in templates) {
      for (const key1 in templates[key].anps) {
        if ("epgs" in templates[key].anps[key1]) {
          for (const key2 in templates[key].anps[key1].epgs) {
            if (
              templates[key].anps[key1].epgs[key2].name === epgName &&
              "contractRelationships" in templates[key].anps[key1].epgs[key2]
            ) {
              find = true;
              contractRelationships.push(
                templates[key].anps[key1].epgs[key2].contractRelationships
              );

              return {
                find,
                contractRelationships,
              };
            }
          }
        }
      }
    }
    return {
      find,
      contractRelationships,
    };
  };

  const findAssociatedContractInTelmaProdetwork = (dataJson, epgName) => {
    let find = false;
    const contractRelationships = [];
    const templates = dataJson.telmaProdNetwork.templates;

    for (const key in templates) {
      for (const key1 in templates[key].anps) {
        if ("epgs" in templates[key].anps[key1]) {
          for (const key2 in templates[key].anps[key1].epgs) {
            if (
              templates[key].anps[key1].epgs[key2].name === epgName &&
              "contractRelationships" in templates[key].anps[key1].epgs[key2]
            ) {
              find = true;
              contractRelationships.push(
                templates[key].anps[key1].epgs[key2].contractRelationships
              );

              return {
                find,
                contractRelationships,
              };
            }
          }
        }
      }
    }
    return {
      find,
      contractRelationships,
    };
  };

  // const targetIpAddress = "10.246.201.4";

  const findInfoForIpAddress = () => {
    const data = dataJson;
    const ipAddress = inputRef.current.value;
    for (const key in data.fvCEp) {
      for (const keys in data.fvCEp[key].fvCEp.children) {
        if (
          "fvIp" in data.fvCEp[key].fvCEp.children[keys] &&
          data.fvCEp[key].fvCEp.children[keys].fvIp.attributes.addr === ipAddress
        ) {
          const bdDn = data.fvCEp[key].fvCEp.attributes.bdDn;
          const dn = data.fvCEp[key].fvCEp.attributes.dn;
          const parts = dn.split("/");
          const epgDn = parts.slice(0, 4).join("/");
          const serveurName = data.fvCEp[key].fvCEp.attributes.hostingServer;
          const hostName = data.fvCEp[key].fvCEp.attributes.name;

          const associatedEPG = findAssociatedEPG(epgDn, data);
          const associatedBridge = findAssociatedBridge(bdDn, data);
          const associatedContract = findAssociatedContractInDmz(data, associatedEPG.name);
          const associatedHost = findAssociatedHost(hostName, data);
          const associatedServeur = findAssociatedServeur(serveurName, data);

          setResult({
            adresseIP: data.fvCEp[key].fvCEp.children[keys].fvIp.attributes,
            epg: associatedEPG,
            bdDn: associatedBridge,
            host: associatedHost,
            serveur: associatedServeur,
            contract: associatedContract,
          });
          setShowResult(true);
          return true;
        }
      }
    }
    setResult(null);
    return false;
  };

  function findAssociatedEPG(epgDn, data) {
    for (const key in data.fvAEPg) {
      if (data.fvAEPg[key].fvAEPg.attributes.dn === epgDn && data.fvAEPg[key].fvAEPg.attributes) {
        return {
          name: data.fvAEPg[key].fvAEPg.attributes.name,
          annotation: data.fvAEPg[key].fvAEPg.attributes.annotation,
        };
      }
    }
  }

  function findAssociatedBridge(bridgeDn, data) {
    for (const key in data.fvBd) {
      if (data.fvBd[key].fvBD.attributes.dn === bridgeDn && data.fvBd[key].fvBD.attributes) {
        return {
          name: data.fvBd[key].fvBD.attributes.name,
          annotation: data.fvBd[key].fvBD.attributes.annotation,
        };
      }
    }
  }

  function findAssociatedServeur(serveurName, data) {
    for (const key in data.compHv) {
      if (
        data.compHv[key].compHv.attributes &&
        data.compHv[key].compHv.attributes.name === serveurName
      ) {
        return {
          serveur: data.compHv[key].compHv.attributes,
        };
      }
    }
  }

  function findAssociatedHost(hostName, data) {
    for (const key in data.hostFvCEp) {
      if (
        data.hostFvCEp[key].fvCEp.attributes &&
        data.hostFvCEp[key].fvCEp.attributes.name === hostName
      ) {
        return {
          host: data.hostFvCEp[key].fvCEp.attributes,
        };
      }
    }
  }

  // function findAssociatedEPG(epgDn, epgData) {
  //   for (const key in epgData) {
  //     if (epgData[key].attributes && epgData[key].attributes.dn === epgDn) {
  //       return {
  //         name: epgData[key].attributes.name,
  //         annotation: epgData[key].attributes.annotation,
  //       };
  //     }
  //   }
  //   return null;
  // }

  // function findAssociatedContract(contractDn, contractData) {
  //   for (const key in contractData) {
  //     if (contractData[key].attributes && contractData[key].attributes.dn === contractDn) {
  //       return {
  //         name: contractData[key].attributes.name,
  //         annotation: contractData[key].attributes.annotation,
  //       };
  //     }
  //   }
  //   return null;
  // }

  // const result = findInfoForIpAddress(dataJson, targetIpAddress);

  // if (result) {
  //   console.log("Informations pour l'adresse IP " + result.ipAddress + ":");
  //   console.log("EPG associé:", result.epg);
  //   console.log("Contrat associé:", result.contract);
  // } else {
  //   console.log("Aucune information trouvée pour l'adresse IP " + targetIpAddress);
  // }
  // // const dataJson = {
  //   fvCEP: {
  //     adresseIP,
  //   },
  //   epg: {
  //     epg,
  //   },
  //   contrats: {
  //     contrats,
  //   },
  // };

  return (
    <>
      <Card sx={{ p: 2 }}>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <OutlinedInput
              autoComplete="off"
              name="ipAdress"
              id="ipAdress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ipAdress}
              error={!!(formik.touched.ipAdress && formik.errors.ipAdress)}
              inputRef={inputRef}
              fullWidth
              placeholder="Entrez l'adresse Ip"
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{ maxWidth: 500 }}
            />

            <Button variant="contained" type="submit">
              Rechercher
            </Button>
          </Stack>
        </form>
        {formik.touched.ipAdress && formik.errors.ipAdress && (
          <Typography color="error" sx={{ mt: 3 }} variant="body2">
            {formik.errors.ipAdress}
          </Typography>
        )}
      </Card>
      {showResult &&
        (result !== null ? (
          <ResultOfSearch
            ip={result.adresseIP}
            epg={result.epg}
            bdDn={result.bdDn}
            host={result.host}
            serveur={result.serveur}
            contract={result.contract}
          />
        ) : (
          <p style={{ textAlign: "center" }}>Aucune Resultat</p>
        ))}
    </>
  );
};

export default CustomersSearch;
