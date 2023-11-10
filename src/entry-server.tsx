import { createHandler, renderAsync, StartServer, renderStream } from 'solid-start/entry-server'

export default createHandler(renderStream(event => <StartServer event={event} />))
