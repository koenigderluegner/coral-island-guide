export type SendMailToPlayerEffect = {
    type: 'SendMailToPlayer',
    meta: {
        mailId: string
        dayDelay: number
    }
}
