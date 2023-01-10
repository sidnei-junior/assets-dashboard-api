import { MongoClient, MongoClientOptions, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect(uri: string): Promise<void> {
    this.uri = uri
    const mongoClientOptions: MongoClientOptions = {}
    this.client = await MongoClient.connect(uri, mongoClientOptions)
  },
  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },
  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    const collectionMapped = Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
    return collectionMapped
  }
}
