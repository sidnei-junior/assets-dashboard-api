import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddCompanyController } from '../factories/controllers/company/add-company/add-company-controller-factory'
import { makeDeleteCompanyController } from '../factories/controllers/company/delete-company/delete-company-controller-factory'
import { makeLoadCompaniesController } from '../factories/controllers/company/load-companies/load-companies-controller-factory'
import { makeUpdateCompanyController } from '../factories/controllers/company/update-company/update-company-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/companies', adminAuth, adaptRoute(makeAddCompanyController()))
  router.get('/companies', auth, adaptRoute(makeLoadCompaniesController()))
  router.delete('/companies/:companyId', auth, adaptRoute(makeDeleteCompanyController()))
  router.put('/companies/:companyId', auth, adaptRoute(makeUpdateCompanyController()))
}
