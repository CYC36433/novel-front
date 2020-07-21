import request from '@/utils/request'

function getListBySearch(data) {
  return request.get('/api/novel-subscription-fiction/fiction/search', { params: data })
}

const fictionApi = {
  getListBySearch
}

export default fictionApi
