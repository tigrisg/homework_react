import './App.css';
import "tabler-react/dist/Tabler.css";
import "tabler-react/dist/Tabler.RTL.css";
import UnsoldDoughnut, { data } from './UnsoldDoughnut';
import SoldUnsoldChart from './SoldUnsoldChart';
import UnsoldBarChart from './UnsoldBarChart';
import SoldUnsoldLineChart from './SoldUnsoldLineChart';
import SoldUnsoldPerShopChart from './SoldUnsoldPerShopChart';
import * as Utils from './Utils'
import { Grid } from "tabler-react";
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {

  const [dataset, setDataset] = useState({});
  const [datapershop, setDatapershop] = useState({});
  const [state, setState] = useState('notyet')

  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare data
    let date = new Set();
    let shops = {};
    let vendue = {label: 'Vendus', backgroundColor: 'rgb(255, 99, 132)'};
    let invendue = {label: 'Invendus', backgroundColor: 'rgb(75, 192, 192)'};
    let solddata = {}, unsolddata = {};
    let datasetShops = [];
    const addDataset = (isUnsold,row) => {
      const data = Array(date.size - 1).fill(0);
      const dsColor = Utils.namedColor(datasetShops.length);
      const newDataset = {
        label: shops[row['shop']] + (isUnsold ? ' Invendu' : ' Vendu'),
        backgroundColor: Utils.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        borderWidth: 1,
        data: data,
        datasetid: row['shop'] + (isUnsold ? 'Invendu' : 'Vendu'),
        stack: shops[row['shop']]
      };
      datasetShops.push(newDataset);
    }
    let prevDate;
    list.map(row => {
      date.add(row['date'])
      if (!shops[row['shop']]) {
        shops[row['shop']] = 'Magasin ' + (Object.keys(shops).length + 1)
      }
      if (row.is_unsold === 'false') {
        if (!solddata[row['date']]) {
          solddata[row['date']] = parseInt(row.count)
        } else {
          solddata[row['date']] += parseInt(row.count)
        }
        if (!unsolddata[row['date']]) {
          unsolddata[row['date']] = 0
        }
      }
      if (row.is_unsold === 'true') {
        if (!unsolddata[row['date']]) {
          unsolddata[row['date']] = -parseInt(row.count)
        } else {
          unsolddata[row['date']] -= parseInt(row.count)
        }
      }

      const isUnsold = (row['is_unsold'] === 'true')
      const count = parseInt(row['count'])
      
      if (datasetShops.length < 1) {
        addDataset(isUnsold, row);
        datasetShops[0].data.push(isUnsold ? -count : count);
      } else {
        let datasetDoesExist = false;
        for (let i = 0; i < datasetShops.length; i++) {
          if (datasetShops[i]['datasetid'] === (row['shop']+ (isUnsold ? 'Invendu' : 'Vendu'))) {
            datasetDoesExist = true;
            datasetShops[i].data.push(isUnsold ? -count : count)
          } else if (datasetShops[i]['data'].length < date.size - 1 && prevDate !== row['date']) {
            datasetShops[i].data.push(0);
          }
        }
        if (!datasetDoesExist) {
          addDataset(isUnsold, row);
          datasetShops[datasetShops.length-1].data.push(isUnsold ? -count : count);
        }
      }
      prevDate = row['date']
      return row
    });
    

    // data for SoldUnsoldChart
    if (!vendue['data']) vendue['data'] = Object.values(solddata);
    if (!invendue['data']) invendue['data'] = Object.values(unsolddata);
    setDataset({
      labels: Array.from(date),
      datasets: [vendue, invendue]
    });
    // data per shop
    // datasetShops.map(ele => {
    //   delete ele['datasetid']
    //   return ele
    // })
    for (let i = 0; i < datasetShops.length; i++) {
      if (datasetShops[i]['data'].length < date.size ) {
        datasetShops[i].data.push(0);
      }
    }
    setDatapershop({
      labels: Array.from(date),
      datasets: datasetShops
    });
    console.log(datasetShops);

    setState('load')
  }

  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }
  return (
    <div className="App">
      <h3>
        Upload the .csv you wish to analyse
      </h3>
      <input type='file' accept='.csv' onChange={handleFileUpload} />
      {/* <Grid.Row>
          <Grid.Col><UnsoldDoughnut /></Grid.Col>
          <Grid.Col><SoldUnsoldChart /></Grid.Col>
          <Grid.Col><UnsoldBarChart /></Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col><SoldUnsoldLineChart /></Grid.Col>
          <Grid.Col><SoldUnsoldPerShopChart /></Grid.Col>
        </Grid.Row> */}
      {state === 'load' && <SoldUnsoldChart dataFromParent={dataset} />}
      {state === 'load' && <SoldUnsoldPerShopChart dataFromParent={datapershop} />}
    </div>
  );
}
export default App;
