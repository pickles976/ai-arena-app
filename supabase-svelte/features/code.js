import { supabase } from '../src/supabaseClient'

/**
 * Submit code for this user to the database
 */
export async function submitCode(code, session) {
    
    const { data, error } = await supabase
    .from('TacticalCode')
    .insert([
        { 
          name: code.name, 
          owner: session.session.user.id, // TODO: should be easier to get user id
          code: {
            "name" : code.name,
            "baseStart" : code.baseStart,
            "baseUpdate" : code.baseUpdate,
            "shipStart" : code.shipStart,
            "shipUpdate" : code.shipUpdate,
          },
        },
    ])
}

/**
 * Get a specific piece of code by id
 */
export async function getCode(name) {
        
    let { data: TacticalCode, error } = await supabase
    .from('TacticalCode')
    .select('*')
    .eq('name', 'Second Code') // filtering

    console.log(TacticalCode)
}

/**
 * Get the code for a given user
 */
export async function getUserCode() {
        
  let { data: TacticalCode, error } = await supabase
  .from('TacticalCode')
  .select('*')
  return TacticalCode

}