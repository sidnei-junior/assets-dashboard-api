import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddAssetController } from '../factories/controllers/asset/add-asset/add-asset-controller-factory'
import { makeLoadAssetsByUnitController } from '../factories/controllers/asset/load-asset-by-unit/load-asset-by-unit-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/assets', adminAuth, adaptRoute(makeAddAssetController()))
  router.get('/assets/:unitId', auth, adaptRoute(makeLoadAssetsByUnitController()))
}
