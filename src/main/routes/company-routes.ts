import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddCompanyController } from '../factories/controllers/company/add-company/add-company-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/companies', adminAuth, adaptRoute(makeAddCompanyController()))
}
