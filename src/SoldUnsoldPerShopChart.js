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
      text: 'Invendus/Vendus par mois par magasin',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
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
      label: 'Vendus 1',
      data: [55, 126, 97, 98, 123, 19, 134, 80, 0, 136, 76],
      backgroundColor: 'rgb(150, 250, 132)',
      stack: 'Magasin 1',
    },
    {
      label: 'Invendus 1',
      data: [-30, -30, -88, -10, -17, -18, -37, -0, -0, -21, -27],
      backgroundColor: 'rgb(215, 50, 70)',
      stack: 'Magasin 1',
    },
    {
      label: 'Vendus 2',
      data: [0, 0, 0, 32, 44, 2, 0, 0, 0, 0, 0],
      backgroundColor: 'rgb(150, 99, 132)',
      stack: 'Magasin 2',
    },
    {
      label: 'Invendus 2',
      data: [-0, -0, -0, -10, -0, -37, -0, -0, -0, -0, -0],
      backgroundColor: 'rgb(215, 100, 192)',
      stack: 'Magasin 2',
    },
    {
      label: 'Vendus 3',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 89, 167, 75],
      backgroundColor: 'rgb(150, 99, 250)',
      stack: 'Magasin 3',
    },
    {
      label: 'Invendus 3',
      data: [-0, -0, -0, -0, -0, -0, -0, -0, -60, -11, -0],
      backgroundColor: 'rgb(215, 50, 50)',
      stack: 'Magasin 3',
    },
  ],
};
export default class SoldUnsoldPerShopChart extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Invendus/Vendus par mois par magasin</Card.Title>
        </Card.Header>
        <Card.Body>
          <Bar options={options} data={this.props.dataFromParent} />
        </Card.Body>
      </Card>
    );
  }
}