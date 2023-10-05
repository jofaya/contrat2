import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

const ResultatIp = (props) => {
  const { listIp } = props;

  useEffect(() => {
    console.log(listIp);
  }, []);
  return (
    <Grid container sx={{ mt: 3 }}>
      {listIp.map((key, index, ip) => (
        <Grid lg={3} md={6} xs={12} key={key}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography align="center" variant="h6">
                {ip[index]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultatIp;
