import React, { Component } from "react";
import { Card } from "tabler-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Invendus par mois',
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
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Invendus',
      data: [30, 30, 88, 27, 18, 37, 0, 60, 32, 0, 27],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default class SoldUnsoldLineChart extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Invendus par mois</Card.Title>
        </Card.Header>
        <Card.Body>
          <Line data={this.props.dataFromParent} />
        </Card.Body>
      </Card>
    );
  }
}