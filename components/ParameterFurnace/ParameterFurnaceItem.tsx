import {
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  CardHeader,
} from "@mui/material";
import React from "react";

type ParameterFurnaceItemTank = {
  name: string;
  material: string;
  amount: number;
  inActiveDuration: number;
};

export type ParameterFurnaceItemType = {
  id: number;
  name: string;
  tanks: ParameterFurnaceItemTank[];
  ironUsage: {
    withSeed: number;
    withoutSeed: number;
  };
};

function ParameterFurnaceItem({ data }: { data: ParameterFurnaceItemType }) {
  return (
    <Card className="flex-1 rounded-lg" elevation={4}>
      <CardContent>
        <Typography
          className="text-center my-3 "
          color="primary"
          variant="subtitle1"
        >
          {data.name}
        </Typography>
        <div className="flex">
          <div className="flex flex-1 items-center gap-2 flex-col">
            <Typography className="text-center" variant="subtitle1">
              وزن پین ها
            </Typography>
            {data.tanks.map((tank) => {
              return (
                <div key={tank.name}>
                  <TextField label="آهن اسفنجی (مخزن ۹)" size="small" />
                  <TextField label="میزان دقیقه غیر فعال" size="small" />
                </div>
              );
            })}
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col mx-2 gap-2 flex-1">
            <Typography className="text-center" variant="subtitle1">
              میزان مصرف آهن
            </Typography>
            <TextField label="بدون سید زنی" size="small" />
            <TextField label="با سید زنی" size="small" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ParameterFurnaceItem;
