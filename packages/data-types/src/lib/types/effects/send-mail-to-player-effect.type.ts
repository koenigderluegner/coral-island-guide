export type SendMailToPlayerEffect = {
    type: 'SendMailToPlayer',
    meta: {
        mail: {
            mailId: string,
            title: string
        }
        dayDelay: number
    }
}
