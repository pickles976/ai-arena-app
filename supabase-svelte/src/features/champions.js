import { supabase } from "../supabaseClient"

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

export async function createChampion(champion, session) {
    champion.owner = session.session.user.id
    let { data: champions, error } = await supabase
      .from('champion')
      .insert([champion])
      .select('*')
    return champions
}

export async function updateChampions(champions) {
    let { data: response, error } = await supabase
      .from('champion')
      .upsert(champions)
      .select('*')
    return response
}

export async function deleteChampion(champion) {
    let { data: champions, error } = await supabase
      .from('champion')
      .delete()
      .eq('id', champion.id)
      .select('*')
    return champions
}