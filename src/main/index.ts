import './config/module-alias'

import { PgConnection } from '@/infra/repos/postgres/helpers'
import 'reflect-metadata'
import { env } from './config/env'

PgConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
