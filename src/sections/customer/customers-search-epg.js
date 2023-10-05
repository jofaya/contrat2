import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Button, Card, InputAdornment, OutlinedInput, Stack, SvgIcon } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Ipfile from "../../pages/FileJson/APIC/IP.json";
import ResultatIp from "./adresse-ip-found";

const CustomerEpg = () => {
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [adresseIp, setAdresseIp] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    (async function () {
      setAdresseIp(await JSON.parse(JSON.stringify(Ipfile)));
    })();
    console.log(result);
  }, []);

  const formik = useFormik({
    initialValues: {
      epgName: "",
    },
    onSubmit: (values, helpers) => {
      findIpInEpg();
    },
  });

  function findIpInEpg() {
    // let i = 0;
    const ipFound = [];
    for (const key in adresseIp.imdata) {
      const chaine = adresseIp.imdata[key].fvCEp.attributes.dn;
      const regex = /epg-([^/]+)/;
      const match = chaine.match(regex);
      if (match && inputRef.current.value.toUpperCase() == match[1]) {
        for (const keys in adresseIp.imdata[key].fvCEp.children) {
          if ("fvIp" in adresseIp.imdata[key].fvCEp.children[keys]) {
            ipFound.push(adresseIp.imdata[key].fvCEp.children[keys].fvIp.attributes.addr);
          }
        }
      }
    }
    if (ipFound.length > 0) {
      setResult(ipFound);
      setShowResult(true);
    }
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
              placeholder="Entrez le nom d' Epg"
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

      {showResult &&
        (result !== undefined ? <ResultatIp listIp={result} /> : <div>Aucune Resultat</div>)}
    </>
  );
};

export default CustomerEpg;
