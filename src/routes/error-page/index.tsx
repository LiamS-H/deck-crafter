import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage() {
    const Error  = useRouteError()

    return (
        <>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            {isRouteErrorResponse(Error) ?
                ( Error.error?.message || Error.statusText) : 'Unknown Error message'
            }
        </p>
        </>
    )
}
