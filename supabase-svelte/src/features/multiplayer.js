import { supabase } from "../supabaseClient"

export async function getAllWars() {
    let { data: galactic_wars, error } = await supabase
      .from(`galactic_war`)
      .select(`*`)
    return galactic_wars
}

export async function getAllStarsForWar(war_id) {
    let { data: stars, error } = await supabase
      .from(`star_systems`)
      .select(`*`)
      .eq('galactic_war', war_id)
    return stars
}

export async function getAllChampions(champion_ids) {
    let { data: champions, error } = await supabase
      .from('champion')
      .select('*')
      .in('id', champion_ids)
    return champions
}

export async function getChampionsForUser(session) {
  let { data: champions, error } = await supabase
    .from('champion')
    .select('*')
    .eq('owner', session.session.user.id)
  return champions
}
  
export async function getAllUsers(user_ids) {
    let { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      .in('id', user_ids)
    return users
  }