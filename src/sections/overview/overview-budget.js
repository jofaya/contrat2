import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import DocumentMagnifyingGlassIcon from "@heroicons/react/24/solid/DocumentMagnifyingGlassIcon";
import ServerStackIcon from "@heroicons/react/24/solid/ServerStackIcon";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import KeyIcon from "@heroicons/react/24/solid/KeyIcon";
import { useEffect, useRef, useState } from "react";

export const OverviewBudget = (props) => {
  const { difference, positive = false, sx, value, label } = props;
  const [backgroundIcon, setBackgroundIcon] = useState();
  const [backgroundColor, setBackgroundColor] = useState([]);

  useEffect(() => {
    switch (label) {
      case "fvtenants":
        setBackgroundIcon(<KeyIcon />);
        setBackgroundColor("error");
        break;
      case "Serveurs":
        setBackgroundColor("success");
        setBackgroundIcon(<ServerStackIcon />);
        break;
      case "Host":
        setBackgroundColor("primary");
        setBackgroundIcon(<ComputerDesktopIcon />);
        break;

      default:
        setBackgroundColor("warning");
        setBackgroundIcon(<DocumentMagnifyingGlassIcon />);
        return;
    }
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {label}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: `${backgroundColor}.main`,
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>{backgroundIcon}</SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              {/* <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon> */}
              {/* <Typography color={positive ? "success.main" : "error.main"} variant="body2">
                {difference}%
              </Typography> */}
            </Stack>
            {/* <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography> */}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
