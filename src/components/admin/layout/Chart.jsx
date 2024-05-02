import React, { useState, useEffect } from "react";
import { useApi } from "contexts/ApiContext";
import Chart from "chart.js/auto"; // Import Chart.js
import { useTranslation } from "contexts/TranslationContext";
import { useConfig } from "contexts/ConfigContext.js";

export default function PieChart() {
  const { get } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [pieData, setPieData] = useState({}); // Initialize pieData as an empty object
  const { __ } = useTranslation();
  const { realm } = useConfig();

  const apiEndpoint = "/ordersnumber";
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

  useEffect(() => {
    if (Object.keys(pieData).length > 0) {
      renderPieChart();
    }
  }, [pieData]);

  const renderPieChart = () => {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: "doughnut",
      data: {
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
            backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#ff6384"], // Adjust colors as needed
            hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf", "#cc5a5f"],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false,
        },
        cutoutPercentage: 80,
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Donut Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4">
                <canvas id="myPieChart"></canvas>
              </div>
              <hr />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
