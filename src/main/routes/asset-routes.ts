import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddAssetController } from '../factories/controllers/asset/add-asset/add-asset-controller-factory'
import { makeDeleteAssetController } from '../factories/controllers/asset/delete-asset/delete-asset-controller-factory'
import { makeLoadAssetsByCompanyController } from '../factories/controllers/asset/load-asset-by-company/load-asset-by-company-controller-factory'
import { makeLoadAssetsByUnitController } from '../factories/controllers/asset/load-asset-by-unit/load-asset-by-unit-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/assets', adminAuth, adaptRoute(makeAddAssetController()))
  router.get('/assets/:unitId', auth, adaptRoute(makeLoadAssetsByUnitController()))
  router.get('/assets/units/:companyId', auth, adaptRoute(makeLoadAssetsByCompanyController()))
  router.delete('/assets/:assetId', auth, adaptRoute(makeDeleteAssetController()))
}
