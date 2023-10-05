import Head from "next/head";
import { subDays, subHours } from "date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import { useEffect, useState, useCallback } from "react";
import fvtenant from "./FileJson/APIC/fvtenant.json";
import appProfile from "./FileJson/APIC/appProfiles.json";
import bridgDomaine from "./FileJson/APIC/bridgeDomain.json";
import contrat from "./FileJson/APIC/contrats.json";
import epg from "./FileJson/APIC/Epg.json";
import host from "./FileJson/APIC/host.json";
import serveur from "./FileJson/APIC/serveurs.json";
import { DataTable } from "src/sections/fvtenant/data-table";
import ApiService from "../services/api-service";
import { set } from "nprogress";

const now = new Date();
const Page = () => {
  const [fvtenants, setFvtenants] = useState([]);
  const [serveurs, setServeurs] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [bridgedomains, setBridgeDomains] = useState([]);
  const [appProfiles, setAppProfiles] = useState([]);
  const [contrats, setContrats] = useState([]);
  const [epgs, setEpgs] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        setFvtenants(await JSON.parse(JSON.stringify(fvtenant)));
        setServeurs(await JSON.parse(JSON.stringify(serveur)));
        setHosts(await JSON.parse(JSON.stringify(host)));
        setBridgeDomains(await JSON.parse(JSON.stringify(bridgDomaine)));
        setAppProfiles(await JSON.parse(JSON.stringify(appProfile)));
        setContrats(await JSON.parse(JSON.stringify(contrat)));
        setEpgs(await JSON.parse(JSON.stringify(epg)));

        // ApiService.getFvTenants().then((res) => {
        //   setFvtenants(res.data);
        // });

        // ApiService.getContrats().then((res) => {
        //   setContrats(res.data);
        // });

        // ApiService.getAppProfiles().then((res) => {
        //   setAppProfiles(res.data);
        // });

        // ApiService.getEpgs().then((res) => {
        //   setEpgs(res.data);
        // });

        // ApiService.getBridgeDomains().then((res) => {
        //   setBridgeDomains(res.data);
        // });

        // ApiService.getHosts().then((res) => {
        //   setHosts(res.data);
        // });

        // ApiService.getServeurs().then((res) => {
        //   setServeurs(res.data);
        // });

        // ApiService.get
      } catch (error) {
        console.log("erreur lors d'ouvrage du fichier" + error);
      }
    })();
  }, []);

  const data = { fvtenants, serveurs, hosts, bridgedomains, appProfiles, contrats, epgs };
  return (
    <>
      <Head>
        <title>Overview | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={data.fvtenants.totalCount}
                label="fvtenants"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={data.serveurs.totalCount}
                label="Serveurs"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={data.hosts.totalCount}
                label="Host"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={data.bridgedomains.totalCount}
                label="Bridge Domain"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={data.appProfiles.totalCount}
                label="App Profiles"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={data.contrats.totalCount}
                label="Contrats"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={data.epgs.totalCount}
                label="End point Control"
              />
            </Grid>
            {/* <Grid xs={12} sm={12} lg={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownIcon />}
                  arial-controls="panel1-contents"
                  id="panel1a-header"
                >
                  <Typography variant="h5">FvTenants</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataTable data={fvtenants.imdata} label="fvtenant" />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} lg={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownIcon />}
                  arial-controls="panel1-contents"
                  id="panel1a-header"
                >
                  <Typography variant="h5">Serveurs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataTable data={serveurs.imdata} label="serveur" />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} lg={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownIcon />}
                  arial-controls="panel1-contents"
                  id="panel1a-header"
                >
                  <Typography variant="h5">Host</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DataTable data={hosts.imdata} label="host" />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} lg={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownIcon />}
                  arial-controls="panel1-contents"
                  id="panel1a-header"
                >
                  <Typography variant="h5">Bridge Domain</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> Bridge Domain</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} lg={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownIcon />}
                  arial-controls="panel1-contents"
                  id="panel1a-header"
                >
                  <Typography variant="h5">App profiles</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> Application Profiles</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} lg={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownIcon />}
                  arial-controls="panel1-contents"
                  id="panel1a-header"
                >
                  <Typography variant="h5">Contrats</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> Contrats</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} lg={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownIcon />}
                  arial-controls="panel1-contents"
                  id="panel1a-header"
                >
                  <Typography variant="h5">EPG</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> Host</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid> */}

            {/* <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            {/* <Grid xs={12} md={6} lg={4}></Grid> */}
            <Grid xs={12} md={12} lg={8}>
              {/* <OverviewLatestOrders
                orders={[
                  {
                    id: "f69f88012978187a6c12897f",
                    ref: "DEV1049",
                    amount: 30.5,
                    customer: {
                      name: "Ekaterina Tankova",
                    },
                    createdAt: 1555016400000,
                    status: "pending",
                  },
                  {
                    id: "9eaa1c7dd4433f413c308ce2",
                    ref: "DEV1048",
                    amount: 25.1,
                    customer: {
                      name: "Cao Yu",
                    },
                    createdAt: 1555016400000,
                    status: "delivered",
                  },
                  {
                    id: "01a5230c811bd04996ce7c13",
                    ref: "DEV1047",
                    amount: 10.99,
                    customer: {
                      name: "Alexa Richardson",
                    },
                    createdAt: 1554930000000,
                    status: "refunded",
                  },
                  {
                    id: "1f4e1bd0a87cea23cdb83d18",
                    ref: "DEV1046",
                    amount: 96.43,
                    customer: {
                      name: "Anje Keizer",
                    },
                    createdAt: 1554757200000,
                    status: "pending",
                  },
                  {
                    id: "9f974f239d29ede969367103",
                    ref: "DEV1045",
                    amount: 32.54,
                    customer: {
                      name: "Clarke Gillebert",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                  {
                    id: "ffc83c1560ec2f66a1c05596",
                    ref: "DEV1044",
                    amount: 16.76,
                    customer: {
                      name: "Adam Denisov",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                ]}
                sx={{ height: "100%" }}
              /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
