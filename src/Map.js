import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import { Chart } from "react-google-charts";
import * as path from 'path';
import * as csv from 'fast-csv';
import Papa from 'papaparse';
import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'
import {isMobile} from 'react-device-detect';

function Map ({ province, data, onClick }) {
    const keys = [
        "State",
        "Confirmed",
        "Deaths",
        "Recovered"
    ];
  const [loading, setLoading] = useState(true);
    useEffect(() => {

        setLoading(false)
        // if (province) {
        //   import(`echarts/map/json/province/${province.pinyin}.json`).then(map => {
        //     echarts.registerMap(province.pinyin, map.default)
        //     setLoading(false)
        //   })
        // } else {
        //   import(`echarts/map/json/world.json`).then(map => {
        //     echarts.registerMap('world', map.default)
        //     setLoading(false)
        //   })
        // }

    }, [province]);
    const [ myData, setMyData] = useState(null);
    useEffect(() => {

        Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTWq32Sh-nuY61nzNCYauMYbiOZhIE8TfnyRhu1hnVs-i-oLdOO65Ax0VHDtcctn44l7NEUhy7gHZUm/pub?output=csv", {
            download: true,
            complete: function(results) {
                let translate = {
                    "NSW":"AU-NSW",
                    "ACT":"AU-ACT",
                    "NT":"AU-NT",
                    "WA":"AU-WA",
                    "VIC":"AU-VIC",
                    "QLD":"AU-QLD",
                    "SA":"AU-SA",
                    "TAS":"AU-TAS",
                }
                let temp = [["state","confirmed"]]
                for(let i = 1; i < results.data.length; i++)
                {
                    temp.push([translate[results.data[i][0]],parseInt(results.data[i][1])])
                }

                setMyData(temp)

            }
        });
        // if (province) {
        //   import(`echarts/map/json/province/${province.pinyin}.json`).then(map => {
        //     echarts.registerMap(province.pinyin, map.default)
        //     setLoading(false)
        //   })
        // } else {
        //   import(`echarts/map/json/world.json`).then(map => {
        //     echarts.registerMap('world', map.default)
        //     setLoading(false)
        //   })
        // }

    }, [province]);


    // const getOption = () => {
  //   return {
  //     visualMap: {
  //       show: true,
  //       type: 'piecewise',
  //       min: 0,
  //       max: 2000,
  //       align: 'right',
  //       top: province ? 0 : '40%',
  //       right: 0,
  //       left: province ? 0 : 'auto',
  //       inRange: {
  //         color: [
  //           '#ffc0b1',
  //           '#ff8c71',
  //           '#ef1717',
  //           '#9c0505'
  //         ]
  //       },
  //       pieces: [
  //         {min: 1000},
  //         {min: 500, max: 999},
  //         {min: 100, max: 499},
  //         {min: 10, max: 99},
  //         {min: 1, max: 9},
  //       ],
  //       padding: 5,
  //       // "inverse": false,
  //       // "splitNumber": 5,
  //       orient: province ? 'horizontal' : 'vertical',
  //       showLabel: province ? false : true,
  //       text: ['High', 'low'],
  //       itemWidth: 10,
  //       itemHeight: 10,
  //       textStyle: {
  //         fontSize: 10
  //       }
  //       // "borderWidth": 0
  //     },
  //     series: [{
  //       left: 'center',
  //       // top: '15%',
  //       // bottom: '10%',
  //       type: 'map',
  //       name: 'Confirmed',
  //       silent: province ? true : false,
  //       label: {
  //         show: true,
  //         position: 'inside',
  //         // margin: 8,
  //         fontSize: 6
  //       },
  //       mapType: province ? province.pinyin : 'world',
  //       data,
  //       zoom: 1.2,
  //       roam: false,
  //       showLegendSymbol: false,
  //       emphasis: {},
  //       rippleEffect: {
  //         show: true,
  //         brushType: 'stroke',
  //         scale: 2.5,
  //         period: 4
  //       }
  //     }]
  //   }
  // }

  // return (
  //   loading ? <div className="loading">Loading...</div> :
  //   <ReactEcharts
  //     echarts={echarts}
  //     option={getOption()}
  //     lazyUpdate={true}
  //     onEvents={{
  //       click (e) {
  //         onClick(e.name)
  //       }
  //     }}
  //   />
  // )



    // const csv = require('fast-csv')
    // const fs = require('fs')
    //

  const getOption = () => {
      return {
          region: 'AU', // Africa
          colorAxis: { colors: [
                  'rgb(245,236,91)',
                  'rgb(218,221,82)',
                  'rgb(153,195,84)',
                  'rgb(55,125,67)' ] },
          backgroundColor: 'white',
          datalessRegionColor: 'rgb(216,221,224)',
          defaultColor: '#f5f5f5',
          resolution: 'provinces'
      }
  };


  return (
    loading ? <div className="loading">Loading...</div> :
        <Chart
            width= {window.innerWidth < 960?'100%':'auto'}
            left="auto"
            align="right"
            top="40%"
            // width={'500px'}
            // height={'300px'}
            chartType="GeoChart"
            data={myData}
            options={getOption()}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey="YOUR_KEY_HERE"
            rootProps={{ 'data-testid': '3' }}
        />
  )
}

export default Map
