import algoliasearch from "algoliasearch";

class AlgoliaSearch {
  private businessIndex: any;
  private candidateIndex: any;
  constructor() {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
    this.businessIndex = client.initIndex(process.env.ALGOLIA_BUSINESS_INDEX);
    this.candidateIndex = client.initIndex(process.env.ALGOLIA_CANDIDATE_INDEX);
  }

  async searchCandidates(query: string) {
    try {
      const { hits } = this.candidateIndex.search(query);
      return hits;
    } catch (error) {
      console.error("ERROR", error);
      return [];
    }
  }

  async searchBusiness(query: string) {
    try {
      const { hits } = this.businessIndex.search(query);
      return hits;
    } catch (error) {
      console.error("ERROR", error);
      return [];
    }
  }
}

const algoliaSearch = new AlgoliaSearch();

export { algoliaSearch };
