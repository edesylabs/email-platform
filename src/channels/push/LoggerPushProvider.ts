import Router from '@koa/router'
import { logger } from '../../config/logger'
import { randomInt, sleep } from '../../utilities'
import { ExternalProviderParams, ProviderSchema } from '../Provider'
import { createController } from '../ProviderService'
import { Push, PushResponse } from './Push'
import { PushProvider } from './PushProvider'
export default class LoggerPushProvider extends PushProvider {
    addLatency?: boolean

    async send(push: Push): Promise<PushResponse> {

        // Allow for having random latency to aid in performance testing
        if (this.addLatency) await sleep(randomInt())

        logger.info(push, 'provider:push:logger')
        return {
            push,
            success: true,
            response: '',
        }
    }

    static controllers(): Router {
        const providerParams = ProviderSchema<ExternalProviderParams, any>('loggerPushProviderParams', {
            type: 'object',
        })

        return createController('email', 'push', providerParams)
    }
}