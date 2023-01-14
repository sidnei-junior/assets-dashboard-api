import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddUnitController } from '../factories/controllers/unit/unit-company/add-unit-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/units', adminAuth, adaptRoute(makeAddUnitController()))
}
