import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Button, Card, InputAdornment, OutlinedInput, Stack, SvgIcon } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import TableUnstyled from "src/sections/customer/res-contrat";
import Ipfile from "../../pages/FileJson/APIC/IP.json";
import baseNetworkFile from "../../pages/FileJson/NDO/base-network.json";
import dmzFile from "../../pages/FileJson/NDO/dmz.json";
import globalNetworkFile from "../../pages/FileJson/NDO/global-network.json";
import telmaPPNetworkFile from "../../pages/FileJson/NDO/telma-PP01-Network.json";
import telmaProdNetworkFile from "../../pages/FileJson/NDO/telmap-prod01-network.json";

const CustomerContrat = () => {
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [adresseIp, setAdresseIp] = useState([]);
  const [dmz, setDmz] = useState();
  const [globalNetwork, setGlobalNetwork] = useState();
  const [prodNetwork, setProdNetwork] = useState();
  const [ppNetwork, setPpNetwork] = useState();
  const [baseNetwork, setBaseNetwork] = useState();
  const [ipConsumer, setIpConsumer] = useState([]);
  const [ipProvider, setIpProvider] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    (async function () {
      setAdresseIp(await JSON.parse(JSON.stringify(Ipfile)));
      setDmz(await JSON.parse(JSON.stringify(dmzFile)));
      setGlobalNetwork(await JSON.parse(JSON.stringify(globalNetworkFile)));
      setProdNetwork(await JSON.parse(JSON.stringify(telmaProdNetworkFile)));
      setPpNetwork(await JSON.parse(JSON.stringify(telmaPPNetworkFile)));
      setBaseNetwork(await JSON.parse(JSON.stringify(baseNetworkFile)));
    })();
  }, []);

  const formik = useFormik({
    initialValues: {
      contratName: "",
    },
    onSubmit: (values, helpers) => {
      const resEpg = searchContrat(inputRef.current.value.toUpperCase());
      const IPConsumer = searchIp(resEpg.consumer);
      const IPProvider = searchIp(resEpg.provider);

      setIpConsumer(IPConsumer);
      setIpProvider(IPProvider);
    },
  });

  function searchContrat(contrat) {
    let epgAssociatedToContratConsumer = {
      consumer: [],
      provider: [],
    };

    const dmzTemplatesAnps = dmz.templates[0].anps;
    const GNTemplatesAnps = globalNetwork.templates[0].anps;
    const ProdNtemplatesAnps = prodNetwork.templates[0].anps;
    const PNtemplatesAnps = ppNetwork.templates[0].anps;
    const BNtemplatesAnps = baseNetwork.templates[0].anps;

    for (const key in dmzTemplatesAnps) {
      for (const key1 in dmzTemplatesAnps[key].epgs) {
        for (const key2 in dmzTemplatesAnps[key].epgs[key1].contractRelationships) {
          let StringcontratRef =
            dmzTemplatesAnps[key].epgs[key1].contractRelationships[key2].contractRef;
          const last_index = StringcontratRef.lastIndexOf("/contracts/");
          if (last_index !== -1) {
            const contrat_ref = StringcontratRef.substring(last_index + 11);
            if (
              dmzTemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "consumer" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.consumer.push(
                dmzTemplatesAnps[key].epgs[key1].displayName
              );
            }

            if (
              dmzTemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "provider" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.provider.push(
                dmzTemplatesAnps[key].epgs[key1].displayName
              );
            }
          }
        }
      }
    }

    for (const key in GNTemplatesAnps) {
      for (const key1 in GNTemplatesAnps[key].epgs) {
        for (const key2 in GNTemplatesAnps[key].epgs[key1].contractRelationships) {
          let StringcontratRef =
            GNTemplatesAnps[key].epgs[key1].contractRelationships[key2].contractRef;
          const last_index = StringcontratRef.lastIndexOf("/contracts/");
          if (last_index !== -1) {
            const contrat_ref = StringcontratRef.substring(last_index + 11);
            if (
              GNTemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "consumer" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.consumer.push(
                GNTemplatesAnps[key].epgs[key1].displayName
              );
            }

            if (
              GNTemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "provider" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.provider.push(
                GNTemplatesAnps[key].epgs[key1].displayName
              );
            }
          }
        }
      }
    }

    for (const key in ProdNtemplatesAnps) {
      for (const key1 in ProdNtemplatesAnps[key].epgs) {
        for (const key2 in ProdNtemplatesAnps[key].epgs[key1].contractRelationships) {
          let StringcontratRef =
            ProdNtemplatesAnps[key].epgs[key1].contractRelationships[key2].contractRef;
          const last_index = StringcontratRef.lastIndexOf("/contracts/");
          if (last_index !== -1) {
            const contrat_ref = StringcontratRef.substring(last_index + 11);
            if (
              ProdNtemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "consumer" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.consumer.push(
                ProdNtemplatesAnps[key].epgs[key1].displayName
              );
            }

            if (
              ProdNtemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "provider" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.provider.push(
                ProdNtemplatesAnps[key].epgs[key1].displayName
              );
            }
          }
        }
      }
    }

    for (const key in PNtemplatesAnps) {
      for (const key1 in PNtemplatesAnps[key].epgs) {
        for (const key2 in PNtemplatesAnps[key].epgs[key1].contractRelationships) {
          let StringcontratRef =
            PNtemplatesAnps[key].epgs[key1].contractRelationships[key2].contractRef;
          const last_index = StringcontratRef.lastIndexOf("/contracts/");
          if (last_index !== -1) {
            const contrat_ref = StringcontratRef.substring(last_index + 11);
            if (
              PNtemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "consumer" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.consumer.push(
                PNtemplatesAnps[key].epgs[key1].displayName
              );
            }

            if (
              PNtemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "provider" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.provider.push(
                PNtemplatesAnps[key].epgs[key1].displayName
              );
            }
          }
        }
      }
    }

    for (const key in BNtemplatesAnps) {
      for (const key1 in BNtemplatesAnps[key].epgs) {
        for (const key2 in BNtemplatesAnps[key].epgs[key1].contractRelationships) {
          let StringcontratRef =
            BNtemplatesAnps[key].epgs[key1].contractRelationships[key2].contractRef;
          const last_index = StringcontratRef.lastIndexOf("/contracts/");
          if (last_index !== -1) {
            const contrat_ref = StringcontratRef.substring(last_index + 11);
            if (
              BNtemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "consumer" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.consumer.push(
                BNtemplatesAnps[key].epgs[key1].displayName
              );
            }

            if (
              BNtemplatesAnps[key].epgs[key1].contractRelationships[key2].relationshipType ===
                "provider" &&
              contrat_ref === contrat
            ) {
              epgAssociatedToContratConsumer.provider.push(
                BNtemplatesAnps[key].epgs[key1].displayName
              );
            }
          }
        }
      }
    }
    // console.log(epgAssociatedToContratConsumer);
    return epgAssociatedToContratConsumer;
  }

  function searchIp(epgConsumer) {
    const ipFound = [];

    for (const key in adresseIp.imdata) {
      const chaine = adresseIp.imdata[key].fvCEp.attributes.dn;
      const regex = /epg-([^/]+)/;
      const match = chaine.match(regex);

      for (const key2 in epgConsumer) {
        if (match && epgConsumer[key2] == match[1]) {
          for (const keys in adresseIp.imdata[key].fvCEp.children) {
            if ("fvIp" in adresseIp.imdata[key].fvCEp.children[keys]) {
              ipFound.push(adresseIp.imdata[key].fvCEp.children[keys].fvIp.attributes.addr);
            }
          }
        }
      }
    }
    if (ipFound.length > 0) {
      setShowResult(true);
    }
    return ipFound;
  }

  return (
    <>
      <Card sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <OutlinedInput
              autoComplete="off"
              name="epg-name"
              inputRef={inputRef}
              fullWidth
              placeholder="Nom Contrat"
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
      </Card>

      {/* <ResultatContrat consum={ipConsumer} prov={ipProvider} /> */}
      <TableUnstyled consum={ipConsumer} prov={ipProvider} />
    </>
  );
};

export default CustomerContrat;
