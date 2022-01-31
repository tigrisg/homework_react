import React, { Component } from "react";
import { Card } from "tabler-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Invendus/Vendus par mois',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11', '2021-12', '2022-01'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Vendus',
      data: [50, 126, 97, 130, 167, 21, 134, 80, 89, 303, 151],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Invendus',
      data: [-30, -30, -88, -27, -18, -37, -0, -60, -32, 0, -27],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};
export default class SoldUnsoldChart extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Invendus/Vendus par mois</Card.Title>
        </Card.Header>
        <Card.Body>
          <Bar options={options} data={this.props.dataFromParent} />
        </Card.Body>
      </Card>
    );
  }
}