
//import React from 'react';
import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

var a  = 1;

var elasticsearch = require('elasticsearch-browser/elasticsearch.js');
var client = new elasticsearch.Client({
  host: 'localhost:9200'
});


console.log(client);
/*
client.search({
  index: 'bank',
    size: 10,
    body: {
    "query":
        {
            "match": {
                "gender":"M"
            }   
        },
    }
}).then(function (body) {
   var a = body.hits.hits;
   var item;
   for (item in a){
     console.log(a[item]["_source"]["firstname"]);
   }
   
   
}, function (error) {
  console.trace(error.message);
});
*/

//var elasticsearch = require('elasticsearch-browser/');
//var client = new elasticsearch.Client();

// We define an EsConnector module that depends on the elasticsearch module.     


import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText
} from '@elastic/eui';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/echarts_test2/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
    

    client.search({
      index: 'bank',
        size: 20,
        body: {
        "query":
            {
                "match": {
                    "gender":"M"
                }   
            },
        }
    }).then(function (body) {
       var a = body.hits.hits;
       console.log(a);
       var dataNameArr = [];
       var dataBalanceArr = [];
       var item;
       for (item in a){
         var name = (a[item]["_source"]["firstname"]);
         var balance = a[item]["_source"]["balance"];
         dataNameArr.push(name);
         dataBalanceArr.push(balance);
       }

       console.log(dataNameArr);
       console.log(dataBalanceArr);

       var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 銀行存款' },
            tooltip: {},
            xAxis: {
                data: dataNameArr
            },
            yAxis: {},
            series: [{
                name: '存款額',
                type: 'bar',
                data: dataBalanceArr
            }]
        });


    }, function (error) {
      console.trace(error.message);
    });

    
    /*
    var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    */
  }
  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>{title} Hello World!</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Congratulations</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
              <div id="main" style={{ width: 600, height: 400 }}></div>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
