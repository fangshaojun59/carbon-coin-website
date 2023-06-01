import request from '@/utils/requestApi'

export const getWinnerAwardRequest = async (body: { address: string; hold_address: string }) =>
  request({
    url: '/winner_award',
    method: 'post',
    data: body,
  })
