import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { LoadCompanyByCnpjRepository } from '@/data/protocols/db/company/load-company-by-cnpj-repository'
import { CompanyModel } from '@/domain/modals/company'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'
import { MongoHelper } from '../helper/mongo-helper'

export class CompanyMongoRepository implements AddCompanyRepository, LoadCompanyByCnpjRepository {
  async add(companyData: AddCompanyModel): Promise<CompanyModel> {
    const companyCollection = await MongoHelper.getCollection('companies')
    const result = await companyCollection.insertOne(companyData)
    const { insertedId: id } = result
    const companyById = await companyCollection.findOne({ _id: id })
    const company = MongoHelper.map(companyById)
    return company
  }

  async loadByCnpj(cnpj: string): Promise<CompanyModel> {
    const companyCollection = await MongoHelper.getCollection('companies')
    const companyByCnpj = await companyCollection.findOne({ cnpj })
    const company = companyByCnpj && MongoHelper.map(companyByCnpj)
    return company
  }
}
