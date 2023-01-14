import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeDeleteUnitController } from '../factories/controllers/unit/delete-unit/delete-unit-controller-factory'
import { makeLoadUnitsByCompanyController } from '../factories/controllers/unit/load-units-by-company/load-units-by-company-controller-factory'
import { makeAddUnitController } from '../factories/controllers/unit/unit-company/add-unit-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/units', adminAuth, adaptRoute(makeAddUnitController()))
  router.get('/units/:companyId', auth, adaptRoute(makeLoadUnitsByCompanyController()))
  router.delete('/units/:unitId', auth, adaptRoute(makeDeleteUnitController()))
}
