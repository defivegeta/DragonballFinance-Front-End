import { farms3Config } from 'config/constants'

const getFarm3Config = (pid: number) => farms3Config.find((f) => f.pid === pid)

export default getFarm3Config
