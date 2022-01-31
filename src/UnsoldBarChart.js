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
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Invendus par mois par magasin',
    },
  },
};

const labels = ['2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11', '2021-12', '2022-01'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Magasin 1',
      data: [30, 30, 88, 97, 17, 18, 0, 0, 0, 0, 27],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Magasin 2',
      data: [0, 0, 0, 10, 0, 37, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Magasin 3',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 60, 11, 0],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default class UnsoldBarChart extends Component {
  render() {
    var datas = 1;
    return (
      <Card>
        <Card.Header>
        <Card.Title>Invendus par mois par magasin</Card.Title>
        </Card.Header>
        <Card.Body>
          <Bar data={data} />
        </Card.Body>
      </Card>
    );
  }
}