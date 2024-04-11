import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { default as Layout } from '../components/layout';
import { Divider } from "../components/common";
import { Card } from "../components/dashboard";
import { useEffectOnce } from "../hooks";
import { getProfitData, getTotals } from "../services";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

const Dashboard = () => {

    const [totals, setTotals] = useState({})
    const [profits, setProfits] = useState([])

    useEffectOnce(() => {
        getProfitData().then((data) => {
            data && setProfits(data.data)
        })
        getTotals().then((data) => {
            data && setTotals(data.data)
        })
    })

    return (
        <Layout title="Dashboard">
            <div class="w-full flex justify-center items-center flex-wrap px-12">
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-12 mb-4">
                    <Card title="Buyer Registrations" value={totals.registrations?.buyers ?? 0} />
                    <Card title="Seller Registrations" value={totals.registrations?.sellers ?? 0} />
                </div>
                <Divider className="my-4"/>
                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 mt-4 mb-4">
                    <Card title="Orders" value={totals.orders ?? 0} />
                    <Card title="Succeeded Payments" value={totals.payments?.succeeded ?? 0} />
                    <Card title="Failed Payments" value={totals.payments?.succeeded ?? 0} />
                    <Card title="Reviews" value={totals.reviews ?? 0} />
                </div>
                <div className="w-full h-[30vh] mt-6">
                    <Bar
                        data={{
                            labels: profits.map(p => p.month),
                            datasets: [
                                {
                                    label: "Net Income from Commission (LKR)",
                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                    borderColor: "rgba(220, 220, 220, 1)",
                                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                    pointBorderColor: "#fff",
                                    data: profits.map(p => p.profit)
                                }
                            ],
                        }}
                        height={350}
                        width={1920}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;