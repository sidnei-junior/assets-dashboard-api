import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { DeleteCompanyRepository } from '@/data/protocols/db/company/delete-company-repository'
import { LoadCompaniesRepository } from '@/data/protocols/db/company/load-companies-repository'
import { LoadCompanyByCnpjRepository } from '@/data/protocols/db/company/load-company-by-cnpj-repository'
import { UpdateCompanyRepository } from '@/data/protocols/db/company/update-company-repository'
import { CompanyModel } from '@/domain/models/company'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'
import { UpdateCompanyModel } from '@/domain/usecases/company/update-company'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'

export class CompanyMongoRepository
  implements
    AddCompanyRepository,
    LoadCompanyByCnpjRepository,
    LoadCompaniesRepository,
    DeleteCompanyRepository,
    UpdateCompanyRepository
{
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

  async loadAll(): Promise<CompanyModel[]> {
    const companyCollection = await MongoHelper.getCollection('companies')
    const companies: CompanyModel[] = (await companyCollection.find().toArray()) as unknown as CompanyModel[]
    return companies
  }

  async delete(id: string): Promise<void> {
    const mongoId = new ObjectId(id)
    const companyCollection = await MongoHelper.getCollection('companies')
    const mongoResponse = await companyCollection.deleteOne({ _id: mongoId })
    const { deletedCount } = mongoResponse
    if (deletedCount === 0) {
      return null
    }
  }

  async update(companyData: UpdateCompanyModel, id: string): Promise<CompanyModel> {
    const mongoId = new ObjectId(id)
    const companyCollection = await MongoHelper.getCollection('companies')
    const { matchedCount } = await companyCollection.updateOne({ _id: mongoId }, { $set: { ...companyData } })
    if (matchedCount === 0) {
      return null
    }
    const companyById = await companyCollection.findOne({ _id: mongoId })
    const company = MongoHelper.map(companyById)
    return company
  }
}
