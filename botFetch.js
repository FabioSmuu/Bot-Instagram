const methods = ({ viewer, inbox: { threads } }) => {
    const {
        pk: user_id,
        account_badges: badges,
        biz_user_inbox_state: inbox_count,
        username,
        full_name,
        profile_pic_id,
        profile_pic_url,
        is_verified
    } = viewer || {}

    return {
        user_id, badges, inbox_count, username, full_name, profile_pic_id, profile_pic_url,
        threads, is_verified,

        getThread(threadId) {
           const thread = threads.find(({ thread_id }) => thread_id == threadId)
           return thread
        },

        getMessages(threadId) {
            const { items } = this.getThread(threadId)
            return items.map(({
                client_context: context_id,
                item_id: message_id,
                item_type: messageType,
                text,
                timestamp,
                user_id,
                show_forward_attribution: go_through
            }) => ({
                context_id,
                message_id,
                messageType,
                text,
                timestamp,
                user_id,
                you: (user_id == this.user_id),
                go_through 
            }))
        }
    }
}

const getApi = async ig_id => {
    const response = await fetch('https://i.instagram.com/api/v1/direct_v2/inbox/?persistentBadging=true&folder=0&cursor=', {
        headers: {
			accept: '*/*',
            'x-ig-app-id': ig_id
        },

        referrer: 'https://www.instagram.com/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    })

    const data = await response.json()
    return Promise.resolve(data || {})
}

const core = bot => {
	const [{ thread_id }] = bot.threads

    const thread = bot.getThread(thread_id)
    console.log(thread)

    const messages = bot.getMessages(thread_id)
    console.log(messages)
}

const createBot = async (ig_id) => {
    const api = await getApi(ig_id)
    const bot = methods(api)

    console.log(`Bot ${bot.username} ativo.`)
    core(bot)
}

await createBot('936**********59')
