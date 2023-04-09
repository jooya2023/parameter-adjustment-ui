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
  amount: string;
  inActiveDuration: string;
};

export type ParameterFurnaceItemType = {
  id: number;
  name: string;
  tanks: ParameterFurnaceItemTank[];
  ironUsage: {
    withSeed: string;
    withoutSeed: string;
  };
};

function ParameterFurnaceItem({
  data,
  onChangeData,
}: {
  data: ParameterFurnaceItemType;
  onChangeData: (value: ParameterFurnaceItemType) => void;
}) {
  function handleUpdateTanks(index: number, newData: ParameterFurnaceItemTank) {
    const temp = data.tanks;
    temp[index] = newData;
    onChangeData({
      ...data,
      tanks: temp,
    });
  }
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
          <div className="flex flex-1 items-center gap-3 flex-col">
            <Typography className="text-center" variant="subtitle1">
              وزن پین ها
            </Typography>
            {data.tanks.map((tank, index) => {
              return (
                <div key={tank.name} className="flex gap-2">
                  <TextField
                    label={`${tank.name} (${tank.material})`}
                    size="small"
                    value={tank.amount}
                    onChange={(e) =>
                      handleUpdateTanks(index, {
                        ...tank,
                        amount: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="میزان دقیقه غیر فعال"
                    size="small"
                    value={tank.inActiveDuration}
                    onChange={(e) =>
                      handleUpdateTanks(index, {
                        ...tank,
                        inActiveDuration: e.target.value,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col mx-2 gap-2 flex-1">
            <Typography className="text-center" variant="subtitle1">
              میزان مصرف آهن
            </Typography>
            <TextField
              label="بدون سید زنی"
              size="small"
              value={data.ironUsage.withoutSeed}
              onChange={(e) =>
                onChangeData({
                  ...data,
                  ironUsage: {
                    withoutSeed: e.target.value,
                    withSeed: data.ironUsage.withSeed,
                  },
                })
              }
            />
            <TextField
              label="با سید زنی"
              size="small"
              value={data.ironUsage.withSeed}
              onChange={(e) =>
                onChangeData({
                  ...data,
                  ironUsage: {
                    withoutSeed: data.ironUsage.withSeed,
                    withSeed: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ParameterFurnaceItem;
