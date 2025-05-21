import React, {Component} from 'react';
import {observable} from 'mobx';
import {inject} from 'mobx-react';

import {Grid} from '@material-ui/core';

import f from 'common-ui/utils/f';
import {DEFAULTS} from 'common-ui/utils/globals';
import {FEATURE_PERMISSIONS} from 'utils/globals';
import BaseContainer from 'containers/base_container';
import {permissionCheckerUtil} from 'common-ui/utils/permission_checker_util';
import {ContextAnalysis, ApplicationOverview, VAICatalogMetricData, DeploymentFunnel} from 'components/applications/ai_catalog/v_ai_catalog';
import {cancelApiCall, getAxiosSourceToken} from 'components/reports/gen_ai_report_util';

@inject('aiCatalogStore')
class CAICatalog extends Component {
  @observable _vState = {
    weeklyActiveUsers: {value: 1200, diff: 21},
    userRetention: {value: 80, diff: -1,},
    errorRate: {value: 0.12, diff: 0.01,},
    timeToMarket: {value: 12, diff: -1,},
    applicationOverview: {},
    contextAnalysis: {},
    complianceStatus: {}
	};
  cancelTokenMap = new Map();

	constructor(props) {
		super(props);

		this.permission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.AI_CATALOG.PROPERTY);

		this.cAIApplications = f.initCollection();
		this.cAIApplications.params = {
      size: DEFAULTS.DEFAULT_PAGE_SIZE,
      sort: 'createTime,desc'
    };
	};

	componentDidMount() {
	  this.handleFetch();
	};

  handleFetch = () => {
    //Metrics
    this.fetchWeeklyActiveUsers();
    this.fetchUserRetention();
    this.fetchErrorRate();
    this.fetchTimeToMarket();
    //Graphs
    this.fetchApplicationOverview();
    this.fetchContextAnalysis();
    this.fetchComplianceStatus();
    this.fetchDeploymentFunnel();
  };

  fetchWeeklyActiveUsers = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchWeeklyActiveUsers');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchWeeklyActiveUsers');
    this.props.aiCatalogStore.fetchWeeklyActiveUsers({ params, cancelToken: source.token })
      .then((resp) => {
        // this._vState.weeklyActiveUsers = resp.count || 0;
        // Optionally handle trends, etc.
      }, () => this.setLoadingAndDownloading());
  };

  fetchUserRetention = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchUserRetention');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchUserRetention');
    this.props.aiCatalogStore.fetchUserRetention({ params, cancelToken: source.token })
      .then((resp) => {
        // this._vState.userRetention = resp.count || 0;
      }, () => this.setLoadingAndDownloading());
  };

  fetchErrorRate = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchErrorRate');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchErrorRate');
    this.props.aiCatalogStore.fetchErrorRate({ params, cancelToken: source.token })
      .then((resp) => {
        // this._vState.errorRate = resp.count || 0;
      }, () => this.setLoadingAndDownloading());
  };

  fetchTimeToMarket = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchTimeToMarket');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchTimeToMarket');
    this.props.aiCatalogStore.fetchTimeToMarket({ params, cancelToken: source.token })
      .then((resp) => {
        // this._vState.timeToMarket = resp.count || 0;
      }, () => this.setLoadingAndDownloading());
  };

  fetchApplicationOverview = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchApplicationOverview');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchApplicationOverview');
    this.props.aiCatalogStore.fetchApplicationOverview({ params, cancelToken: source.token })
      .then((resp) => {
        this._vState.applicationOverview = resp; // shape: { deployed, nonCompliant, highRisk, total }
      }, () => this.setLoadingAndDownloading());
  };

  fetchContextAnalysis = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchContextAnalysis');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchContextAnalysis');
    this.props.aiCatalogStore.fetchContextAnalysis({ params, cancelToken: source.token })
      .then((resp) => {
        this._vState.contextAnalysis = resp; // shape: { ... }
      }, () => this.setLoadingAndDownloading());
  };

  fetchComplianceStatus = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchComplianceStatus');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchComplianceStatus');
    this.props.aiCatalogStore.fetchComplianceStatus({ params, cancelToken: source.token })
      .then((resp) => {
        this._vState.complianceStatus = resp; // shape: { ... }
      }, () => this.setLoadingAndDownloading());
  };

  fetchDeploymentFunnel = () => {
    const params = {};
    cancelApiCall(this.cancelTokenMap, 'fetchDeploymentFunnel');
    const source = getAxiosSourceToken(this.cancelTokenMap, 'fetchDeploymentFunnel');
    this.props.aiCatalogStore.fetchDeploymentFunnel({ params, cancelToken: source.token })
      .then((resp) => {
        this._vState.deploymentFunnel = resp; // shape: { ... }
      }, () => this.setLoadingAndDownloading());
  };

	handleRefresh = () => {
    this.handleFetch();
  };

	render() {
		return (
			<BaseContainer
				handleRefresh={this.handleRefresh}
				titleColAttr={{
					sm: 8,
					md: 8
				}}
			>
        <VAICatalogMetricData
          _vState={this._vState}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <ApplicationOverview _vState={this._vState} />
          </Grid>
          <Grid item xs={12} md={7}>
            <ContextAnalysis _vState={this._vState} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <ApplicationOverview _vState={this._vState} />
          </Grid>
          <Grid item xs={12} md={5}>
            <DeploymentFunnel _vState={this._vState} />
          </Grid>
        </Grid>
			</BaseContainer>
		)
	}
}

export default CAICatalog;