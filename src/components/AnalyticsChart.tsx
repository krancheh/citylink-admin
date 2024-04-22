import { useEffect, useState } from "react";
import { AnalyticsParams, Filter } from "../api/AnalyticsService";
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { LineChart } from "@mui/x-charts";

interface IProps {
    data: {
        x: number[] | string[];
        y: number[];
    }
    dataHint: string;
    setParams: React.Dispatch<React.SetStateAction<AnalyticsParams>>;
}

const AnalyticsChart = (props: IProps) => {
    const { setParams, data, dataHint } = props;

    const date = new Date();
    date.setMonth(new Date().getMonth() - 1);

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().month(dayjs().month() - 1));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [filter, setFilter] = useState<Filter>("byDay");


    useEffect(() => {
        setParams({ startDate: startDate.valueOf(), endDate: endDate.valueOf(), filter });
    }, [startDate, endDate, filter, setParams])

    return (
        <Card sx={{ p: 3, m: 1 }}>
            <Box display="flex" gap="10px">
                <form style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <DatePicker
                        label="От"
                        slotProps={{ textField: { size: 'small' } }}
                        value={dayjs(startDate)}
                        onChange={newDate => {
                            newDate && setStartDate(newDate);
                        }}
                        maxDate={dayjs()}
                        views={filter === "byMonth" ? ["year", "month"] : undefined}
                    />
                    <DatePicker
                        label="До"
                        slotProps={{ textField: { size: 'small' } }}
                        value={dayjs(endDate)}
                        onChange={newDate => {
                            newDate && setEndDate(newDate);
                        }}
                        maxDate={dayjs()}
                        views={filter === "byMonth" ? ["year", "month"] : undefined}
                    />
                    <FormControl sx={{ width: "300px" }} size="small">
                        <InputLabel id="sold-filter-label">Фильтровать:</InputLabel>
                        <Select
                            labelId="sold-filter-label"
                            size="small"
                            value={filter}
                            label="Фильтровать:"
                            onChange={(e) => {
                                setFilter(e.target.value as Filter);
                            }}
                        >
                            <MenuItem value="byMonth">По месяцам</MenuItem>
                            <MenuItem value="byDay">По дням</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </Box>
            <LineChart
                xAxis={[{
                    data: data.x, scaleType: "point", valueFormatter(value) {
                        return filter === "byMonth" ? dayjs(value).format("MMM YYYY") : dayjs(value).format("ll");
                    },
                }]}
                series={[
                    {
                        data: data.y, curve: "linear", valueFormatter(value) {
                            return `${value} ${dataHint}`
                        },
                    }
                ]}
                height={400}
            />
            {!data.x.length && !data.y.length && <Typography>No data</Typography>}
        </Card>
    )
}
export default AnalyticsChart;