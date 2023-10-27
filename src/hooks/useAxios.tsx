 import { makeUseAxios } from 'axios-hooks'

import axios from '../common/infra/http/axios'

const useAxios = makeUseAxios({
  axios,
})

export default useAxios
