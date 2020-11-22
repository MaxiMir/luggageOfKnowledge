### HTTP RESPONSE:
```ts
interface HttpResponse<T> extends Response {
	parsedBody?: T
	status: number,
	redirect: boolean
	// ... and other necessary parameters
}

export async function http<T>(request: string): Promise<HttpResponse<T>> {
	const response: HttpResponse<T> = await fetch(request)
	
   try {
      response.parsedBody = await response.json()
   } catch (ex) {
      if (!response.ok) {
         // Error if there is response status issue
         throw new Error(response.statusText)
      }
   }
	
   return response
}
```
