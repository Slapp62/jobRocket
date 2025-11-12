const normalizeSearch = (query) => {
  if (query.city === 'All') {
    query.city = '';
  }
  if (query.region === 'All') {
    query.region = '';
  }
  if (query.industry === 'All') {
    query.industry = '';
  }
  if (query.workArrangement === 'All') {
    query.workArrangement = '';
  }
  return {
    searchWord: query.searchWord || '',
    region: query.region || '',
    city: query.city || '',
    industry: query.industry || '',
    workArrangement: query.workArrangement || '',
    sortOption: query.sortOption || '',
    page: query.page || '1',
    limit: query.limit || '20',
  };
};

module.exports = {
  normalizeSearch,
};
