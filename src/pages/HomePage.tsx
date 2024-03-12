import { LineChart } from "@mui/x-charts"
import PageWrapper from "../components/PageWrapper"
import { Card } from "@mui/material"

const HomePage = () => {
    return (
        <PageWrapper>
            <Card>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                    series={[{
                        data: [2, 3, 5, 10]
                    }]}
                    height={400}
                // width={400}
                />
            </Card>
        </PageWrapper>
    )
}

export default HomePage