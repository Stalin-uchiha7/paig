import BaseStore from './base_store';
import VAICatalog from '../models/m_ai_catalog';

class AICatalogStore extends BaseStore {
    constructor() {
        let baseUrl = 'governance-service/api/ai/application';
        super({
            type: 'ai_application',
            baseUrl
        });
        this.baseUrl = baseUrl;
    }

    fetchWeeklyActiveUsers(opts = {}) {
        opts.path = "/weekly_active_users";
        return this.fetch("", opts);
    }

    fetchUserRetention(opts = {}) {
        opts.path = "/user_retention";
        return this.fetch("", opts);
    }

    fetchErrorRate(opts = {}) {
        opts.path = "/error_rate";
        return this.fetch("", opts);
    }

    fetchTimeToMarket(opts = {}) {
        opts.path = "/time_to_market";
        return this.fetch("", opts);
    }

    fetchApplicationOverview(opts = {}) {
        opts.path = "/application_overview";
        return this.fetch("", opts);
    }

    fetchContextAnalysis(opts = {}) {
        opts.path = "/context_analysis";
        return this.fetch("", opts);
    }

    fetchComplianceStatus(opts = {}) {
        opts.path = "/compliance_status";
        return this.fetch("", opts);
    }

    fetchDeploymentFunnel(opts = {}) {
        opts.path = "/deployment_funnel";
        return this.fetch("", opts);
    }
}

const aiCatalogStore = new AICatalogStore();
export default aiCatalogStore;