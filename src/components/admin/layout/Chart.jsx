import React, { useState, useEffect } from "react";
import { useApi } from "contexts/ApiContext";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "contexts/TranslationContext";
import { useConfig } from "contexts/ConfigContext.js";
import { Card, Spinner } from "react-bootstrap";

export default function PieChart() {
  const { get } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [pieData, setPieData] = useState({}); // Initialize pieData as an empty object
  const { __ } = useTranslation();
  const { realm } = useConfig();

  const apiEndpoint = "/ordersnumber?date=2024-04-28";
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await get(apiEndpoint);
      console.log(response.data);
      setPieData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="container-fluid" style={{ top: '18rem', padding:'15px',display:'block'}}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <Card border="dark">
          <Card.Title>
          <h1 className="mt-4 mb-4"> {__("Daily order status")}</h1>
         
          </Card.Title>
          <Card.Body>
            <Doughnut
              data={{
                labels: [
                  __("Recorded"),
                  __("In Progress"),
                  __("Served"),
                  __("Late Served"),
                ],
                datasets: [
                  {
                    data: [
                      pieData.recorded,
                      pieData.in_progress,
                      pieData.served,
                      pieData.late_served,
                    ],
                    backgroundColor: [
                      "#4e73df",
                      "#1cc88a",
                      "#36b9cc",
                      "#ff6384",
                    ],
                    hoverBackgroundColor: [
                      "#2e59d9",
                      "#17a673",
                      "#2c9faf",
                      "#cc5a5f",
                    ],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                  },
                ],
              }}
            />
            </Card.Body>
          </Card>
        </div>
        </div>
      )}
    </div>
  );
}
