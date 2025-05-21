import React, {Component} from 'react';
import {observer} from "mobx-react";

import {Box, Grid, Paper, Typography} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import {Loader, getSkeleton} from 'common-ui/components/generic_components';
import ReactHighcharts from 'common-ui/lib/highcharts/ReactHighcharts';

const PaperCard = (props) => {
  const { children, boxProps = {}, ...paperProps } = props;
  return (
    <Paper {...paperProps}>
      <Box {...boxProps}>{children}</Box>
    </Paper>
  );
};

class ApplicationOverview extends Component {
  chartOptions = {
    chart: {
      type: 'bar',
      height: 60,
      backgroundColor: 'transparent'
    },
    title: { text: null },
    xAxis: {
      categories: ['Applications'],
      visible: false
    },
    yAxis: {
      visible: false,
      max: 84
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: { enabled: false },
        borderWidth: 0
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>',
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: 'Deployed',
        data: [61],
        color: '#497cf6',
      },
      {
        name: 'Non-compliant',
        data: [30],
        color: '#f7c948',
      },
      {
        name: 'High Risk',
        data: [19],
        color: '#f76b1c',
      }
    ],
    exporting: {
      enabled: false
    },
    credits: { 
      enabled: false 
    }
  };

  render() {
    return (
      <PaperCard boxProps={{ p: 2 }}>
        <div style={{ fontWeight: 600, fontSize: 18 }} className="m-b-lg" >Application overview</div>
        <div style={{ fontSize: 40, fontWeight: 700 }} >
          84 <span style={{ fontSize: 24, fontWeight: 400 }}>Total applications</span>
        </div>

        <ReactHighcharts
          options={this.chartOptions}
          containerProps={{ style: { width: '100%' } }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiberManualRecordIcon style={{ color: '#497cf6', fontSize: 28, marginBottom: 4 }} />
            <span style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>61</span>
            <span style={{ color: '#888', fontWeight: 500 }}>Deployed</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiberManualRecordIcon style={{ color: '#f7c948', fontSize: 28, marginBottom: 4 }} />
            <span style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>30</span>
            <span style={{ color: '#888', fontWeight: 500 }}>Non-compliant</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiberManualRecordIcon style={{ color: '#f76b1c', fontSize: 28, marginBottom: 4 }} />
            <span style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>19</span>
            <span style={{ color: '#888', fontWeight: 500 }}>High Risk</span>
          </div>
        </div>
      </PaperCard>
    );
  }
}

class ContextAnalysis extends Component {
  chartOptions = {
    chart: {
      type: 'heatmap',
      plotBorderWidth: 1,
      backgroundColor: 'transparent',
      height: 300,
    },
    title: { text: null },
    xAxis: {
      categories: ['Has PII', 'No Guardrails', 'In Production'],
      title: null,
    },
    yAxis: {
      categories: ['No Evaluation', 'Has PII', 'No Guardrails', 'Other'],
      title: null,
      reversed: true,
    },
    colorAxis: {
      min: 0,
      minColor: '#ffffff',
      maxColor: '#f76b1c',
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 0,
      symbolHeight: 280
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.series.xAxis.categories[this.point.x]}</b> / <b>${this.series.yAxis.categories[this.point.y]}</b>: <b>${this.point.value}</b>`;
      },
    },
    series: [
      {
        name: 'Context Counts',
        borderWidth: 1,
        data: [
          [0, 0, 4], [1, 0, 12], [2, 0, 2],
          [0, 1, 6], [1, 1, 8], [2, 1, 3],
          [0, 2, 7], [1, 2, 9], [2, 2, 16],
          [0, 3, 1], [1, 3, 8], [2, 3, 16],
        ],
        dataLabels: {
          enabled: true,
          color: '#000000',
          style: {
            textOutline: 'none',
            fontWeight: 'bold',
          },
        },
      },
    ],
    credits: { enabled: false },
    exporting: { enabled: false },
  };

  render() {
    return (
      <PaperCard boxProps={{ p: 2 }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>Context Analysis</div>
        <ReactHighcharts
          options={this.chartOptions}
          containerProps={{ style: { width: '100%' } }}
        />
      </PaperCard>
    );
  }
}

class DeploymentFunnel extends Component {
  chartOptions = {
    chart: {
      type: 'funnel',
      height: 350,
      backgroundColor: 'transparent',
    },
    title: {
      text: null,
      style: {
        fontSize: '16px',
        fontWeight: '600'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.y}</b> {point.name}',
          softConnector: true,
          color: '#000000',
        },
        neckWidth: '30%',
        neckHeight: '25%',
        width: '80%',
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>'
    },
    series: [{
      name: 'Applications',
      data: [
        ['Applications discovered', 84],
        ['Evaluated', 51],
        ['Guardrails', 31],
        ['Approved for deployment', 22]
      ],
      colors: ['#1976d2', '#2196f3', '#64b5f6', '#bbdefb']
    }],
    credits: { enabled: false },
    exporting: { enabled: false }
  };

  render() {
    return (
      <PaperCard boxProps={{ p: 2 }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>Deployment funnel</div>
        <ReactHighcharts
          options={this.chartOptions}
          containerProps={{ style: { width: '100%' } }}
        />
      </PaperCard>
    );
  }
}

function getDiffText(metric, diff) {
  if (diff === 0 || diff === undefined || diff === null) return "";
  if (metric === "timeToMarket") {
    return `${diff > 0 ? "+" : ""}${diff}h this week`;
  }
  return `${diff > 0 ? "+" : ""}${diff}% this week`;
}

@observer
class VAICatalogMetricData extends Component {
  renderMetric(title, value, suffix, diff, diffText) {
    const isPositive = diff > 0;
    const isZero = diff === 0;
    return (
      <PaperCard boxProps={{ p: 2 }}>
        <Typography variant="subtitle2" style={{ color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>
          {title}
        </Typography>
        <Typography variant="h3" style={{ fontWeight: 700, marginBottom: 8 }}>
          {value}{suffix}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: isZero ? '#888' : isPositive ? '#219653' : '#EB5757',
            fontWeight: 600
          }}
        >
          {diffText}
        </Typography>
      </PaperCard>
    );
  }

  render() {
    const { _vState } = this.props;
    return (
      <Grid container spacing={3} className="align-items-center m-b-sm" data-testid="sensitive-data-access-overview-metrics">
        <Grid item md={3} sm={6}>
          {this.renderMetric(
            "Weekly active users",
            _vState.weeklyActiveUsers?.value ? (_vState.weeklyActiveUsers.value / 1000).toFixed(1) + "k" : "0",
            "",
            _vState.weeklyActiveUsers?.diff || 0,
            getDiffText("weeklyActiveUsers", _vState.weeklyActiveUsers?.diff)
          )}
        </Grid>
        <Grid item md={3} sm={6}>
          {this.renderMetric(
            "User retention",
            _vState.userRetention?.value || "0",
            "%",
            _vState.userRetention?.diff || 0,
            getDiffText("userRetention", _vState.userRetention?.diff)
          )}
        </Grid>
        <Grid item md={3} sm={6}>
          {this.renderMetric(
            "Accuracy",
            _vState.errorRate?.value || "0",
            "%",
            _vState.errorRate?.diff || 0,
            getDiffText("accuracy", _vState.errorRate?.diff)
          )}
        </Grid>
        <Grid item md={3} sm={6}>
          {this.renderMetric(
            "Time to market",
            _vState.timeToMarket?.value || "0",
            "h",
            _vState.timeToMarket?.diff || 0,
            getDiffText("timeToMarket", _vState.timeToMarket?.diff)
          )}
        </Grid>
      </Grid>
    );
  }
}

export {
  ApplicationOverview,
  ContextAnalysis,
  VAICatalogMetricData,
  DeploymentFunnel
}
