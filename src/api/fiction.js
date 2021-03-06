import request from '@/utils/request'

function getHotList() {
  return request.get('/novel-subscription-fiction/fiction/hotSubscription')
}

function getListBySearch(data) {
  return request.get('/novel-subscription-fiction/fiction/search', { params: data })
}

function getDetail(data) {
  return request.get('/novel-subscription-fiction/fiction/' + data)
}

function subscribeNovel(data) {
  return request.post('/novel-subscription-user/customer/subscription/' + data)
}

function cancelSubscribeNovel(data) {
  return request.delete('/novel-subscription-user/customer/subscription/' + data)
}

function checkSubscribeNovel(data) {
  return request.post('/novel-subscription-user/customer/isSubscription/' + data)
}

function getSubscribeList() {
  return request.get('/novel-subscription-user/customer/subscription')
}

function getChapterList(data) {
  return request.get('/novel-subscription-fiction/fiction/getChapterList/' + data)
}

function getChapterContent(data) {
  return request.get('/novel-subscription-fiction/fiction/getChapterContent', { params: data })
}

const fictionApi = {
  getHotList,
  getListBySearch,
  getDetail,
  subscribeNovel,
  cancelSubscribeNovel,
  checkSubscribeNovel,
  getSubscribeList,
  getChapterList,
  getChapterContent
}

export default fictionApi
