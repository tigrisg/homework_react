import React, { Component } from "react";
import { Card } from "tabler-react";
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend} from 'chart.js';
    import "tabler-react/dist/Tabler.css";
    
Chart.register(ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);


export const data = {
    labels: ['2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11', '2021-12', '2022-01'],
    datasets: [
        {
          label: 'Invendus',
          data: [30, 30, 88, 27, 18, 37, 0, 60, 32, 27],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(53, 159, 64, 0.2)',
            'rgba(255, 230, 40, 0.2)',
            'rgba(80, 159, 180, 0.2)',
            'rgba(255, 159, 120, 0.2)',
            'rgba(12, 240, 240, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(53, 159, 64, 1)',
            'rgba(255, 230, 40, 1)',
            'rgba(80, 159, 180, 1)',
            'rgba(255, 159, 120, 0.2)',
            'rgba(12, 240, 240, 0.2)',
          ],
          borderWidth: 1,
        },
      ],
  };

export default class UnsoldDoughnut extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Invendus par mois</Card.Title>
        </Card.Header>
        <Card.Body>
          <Doughnut data={data} />
        </Card.Body>
      </Card>
    );
  }
}