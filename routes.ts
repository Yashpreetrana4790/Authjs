/** An array of routes that are accessible  
 * to the public and not requries authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/"
]

/**
An array of routes that are used for the authentication.
These routes will redirect logged in users to /setting 
@types{string[]}`
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error"
]


/**
 * The prefix for API authentication routes, These routes will redirect 
 * routes that starts with this prefix are used for api authentication
 */
export const apiAuthprefix =
  "/api/auth"


/**
 * Default redirect path after logged in 
 * @type {string}
 */
export const DEFAULT_LOGIN_PATH =
  "/settings"

