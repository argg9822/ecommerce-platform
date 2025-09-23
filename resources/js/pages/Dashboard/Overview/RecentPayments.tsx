import axios from "axios";
import { useEffect } from "react";

export default function RecentPayments() {
    useEffect(() => {
        const response = axios.get(route('dashboard_payments'));
        console.log(response);
    }, []);

    return (
        <div className="dashboard__card dashboard__payments">
            <h3 className="dashboard__title">Pagos recientes</h3>
        </div>
    );
}