import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddAssetController } from '../factories/controllers/asset/add-asset/add-asset-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/assets', adminAuth, adaptRoute(makeAddAssetController()))
}
