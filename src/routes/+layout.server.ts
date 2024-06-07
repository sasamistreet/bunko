import type { LayoutServerLoad } from './$types'

/*export const load: LayoutServerLoad = async ({ locals: { session } }) => {
  return {
    session,
  }
}*/

export const load: LayoutServerLoad = async ({ locals: { user } }) => {
  return {
    user
  }
}